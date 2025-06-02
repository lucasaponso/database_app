import React, { useState } from 'react';

interface SearchFilters {
  location: string;
  propertyType: string;
  bedrooms: string;
}

interface PropertySearchFormProps {
  onSearch: (filters: Partial<SearchFilters>) => void;
}
const propertyTypes = [
    { value: '', label: 'Select property type (optional)' },
    { value: 'House', label: 'House' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Condominium', label: 'Condo' },
    { value: 'Townhouse', label: 'Townhouse' }
  ];
  
  const bedroomOptions = [
    { value: '', label: 'Any bedrooms (optional)' },
    { value: '1', label: '1 bedroom' },
    { value: '2', label: '2 bedrooms' },
    { value: '3', label: '3 bedrooms' },
    { value: '4+', label: '4+ bedrooms' }
  ];

export const PropertySearchForm: React.FC<PropertySearchFormProps> = ({ onSearch }) => {
      
    const [formData, setFormData] = useState<SearchFilters>({
    location: '',
    propertyType: '',
    bedrooms: ''
  });

  const [errors, setErrors] = useState<{ location?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location.trim()) {
      setErrors({ location: 'Location is required' });
      return;
    }

    setErrors({});
    onSearch(formData);
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Property Search</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location Field (Required) */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter city or address"
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {/* Property Type Dropdown (Optional) */}
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            {propertyTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms Dropdown (Optional) */}
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            {bedroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Search Properties
        </button>
      </form>
    </div>
  );
};

export default PropertySearchForm;
