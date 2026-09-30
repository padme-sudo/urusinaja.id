import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { isValidLatLng } from '../lib/validation';

export interface MapPoint {
  lat: number;
  lng: number;
}

/** Titik tengah default: Magelang. */
export const MAGELANG_CENTER: MapPoint = { lat: -7.4797, lng: 110.2177 };

const pinIcon = L.divIcon({
  className: 'ua-map-pin',
  html: '<span></span>',
  iconSize: [34, 34],
  iconAnchor: [17, 32],
});

function ClickCatcher({ onPick }: { onPick: (p: MapPoint) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function FlyTo({ point }: { point: MapPoint | null }) {
  const map = useMap();
  useEffect(() => {
    if (point) map.flyTo([point.lat, point.lng], Math.max(map.getZoom(), 15), { duration: 0.8 });
  }, [map, point]);
  return null;
}

interface MapPickerProps {
  point: MapPoint | null;
  onPick: (p: MapPoint) => void;
  height?: number;
}

/** Peta OpenStreetMap: klik/tap untuk menandai titik jemput. */
export function MapPicker({ point, onPick, height = 260 }: MapPickerProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div
        className="ua-map-loading"
        style={{ height }}
        aria-label="Memuat peta…"
      >
        Memuat peta…
      </div>
    );
  }

  return (
    <div className="ua-map" style={{ height }}>
      <MapContainer
        center={point ? [point.lat, point.lng] : [MAGELANG_CENTER.lat, MAGELANG_CENTER.lng]}
        zoom={point ? 15 : 13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickCatcher onPick={onPick} />
        <FlyTo point={point} />
        {point && (
          <Marker
            position={[point.lat, point.lng]}
            icon={pinIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const m = e.target as L.Marker;
                const ll = m.getLatLng();
                onPick({ lat: ll.lat, lng: ll.lng });
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}

/** Ubah koordinat jadi alamat via Nominatim (gratis). */
export async function reverseGeocode(p: MapPoint): Promise<string | null> {
  if (!isValidLatLng(p.lat, p.lng)) return null;
  try {
    const url =
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2` +
      `&lat=${encodeURIComponent(p.lat)}&lon=${encodeURIComponent(p.lng)}&accept-language=id&zoom=18`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    const addr = typeof data?.display_name === 'string' ? data.display_name : null;
    return addr ? addr.slice(0, 200) : null;
  } catch {
    return null;
  }
}

/** Link Google Maps untuk titik (dikirim ke admin/driver). */
export function mapsLink(p: MapPoint): string {
  return `https://www.google.com/maps?q=${p.lat.toFixed(6)},${p.lng.toFixed(6)}`;
}
