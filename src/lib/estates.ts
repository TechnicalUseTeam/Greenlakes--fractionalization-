import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  estates as localEstates,
  soldOutProperties as localSoldOut,
  type Estate,
  type GalleryImage,
  type SoldOutProperty,
  type Stake,
  type ValuationPoint,
} from '../data';
import { firebaseConfigured, getAdminDb } from './firebase';

// Live catalogue: Firestore estates + fractions mapped onto the site Estate
// shape, with the bundled data.ts lists as the offline fallback. Anything the
// admin saves in /sign-in shows up on Explore, Home and the estate pages.

const localBySlug = new Map(localEstates.map((e) => [e.slug, e]));
const localSoldBySlug = new Map(localSoldOut.map((e) => [e.slug, e]));

function toLocation(v: unknown): { lat: number; lng: number } | undefined {
  if (Array.isArray(v) && v.length >= 2) {
    const [lat, lng] = [Number(v[0]), Number(v[1])];
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  }
  const d = (v ?? {}) as Record<string, unknown>;
  const lat = Number(d.lat ?? d.latitude ?? NaN);
  const lng = Number(d.lng ?? d.longitude ?? NaN);
  if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  return undefined;
}

function toStakes(v: unknown): Stake[] {
  if (!Array.isArray(v)) return [];
  return (v as Record<string, unknown>[])
    .map((f) => ({
      label: String(f.label ?? ''),
      share: Number(f.share ?? 0),
      price: Math.round(Number(f.price ?? 0)),
    }))
    .filter((s) => s.label && s.share > 0 && s.price > 0)
    .sort((a, b) => b.share - a.share);
}

function toGallery(v: unknown, image: string, imageAlt: string, fallback: GalleryImage[]): GalleryImage[] {
  if (Array.isArray(v) && v.length > 0) {
    const rows = (v as Record<string, unknown>[])
      .map((g) => ({ src: String(g.src ?? ''), alt: String(g.alt ?? imageAlt) }))
      .filter((g) => g.src);
    if (rows.length > 0) return rows;
  }
  if (fallback.length > 0) return fallback;
  return image ? [{ src: image, alt: imageAlt }] : [];
}

function toSpecs(v: unknown, d: Record<string, unknown>): { label: string; value: string }[] {
  if (Array.isArray(v) && v.length > 0) {
    const rows = (v as Record<string, unknown>[])
      .map((s) => ({ label: String(s.label ?? ''), value: String(s.value ?? '') }))
      .filter((s) => s.label && s.value);
    if (rows.length > 0) return rows;
  }
  const specs: { label: string; value: string }[] = [];
  const sizeLabel = String(d.sizeLabel ?? '');
  const bedrooms = String(d.bedrooms ?? '');
  const bathrooms = String(d.bathrooms ?? '');
  const capacity = String(d.capacity ?? '');
  const extras = Array.isArray(d.amenities) ? (d.amenities as string[]).slice(0, 3).join(', ') : '';
  if (sizeLabel) specs.push({ label: 'Land', value: sizeLabel });
  if (bedrooms) specs.push({ label: 'Bedrooms', value: bedrooms });
  if (bathrooms) specs.push({ label: 'Bathrooms', value: bathrooms });
  if (capacity) specs.push({ label: 'Capacity', value: capacity });
  if (extras) specs.push({ label: 'Extras', value: extras });
  specs.push({ label: 'Held by', value: 'One company, one title' });
  return specs;
}

function toLandUse(v: unknown, areaAcres: number): Estate['landUse'] {
  const d = (v ?? {}) as Record<string, unknown>;
  const rows = Array.isArray(d.rows)
    ? (d.rows as Record<string, unknown>[])
        .map((r) => ({ label: String(r.label ?? ''), value: String(r.value ?? ''), pct: Number(r.pct ?? 0) }))
        .filter((r) => r.label)
    : [];
  return {
    lead: String(d.lead ?? `${areaAcres} acres`),
    tail: String(d.tail ?? 'held by one company.'),
    rows:
      rows.length > 0
        ? rows
        : [{ label: 'Open land', value: `${areaAcres} acres`, pct: 100 }],
  };
}

function toValuationHistory(v: unknown, valuation: number): ValuationPoint[] {
  if (Array.isArray(v) && v.length > 0) {
    const rows = (v as Record<string, unknown>[])
      .map((p) => ({ label: String(p.label ?? ''), value: Number(p.value ?? 0) }))
      .filter((p) => p.label && p.value > 0);
    if (rows.length > 0) return rows;
  }
  return [{ label: 'Today', value: valuation }];
}

