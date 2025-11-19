import React, { useState } from 'react';

interface PaymentSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  onMakePayment: () => void;
  isProcessing: boolean;
  total: number;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  onMakePayment,
  isProcessing,
  total,
}) => {
  const [showQr, setShowQr] = useState(false);

  // ✅ Use Vite env variable (not process.env)
  const upiId = import.meta.env.VITE_UPI_ID || 'sirramsirram2004-1@okicici';

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: 'bi-smartphone',
      description: 'Pay using UPI apps',
    },
  ];

  // Dynamic UPI payment link
  const upiLink = `upi://pay?pa=${upiId}&pn=Sonachala&am=${total}&cu=INR`;

  // Detect if user is on a mobile device
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handlePaymentClick = (methodId: string) => {
    onPaymentMethodChange(methodId);

    if (isMobile) {
      // Directly open UPI app on mobile
      window.location.href = upiLink;
    } else {
      // Show QR code popup on desktop
      setShowQr(true);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">Make Payment</h5>
      </div>

      <div className="card-body">
        <div className="mb-4">
          <label className="form-label fw-semibold">Select Payment Method</label>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="d-flex align-items-center gap-3 p-3 border rounded mb-2 cursor-pointer hover:bg-light"
              onClick={() => handlePaymentClick(method.id)}
            >
              <i className={`bi ${method.icon}`}></i>
              <div className="flex-grow-1">
                <div className="fw-medium">{method.name}</div>
                <small className="text-muted">{method.description}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-light p-3 rounded mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Total Amount</span>
            <span className="h4 text-primary">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-muted small text-center">
          Your payment information is safe and encrypted
        </p>

        {/* QR Code Popup (only desktop) */}
        <div
          className={`modal fade ${showQr ? 'show' : ''}`}
          style={{ display: showQr ? 'block' : 'none' }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Scan to Pay (UPI)</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowQr(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                {/* Placeholder for QR code */}
                <div className="bg-light p-4 rounded mb-3">
                  <p className="mb-0">QR Code Placeholder</p>
                  <small className="text-muted">
                    Install react-qr-code for actual QR
                  </small>
                </div>
                <p className="text-muted small">
                  Open your UPI app and scan this QR code to pay.
                </p>
                <div className="d-flex align-items-center gap-2 justify-content-center mb-3">
                  <span className="fw-semibold">{upiId}</span>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(upiId);
                      alert('UPI ID copied!');
                    }}
                  >
                    Copy UPI ID
                  </button>
                </div>
                <p className="text-primary small fw-semibold">
                  After payment, please upload your payment proof image in the
                  Guest Information section below.
                </p>
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setShowQr(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {showQr && (
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowQr(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PaymentSection;
