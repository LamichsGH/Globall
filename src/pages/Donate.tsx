import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import DonationForm from '../components/DonationForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Stripe publishable key (test mode)
const stripePromise = loadStripe('pk_live_51Sd5sMBsVocdQ65XgAy6Rp47xeTEiNdXs8oc75l4lqWxN71IWzTuhvrcm5PkAPQlvTwvCpDiQMjDQwkMC2PqMJW6005CqmLWHa');

const Donate = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('payment_intent')) {
      toast.success('Thank you for your donation!');
    }

    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({ duration: 800, once: true, offset: 100 });
    }
  }, [searchParams]);

  const handleStartDonation = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent');

      if (error) throw error;
      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowForm(true);
      }
    } catch (error) {
      console.error('Payment intent error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    toast.success('Thank you for your donation!');
    setShowForm(false);
    setClientSecret(null);
  };

  const handleError = (message: string) => {
    toast.error(message);
  };

  const stripeOptions = clientSecret ? {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#47b475',
        colorBackground: '#ffffff',
        colorText: '#333333',
        borderRadius: '8px',
      },
    },
  } : undefined;

  return (
    <div className="scroll-assist">
      <Navigation />
      
      <div className="main-container">
        {/* Hero Section */}
        <section className="fullscreen image-bg" data-aos="fade-up">
          <div className="background-image-holder">
            <img alt="Donate to GLO-BALL" className="background-image" src="/globall1.jpg" />
          </div>
          <div className="container v-align-transform">
            <div className="row">
              <div className="col-sm-12 text-center" data-aos="fade-up">
                <div className="donate-hero-content" data-aos="fade-up" data-aos-delay="200">
                  <h1 className="donate-hero-title">Donate</h1>
                  <img alt="GLO-BALL" src="/index.png" className="donate-hero-logo" />
                </div>
                <h5 className="mb20 mb-xs-16 large" data-aos="fade-up" data-aos-delay="300">
                  Help us bring joy through football to children around the world
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
                <h2 className="section-heading" data-aos="fade-up" data-aos-delay="100">
                  MAKE A DONATION
                </h2>
                <p className="lead mb48 mb-xs-32" data-aos="fade-up" data-aos-delay="200">
                  Your donation helps us provide footballs and equipment to children in underserved communities around the world.
                </p>

                {!showForm ? (
                  <>
                    {/* Donation Amount Display */}
                    <div className="donation-amount-display mb40" data-aos="fade-up" data-aos-delay="300">
                      <span className="amount-label">Test Mode</span>
                      <span className="amount-value">30p</span>
                      <span className="amount-type">one-time donation</span>
                    </div>

                    {/* Start Donation Button */}
                    <button
                      className="btn btn-lg donate-btn"
                      onClick={handleStartDonation}
                      disabled={isLoading}
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      {isLoading ? 'Loading...' : 'Donate Now'}
                    </button>
                  </>
                ) : (
                  <div className="payment-form-wrapper" data-aos="fade-up">
                    {clientSecret && stripeOptions && (
                      <Elements stripe={stripePromise} options={stripeOptions}>
                        <DonationForm onSuccess={handleSuccess} onError={handleError} />
                      </Elements>
                    )}
                    <button
                      className="btn-cancel mt24"
                      onClick={() => {
                        setShowForm(false);
                        setClientSecret(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <p className="secure-note mt32" data-aos="fade-up" data-aos-delay="500">
                  Secure payment powered by Stripe.
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
        /* Hero Section - Matching Contact/FAQs Style */
        .donate-hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .donate-hero-title {
          font-size: 120px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 8px;
          margin: 0 0 20px 0;
          line-height: 1;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .donate-hero-logo {
          max-width: 280px;
          height: auto;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .donate-hero-title {
            font-size: 60px;
            letter-spacing: 4px;
          }
          
          .donate-hero-logo {
            max-width: 200px;
          }
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
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: linear-gradient(135deg, #47b475 0%, #2d8a55 50%, #47b475 100%) !important;
          background-size: 200% 200% !important;
          color: #fff !important;
          border: none !important;
          padding: 22px 64px !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 4px !important;
          border-radius: 50px !important;
          transition: all 0.4s ease !important;
          box-shadow: 0 8px 30px rgba(71, 180, 117, 0.4), 0 0 0 0 rgba(71, 180, 117, 0.4);
          animation: btn-glow 2s ease-in-out infinite, gradient-shift 3s ease infinite;
          position: relative;
          overflow: hidden;
          text-align: center !important;
          line-height: 1 !important;
        }
        
        .donate-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .donate-btn:hover::before {
          left: 100%;
        }
        
        .donate-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 40px rgba(71, 180, 117, 0.5), 0 0 20px rgba(71, 180, 117, 0.3);
          background-position: right center !important;
        }
        
        .donate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          animation: none;
        }
        
        @keyframes btn-glow {
          0%, 100% {
            box-shadow: 0 8px 30px rgba(71, 180, 117, 0.4), 0 0 0 0 rgba(71, 180, 117, 0.4);
          }
          50% {
            box-shadow: 0 8px 30px rgba(71, 180, 117, 0.5), 0 0 20px rgba(71, 180, 117, 0.2);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .secure-note {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }
        
        /* Payment Form */
        .payment-form-wrapper {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .donation-form {
          background: #fff;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }
        
        .payment-element-container {
          margin-bottom: 24px;
          min-height: 200px;
        }
        
        .loading-text {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin-bottom: 16px;
        }
        
        .donation-form .donate-btn {
          width: 100%;
          margin-top: 8px;
        }
        
        .btn-cancel {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          cursor: pointer;
          text-decoration: underline;
          padding: 8px 16px;
        }
        
        .btn-cancel:hover {
          color: #fff;
        }
        
        .mt24 {
          margin-top: 24px;
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
            font-size: 13px;
            letter-spacing: 2px;
          }
          
          .hero-tagline-text {
            font-size: 14px;
          }
          
          .section-heading {
            font-size: 26px;
            letter-spacing: 3px;
          }
          
          .amount-value {
            font-size: 56px;
          }
          
          .impact-amount {
            font-size: 40px;
          }
          
          .donation-form {
            padding: 24px;
          }
          
          .payment-form-wrapper {
            padding: 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Donate;
