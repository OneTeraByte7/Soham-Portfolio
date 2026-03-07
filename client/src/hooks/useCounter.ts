import { useState, useEffect } from 'react';

export function useCounter(target: number, duration: number = 1.5, inView: boolean = true) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCurrentValue(0);
      return;
    }

    let start = 0;
    const increment = target / (duration * 60);

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        setCurrentValue(Math.round(start));
        requestAnimationFrame(updateCounter);
      } else {
        setCurrentValue(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [target, duration, inView]);

  return currentValue;
}
