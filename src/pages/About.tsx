import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
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
        <section className="fullscreen image-bg">
          <div className="background-image-holder">
            <img alt="image" className="background-image" src="/globall1.jpg" />
          </div>
          <div className="container v-align-transform">
            <div className="row">
              <div className="col-sm-12 text-center" data-aos="fade-up">
                <img alt="Pic" src="/about.png" data-aos="fade-up" data-aos-delay="200" />
                <h5 className="large bold mb40 mb-xs-16">   </h5>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 text-left">
                <h2 className="large bold uppercase mb40 mb-xs-16" data-aos="fade-up" data-aos-delay="100">What is GLO&#8209;BALL</h2>
                <p className="lead">
                  Here at GLO-BALL, we believe in the magic of a single football, the power it has to bring joy, unite communities, and inspire hope. In the world's most deprived areas, where opportunities are scarce but dreams are limitless, we use football as a bridge to connect, uplift, and empower underprivileged children. With just one ball, we spark laughter, friendship, and a sense of belonging, proving that even the simplest things can create the biggest impact.
                </p>
                
                <h2 className="large bold uppercase mb40 mb-xs-16" data-aos="fade-up" data-aos-delay="200">How We Help</h2>
                <p className="lead">
                  Through football, we aim to break down barriers, foster friendships, and inspire children to believe in their potential. By providing access to the game, we create safe spaces where kids can play, grow, and develop essential life skills, regardless of their circumstances.
                </p>
                
                <h2 className="large bold uppercase mb40 mb-xs-16" data-aos="fade-up" data-aos-delay="300">Sponsor Us</h2>
                <p className="lead">
                  GLO-BALL offers organizations the opportunity to make a tangible social impact through the universal language of football. By becoming a sponsor, your brand will directly support programs that provide underprivileged children with access to football, safe community spaces, and initiatives that promote mental well-being. Sponsorship packages are tailored to align with your company's corporate social responsibility goals, while ensuring visibility and recognition for your contribution. Together, we can empower the next generation with one ball, one community, one future at a time.
                </p>
                
                <h2 className="large bold uppercase mb40 mb-xs-16" data-aos="fade-up" data-aos-delay="400">Get Involved</h2>
                <p className="lead">
                  Whether you're a coach, creative, mentor, or simply someone who believes in the unifying power of football, there's a place for you in our team. To get involved, simply complete our online application form or reach out to our partnerships team. From volunteering at events to serving as a community ambassador, you'll play a vital role in helping us deliver hope, unity, and opportunity to children around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="image-bg parallax pt240 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="image" className="background-image" src="/glo2.jpg" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <h1 className="large bold uppercase mb40 mb-xs-16">Follow Us</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-aos="fade-up" data-aos-delay="200">
                  <a href="https://www.instagram.com/globalluk/" target="_blank" rel="noopener noreferrer">
                    <img src="/insta.png" alt="Follow GLO-BALL on Instagram" style={{ height: '44px', filter: 'brightness(0) invert(1)' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;