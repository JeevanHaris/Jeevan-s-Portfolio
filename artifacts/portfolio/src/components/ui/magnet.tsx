import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface MagnetProps {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
}

export default function Magnet({
  children,
  className = '',
  padding = 150,
  strength = 3,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      // Get current translation values to offset the bounding rect accurately
      const style = window.getComputedStyle(ref.current);
      const matrix = new DOMMatrixReadOnly(style.transform);
      
      const centerX = left - matrix.m41 + width / 2;
      const centerY = top - matrix.m42 + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const triggerDistance = Math.max(width, height) / 2 + padding;

      if (distance < triggerDistance) {
        setPosition({
          x: distanceX / strength,
          y: distanceY / strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  const isHovered = position.x !== 0 || position.y !== 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          : 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}