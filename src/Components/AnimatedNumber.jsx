import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ value, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }

    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeOutQuad = (t) => t * (2 - t);
      const currentNumber = Math.floor(easeOutQuad(progress) * end);

      setDisplayValue(currentNumber);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString('uz-UZ')}</span>;
};

export default AnimatedNumber;
