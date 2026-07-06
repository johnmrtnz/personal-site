// components/Hero.tsx - Hero section with interactive grid and text effects
import React, { useState, useEffect } from 'react';
import InteractiveGrid from './InteractiveGrid';
import InteractiveText from './InteractiveText';

interface HeroProps {
  base?: string;
}

const Hero: React.FC<HeroProps> = ({ base = '' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="hero-section" id="hero">
      <InteractiveGrid
        gridSpacing={isMobile ? 20 : 15}
        displacement={isMobile ? 12 : 20}
        sigma={100}
        lineColor="rgba(255, 255, 255, 0.4)"
        lineWidth={1.5}
      />
      <div className="container">
        <div className="hero-content">
          <InteractiveText
            text="Hello, I'm John"
            tag="h1"
            displacement={isMobile ? 8 : 15}
            sigma={isMobile ? 80 : 120}
            splitBy="char"
          />
          <InteractiveText
            text="Data Scientist"
            tag="h2"
            displacement={isMobile ? 6 : 12}
            sigma={isMobile ? 70 : 100}
            splitBy="char"
          />
          <p>
            Welcome to my personal website!
          </p>
          <div className="hero-cta">
            <a href="#about"><img src={`${base}/icons/caret-circle-double-down.svg`} alt="Down Arrow" /></a>
          </div>
        </div>
      </div>
      <div className="hero-caption" aria-hidden="true">gaussian displacement · σ = 100</div>
    </section>
  );
};

export default Hero;
