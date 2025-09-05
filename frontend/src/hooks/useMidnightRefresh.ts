import { useEffect, useState } from 'react';

// Hook to trigger re-render at midnight to hide resolved complaints
export const useMidnightRefresh = () => {
  const [, setTrigger] = useState(0);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    // Calculate milliseconds until midnight
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      // Trigger re-render at midnight
      setTrigger(prev => prev + 1);
      
      // Set up interval to refresh every day at midnight
      const interval = setInterval(() => {
        setTrigger(prev => prev + 1);
      }, 24 * 60 * 60 * 1000); // 24 hours
      
      return () => clearInterval(interval);
    }, msUntilMidnight);
    
    return () => clearTimeout(timeout);
  }, []);
};
