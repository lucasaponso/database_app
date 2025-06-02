import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';


export const BookingForm = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    clientName: '',
    email: '',
    daytimePhone: '',
    mobile: '',
    postalAddress: '',
    homeAddress: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const newErrors: { [key: string]: string } = {};
  
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.daytimePhone.trim()) newErrors.daytimePhone = 'Daytime phone is required';
  
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!isEmail(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }
    
      if (!formData.daytimePhone.trim()) {
        newErrors.daytimePhone = 'Daytime phone is required';
      } else if (!isMobilePhone(formData.daytimePhone, 'any')) {
        newErrors.daytimePhone = 'Enter a valid daytime phone number';
      }
      
      if (formData.mobile.trim() && !isMobilePhone(formData.mobile, 'any')) {
        newErrors.mobile = 'Enter a valid mobile phone number';
      }
      
    
    // Check that startDate is before endDate
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
  
    setErrors({});
    console.log('Booking submitted:', formData);
    alert('Booking form submitted!');
  };
  

  const inputBaseClass = 'w-full px-3 py-2 border rounded text-black placeholder-black focus:text-black';

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-black">Booking Form</h2>
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
