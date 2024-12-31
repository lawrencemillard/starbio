import { useState, useEffect } from 'react';

export function useViewCounter() {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return viewCount;
}