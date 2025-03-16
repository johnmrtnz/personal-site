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
            <h2>Data Explorer</h2>
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
              As a first-generation Colombian American with a passion for data, I leverage my expertise in healthcare imaging and financial analytics to solve complex problems at Ernst & Young, where I currently manage forensic data investigations to uncover financial crimes and ensure pharmaceutical compliance. 
              </p>
              <p>
              My journey from developing brain imaging algorithms as a Biomedical Engineering researcher to optimizing fraud detection systems reflects my commitment to using data science for meaningful impact, combining my technical skills in Python, data visualization, and machine learning with my bilingual background to bring a unique perspective to every challenge.
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
              {/* <div className="timeline-dot"></div> */}
              <div className="timeline-content">
                <h3>Manager</h3>
                <h4>EY</h4>
                <h4>2024 - Present</h4>
                <p>
                At Ernst & Young, I currently lead cross-functional teams in forensic data analytics, driving investigations and platform optimization while delivering upskilling programs and presenting innovative machine learning applications in fraud detection to enhance client engagement and industry thought leadership.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              {/* <div className="timeline-dot"></div> */}
              <div className="timeline-content">
                <h3>Senior</h3>
                <h4>EY</h4>
                <h4>2021 - 2024</h4>
                <p>
                As a Senior in Forensics Data Analytics at Ernst & Young, I optimized project turnaround by 50% through implementation of advanced tools like Azure Data Factory and Databricks, while developing comprehensive media monitoring platforms to mitigate company risk by identifying potential red flags in publicly available data sources.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              {/* <div className="timeline-dot"></div> */}
              <div className="timeline-content">
                <h3>Quantitative Analyst</h3>
                <h4>Weber Shandwick</h4>
                <h4>2019 - 2021</h4>
                <p>
                As a Quantitative Business Analyst in Weber Shandwick's Global Intelligence team, I led client deliverables by translating stakeholder requirements into actionable analytics reports, reduced data processing time by 50% through text clustering and word vector analysis, implemented innovative search algorithms, collaborated on NLP sentiment modeling, and contributed to securing over $2.4M in new business through strategic analytics planning.
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
            <div className="education-institution">Stevens Institute of Technology</div>
            <div className="education-year">2014-2018</div>
            <h3>Masters of Engineering, Biomedical Engineering</h3>
            <h3>Bachelors of Engineering, Biomedical Engineering</h3>
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
