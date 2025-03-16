// pages/Home.tsx
import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hello, I'm <span className="highlight">John</span></h1>
            <h2>Data Analyst</h2>
            <p>
              Welcome to my personal website!
            </p>
            <div className="hero-cta">
              <a href="#about" className="btn primary-btn">Learn More</a>
              <br></br>
              <a href="#experience" className="btn secondary-btn">See My Work</a>
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
              <div className="profile-image-placeholder"></div>
            </div>
            
            <div className="about-text">
              <p>
                [TBD]
              </p>
              <p>
                [TBD]
              </p>
              
              <div className="personal-info">
                <div className="info-item">
                  <span className="info-title">Name:</span>
                  <span className="info-value">John Martinez</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Email:</span>
                  <span className="info-value">your.email@example.com</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Location:</span>
                  <span className="info-value">Brooklyn, NY</span>
                </div>
              </div>
              
              <a href="/path/to/your/resume.pdf" download className="btn primary-btn">Download CV</a>
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
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2024 - Present</div>
              <div className="timeline-content">
                <h3>Manager</h3>
                <h4>EY</h4>
                <p>
                  EY
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2021 - 2024</div>
              <div className="timeline-content">
                <h3>Senior</h3>
                <h4>EY</h4>
                <p>
                  EY
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2019 - 2021</div>
              <div className="timeline-content">
                <h3>Quantitative Analyst</h3>
                <h4>Weber Shandwick</h4>
                <p>
                  Weber
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className='container'>
          <div className="section-title">
            <h2>Education <span className="highlight"></span></h2>
          </div>

          <div className="education-item">
            <div className="education-institution"> Stevens Institute of Technology</div>
            <div className="education-year">2014-2018</div>
            <div className="education-degree">Masters of Engineering, Biomedical Engineering</div>
            <div className="education-degree">Bachelors of Engineering, Biomedical Engineering</div>
            <ul>
              <li>Kurt Lab</li>
            </ul>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;
