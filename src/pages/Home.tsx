import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    // Reinitialize all scripts when component mounts
    if (typeof window !== 'undefined') {
      // Initialize AOS
      if (window.AOS) {
        window.AOS.init({ duration: 800, once: true, offset: 100 });
      }
      
      // Reinitialize any parallax or background image scripts
      if (window.jQuery) {
        // Force refresh of background images and parallax
        window.jQuery(document).ready(() => {
          // Trigger any background image handlers
          window.jQuery('.background-image-holder').each(function() {
            const img = window.jQuery(this).find('.background-image');
            if (img.length) {
              const src = img.attr('src');
              if (src) {
                window.jQuery(this).css('background-image', 'url(' + src + ')');
              }
            }
          });
        });
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll-assist">
      <Navigation />
      
      <div className="main-container">
        {/* Hero Section */}
        <section className="fullscreen image-bg hero-enhanced">
          <div className="background-image-holder">
            <img alt="Globall" className="background-image" src="/index.jpg" />
          </div>
          <div className="hero-overlay"></div>
          <div className="container v-align-transform">
            <div className="row">
              <div className="col-sm-12 text-center" data-aos="fade-up">
                <img alt="Globall" src="/index.png" className="hero-logo" data-aos="fade-up" data-aos-delay="200" />
                <div className="hero-subheading" data-aos="fade-up" data-aos-delay="300">
                  <span className="one-ball-world">One Ball</span> <span className="hero-separator">|</span> <span className="one-ball-world">One World</span>
                </div>
                <h5 className="hero-tagline" data-aos="fade-up" data-aos-delay="400">
                  Helping children today, shaping brighter tomorrows.
                </h5>
                <div className="hero-cta" data-aos="fade-up" data-aos-delay="500">
                  <Link to="/donate" className="btn btn-lg btn-filled hero-btn">
                    Support Our Mission
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="scroll-indicator" onClick={scrollToContent}>
            <div className="scroll-text">Scroll</div>
            <div className="scroll-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="image-bg parallax section-enhanced pt240 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Mission" className="background-image" src="/globall1.jpg" />
          </div>
          <div className="section-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <div className="section-badge" data-aos="fade-up" data-aos-delay="50">
                  <span>Our Purpose</span>
                </div>
                <h1 className="large bold uppercase mb50 mb-xs-16 section-title" data-aos="fade-up" data-aos-delay="100">MISSION</h1>
                <p className="lead mb48 mb-xs-32 section-description" data-aos="fade-up" data-aos-delay="200">
                  We travel to communities globally where children face extreme poverty, conflict, & social challenges, using football as a tool to inspire hope and create lasting change.
                </p>
                <Link className="btn-lg btn btn-glow" to="/about" data-aos="fade-up" data-aos-delay="300">
                  <span>View More</span>
                  <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="stats-section bg-dark pt80 pb80" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center stat-item" data-aos="fade-up" data-aos-delay="100">
                <div className="stat-number">50+</div>
                <div className="stat-label">Communities Reached</div>
              </div>
              <div className="col-md-4 text-center stat-item" data-aos="fade-up" data-aos-delay="200">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Children Impacted</div>
              </div>
              <div className="col-md-4 text-center stat-item" data-aos="fade-up" data-aos-delay="300">
                <div className="stat-number">15+</div>
                <div className="stat-label">Countries Visited</div>
              </div>
            </div>
          </div>
        </section>

        {/* Donate Section */}
        <section className="image-bg parallax section-enhanced pt240 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Donate" className="background-image" src="/globall2.jpg" />
          </div>
          <div className="section-overlay section-overlay-green"></div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <div className="section-badge" data-aos="fade-up" data-aos-delay="50">
                  <span>Make a Difference</span>
                </div>
                <h1 className="large bold uppercase mb40 mb-xs-16 section-title" data-aos="fade-up" data-aos-delay="100">DONATE</h1>
                <p className="lead mb48 mb-xs-32 section-description" data-aos="fade-up" data-aos-delay="200">
                  Your contribution helps us provide footballs, equipment, and hope to children in underserved communities worldwide.
                </p>
                <Link className="btn-lg btn btn-glow" to="/donate" data-aos="fade-up" data-aos-delay="300">
                  <span>Donate Now</span>
                  <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Follow Us Section */}
        <section className="image-bg parallax section-enhanced pt240 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Follow" className="background-image" src="/glo1.jpg" />
          </div>
          <div className="section-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <div className="section-badge" data-aos="fade-up" data-aos-delay="50">
                  <span>Stay Connected</span>
                </div>
                <h1 className="large bold uppercase mb40 mb-xs-16 section-title" data-aos="fade-up" data-aos-delay="100">Follow Us</h1>
                <p className="lead mb48 mb-xs-32 section-description" data-aos="fade-up" data-aos-delay="150">
                  Join our community and follow our journey around the world.
                </p>
                <a 
                  href="https://www.instagram.com/globalluk/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link instagram-link"
                  data-aos="fade-up" 
                  data-aos-delay="200"
                >
                  <div className="social-icon-wrapper">
                    <img className="social-icon" alt="Instagram" src="/insta.png" />
                  </div>
                  <span className="social-handle">@globalluk</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        /* Hero Enhancements */
        .hero-enhanced {
          position: relative;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.1) 40%,
            rgba(0, 0, 0, 0.4) 100%
          );
          z-index: 1;
        }
        
        .hero-logo {
          max-width: 700px;
          width: 80%;
          filter: drop-shadow(0 4px 30px rgba(0, 0, 0, 0.3));
        }
        
        .hero-cta {
          margin-top: 40px;
        }
        
        .hero-btn {
          background: linear-gradient(135deg, #47b475 0%, #3a9660 100%);
          border: none;
          padding: 18px 48px;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 50px;
          box-shadow: 0 10px 40px rgba(71, 180, 117, 0.4);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(71, 180, 117, 0.5);
          background: linear-gradient(135deg, #52c482 0%, #47b475 100%);
        }
        
        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: float 2s ease-in-out infinite;
        }
        
        .scroll-text {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }
        
        .scroll-arrow {
          color: rgba(255, 255, 255, 0.8);
          animation: bounce 2s ease-in-out infinite;
        }
        
        .scroll-arrow svg {
          transform: rotate(180deg);
        }
        
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        
        /* Section Enhancements */
        .section-enhanced {
          position: relative;
        }
        
        .section-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(37, 56, 44, 0.85) 0%,
            rgba(37, 56, 44, 0.7) 100%
          );
          z-index: 1;
        }
        
        .section-overlay-green {
          background: linear-gradient(
            135deg,
            rgba(71, 180, 117, 0.85) 0%,
            rgba(37, 56, 44, 0.8) 100%
          );
        }
        
        .section-badge {
          margin-bottom: 20px;
        }
        
        .section-badge span {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .section-title {
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        
        .section-description {
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        /* Button Enhancements */
        .btn-glow {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.9);
          color: white;
          padding: 16px 36px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        
        .btn-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }
        
        .btn-glow:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .btn-glow:hover::before {
          left: 100%;
        }
        
        .btn-arrow {
          transition: transform 0.3s ease;
        }
        
        .btn-glow:hover .btn-arrow {
          transform: translateX(4px);
        }
        
        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #1a2a20 0%, #25382c 100%);
        }
        
        .stat-item {
          padding: 20px;
        }
        
        .stat-number {
          font-family: 'Raleway', sans-serif;
          font-size: 56px;
          font-weight: 700;
          color: #47b475;
          line-height: 1;
          margin-bottom: 10px;
        }
        
        .stat-label {
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }
        
        /* Social Links */
        .social-link {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          transition: all 0.4s ease;
        }
        
        .social-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
        }
        
        .social-icon {
          width: 40px;
          height: 40px;
          filter: brightness(0) invert(1);
          transition: transform 0.3s ease;
        }
        
        .social-handle {
          font-size: 14px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        
        .social-link:hover .social-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }
        
        .social-link:hover .social-icon {
          transform: scale(1.1);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-logo {
            max-width: 300px;
          }
          
          .hero-cta {
            margin-top: 30px;
          }
          
          .hero-btn {
            padding: 14px 32px;
            font-size: 12px;
          }
          
          .scroll-indicator {
            bottom: 20px;
          }
          
          .stat-number {
            font-size: 40px;
          }
          
          .stat-item {
            margin-bottom: 30px;
          }
          
          .btn-glow {
            padding: 14px 28px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
