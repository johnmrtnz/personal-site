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
              <a href="#about"><img src="icons/caret-circle-double-down.svg" alt="Down Arrow" /></a>
              
              <br></br>
              {/* <a href="#experience" className="btn secondary-btn">See My Work</a> */}
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
              
              {/* <div className="personal-info">
                <div className="info-item">
                  <span className="info-title">Location:</span>
                  <span className="info-value">Brooklyn, NY</span>
                </div>
              </div> */}

              <div className='button-container'>
                <a className="btn" href="https://www.linkedin.com/in/johnmartinez526/" target="_blank" rel="noopener">LinkedIn</a>
                <a className="btn" href="https://github.com/johnmrtnz" target="_blank" rel="noopener">Github</a>
                {/* <a className="btn" href="#experience" target="_blank" rel="noopener">Portfolio</a> */}
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
                  <ul className="formatted-list">
                    <li>Leading product strategy and cross-functional teams to deliver AI-driven compliance platforms that have generated $2M+ in new client work</li>
                    <li>Established comprehensive product vision, roadmaps, and KPIs while applying customer-centric design principles that improved user adoption by 55%</li> 
                    <li>Built and scaled analytics teams of 8+ data scientists and engineers across 4 global offices, achieving 95%+ retention through mentoring and performance management. Collaborated with engineering teams on database architecture and technical specifications to optimize query performance for real-time data processing</li>
                    <li>Implemented data governance frameworks and generative AI solutions, including chatbots for SQL database interactions</li>
                    <li>Regularly present analytical insights and product demos to C-suite executives, translating complex data into actionable business intelligence</li>
                  </ul>
                </div>
                
                <div className="position-item">
                  <div className="position-header">
                    <h3>Senior Consultant, Forensics Data Analytics</h3>
                    <span className="position-duration">2021 - 2024</span>
                  </div>
                  <ul className="formatted-list">
                    <li>Executed product strategy for NLP-powered risk analytics dashboard, delivering 40% faster compliance risk identification and enabling data driven decisions saving clients $3M+"</li>
                    <li>Pioneered Generative AI adoption by designing and deploying GPT-powered policy chatbot, conducting user pilots that improved accessibility by 35% and presented findings at industry conferences</li>
                    <li>Developed machine learning models through human-in-the-loop processes, iteratively training models with stakeholder-tagged data to achieve optimal accuracy</li>
                  </ul>
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
                  <ul className="formatted-list">
                    <li>Managed client deliverables through project lifecycle, translating stakeholder requirements into analytics reports that improved marketing strategy while reducing data processing time by 50% through text vectorization and clustering techniques in Python</li>
                    <li>Designed analytics platform to process and visualize large-scale data sets (1TB+), creating dashboards that enabled strategic data driven decision making and measurable ROI for client campaigns</li>
                    <li>Developed multi-platform social media analytics processing data from Twitter, Instagram, Facebook, Reddit, and 100+ news outlets, creating influencer identification algorithms that improved client campaign targeting accuracy by 45% and generated $2.4M+ in new business through data driven marketing strategies</li>
                  </ul>
                      
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
                  <p>• Published as co-first author journal of <a href="https://ieeexplore.ieee.org/document/9153022" target="_blank" rel="noopener">IEEE Transaction on Medical Imaging</a> </p>
                  <p>• NSF Vizzies <a href="https://www.popsci.com/vizzies-winners-2018/" target="_blank" rel="noopener">Best Scientific Visualization Award of 2018</a> </p>
                </div>
                
              </div>
            </div>

          

          {/* <div className="education-item">
            <div className="education-institution">Stevens Institute of Technology</div>
            <div className="education-year">2014-2018</div>
            <h3>Masters of Engineering, Biomedical Engineering</h3>
            <h3>Bachelors of Engineering, Biomedical Engineering</h3>
            <ul>
              <li>Kurt Lab</li>
            </ul>
          </div> */}

        </div>

      </section>

    </div>
  );
};

export default Home;
