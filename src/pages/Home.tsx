import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
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
  }, []);

  return (
    <div className="scroll-assist">
      <Navigation />
      
      <div className="main-container">
        {/* Hero Section */}
        <section className="fullscreen image-bg">
          <div className="background-image-holder">
            <img alt="Globall" className="background-image" src="/index.jpg" />
          </div>
          <div className="container v-align-transform">
            <div className="row">
              <div className="col-sm-12 text-center" data-aos="fade-up">
                <img alt="Globall" src="/index.png" data-aos="fade-up" data-aos-delay="200" />
                <div className="hero-subheading" data-aos="fade-up" data-aos-delay="300">
                  <span className="one-ball-world">One Ball</span> <span className="hero-separator">|</span> <span className="one-ball-world">One World</span>
                </div>
                <h5 className="hero-tagline" data-aos="fade-up" data-aos-delay="400">
                  Helping children today, shaping brighter tomorrows.
                </h5>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="image-bg parallax pt240 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Mission" className="background-image" src="/globall1.jpg" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <h1 className="large bold uppercase mb50 mb-xs-16" data-aos="fade-up" data-aos-delay="100">MISSION</h1>
                <p className="lead mb48 mb-xs-32" data-aos="fade-up" data-aos-delay="200">
                  We travel to communities globally where children face extreme poverty, conflict, & social challenges, using football as a tool
                </p>
                <a className="btn-lg btn" href="/about" data-aos="fade-up" data-aos-delay="300">View More</a>
              </div>
            </div>
          </div>
        </section>

        {/* Donate Section */}
        <section className="image-bg parallax pt240 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Donate" className="background-image" src="/globall2.jpg" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <h1 className="large bold uppercase mb40 mb-xs-16" data-aos="fade-up" data-aos-delay="100">DONATE</h1>
                <p className="lead mb48 mb-xs-32" data-aos="fade-up" data-aos-delay="200">
                  To find out how to donate to GLO-BALL, contact us today
                </p>
                <a className="btn-lg btn" href="/contact" data-aos="fade-up" data-aos-delay="300">Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        {/* Follow Us Section */}
        <section className="image-bg parallax pt240 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Follow" className="background-image" src="/glo1.jpg" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <h1 className="large bold uppercase mb40 mb-xs-16" data-aos="fade-up" data-aos-delay="100">Follow Us</h1>
                <a href="https://www.instagram.com/globalluk/" target="_blank" data-aos="fade-up" data-aos-delay="200" rel="noopener noreferrer">
                  <img className="image-xs" alt="Instagram" src="/insta.png" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;