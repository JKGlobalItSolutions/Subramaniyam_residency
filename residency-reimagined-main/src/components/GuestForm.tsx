import React from 'react';

type GuestInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
};

interface GuestFormProps {
  guestInfo: GuestInfo;
  onGuestInfoChange: (info: GuestInfo) => void;
  paymentProofFile: File | null;
  onPaymentProofChange: (file: File | null) => void;
}

const GuestForm: React.FC<GuestFormProps> = ({
  guestInfo,
  onGuestInfoChange,
  paymentProofFile,
  onPaymentProofChange,
}) => {
  const handleInputChange = (field: string, value: string) => {
    onGuestInfoChange({
      ...guestInfo,
      [field]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onPaymentProofChange) {
      onPaymentProofChange(e.target.files?.[0] || null);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">Guest Information</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">First Name *</label>
            <input
              id="firstName"
              type="text"
              className="form-control"
              value={guestInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name *</label>
            <input
              id="lastName"
              type="text"
              className="form-control"
              value={guestInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email Address *</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={guestInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              className="form-control"
              value={guestInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">City *</label>
            <input
              id="city"
              type="text"
              className="form-control"
              value={guestInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="country" className="form-label">Country *</label>
            <select
              id="country"
              className="form-select"
              value={guestInfo.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            >
              <option value="">Select your country</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="SG">Singapore</option>
              <option value="AE">United Arab Emirates</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="paymentProof" className="form-label">Payment Proof (Image Upload)</label>
            <input
              id="paymentProof"
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
            {paymentProofFile && (
              <div className="mt-2">
                <small className="text-muted">Selected file: {paymentProofFile.name}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
