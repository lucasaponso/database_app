import React, { useEffect, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

/**
 * @brief The following prop, refers to the insertion
 * of the listing_id when booking a listing.
 */
interface BookingFormProps {
    listingId: string;
}

/**
 * @brief The following prop, refers to a booking entry being made.
 * This comes from the booking form.
 */
interface Booking {
    startDate: string;
    endDate: string;
    clientName: string;
    email: string;
    daytimePhone: string;
    mobile: string;
    postalAddress: string;
    homeAddress: string;
    listingId: string;
  }
  

/**
 * @brief The following component refers to the booking form,
 * where the user can apply for a booking.
 * @returns 
 */
export const BookingForm: React.FC<BookingFormProps> = ({ listingId }) => {
  const [formData, setFormData] = useState<Booking>({
    startDate: '',
    endDate: '',
    clientName: '',
    email: '',
    daytimePhone: '',
    mobile: '',
    postalAddress: '',
    homeAddress: '',
    listingId: listingId,
  });

  useEffect(() => {
    setFormData((prev) => ({...prev, listingId}));
  }), [listingId];

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    /** Checking whether the data in the input 
     * is populated. 
     */
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.daytimePhone.trim()) newErrors.daytimePhone = 'Daytime phone is required';

    /** 
     * Validate the email, and it's structure.
     */
    if (!isEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    /** 
     * Validate the mobile, and it's structure.
     */
    if (!isMobilePhone(formData.daytimePhone, 'any')) {
      newErrors.daytimePhone = 'Enter a valid daytime phone number';
    }

    if (formData.mobile.trim() && !isMobilePhone(formData.mobile, 'any')) {
      newErrors.mobile = 'Enter a valid mobile phone number';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      if (start > end) {
        newErrors.startDate = 'Start date must be before end date';
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit booking');
      }

      setFormData({
        startDate: '',
        endDate: '',
        clientName: '',
        email: '',
        daytimePhone: '',
        mobile: '',
        postalAddress: '',
        homeAddress: '',
        listingId: ''
      });

      setShowSuccessModal(true);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
      console.error('Submission error:', err);
    }

    setErrors({});
  };

  const inputBaseClass = 'w-full px-3 py-2 border rounded text-black placeholder-black focus:text-black';

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-black">Booking Form</h2>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4 text-black">Booking submitted successfully!</p>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Click me to go to home page
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Start Date */}
        <div>
          <label className="block font-medium text-black">Start Date *</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium text-black">End Date *</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
        </div>

        {/* Client Name */}
        <div>
          <label className="block font-medium text-black">Client Name *</label>
          <input
            type="text"
            name="clientName"
            placeholder="Enter full name"
            value={formData.clientName}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.clientName && <p className="text-sm text-red-600">{errors.clientName}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block font-medium text-black">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Daytime Phone */}
        <div>
          <label className="block font-medium text-black">Daytime Phone *</label>
          <input
            type="tel"
            name="daytimePhone"
            placeholder="Enter daytime phone"
            value={formData.daytimePhone}
            onChange={handleChange}
            className={`${inputBaseClass} ${errors.daytimePhone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.daytimePhone && <p className="text-sm text-red-600">{errors.daytimePhone}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-medium text-black">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={handleChange}
            className={`${inputBaseClass} border-gray-300`}
          />
          {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
        </div>

        {/* Postal Address */}
        <div>
          <label className="block font-medium text-black">Postal Address</label>
          <textarea
            name="postalAddress"
            placeholder="Enter postal address"
            value={formData.postalAddress}
            onChange={handleChange}
            className={`${inputBaseClass} border-gray-300`}
          />
        </div>

        {/* Home Address */}
        <div>
          <label className="block font-medium text-black">Home Address</label>
          <textarea
            name="homeAddress"
            placeholder="Enter home address"
            value={formData.homeAddress}
            onChange={handleChange}
            className={`${inputBaseClass} border-gray-300`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;