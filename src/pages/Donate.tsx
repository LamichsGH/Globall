import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const PRESET_AMOUNTS = [5, 10, 20];

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Thank you for your generous donation!');
    }
    if (searchParams.get('canceled') === 'true') {
      toast.info('Donation was canceled.');
    }

    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({ duration: 800, once: true, offset: 100 });
    }
  }, [searchParams]);

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers and single decimal point
    const sanitized = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setCustomAmount(sanitized);
    setSelectedAmount(null);
  };

  const getFinalAmount = (): number | null => {
    if (selectedAmount) return selectedAmount;
    const custom = parseFloat(customAmount);
    if (!isNaN(custom) && custom >= 1) return custom;
    return null;
  };

  const handleDonate = async () => {
    const amount = getFinalAmount();
    if (!amount) {
      toast.error('Please select or enter a donation amount (minimum £1)');
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-donation', {
        body: { amount }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Donation error:', error);
      }
      toast.error('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const finalAmount = getFinalAmount();

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

                {/* Amount Selection */}
                <div className="amount-selection" data-aos="fade-up" data-aos-delay="300">
                  <div className="preset-amounts">
                    {PRESET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        className={`amount-btn ${selectedAmount === amount ? 'selected' : ''}`}
                        onClick={() => handleSelectPreset(amount)}
                        disabled={isLoading}
                      >
                        £{amount}
                      </button>
                    ))}
                  </div>

                  <div className="custom-amount-wrapper">
                    <span className="currency-symbol">£</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="custom-amount-input"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Selected Amount Display */}
                {finalAmount && (
                  <div className="selected-amount-display" data-aos="fade-up">
                    <span className="amount-value">£{finalAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Donate Button */}
                <button
                  className="btn btn-lg donate-btn"
                  onClick={handleDonate}
                  disabled={isLoading || !finalAmount}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {isLoading ? 'Redirecting to payment...' : 'Donate Now'}
                </button>

                <p className="secure-note mt32" data-aos="fade-up" data-aos-delay="500">
                  Secure payment powered by Stripe.
                </p>
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-aos="fade-up" data-aos-delay="200">
                  <a 
                    href="https://www.instagram.com/globalluk/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img src="/insta.png" alt="Follow GLO-BALL on Instagram" style={{ height: '44px', filter: 'brightness(0) invert(1)' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        /* Hero Section */
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
        
        /* Amount Selection */
        .amount-selection {
          margin-bottom: 32px;
        }
        
        .preset-amounts {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        
        .amount-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 16px 32px;
          font-size: 24px;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 100px;
        }
        
        .amount-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }
        
        .amount-btn.selected {
          background: #fff;
          color: #47b475;
          border-color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .amount-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .custom-amount-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          max-width: 280px;
          margin: 0 auto;
        }
        
        .currency-symbol {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
        }
        
        .custom-amount-input {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 16px 20px;
          font-size: 20px;
          font-weight: 600;
          border-radius: 12px;
          width: 100%;
          text-align: center;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .custom-amount-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .custom-amount-input:focus {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.15);
        }
        
        .custom-amount-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Selected Amount Display */
        .selected-amount-display {
          margin-bottom: 24px;
        }
        
        .amount-value {
          font-size: 64px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
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
        
        .mt32 {
          margin-top: 32px;
        }
        
        /* Responsive */
        @media (max-width: 991px) {
          .section-heading {
            font-size: 32px;
            letter-spacing: 4px;
          }
          
          .amount-value {
            font-size: 48px;
          }
        }
        
        @media (max-width: 767px) {
          .preset-amounts {
            gap: 12px;
          }
          
          .amount-btn {
            padding: 14px 24px;
            font-size: 20px;
            min-width: 80px;
          }
          
          .amount-value {
            font-size: 40px;
          }
          
          .section-heading {
            font-size: 24px;
            letter-spacing: 3px;
          }
        }
      `}</style>
    </div>
  );
};

export default Donate;
