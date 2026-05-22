// C:/Users/Amit/antigravity/gamesdealshub-next/src/components/CountdownTimer.tsx
'use client';
import { useState, useEffect } from 'react';

// Fix 11: Client component for live expiry countdown with urgency styling
export function CountdownTimer({ expiryDate }: { expiryDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const tick = () => {
      const diff = new Date(expiryDate).getTime() - Date.now();
      if (diff <= 0) { 
        setTimeLeft('Expired'); 
        setUrgent(true);
        return; 
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setUrgent(h < 6);
      setTimeLeft(h >= 24 ? `${Math.floor(h/24)}d ${h%24}h left` : `${h}h ${m}m left`);
    };
    
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [expiryDate]);

  if (!isClient) return <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Loading...</span>;

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
      urgent ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-orange-100 text-orange-600'
    }`}>
      ⏱ {timeLeft}
    </span>
  );
}
