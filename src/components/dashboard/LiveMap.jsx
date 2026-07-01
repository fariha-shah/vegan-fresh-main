// Fareeha client dashboard, cart, checkout system
import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Simulated route between the warehouse and the customer's address.
// Replace ROUTE with live GPS pings once Ayesh's Socket.io tracking is wired up
// (e.g. socket.on("rider:location", ({ lat, lng }) => ...)).
const ROUTE = [
  [33.6007, 73.0679],
  [33.6041, 73.0658],
  [33.6078, 73.0631],
  [33.6112, 73.0602],
  [33.6149, 73.0571],
  [33.6183, 73.0541],
  [33.6212, 73.0511],
  [33.6231, 73.0489],
];

// Small colored pin built from a div instead of Leaflet's default marker images,
// so we don't have to fight Vite's asset bundling for marker-icon.png.
const createDivIcon = (bg, emoji, pulse = false) =>
  L.divIcon({
    className: '',
    html: `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;width:34px;height:34px;">
        ${
          pulse
            ? `<span style="position:absolute;width:34px;height:34px;border-radius:50%;background:${bg};opacity:0.3;animation:vf-pulse 1.6s ease-out infinite;"></span>`
            : ''
        }
        <div style="position:relative;width:28px;height:28px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white;">
          ${emoji}
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

const warehouseIcon = createDivIcon('#2C3E50', '🏬');
const destinationIcon = createDivIcon('#E53935', '🏠');
const riderIcon = createDivIcon('#2E7D32', '🛵', true);

// Fits the map view to the full route on first render.
function FitToRoute({ points }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(points, { padding: [36, 36] });
  }, [points, map]);
  return null;
}

export default function LiveMap({ active = true, height = 260 }) {
  const [stepIndex, setStepIndex] = useState(0);

  // Advances the rider one route point at a time, mimicking a live GPS feed.
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setStepIndex((i) => (i < ROUTE.length - 1 ? i + 1 : i));
    }, 2200);
    return () => clearInterval(interval);
  }, [active]);

  const riderPosition = ROUTE[stepIndex];
  const traveled = ROUTE.slice(0, stepIndex + 1);
  const remaining = ROUTE.slice(stepIndex);

  return (
    <div
      className="relative w-full overflow-hidden rounded-card"
      style={{ height }}
    >
      <style>{`
        @keyframes vf-pulse {
          0% { transform: scale(0.6); opacity: 0.4; }
          100% { transform: scale(2); opacity: 0; }
        }
        .leaflet-container { font-family: 'Inter', sans-serif; }
      `}</style>

      <MapContainer
        center={ROUTE[0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToRoute points={ROUTE} />

        {/* Remaining path, dashed + light green */}
        <Polyline
          positions={remaining}
          pathOptions={{ color: '#A5D6A7', weight: 4, dashArray: '6 8' }}
        />
        {/* Traveled path, solid + brand green */}
        <Polyline
          positions={traveled}
          pathOptions={{ color: '#2E7D32', weight: 4 }}
        />

        <Marker position={ROUTE[0]} icon={warehouseIcon} />
        <Marker position={ROUTE[ROUTE.length - 1]} icon={destinationIcon} />
        <Marker position={riderPosition} icon={riderIcon} />
      </MapContainer>
    </div>
  );
}
