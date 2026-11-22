import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import { Reveal } from '../components/Reveal';
import { useEstates } from '../lib/estates';
import { firebaseConfigured, getAdminAuth, getAdminDb } from '../lib/firebase';

type FractionRow = { label: string; price: string; units: string };

type EnquiryDoc = {
  id: string;
  estateSlug: string;
  estateName: string;
  kind: string;
  name: string;
  phone: string;
  status: string;
  createdAtMs: number;
};

const emptyForm = {
  slug: '',
  name: '',
  shortName: '',
  place: '',
  state: 'Karnataka',
  status: 'open',
  summary: '',
  image: '',
  imageAlt: '',
  valuation: '',
  targetIrr: '14',
  holdMonths: '72',
  areaAcres: '',
  kind: 'Managed farmland',
  mood: '',
  areaSqft: '',
  cin: '',
  map: 'nandi',
  description: '',
  specs: '',
  gallery: '',
  showShare: true,
  bedrooms: '2',
  sizeLabel: '',
  bathrooms: '2',
  capacity: '',
  amenities: '',
  possessionLabel: '',
  rentalYield: '6-8%',
  bookingNote: '',
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const shareFromLabel = (label: string): number | null => {
  const m = label.trim().match(/^1\s*\/\s*(\d+)$/);
  if (!m) return null;
  const n = Number(m[1]);
  return n > 0 ? 1 / n : null;
};

export function SignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [tab, setTab] = useState<'properties' | 'requests'>('properties');
  const { estates, soldOut, loading } = useEstates();
  const [enquiries, setEnquiries] = useState<EnquiryDoc[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [fractions, setFractions] = useState<FractionRow[]>([
    { label: '1/2', price: '', units: '2' },
    { label: '1/4', price: '', units: '2' },
    { label: '1/6', price: '', units: '2' },
    { label: '1/12', price: '', units: '6' },
  ]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseConfigured) {
      setChecking(false);
      return;
    }
    const unsub = onAuthStateChanged(getAdminAuth(), async (u) => {
      setUser(u);
      if (!u) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }
      try {
        const token = await u.getIdTokenResult();
        const role = (token.claims.role as string | undefined) ?? '';
        setIsAdmin(['admin', 'super_admin', 'operations'].includes(role));
      } catch {
        setIsAdmin(false);
      }
      setChecking(false);
    });
    return unsub;
  }, []);

  const refreshRequests = async () => {
    setLoadingReqs(true);
    try {
      const db = getAdminDb();
      const eSnap = await getDocs(collection(db, 'enquiries'));
      const reqs: EnquiryDoc[] = eSnap.docs.map((d) => {
        const v = d.data() as Record<string, unknown>;
        const ts = v.createdAt as { toDate?: () => Date } | undefined;
        return {
          id: d.id,
          estateSlug: String(v.estateSlug ?? ''),
          estateName: String(v.estateName ?? v.estateSlug ?? ''),
          kind: String(v.kind ?? ''),
          name: String(v.name ?? ''),
          phone: String(v.phone ?? ''),
          status: String(v.status ?? 'new'),
          createdAtMs: ts?.toDate ? ts.toDate().getTime() : 0,
        };
      });
      reqs.sort((a, b) => b.createdAtMs - a.createdAtMs);
      setEnquiries(reqs);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not load requests.');
    } finally {
      setLoadingReqs(false);
    }
  };

  useEffect(() => {
    if (isAdmin) void refreshRequests();
  }, [isAdmin]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(getAdminAuth(), email.trim(), password);
      const token = await cred.user.getIdTokenResult();
      const role = (token.claims.role as string | undefined) ?? '';
      if (!['admin', 'super_admin', 'operations'].includes(role)) {
        await signOut(getAdminAuth());
        setError('This account is not an admin. Ask for the admin role first.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  const all = [...estates, ...soldOut.map((s) => ({ ...s }))];

  const startAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setFractions([
      { label: '1/2', price: '', units: '2' },
      { label: '1/4', price: '', units: '2' },
      { label: '1/6', price: '', units: '2' },
      { label: '1/12', price: '', units: '6' },
    ]);
    setNotice(null);
    window.scrollTo({ top: document.body.scrollHeight });
  };

  const startEdit = async (slug: string) => {
    try {
      const db = getAdminDb();
      const ref = doc(db, 'estates', slug);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        setError('That property is not in Firestore yet. It only lives in the bundled list.');
        return;
      }
      const v = snap.data() as Record<string, unknown>;
      const fSnap = await getDocs(collection(db, 'estates', slug, 'fractions'));
      setEditing(slug);
      setForm({
        slug,
        name: String(v.name ?? ''),
        shortName: String(v.shortName ?? ''),
        place: String(v.place ?? ''),
        state: String(v.state ?? 'Karnataka'),
        status: String(v.status ?? 'open'),
        summary: String(v.summary ?? ''),
        image: String(v.image ?? ''),
        imageAlt: String(v.imageAlt ?? ''),
        valuation: String(v.valuation ?? ''),
        targetIrr: String(v.targetIrr ?? ''),
        holdMonths: String(v.holdMonths ?? ''),
        areaAcres: String(v.areaAcres ?? ''),
        kind: String(v.kind ?? 'Managed farmland'),
        mood: String(v.mood ?? ''),
        areaSqft: String(v.areaSqft ?? ''),
        cin: String(v.cin ?? ''),
        map: String(v.map ?? 'nandi'),
        description: Array.isArray(v.about) ? (v.about as string[]).join('\n\n') : '',
        specs: Array.isArray(v.specs)
          ? (v.specs as Record<string, unknown>[]).map((s) => `${s.label}: ${s.value}`).join('\n')
          : '',
        gallery: Array.isArray(v.gallery)
          ? (v.gallery as Record<string, unknown>[]).map((g) => String(g.src ?? '')).filter(Boolean).join('\n')
          : '',
        showShare: v.showShare !== false,
        bedrooms: String(v.bedrooms ?? ''),
        sizeLabel: String(v.sizeLabel ?? ''),
        bathrooms: String(v.bathrooms ?? ''),
        capacity: String(v.capacity ?? ''),
        amenities: Array.isArray(v.amenities) ? (v.amenities as string[]).join(', ') : '',
        possessionLabel: String(v.possessionLabel ?? ''),
        rentalYield: String(v.rentalYield ?? ''),
        bookingNote: String(v.bookingNote ?? ''),
      });
      setFractions(
        fSnap.docs.map((d) => {
          const fv = d.data() as Record<string, unknown>;
          return {
            label: String(fv.label ?? ''),
            price: String(fv.price ?? ''),
            units: String((fv.totalUnits as number | undefined) ?? ''),
          };
        }),
      );
      setNotice(null);
      window.scrollTo({ top: document.body.scrollHeight });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not load that property.');
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const slug = editing ?? slugify(form.name);
      if (!slug) throw new Error('Give the property a name first.');
      if (!form.name.trim() || !form.place.trim()) throw new Error('Name and place are required.');
      const valuation = Number(form.valuation);
      if (!valuation || valuation <= 0) throw new Error('Valuation must be a number above zero.');

      const parsed = fractions
        .filter((f) => f.label.trim() && f.price.trim())
        .map((f) => {
          const share = shareFromLabel(f.label);
          if (share === null) throw new Error(`Fraction "${f.label}" must look like 1/12.`);
          const price = Math.round(Number(f.price));
          if (!price || price <= 0) throw new Error(`Price for ${f.label} must be above zero.`);
          const totalUnits = Math.max(1, Math.round(Number(f.units) || 1));
          return { id: slugify(f.label), label: f.label.trim(), share, price, totalUnits };
        });

      const db = getAdminDb();
      const ref = doc(db, 'estates', slug);
      const existing = editing ? await getDoc(ref) : null;
      const prev = existing?.exists() ? (existing.data() as Record<string, unknown>) : {};
      const prevSold = new Map<string, number>();
      if (existing?.exists()) {
        const fSnap = await getDocs(collection(db, 'estates', slug, 'fractions'));
        for (const d of fSnap.docs) {
          const fv = d.data() as Record<string, unknown>;
          prevSold.set(d.id, Number(fv.soldUnits ?? 0));
          if (!parsed.some((p) => p.id === d.id)) {
            await deleteDoc(doc(db, 'estates', slug, 'fractions', d.id));
          }
        }
      }

      const description = form.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      const specs = form.specs
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const i = line.indexOf(':');
          return i > 0
            ? { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() }
            : { label: line, value: '' };
        })
        .filter((s) => s.label && s.value);
      const gallery = form.gallery
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((src) => ({ src, alt: form.name.trim() }));

      await setDoc(
        ref,
        {
          slug,
          name: form.name.trim(),
          shortName: (form.shortName || form.name).trim(),
          place: form.place.trim(),
          state: form.state.trim(),
          status: form.status,
          summary: form.summary.trim(),
          image: form.image.trim(),
          imageAlt: form.imageAlt.trim() || form.name.trim(),
          valuation,
          targetIrr: Number(form.targetIrr) || 0,
          holdMonths: Number(form.holdMonths) || 0,
          areaAcres: Number(form.areaAcres) || 0,
          areaSqft: Number(form.areaSqft) || 0,
          kind: form.kind.trim() || 'Managed farmland',
          mood: form.mood.trim(),
          cin: form.cin.trim(),
          map: form.map,
          about: description.length > 0 ? description : [form.summary.trim()].filter(Boolean),
          specs,
          gallery,
          showShare: form.showShare,
          bedrooms: form.bedrooms.trim(),
          sizeLabel: form.sizeLabel.trim(),
          bathrooms: form.bathrooms.trim(),
          capacity: form.capacity.trim(),
          amenities: form.amenities.split(',').map((a) => a.trim()).filter(Boolean),
          possessionLabel: form.possessionLabel.trim(),
          rentalYield: form.rentalYield.trim(),
          bookingNote: form.bookingNote.trim(),
          subscribedPct: Number(prev.subscribedPct ?? 0),
          spv: String(prev.spv ?? ''),
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
      if (form.status === 'sold-out') {
        const fSnap = await getDocs(collection(db, 'estates', slug, 'fractions'));
        for (const d of fSnap.docs) await deleteDoc(doc(db, 'estates', slug, 'fractions', d.id));
      } else {
        if (parsed.length === 0) throw new Error('Add at least one fraction with a price.');
        for (const p of parsed) {
          await setDoc(doc(db, 'estates', slug, 'fractions', p.id), {
            id: p.id,
            label: p.label,
            share: p.share,
            price: p.price,
            totalUnits: p.totalUnits,
            soldUnits: prevSold.get(p.id) ?? 0,
          });
        }
      }
      setNotice(editing ? `Saved ${form.name}.` : `Added ${form.name}. It is live in the site catalogue now.`);
      setEditing(null);
      setForm(emptyForm);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const markHandled = async (id: string) => {
    try {
      await updateDoc(doc(getAdminDb(), 'enquiries', id), {
        status: 'handled',
        updatedAt: serverTimestamp(),
      });
      setEnquiries((prev) => prev.map((x) => (x.id === id ? { ...x, status: 'handled' } : x)));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Update failed.');
    }
  };

  const set =
    (k: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!firebaseConfigured) {
    return (
      <div className="container" style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 720 }}>
        <LogoMark size={44} />
        <h1 className="display" style={{ marginTop: 24 }}>Admin sign-in is not configured.</h1>
        <p className="body" style={{ marginTop: 12 }}>
          Add the web Firebase values to greenlakes-ui/.env: VITE_FIREBASE_API_KEY,
          VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID and VITE_FIREBASE_APP_ID.
          They come from the Firebase console under Project settings, Your apps, Web app.
        </p>
        <Link className="btn" to="/" style={{ marginTop: 20 }}>Back home</Link>
      </div>
    );
  }

  if (checking) {
    return (
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <p className="body">Checking session…</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="container auth">
        <div>
          <Reveal>
            <LogoMark size={44} />
            <h1 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginTop: 24, maxWidth: '12ch' }}>
              Admin sign-in.
            </h1>
            <p className="body" style={{ marginTop: 12, maxWidth: '38ch' }}>
              This area is for the Green Lakes team. Sign in with your admin
              account to add and edit properties in the site catalogue.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="chart-card" style={{ marginTop: 30, padding: 'clamp(20px, 3vw, 30px)' }}>
              <form onSubmit={login}>
                <h2 className="h3">Sign in as admin</h2>
                <label className="field-label" htmlFor="admin-email" style={{ display: 'block', marginTop: 20 }}>
                  Work email
                </label>
                <input
                  id="admin-email" type="email" required className="field" autoComplete="email"
                  placeholder="you@greenlakes.in" value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <label className="field-label" htmlFor="admin-password" style={{ display: 'block', marginTop: 14 }}>
                  Password
                </label>
                <input
                  id="admin-password" type="password" required className="field" autoComplete="current-password"
                  placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="tiny" style={{ marginTop: 12, color: '#a33b2e' }}>{error}</p>}
                <button className="btn" type="submit" disabled={busy} style={{ width: '100%', marginTop: 20 }}>
                  {busy ? 'Signing in…' : 'Sign in'}
                </button>
                <p className="tiny" style={{ marginTop: 12 }}>
                  Accounts need the admin role. Member logins are turned away here.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
        <Reveal className="auth__media" delay={1}>
          <img src="/plot-photos/property1/1.jpeg" alt="Farm villa with pool and lawns" width="1200" height="1500" />
        </Reveal>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <LogoMark size={34} />
        <h1 className="h3" style={{ margin: 0 }}>Property admin</h1>
        <span className="tiny" style={{ marginLeft: 'auto' }}>{user.email}</span>
        <button className="btn btn--sm" type="button" onClick={() => { void signOut(getAdminAuth()); }}>
          Sign out
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
        <button
          type="button" className={tab === 'properties' ? 'btn btn--sm' : 'btn btn--sm btn--light'}
          onClick={() => setTab('properties')}
        >
          Properties ({all.length})
        </button>
        <button
          type="button" className={tab === 'requests' ? 'btn btn--sm' : 'btn btn--sm btn--light'}
          onClick={() => setTab('requests')}
        >
          Requests ({enquiries.filter((x) => x.status === 'new').length} new)
        </button>
        <button type="button" className="btn btn--sm btn--light" onClick={() => { void refreshRequests(); }} disabled={loadingReqs}>
          {loadingReqs ? 'Loading…' : 'Reload requests'}
        </button>
      </div>

      {error && <p className="tiny" style={{ marginTop: 12, color: '#a33b2e' }}>{error}</p>}
      {notice && <p className="tiny" style={{ marginTop: 12, color: '#3f6b3a' }}>{notice}</p>}

      {tab === 'requests' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
          {enquiries.length === 0 && <p className="body">No requests yet. Callback and notify-me taps from the app land here.</p>}
          {enquiries.map((q) => (
            <div key={q.id} className="chart-card" style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <strong>{q.kind === 'callback' ? 'Callback' : 'Notify me'}</strong>
                <span className="tiny"> · {q.estateName}</span>
                <div className="tiny" style={{ marginTop: 4 }}>
                  {[q.name, q.phone].filter(Boolean).join(' · ') || 'No contact left (notify tap)'}
                  {q.createdAtMs > 0 && ` · ${new Date(q.createdAtMs).toLocaleString('en-IN')}`}
                </div>
              </div>
              {q.status === 'new'
                ? <button type="button" className="btn btn--sm" onClick={() => { void markHandled(q.id); }}>Mark handled</button>
                : <span className="tiny">Handled</span>}
            </div>
          ))}
        </div>
      )}

      {tab === 'properties' && (
        <>
          <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
            {all.map((e) => (
              <div key={e.slug} className="chart-card" style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <strong>{e.name}</strong>
                  <div className="tiny" style={{ marginTop: 4 }}>
                    {e.place} · {'status' in e ? (e as { status: string }).status : 'sold out'}
                  </div>
                </div>
                <Link className="btn btn--sm btn--light" to={`/estates/${e.slug}`}>View page</Link>
                <button type="button" className="btn btn--sm" onClick={() => { void startEdit(e.slug); }}>Edit</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <button type="button" className="btn" onClick={startAdd}>Add a property</button>
          </div>

          <form onSubmit={save} style={{ marginTop: 24 }}>
            <div className="chart-card" style={{ padding: 'clamp(20px, 3vw, 30px)', display: 'grid', gap: 12 }}>
              <h2 className="h3">{editing ? `Editing ${form.name || editing}` : 'New property'}</h2>
              <p className="tiny">Charts keep the bundled land-use and valuation series unless the property already has its own. New properties show simple defaults.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                <div>
                  <label className="field-label" htmlFor="f-name">Property name *</label>
                  <input id="f-name" className="field" required value={form.name} onChange={set('name')} placeholder="By The Creek Holiday Home" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-short">Short name</label>
                  <input id="f-short" className="field" value={form.shortName} onChange={set('shortName')} placeholder="By The Creek" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-place">Place *</label>
                  <input id="f-place" className="field" required value={form.place} onChange={set('place')} placeholder="Near Chikkaballapur, Karnataka" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-state">State</label>
                  <input id="f-state" className="field" value={form.state} onChange={set('state')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-status">Status</label>
                  <select id="f-status" className="field" value={form.status} onChange={set('status')}>
                    <option value="open">Open</option>
                    <option value="coming-soon">Coming soon</option>
                    <option value="sold-out">Sold out</option>
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="f-valuation">Valuation (Rs) *</label>
                  <input id="f-valuation" className="field" required inputMode="numeric" value={form.valuation} onChange={set('valuation')} placeholder="71500000" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-image">Photo URL</label>
                  <input id="f-image" className="field" value={form.image} onChange={set('image')} placeholder="/plot-photos/… or https://…" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-imagealt">Photo alt text</label>
                  <input id="f-imagealt" className="field" value={form.imageAlt} onChange={set('imageAlt')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-kind">Kind</label>
                  <select id="f-kind" className="field" value={form.kind} onChange={set('kind')}>
                    <option value="Managed farmland">Managed farmland</option>
                    <option value="Residential land">Residential land</option>
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="f-map">Map drawing</label>
                  <select id="f-map" className="field" value={form.map} onChange={set('map')}>
                    <option value="nandi">Nandi style</option>
                    <option value="alibaug">Alibaug style</option>
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="f-mood">Mood line</label>
                  <input id="f-mood" className="field" value={form.mood} onChange={set('mood')} placeholder="Mango orchards below the hills" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-sqft">Area (sq ft)</label>
                  <input id="f-sqft" className="field" inputMode="numeric" value={form.areaSqft} onChange={set('areaSqft')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-acres">Area (acres)</label>
                  <input id="f-acres" className="field" inputMode="decimal" value={form.areaAcres} onChange={set('areaAcres')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-tirr">Target IRR %</label>
                  <input id="f-tirr" className="field" inputMode="numeric" value={form.targetIrr} onChange={set('targetIrr')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-hold">Hold (months)</label>
                  <input id="f-hold" className="field" inputMode="numeric" value={form.holdMonths} onChange={set('holdMonths')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-cin">SPV CIN</label>
                  <input id="f-cin" className="field" value={form.cin} onChange={set('cin')} placeholder="U70100KA2025PTC100001" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-bed">Bedrooms</label>
                  <input id="f-bed" className="field" value={form.bedrooms} onChange={set('bedrooms')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-size">Property size</label>
                  <input id="f-size" className="field" value={form.sizeLabel} onChange={set('sizeLabel')} placeholder="12,500 Sq.ft." />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-bath">Bathrooms</label>
                  <input id="f-bath" className="field" value={form.bathrooms} onChange={set('bathrooms')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-cap">Capacity</label>
                  <input id="f-cap" className="field" value={form.capacity} onChange={set('capacity')} placeholder="4 Adults, 2 Kids" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-yield">Rental yield</label>
                  <input id="f-yield" className="field" value={form.rentalYield} onChange={set('rentalYield')} placeholder="6-8%" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-poss">Possession</label>
                  <input id="f-poss" className="field" value={form.possessionLabel} onChange={set('possessionLabel')} placeholder="Ready" />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="f-summary">Summary</label>
                <textarea id="f-summary" className="field" rows={3} value={form.summary} onChange={set('summary')} />
              </div>
              <div>
                <label className="field-label" htmlFor="f-desc">About paragraphs (blank line between each)</label>
                <textarea id="f-desc" className="field" rows={4} value={form.description} onChange={set('description')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                <div>
                  <label className="field-label" htmlFor="f-specs">Spec rows (one per line, Label: value)</label>
                  <textarea id="f-specs" className="field" rows={4} value={form.specs} onChange={set('specs')} placeholder={'Land: 12,500 Sq.ft.\nHome: 2 BHK villa'} />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-gallery">Gallery photo URLs (one per line)</label>
                  <textarea id="f-gallery" className="field" rows={4} value={form.gallery} onChange={set('gallery')} placeholder="/plot-photos/property4/1.jpeg" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                <div>
                  <label className="field-label" htmlFor="f-amen">Amenities (comma separated)</label>
                  <input id="f-amen" className="field" value={form.amenities} onChange={set('amenities')} placeholder="Private pool, Orchard, Caretaker" />
                </div>
                <div>
                  <label className="field-label" htmlFor="f-book">Booking note</label>
                  <input id="f-book" className="field" value={form.bookingNote} onChange={set('bookingNote')} placeholder="10% of 18% GST" />
                </div>
              </div>
              <div>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={form.showShare}
                    onChange={(e) => setForm((f) => ({ ...f, showShare: e.target.checked }))}
                  />
                  Show the share calculator on the property page
                </label>
              </div>

              <h3 className="h3" style={{ marginTop: 8 }}>Fractions</h3>
              <p className="tiny">Empty for sold-out properties. Fractions are removed when the status is sold out.</p>
              {fractions.map((f, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, alignItems: 'end' }}>
                  <div>
                    <label className="field-label">Label</label>
                    <input
                      className="field" value={f.label} placeholder="1/12"
                      onChange={(e) => setFractions((prev) => prev.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                    />
                  </div>
                  <div>
                    <label className="field-label">Price (Rs)</label>
                    <input
                      className="field" inputMode="numeric" value={f.price} placeholder="6500000"
                      onChange={(e) => setFractions((prev) => prev.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))}
                    />
                  </div>
                  <div>
                    <label className="field-label">Units</label>
                    <input
                      className="field" inputMode="numeric" value={f.units}
                      onChange={(e) => setFractions((prev) => prev.map((x, j) => (j === i ? { ...x, units: e.target.value } : x)))}
                    />
                  </div>
                  <button
                    type="button" className="btn btn--sm btn--light"
                    onClick={() => setFractions((prev) => prev.filter((_, j) => j !== i))}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div>
                <button
                  type="button" className="btn btn--sm btn--light"
                  onClick={() => setFractions((prev) => [...prev, { label: '', price: '', units: '1' }])}
                >
                  Add fraction row
                </button>
              </div>

              <button className="btn" type="submit" disabled={saving} style={{ marginTop: 8 }}>
                {saving ? 'Saving…' : editing ? 'Save changes' : 'Add property'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
