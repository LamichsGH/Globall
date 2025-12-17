import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Donate = () => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Thank you for your donation!');
    } else if (searchParams.get('canceled') === 'true') {
      toast.info('Donation was canceled.');
    }

    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({ duration: 800, once: true, offset: 100 });
    }
  }, [searchParams]);

  const handleDonate = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-donation', {
        body: { donationType },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scroll-assist">
      <Navigation />
      
      <div className="main-container">
        {/* Hero Section */}
        <section className="fullscreen image-bg">
          <div className="background-image-holder">
            <img alt="Support GLO-BALL" className="background-image" src="/globall1.jpg" />
          </div>
          <div className="container v-align-transform">
            <div className="row">
              <div className="col-sm-12 text-center" data-aos="fade-up">
                <h1 className="hero-support-text" data-aos="fade-up" data-aos-delay="100">
                  SUPPORT
                </h1>
                <div className="hero-logo-container" data-aos="fade-up" data-aos-delay="200">
                  <img src="/index.png" alt="GLO-BALL" className="hero-logo-main" />
                </div>
                <div className="hero-subheading" data-aos="fade-up" data-aos-delay="300">
                  <span className="one-ball-world">One Ball</span>
                  <span className="hero-separator">|</span>
                  <span className="one-ball-world">One World</span>
                </div>
                <p className="hero-tagline-text" data-aos="fade-up" data-aos-delay="400">
                  Help us bring joy through football
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="bg-primary pt120 pb120 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <h2 className="section-heading" data-aos="fade-up" data-aos-delay="100">
                  MAKE A DONATION
                </h2>
                <p className="lead mb48 mb-xs-32" data-aos="fade-up" data-aos-delay="200">
                  Your donation helps us provide footballs and equipment to children in underserved communities around the world.
                </p>

                {/* Donation Type Toggle */}
                <div className="donation-toggle mb40" data-aos="fade-up" data-aos-delay="300">
                  <button
                    className={`donate-type-btn ${donationType === 'one-time' ? 'active' : ''}`}
                    onClick={() => setDonationType('one-time')}
                  >
                    One-Time
                  </button>
                  <button
                    className={`donate-type-btn ${donationType === 'monthly' ? 'active' : ''}`}
                    onClick={() => setDonationType('monthly')}
                  >
                    Monthly
                  </button>
                </div>

                {donationType === 'monthly' && (
                  <p className="monthly-note mb24" data-aos="fade-in">
                    ★ Monthly donors help us plan for the future
                  </p>
                )}

                {/* Test Amount Display */}
                <div className="donation-amount-display mb40" data-aos="fade-up" data-aos-delay="400">
                  <span className="amount-label">Test Mode</span>
                  <span className="amount-value">30p</span>
                  <span className="amount-type">{donationType === 'monthly' ? 'per month' : 'one-time'}</span>
                </div>

                {/* Donate Button */}
                <button
                  className="btn btn-lg donate-btn"
                  onClick={handleDonate}
                  disabled={isLoading}
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  {isLoading ? 'Processing...' : `Donate 30p${donationType === 'monthly' ? '/month' : ''}`}
                </button>

                <p className="secure-note mt32" data-aos="fade-up" data-aos-delay="600">
                  Secure payment powered by Stripe. Cancel monthly donations anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="image-bg parallax pt180 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Impact" className="background-image" src="/globall2.jpg" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h2 className="section-heading" data-aos="fade-up" data-aos-delay="100">
                  YOUR IMPACT
                </h2>
              </div>
            </div>
            <div className="row mt64">
              <div className="col-sm-4 text-center mb-xs-32" data-aos="fade-up" data-aos-delay="200">
                <div className="impact-card">
                  <span className="impact-amount">£10</span>
                  <p className="impact-desc">Provides a football to a community</p>
                </div>
              </div>
              <div className="col-sm-4 text-center mb-xs-32" data-aos="fade-up" data-aos-delay="300">
                <div className="impact-card">
                  <span className="impact-amount">£25</span>
                  <p className="impact-desc">Equips a team with basic gear</p>
                </div>
              </div>
              <div className="col-sm-4 text-center" data-aos="fade-up" data-aos-delay="400">
                <div className="impact-card">
                  <span className="impact-amount">£100</span>
                  <p className="impact-desc">Sponsors a community football program</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Follow Us Section */}
        <section className="image-bg parallax pt180 pb180 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Follow Us" className="background-image" src="/glo3.jpg" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                <h2 className="section-heading mb48" data-aos="fade-up" data-aos-delay="100">
                  FOLLOW US
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <a 
                    href="https://www.instagram.com/globalluk/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="follow-link"
                    data-aos="fade-up" 
                    data-aos-delay="200"
                  >
                    <img src="/index.png" alt="GLO-BALL" className="follow-logo" />
                    <span className="follow-plus">+</span>
                    <img src="/insta.png" alt="Instagram" className="follow-insta" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        /* Hero Section - Stacked Layout */
        .hero-support-text {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 12px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .hero-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 28px;
        }
        
        .hero-logo-main {
          height: 100px;
          max-width: 320px;
          object-fit: contain;
          filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.4));
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        
        .hero-logo-main:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 6px 30px rgba(0, 0, 0, 0.5));
        }
        
        .hero-subheading {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .one-ball-world {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 4px;
          color: #fff;
          text-transform: uppercase;
        }
        
        .hero-separator {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
        }
        
        .hero-tagline-text {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 2px;
          margin: 0;
          text-transform: none;
        }
        
        /* Section Headings */
        .section-heading {
          font-size: 42px;
          font-weight: 700;
          letter-spacing: 6px;
          color: #fff;
          margin-bottom: 32px;
          text-transform: uppercase;
        }
        
        .section-logo {
          max-width: 60px;
          margin-bottom: 16px;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }
        
        /* Donation Toggle */
        .donation-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          padding: 6px;
          gap: 0;
        }
        
        .donate-type-btn {
          padding: 16px 40px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        
        .donate-type-btn:hover {
          color: #fff;
        }
        
        .donate-type-btn.active {
          background: #fff;
          color: #47b475;
        }
        
        .monthly-note {
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          font-style: italic;
        }
        
        /* Donation Amount Display */
        .donation-amount-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .amount-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(0, 0, 0, 0.15);
          padding: 6px 16px;
          border-radius: 4px;
        }
        
        .amount-value {
          font-size: 80px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        
        .amount-type {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        /* Donate Button */
        .donate-btn {
          background: #fff !important;
          color: #47b475 !important;
          border: none !important;
          padding: 20px 56px !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 3px !important;
          border-radius: 50px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .donate-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);
          background: #fff !important;
          color: #3a9660 !important;
        }
        
        .donate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .secure-note {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }
        
        /* Impact Cards */
        .mt64 {
          margin-top: 64px;
        }
        
        .impact-card {
          padding: 48px 24px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .impact-card:hover {
          background: rgba(0, 0, 0, 0.5);
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .impact-amount {
          display: block;
          font-size: 52px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1;
          font-style: italic;
        }
        
        .impact-desc {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          line-height: 1.5;
        }
        
        /* Follow Us Section */
        .follow-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .follow-link:hover {
          transform: scale(1.05);
        }
        
        .follow-logo {
          height: 40px;
        }
        
        .follow-plus {
          font-size: 28px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }
        
        .follow-insta {
          height: 44px;
          filter: brightness(0) invert(1);
        }
        
        /* Responsive */
        @media (max-width: 991px) {
          .hero-support-text {
            font-size: 20px;
            letter-spacing: 10px;
          }
          
          .hero-logo-main {
            height: 80px;
            max-width: 260px;
          }
          
          .one-ball-world {
            font-size: 16px;
            letter-spacing: 3px;
          }
          
          .section-heading {
            font-size: 32px;
            letter-spacing: 4px;
          }
        }
        
        @media (max-width: 767px) {
          .hero-support-text {
            font-size: 16px;
            letter-spacing: 8px;
            margin-bottom: 16px;
          }
          
          .hero-logo-main {
            height: 60px;
            max-width: 200px;
          }
          
          .hero-logo-container {
            margin-bottom: 20px;
          }
          
          .hero-subheading {
            gap: 10px;
            margin-bottom: 16px;
          }
          
          .one-ball-world {
            font-size: 14px;
            letter-spacing: 2px;
          }
          
          .hero-separator {
            font-size: 16px;
          }
          
          .hero-tagline-text {
            font-size: 14px;
            letter-spacing: 1px;
          }
          
          .section-heading {
            font-size: 24px;
            letter-spacing: 3px;
          }
          
          .donate-type-btn {
            padding: 12px 28px;
            font-size: 12px;
            letter-spacing: 1px;
          }
          
          .amount-value {
            font-size: 60px;
          }
          
          .donate-btn {
            padding: 16px 40px !important;
            font-size: 13px !important;
            letter-spacing: 2px !important;
          }
          
          .impact-amount {
            font-size: 40px;
          }
          
          .impact-card {
            padding: 32px 20px;
          }
          
          .mt64 {
            margin-top: 40px;
          }
          
          .follow-logo {
            height: 32px;
          }
          
          .follow-insta {
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default Donate;
