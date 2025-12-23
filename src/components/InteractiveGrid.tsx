// InteractiveGrid.tsx - Canvas-based interactive grid with Gaussian displacement
import React, { useRef, useEffect, useState } from 'react';
import './InteractiveGrid.css';

interface InteractiveGridProps {
  gridSpacing?: number;
  displacement?: number;
  sigma?: number;
  lineColor?: string;
  lineWidth?: number;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  gridSpacing = 40,
  displacement = 30,
  sigma = 100,
  lineColor = 'rgba(255, 255, 255, 0.3)',
  lineWidth = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          setDimensions({
            width: parent.clientWidth,
            height: parent.clientHeight,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    // Calculate grid points
    const cols = Math.ceil(dimensions.width / gridSpacing) + 1;
    const rows = Math.ceil(dimensions.height / gridSpacing) + 1;

    // Gaussian displacement function
    const gaussianDisplacement = (distance: number): number => {
      return displacement * Math.exp(-(distance * distance) / (2 * sigma * sigma));
    };

    // Calculate displaced position for a point
    const getDisplacedPosition = (x: number, y: number) => {
      const dx = x - mousePos.current.x;
      const dy = y - mousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < sigma * 3) {
        const displace = gaussianDisplacement(distance);
        const angle = Math.atan2(dy, dx);
        return {
          x: x + Math.cos(angle) * displace,
          y: y + Math.sin(angle) * displace,
        };
      }

      return { x, y };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          const x = i * gridSpacing;
          const y = j * gridSpacing;
          const displaced = getDisplacedPosition(x, y);

          if (j === 0) {
            ctx.moveTo(displaced.x, displaced.y);
          } else {
            ctx.lineTo(displaced.x, displaced.y);
          }
        }
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
          const x = i * gridSpacing;
          const y = j * gridSpacing;
          const displaced = getDisplacedPosition(x, y);

          if (i === 0) {
            ctx.moveTo(displaced.x, displaced.y);
          } else {
            ctx.lineTo(displaced.x, displaced.y);
          }
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, gridSpacing, displacement, sigma, lineColor, lineWidth]);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  // Touch handlers for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  };

  const handleTouchEnd = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  return (
    <canvas
      ref={canvasRef}
      className="interactive-grid"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default InteractiveGrid;
