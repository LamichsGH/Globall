import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const SUGGESTED_AMOUNTS = [10, 25, 50, 100];

const Donate = () => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount || 0;
  };

  const handleDonate = async () => {
    const amount = getFinalAmount();
    if (amount < 1) {
      alert('Please enter a valid amount (minimum £1)');
      return;
    }

    setIsLoading(true);
    
    try {
      // For now, redirect to contact page with donation intent
      // This will be replaced with Stripe checkout once products are created
      const message = `I would like to make a ${donationType} donation of £${amount}`;
      window.location.href = `/contact?donation=${encodeURIComponent(message)}`;
    } catch (error) {
      console.error('Donation error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <Navigation />
      
      {/* Hero Section */}
      <section className="page-title page-title-4 image-bg overlay parallax">
        <div 
          className="background-image-holder"
          style={{ 
            backgroundImage: 'url(/globall1.jpg)',
            transform: 'translate3d(0px, 0px, 0px)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 1
          }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="uppercase mb8">Support GLO-BALL</h2>
              <p className="lead mb0">Help us bring joy through football</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="pt120 pb120 bg-secondary">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="donation-card bg-white p48 border-radius">
                <h3 className="uppercase mb24 text-center">Make a Donation</h3>
                <p className="text-center mb40">
                  Your donation helps us provide footballs and equipment to children in underserved communities around the world.
                </p>

                {/* Donation Type Toggle */}
                <div className="donation-type-toggle mb32">
                  <div className="btn-group-toggle">
                    <button
                      className={`btn ${donationType === 'one-time' ? 'btn-filled' : 'btn-outline'}`}
                      onClick={() => setDonationType('one-time')}
                      style={{ marginRight: '8px' }}
                    >
                      One-Time
                    </button>
                    <button
                      className={`btn ${donationType === 'monthly' ? 'btn-filled' : 'btn-outline'}`}
                      onClick={() => setDonationType('monthly')}
                    >
                      Monthly
                    </button>
                  </div>
                  {donationType === 'monthly' && (
                    <p className="text-sm mt8 color-primary">
                      ★ Monthly donors help us plan for the future
                    </p>
                  )}
                </div>

                {/* Suggested Amounts */}
                <div className="amount-grid mb24">
                  {SUGGESTED_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      className={`amount-btn ${selectedAmount === amount ? 'selected' : ''}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      £{amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="custom-amount mb32">
                  <label className="mb8 block">Or enter a custom amount:</label>
                  <div className="input-with-prefix">
                    <span className="prefix">£</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="form-control custom-amount-input"
                    />
                  </div>
                </div>

                {/* Donation Summary */}
                <div className="donation-summary mb32 p24 bg-secondary border-radius">
                  <p className="mb0">
                    <strong>Your {donationType === 'monthly' ? 'monthly' : ''} donation:</strong>{' '}
                    <span className="text-lg">£{getFinalAmount()}</span>
                    {donationType === 'monthly' && <span className="text-sm"> /month</span>}
                  </p>
                </div>

                {/* Donate Button */}
                <button
                  className="btn btn-lg btn-filled btn-block"
                  onClick={handleDonate}
                  disabled={isLoading || getFinalAmount() < 1}
                >
                  {isLoading ? 'Processing...' : `Donate £${getFinalAmount()}${donationType === 'monthly' ? '/month' : ''}`}
                </button>

                <p className="text-center text-sm mt24 color-muted">
                  Secure payment powered by Stripe. You can cancel monthly donations at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="pt80 pb80">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center mb-xs-32">
              <h1 className="large color-primary mb8">£10</h1>
              <p>Provides a football to a community</p>
            </div>
            <div className="col-md-4 text-center mb-xs-32">
              <h1 className="large color-primary mb8">£25</h1>
              <p>Equips a team with basic gear</p>
            </div>
            <div className="col-md-4 text-center">
              <h1 className="large color-primary mb8">£100</h1>
              <p>Sponsors a community football program</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .donation-card {
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .donation-type-toggle {
          text-align: center;
        }
        .btn-group-toggle {
          display: inline-flex;
        }
        .amount-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .amount-btn {
          padding: 16px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .amount-btn:hover {
          border-color: #47b475;
        }
        .amount-btn.selected {
          background: #47b475;
          border-color: #47b475;
          color: white;
        }
        .input-with-prefix {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }
        .input-with-prefix .prefix {
          padding: 12px 16px;
          background: #f5f5f5;
          border-right: 1px solid #ddd;
          font-weight: 600;
        }
        .custom-amount-input {
          border: none !important;
          flex: 1;
        }
        .custom-amount-input:focus {
          outline: none;
          box-shadow: none;
        }
        .btn-block {
          width: 100%;
        }
        .btn-outline {
          background: transparent;
          border: 2px solid #47b475;
          color: #47b475;
        }
        .btn-outline:hover {
          background: #47b475;
          color: white;
        }
        .btn-filled {
          background: #47b475;
          border: 2px solid #47b475;
          color: white;
        }
        .color-muted {
          color: #888;
        }
        @media (max-width: 767px) {
          .amount-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Donate;