export function useEstates(): { estates: Estate[]; soldOut: SoldOutProperty[]; loading: boolean } {
  const [estates, setEstates] = useState<Estate[]>(localEstates);
  const [soldOut, setSoldOut] = useState<SoldOutProperty[]>(localSoldOut);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseConfigured) return;
    let live = true;
    (async () => {
      try {
        const db = getAdminDb();
        const snap = await getDocs(collection(db, 'estates'));
        const liveEstates: Estate[] = [];
        const liveSoldOut: SoldOutProperty[] = [];
        for (const docSnap of snap.docs) {
          const v = docSnap.data() as Record<string, unknown>;
          const fSnap = await getDocs(collection(db, 'estates', docSnap.id, 'fractions'));
          const stakes = toStakes(
            fSnap.docs.map((f) => {
              const fv = f.data() as Record<string, unknown>;
              return { label: fv.label, share: fv.share, price: fv.price };
            }),
          );
          const status = String(v.status ?? 'coming-soon');
          const image = String(v.image ?? '');
          const imageAlt = String(v.imageAlt ?? v.name ?? '');
          const acres = Number(v.areaAcres ?? 0);
          const local = localBySlug.get(docSnap.id);
          const localSold = localSoldBySlug.get(docSnap.id);
          const about = (Array.isArray(v.about) ? (v.about as string[]) : []).filter(Boolean);
          const description = about.length > 0 ? about : [String(v.summary ?? '')].filter(Boolean);

          if (status === 'sold-out') {
            liveSoldOut.push({
              slug: docSnap.id,
              name: String(v.name ?? docSnap.id),
              shortName: String(v.shortName ?? v.name ?? docSnap.id),
              kind: String(v.kind ?? localSold?.kind ?? 'Managed farmland'),
              place: String(v.place ?? ''),
              state: String(v.state ?? ''),
              summary: String(v.summary ?? ''),
              description,
              specs: toSpecs(v.specs, v),
              image,
              imageAlt,
              gallery: toGallery(v.gallery, image, imageAlt, localSold?.gallery ?? local?.gallery ?? []),
              location: toLocation(v.location),
            });
            continue;
          }

          const mapRaw = String(v.map ?? local?.map ?? (docSnap.id.includes('alibaug') ? 'alibaug' : 'nandi'));
          liveEstates.push({
            slug: docSnap.id,
            name: String(v.name ?? docSnap.id),
            shortName: String(v.shortName ?? v.name ?? docSnap.id),
            kind: String(v.kind ?? local?.kind ?? 'Managed farmland'),
            place: String(v.place ?? ''),
            state: String(v.state ?? ''),
            status: status === 'open' ? 'open' : 'coming-soon',
            summary: String(v.summary ?? ''),
            description,
            specs: toSpecs(v.specs, v),
            mood: String(v.mood ?? local?.mood ?? v.summary ?? ''),
            image,
            imageAlt,
            valuation: Number(v.valuation ?? 0),
            stakes,
            subscribedPct: Number(v.subscribedPct ?? 0),
            targetIrr: Number(v.targetIrr ?? 0),
            holdMonths: Number(v.holdMonths ?? 0),
            areaAcres: acres,
            areaSqft: Number(v.areaSqft ?? Math.round(acres * 43560)),
            landUse: v.landUse
              ? toLandUse(v.landUse, acres)
              : (local?.landUse ?? toLandUse(undefined, acres)),
            valuationHistory:
              Array.isArray(v.valuationHistory) && v.valuationHistory.length > 0
                ? toValuationHistory(v.valuationHistory, Number(v.valuation ?? 0))
                : (local?.valuationHistory ??
                  toValuationHistory(undefined, Number(v.valuation ?? 0))),
            spv: String(v.spv ?? ''),
            cin: String(v.cin ?? ''),
            map: mapRaw === 'alibaug' ? 'alibaug' : 'nandi',
            gallery: toGallery(v.gallery, image, imageAlt, local?.gallery ?? []),
            location: toLocation(v.location),
            showShare: typeof v.showShare === 'boolean' ? v.showShare : (local?.showShare ?? true),
          });
        }
        if (live && (liveEstates.length > 0 || liveSoldOut.length > 0)) {
          liveEstates.sort((a, b) => (a.status === b.status ? 0 : a.status === 'open' ? -1 : 1));
          setEstates(liveEstates);
          setSoldOut(liveSoldOut);
        }
      } catch {
        // Offline or misconfigured: the bundled lists stay on screen.
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  return { estates, soldOut, loading };
}
