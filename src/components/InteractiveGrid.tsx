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

const EASE = 0.15; // how quickly points chase their target displacement
const PULSE_DELAY = 2500; // ms of no input before the idle pulse fades in
const PULSE_STRENGTH = 0.6; // idle pulse amplitude relative to pointer amplitude

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  gridSpacing = 40,
  displacement = 30,
  sigma = 100,
  lineColor = 'rgba(255, 255, 255, 0.3)',
  lineWidth = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -10000, y: -10000 });
  const lastInput = useRef(-Infinity);
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
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

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

    // Current per-point offsets; each frame they ease toward the target
    // displacement so the grid behaves like an elastic sheet instead of
    // snapping to the kernel instantly.
    const offsets = new Float32Array(cols * rows * 2);

    const twoSigmaSq = 2 * sigma * sigma;
    const cutoffSq = sigma * sigma * 9; // ignore points beyond 3 sigma

    const drawGrid = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          const idx = (j * cols + i) * 2;
          const x = i * gridSpacing + offsets[idx];
          const y = j * gridSpacing + offsets[idx + 1];

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
          const idx = (j * cols + i) * 2;
          const x = i * gridSpacing + offsets[idx];
          const y = j * gridSpacing + offsets[idx + 1];

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Static grid, no animation loop or pointer tracking
      drawGrid();
      return;
    }

    let animationId = 0;
    let running = false;
    let pulseWeight = 0;

    const animate = (now: number) => {
      // The idle pulse drifts along a slow Lissajous path; it fades out while
      // the pointer is active and fades back in after PULSE_DELAY of stillness.
      const pulseTarget = now - lastInput.current > PULSE_DELAY ? 1 : 0;
      pulseWeight += (pulseTarget - pulseWeight) * 0.03;

      const kernels: Array<{ x: number; y: number; amp: number }> = [];
      if (mousePos.current.x > -5000) {
        kernels.push({ x: mousePos.current.x, y: mousePos.current.y, amp: displacement });
      }
      if (pulseWeight > 0.02) {
        kernels.push({
          x: dimensions.width * (0.5 + 0.38 * Math.sin(now * 0.00035)),
          y: dimensions.height * (0.5 + 0.34 * Math.sin(now * 0.00023 + 1.3)),
          amp: displacement * PULSE_STRENGTH * pulseWeight,
        });
      }

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * gridSpacing;
          const y = j * gridSpacing;
          let tx = 0;
          let ty = 0;

          for (const k of kernels) {
            const dx = x - k.x;
            const dy = y - k.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < cutoffSq) {
              const dist = Math.sqrt(distSq) || 1;
              const displace = k.amp * Math.exp(-distSq / twoSigmaSq);
              tx += (dx / dist) * displace;
              ty += (dy / dist) * displace;
            }
          }

          const idx = (j * cols + i) * 2;
          offsets[idx] += (tx - offsets[idx]) * EASE;
          offsets[idx + 1] += (ty - offsets[idx + 1]) * EASE;
        }
      }

      drawGrid();

      // Tint the lines near each kernel so the deformation carries a subtle
      // glow; source-atop only paints where line pixels already exist.
      ctx.globalCompositeOperation = 'source-atop';
      for (const k of kernels) {
        const strength = k.amp / displacement;
        if (strength < 0.05) continue;
        const gradient = ctx.createRadialGradient(k.x, k.y, 0, k.x, k.y, sigma * 2.5);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.85 * strength})`);
        gradient.addColorStop(0.4, `rgba(0, 180, 216, ${0.55 * strength})`);
        gradient.addColorStop(1, 'rgba(0, 180, 216, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }
      ctx.globalCompositeOperation = 'source-over';

      if (running) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        animationId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(animationId);
    };

    // Pause the loop entirely while the hero is scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
      } else {
        stop();
      }
    });
    observer.observe(canvas);

    // Track the pointer at the window level: the hero text sits above the
    // canvas (z-index 2), so canvas-level events would go dead over it.
    const toCanvas = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = toCanvas(e.clientX, e.clientY);
      lastInput.current = performance.now();
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -10000, y: -10000 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      mousePos.current = toCanvas(e.touches[0].clientX, e.touches[0].clientY);
      lastInput.current = performance.now();
    };

    const handleTouchEnd = () => {
      mousePos.current = { x: -10000, y: -10000 };
      lastInput.current = performance.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dimensions, gridSpacing, displacement, sigma, lineColor, lineWidth]);

  return <canvas ref={canvasRef} className="interactive-grid" />;
};

export default InteractiveGrid;
