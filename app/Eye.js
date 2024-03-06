import React, { useState, useEffect } from 'react';

const Eye = ({ id }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [transition, setTransition] = useState('0.4s ease-out');
  const [isBlinking, setIsBlinking] = useState(false);

  const updatePosition = (event) => {
    const eye = document.getElementById(id);
    const rect = eye.getBoundingClientRect();
    let x = ((event.clientX - rect.left) / rect.width) * 100;
    let y = ((event.clientY - rect.top) / rect.height) * 100;

    // Ensure the iris stays within the eye boundaries
    x = Math.min(Math.max(x, 20), 80);
    y = Math.min(Math.max(y, 20), 80);

    // Add delay to simulate reaction time
    setTimeout(() => {
      setPosition({ x, y });
    }, 200);
  };

  const blink = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 200);
  };

  useEffect(() => {
    window.addEventListener('mousemove', updatePosition);
    const blinkInterval = setInterval(() => blink(), 4000);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      id={id}
      style={{
        position: 'fixed',
        top: '10px',
        right: id === 'eye1' ? '80px' : '10px',
      }}
      className="w-16 h-8 bg-white rounded-full relative"
    >
      <div
        style={{
          position: 'absolute',
          top: `${position.y}%`,
          left: `${position.x}%`,
          transform: isBlinking ? 'translate(-50%, -30%) scale(1, 0.1)' : 'translate(-50%, -50%)',
          transition: isBlinking ? 'transform 0.2s linear' : transition,
        }}
        className="w-6 h-6 bg-blue-900 rounded-full relative"
      >
        {/* Add realistic pupil */}
        <div
          style={{
            width: '50%',
            height: '50%',
            background: 'black',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Add reflection */}
          <div
            style={{
              width: '30%',
              height: '30%',
              background: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Eye;
