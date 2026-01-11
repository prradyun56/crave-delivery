'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';

// Sleek 3D icons (Bike & Home)
const riderIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063823.png', 
  iconSize: [45, 45],
});

const houseIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png', 
  iconSize: [40, 40],
});

export default function DeliveryMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-full w-full bg-gray-100 animate-pulse" />;

  // 🇮🇳 INDIA COORDINATES (Connaught Place, New Delhi)
  const positionRestaurant = [28.6315, 77.2167] as [number, number]; // CP
  const positionHome = [28.6448, 77.216721] as [number, number];     // Nearby

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer 
        center={[28.635, 77.2167]} // Center the camera 
        zoom={14} 
        scrollWheelZoom={false} 
        zoomControl={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <Marker position={positionRestaurant} icon={riderIcon}>
          <Popup>Rider (Raju)</Popup>
        </Marker>

        <Marker position={positionHome} icon={houseIcon}>
          <Popup>You</Popup>
        </Marker>
      </MapContainer>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/40 via-transparent to-transparent z-[400]"></div>
    </div>
  );
}