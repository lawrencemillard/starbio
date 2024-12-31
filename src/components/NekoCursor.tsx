import React, { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

const NekoCursor: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-50 transition-transform duration-100"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${isMoving ? 'scale(0.9)' : 'scale(1)'}`,
      }}
    >
      <div className="relative">
        <span className="text-2xl select-none">🐱</span>
        <div className={`
          absolute -bottom-1 left-1/2 -translate-x-1/2
          w-4 h-1 bg-black/10 rounded-full blur-[2px]
          transform transition-transform duration-100
          ${isMoving ? 'scale-75' : 'scale-100'}
        `} />
      </div>
    </div>
  );
};

export default NekoCursor;