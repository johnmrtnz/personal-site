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

const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  tag = 'h1',
  className = '',
  displacement = 20,
  sigma = 100,
  splitBy = 'char',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [chars, setChars] = useState<Array<{ char: string; ref: React.RefObject<HTMLSpanElement> }>>([]);
  const animationRef = useRef<number>();

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

  // Animation loop
  useEffect(() => {
    // Gaussian displacement function (defined inside useEffect to avoid dependency issues)
    const gaussianDisplacement = (distance: number): number => {
      return displacement * Math.exp(-(distance * distance) / (2 * sigma * sigma));
    };

    const animate = () => {
      chars.forEach(({ ref }) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = centerX - mousePos.current.x;
        const dy = centerY - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < sigma * 3) {
          const displace = gaussianDisplacement(distance);
          const angle = Math.atan2(dy, dx);
          const translateX = Math.cos(angle) * displace;
          const translateY = Math.sin(angle) * displace;

          ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
          ref.current.style.transform = 'translate(0px, 0px)';
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (chars.length > 0) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [chars, displacement, sigma]);

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    mousePos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  // Touch handlers for mobile
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 0) return;
    mousePos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add event listeners to the entire viewport for smooth tracking
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Render the appropriate tag
  const Tag = tag;

  return (
    <div ref={containerRef} className="interactive-text-wrapper">
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
