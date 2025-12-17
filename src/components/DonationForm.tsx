import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface DonationFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

const DonationForm = ({ onSuccess, onError }: DonationFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (error) {
      onError(error.message || 'Payment failed');
      setIsProcessing(false);
    } else {
      onSuccess();
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <div className="payment-element-container">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn btn-lg donate-btn"
      >
        {isProcessing ? 'Processing...' : 'Donate 30p'}
      </button>
    </form>
  );
};

export default DonationForm;
