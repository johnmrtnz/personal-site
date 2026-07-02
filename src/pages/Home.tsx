// pages/Home.tsx
import React, { useState, useEffect } from 'react';
import InteractiveGrid from '../components/InteractiveGrid';
import InteractiveText from '../components/InteractiveText';
import './Home.css';

const Home: React.FC = () => {
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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <InteractiveGrid
          gridSpacing={isMobile ? 30 : 20}
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
              <a href="#about"><img src="icons/caret-circle-double-down.svg" alt="Down Arrow" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-title">
            <h2>About <span className="highlight">Me</span></h2>
          </div>
          
          <div className="about-content">
            <div className="about-image">
              {/* You can add your profile image here */}
              <div className="profile-image-placeholder">
                <img src="images/headshot.jpeg" alt="Headshot" />
              </div>
            </div>
            
            <div className="about-text">
              <p>
              As a first-generation Colombian American with a passion for data, I leverage my expertise in healthcare imaging and financial analytics to solve complex problems at Ernst & Young, where I currently manage forensic data investigations to uncover financial crimes and ensure pharmaceutical compliance. 
              </p>
              <p>
              My journey from developing brain imaging algorithms as a Biomedical Engineering researcher to optimizing fraud detection systems reflects my commitment to using data science for meaningful impact, combining my technical skills in Python, data visualization, and machine learning with my bilingual background to bring a unique perspective to every challenge.
              </p>

              <div className='button-container'>
                <a className="btn" href="https://www.linkedin.com/in/johnmartinez526/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="btn" href="https://github.com/johnmrtnz" target="_blank" rel="noopener noreferrer">Github</a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section" id="experience">
        <div className="container">
          <div className="section-title">
            <h2>Work <span className="highlight">Experience</span></h2>
          </div>
          
          <div className="timeline">
            <div className="company-group">
              
              <div className="company-logo">
                <img src="images/EY_logo_2019.svg" alt="EY Logo" />
              </div>

              
              <div className="positions-list">
                <div className="position-item">
                  <div className="position-header">
                    <h3>Manager, Forensics Data Analytics</h3>
                    <span className="position-duration">2024 - Present</span>
                  </div>
                  <p>I build and evaluate AI systems for risk and compliance, from LLM bias testing for a global social media platform to EY's ML-powered risk monitoring platform, Forensics.AI.</p>
                </div>
                
                <div className="position-item">
                  <div className="position-header">
                    <h3>Senior Consultant, Forensics Data Analytics</h3>
                    <span className="position-duration">2021 - 2024</span>
                  </div>
                  <p>Lead data scientist on Forensics.AI, training ML models for adverse media detection and building the Azure pipelines that fed them.</p>
                </div>
              </div>
            </div>

            <div className="company-group">
              
              <div className="company-logo">
                <img src="images/weber_shandwick_logo.png" alt="Weber Shandwick Logo" />
              </div>

              
              <div className="positions-list">
                <div className="position-item">
                  <div className="position-header">
                    <h3>Quantitative Business Analyst</h3>
                    <span className="position-duration">2019 - 2021</span>
                  </div>
                  <p>Turned 1TB+ of social media and news data into analytics that sharpened campaign targeting for global brands.</p>

                </div>
                
              </div>
            </div>
            
            

          </div>
        </div>

        {/* Education Section */}
        <div className='container'>
          <div className="section-title">
            <h2>Education <span className="highlight"></span></h2>
          </div>

          <div className="company-group">
              
              <div className="company-logo">
                <img src="images/Stevens_Institute_of_Technology_Logo_2022.png" alt="Stevens Logo" />
              </div>

              
              <div className="positions-list">
                <div className="position-item">
                  <div className="position-header">
                    <h3>Masters of Engineering, Biomedical Engineering</h3>
                    <h3>Bachelors of Engineering, Biomedical Engineering</h3>
                    <span className="position-duration">2014 - 2018</span>
                  </div>
                  <p>• Master's Thesis: Amplified Flow Imaging (aFlow): Uncovering hidden motions between cerebral hemodynamics and brain motion</p>
                  <p>• Published as co-first author journal of <a href="https://ieeexplore.ieee.org/document/9153022" target="_blank" rel="noopener noreferrer">IEEE Transaction on Medical Imaging</a> </p>
                  <p>• NSF Vizzies <a href="https://www.popsci.com/vizzies-winners-2018/" target="_blank" rel="noopener noreferrer">Best Scientific Visualization Award of 2018</a> </p>
                </div>
                
              </div>
            </div>

        </div>

      </section>

    </div>
  );
};

export default Home;
