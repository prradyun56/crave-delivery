'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StatusPoller() {
  const router = useRouter();

  useEffect(() => {
    // Set up an interval to refresh the page every 3 seconds
    const interval = setInterval(() => {
      router.refresh();
      console.log('Checking for status updates...');
    }, 3000);

    // Cleanup when leaving the page
    return () => clearInterval(interval);
  }, [router]);

  return null; // This component is invisible!
}