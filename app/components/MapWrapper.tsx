'use client';

import dynamic from 'next/dynamic';

// We move the dynamic import HERE, inside a Client Component
const DeliveryMap = dynamic(() => import('./DeliveryMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 animate-pulse" />
});

export default function MapWrapper() {
  return <DeliveryMap />;
}