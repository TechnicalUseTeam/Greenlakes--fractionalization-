import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// One shared Leaflet map for the property pages.
// - View mode: a static pin the visitor can pan around and click through
//   to Google Maps for directions.
// - Admin mode: a draggable pin plus a geocode search box; dropping the pin
//   or searching a location reports coordinates back to the form.
//
// Pin icon: inline SVG so no extra image assets are needed.

const pinIcon = L.divIcon({
  className: 'gl-pin',
  html: `<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
    <path d="M12 2C7.9 2 4.6 5.3 4.6 9.4c0 6.9 6.2 12.1 6.5 12.4.3.2.7.2 1-.1.3-.2 6.9-5.6 6.9-12.3C19 5.3 15.7 2 12 2Z" fill="#73826D"/>
    <circle cx="12" cy="9.4" r="3.4" fill="#FAF8F3"/>
  </svg>`,
  iconSize: [34, 34],
  iconAnchor: [17, 32],
});

export type LocationPickerValue = { lat: number; lng: number };

export function LocationMap({
  lat,
  lng,
  label,
  height = 280,
}: {
  lat: number;
  lng: number;
  label?: string;
  height?: number;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!holder.current || map.current) return;
    const m = L.map(holder.current, {
      center: [lat, lng],
      zoom: 13,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(m);
    const marker = L.marker([lat, lng], { icon: pinIcon, keyboard: false }).addTo(m);
    if (label) marker.bindTooltip(label, { direction: 'top', offset: [0, -30] });
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    map.current?.setView([lat, lng], map.current.getZoom());
  }, [lat, lng]);

  return (
    <div className="location-map" style={{ height }}>
      <div ref={holder} style={{ width: '100%', height: '100%' }} />
      <a
        className="location-map__link"
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
        target="_blank"
        rel="noreferrer"
      >
        View on Google Maps
      </a>
    </div>
  );
}

export function LocationPicker({
  lat,
  lng,
  onChange,
  height = 300,
}: {
  lat: number | null;
  lng: number | null;
  onChange: (v: LocationPickerValue) => void;
  height?: number;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const [query, setQuery] = useState('');
  const [geocoding, setGeocoding] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const initial: [number, number] =
    lat != null && lng != null ? [lat, lng] : [13.0436, 77.5751]; // Bengaluru fallback

  useEffect(() => {
    if (!holder.current || map.current) return;
    const m = L.map(holder.current, {
      center: initial,
      zoom: lat != null && lng != null ? 14 : 9,
      scrollWheelZoom: true,
      attributionControl: false,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(m);
    if (lat != null && lng != null) {
      marker.current = L.marker([lat, lng], { icon: pinIcon, draggable: true }).addTo(m);
      marker.current.on('dragend', () => {
        const p = marker.current!.getLatLng();
        onChange({ lat: +p.lat.toFixed(6), lng: +p.lng.toFixed(6) });
      });
    }
    m.on('click', (e: L.LeafletMouseEvent) => {
      const next = { lat: +e.latlng.lat.toFixed(6), lng: +e.latlng.lng.toFixed(6) };
      if (marker.current) {
        marker.current.setLatLng([next.lat, next.lng]);
      } else {
        marker.current = L.marker([next.lat, next.lng], { icon: pinIcon, draggable: true }).addTo(m);
        marker.current.on('dragend', () => {
          const p = marker.current!.getLatLng();
          onChange({ lat: +p.lat.toFixed(6), lng: +p.lng.toFixed(6) });
        });
      }
      onChange(next);
    });
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
      marker.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m || lat == null || lng == null) return;
    m.setView([lat, lng], Math.max(m.getZoom(), 14));
    if (marker.current) marker.current.setLatLng([lat, lng]);
  }, [lat, lng]);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setGeocoding(true);
    setGeoError(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query.trim())}`,
        { headers: { Accept: 'application/json' } },
      );
      const rows = (await res.json()) as { lat: string; lon: string; display_name: string }[];
      if (!rows || rows.length === 0) {
        setGeoError('No match found. Try a town or landmark.');
        return;
      }
      const next = { lat: +Number(rows[0].lat).toFixed(6), lng: +Number(rows[0].lon).toFixed(6) };
      const m = map.current;
      if (!m) return;
      m.setView([next.lat, next.lng], 15);
      if (marker.current) {
        marker.current.setLatLng([next.lat, next.lng]);
      } else {
        marker.current = L.marker([next.lat, next.lng], { icon: pinIcon, draggable: true }).addTo(m);
        marker.current.on('dragend', () => {
          const p = marker.current!.getLatLng();
          onChange({ lat: +p.lat.toFixed(6), lng: +p.lng.toFixed(6) });
        });
      }
      onChange(next);
    } catch {
      setGeoError('Location search failed. Check your connection and try again.');
    } finally {
      setGeocoding(false);
    }
  };

  const clear = () => {
    if (marker.current) {
      map.current?.removeLayer(marker.current);
      marker.current = null;
    }
    setQuery('');
    setGeoError(null);
    onChange({ lat: NaN, lng: NaN });
  };

  return (
    <div className="location-map location-map--edit" style={{ height }}>
      <form className="location-map__search" onSubmit={search}>
        <input
          type="text"
          className="field"
          placeholder="Search a location, e.g. Nandi Hills"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn--sm" type="submit" disabled={geocoding}>
          {geocoding ? 'Searching…' : 'Find'}
        </button>
        {lat != null && lng != null && !Number.isNaN(lat) && (
          <button type="button" className="btn btn--sm btn--light" onClick={clear}>
            Clear pin
          </button>
        )}
      </form>
      <div ref={holder} style={{ width: '100%', height: '100%' }} />
      <div className="location-map__hint">
        {lat != null && lng != null && !Number.isNaN(lat)
          ? `Pin set at ${lat.toFixed(4)}, ${lng.toFixed(4)}. Drag or tap the map to adjust.`
          : 'Tap the map to drop the pin.'}
      </div>
      {geoError && <div className="location-map__hint location-map__hint--error">{geoError}</div>}
    </div>
  );
}
