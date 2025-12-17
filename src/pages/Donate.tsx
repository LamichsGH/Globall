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
                <h1 className="large bold uppercase mb16" data-aos="fade-up" data-aos-delay="100">
                  Support GLO-BALL
                </h1>
                <div className="hero-subheading" data-aos="fade-up" data-aos-delay="200">
                  <span className="one-ball-world">One Ball</span> <span className="hero-separator">|</span> <span className="one-ball-world">One World</span>
                </div>
                <h5 className="hero-tagline" data-aos="fade-up" data-aos-delay="300">
                  Help us bring joy through football
                </h5>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="bg-primary pt120 pb120 pt-xs-80 pb-xs-80" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <h2 className="large bold uppercase mb40 mb-xs-24" data-aos="fade-up" data-aos-delay="100">
                  Make a Donation
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
                  <p className="monthly-note mb32" data-aos="fade-in">
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
                <h2 className="large bold uppercase mb64 mb-xs-32" data-aos="fade-up" data-aos-delay="100">
                  Your Impact
                </h2>
              </div>
            </div>
            <div className="row">
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
                <h1 className="large bold uppercase mb40 mb-xs-16" data-aos="fade-up" data-aos-delay="100">Follow Us</h1>
                <a href="https://www.instagram.com/globalluk/" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="200">
                  <img className="image-xs" alt="Instagram" src="/insta.png" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        /* Donation Toggle */
        .donation-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 6px;
          gap: 4px;
        }
        
        .donate-type-btn {
          padding: 14px 32px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        
        .donate-type-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
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
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(0, 0, 0, 0.2);
          padding: 4px 12px;
          border-radius: 4px;
        }
        
        .amount-value {
          font-size: 72px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        
        .amount-type {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Donate Button */
        .donate-btn {
          background: #fff !important;
          color: #47b475 !important;
          border: none !important;
          padding: 18px 48px !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          border-radius: 50px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .donate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
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
          color: rgba(255, 255, 255, 0.6);
        }
        
        /* Impact Cards */
        .impact-card {
          padding: 40px 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .impact-card:hover {
          background: rgba(0, 0, 0, 0.4);
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .impact-amount {
          display: block;
          font-size: 48px;
          font-weight: 700;
          color: #8ed3ab;
          margin-bottom: 16px;
          line-height: 1;
        }
        
        .impact-desc {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.5;
        }
        
        /* Responsive */
        @media (max-width: 767px) {
          .donate-type-btn {
            padding: 12px 24px;
            font-size: 12px;
          }
          
          .amount-value {
            font-size: 56px;
          }
          
          .donate-btn {
            padding: 16px 36px !important;
            font-size: 14px !important;
          }
          
          .impact-amount {
            font-size: 36px;
          }
          
          .impact-card {
            padding: 30px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Donate;
