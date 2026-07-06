// InteractiveText.tsx - Text with Gaussian displacement effect
import React, { useRef, useEffect, useState } from 'react';
import './InteractiveText.css';

interface InteractiveTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  displacement?: number;
  sigma?: number;
  splitBy?: 'char' | 'word';
}

const EASE = 0.18; // how quickly characters chase their target displacement

const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  tag = 'h1',
  className = '',
  displacement = 20,
  sigma = 100,
  splitBy = 'char',
}) => {
  const mousePos = useRef({ x: -10000, y: -10000 });
  const [chars, setChars] = useState<Array<{ char: string; ref: React.RefObject<HTMLSpanElement> }>>([]);

  // Split text into characters or words
  useEffect(() => {
    const elements = splitBy === 'char'
      ? text.split('').map(char => ({
          char: char === ' ' ? '\u00A0' : char, // Non-breaking space for proper spacing
          ref: React.createRef<HTMLSpanElement>()
        }))
      : text.split(' ').map(word => ({
          char: word,
          ref: React.createRef<HTMLSpanElement>()
        }));

    setChars(elements);
  }, [text, splitBy]);

  // Animation loop with easing; stops when every character is at rest and
  // restarts on the next pointer event.
  useEffect(() => {
    if (chars.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const twoSigmaSq = 2 * sigma * sigma;
    const cutoffSq = sigma * sigma * 9;
    const offsets = chars.map(() => ({ x: 0, y: 0 }));

    let animationId = 0;
    let running = false;

    const animate = () => {
      let active = false;

      chars.forEach(({ ref }, i) => {
        const el = ref.current;
        if (!el) return;

        // getBoundingClientRect includes the current transform, so subtract
        // the applied offset to recover the character's resting center.
        const rect = el.getBoundingClientRect();
        const baseX = rect.left + rect.width / 2 - offsets[i].x;
        const baseY = rect.top + rect.height / 2 - offsets[i].y;

        const dx = baseX - mousePos.current.x;
        const dy = baseY - mousePos.current.y;
        const distSq = dx * dx + dy * dy;

        let tx = 0;
        let ty = 0;
        if (distSq < cutoffSq) {
          const dist = Math.sqrt(distSq) || 1;
          const displace = displacement * Math.exp(-distSq / twoSigmaSq);
          tx = (dx / dist) * displace;
          ty = (dy / dist) * displace;
        }

        offsets[i].x += (tx - offsets[i].x) * EASE;
        offsets[i].y += (ty - offsets[i].y) * EASE;

        if (Math.abs(offsets[i].x) > 0.05 || Math.abs(offsets[i].y) > 0.05 || tx !== 0 || ty !== 0) {
          active = true;
        }

        el.style.transform = `translate(${offsets[i].x}px, ${offsets[i].y}px)`;
      });

      if (active && running) {
        animationId = requestAnimationFrame(animate);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        animationId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      start();
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -10000, y: -10000 };
      start();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      start();
    };

    const handleTouchEnd = () => {
      mousePos.current = { x: -10000, y: -10000 };
      start();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    start();

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [chars, displacement, sigma]);

  // Render the appropriate tag
  const Tag = tag;

  return (
    <div className="interactive-text-wrapper">
      <Tag className={`interactive-text ${className}`}>
        {chars.map((item, index) => (
          <span
            key={index}
            ref={item.ref}
            className="interactive-char"
            style={{ display: 'inline-block' }}
          >
            {item.char}
            {splitBy === 'word' && index < chars.length - 1 && '\u00A0'}
          </span>
        ))}
      </Tag>
    </div>
  );
};

export default InteractiveText;
