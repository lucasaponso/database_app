// pages/index.tsx
import React, { useState } from 'react';
import PropertySearchForm from '@/components/PropertySearchForm';
import ListProperties from '@/components/ListProperties';

const HomePage = () => {
  const [filters, setFilters] = useState({});

  const handleSearch = (newFilters: Partial<{
    location: string;
    propertyType: string;
    bedrooms: string;
  }>) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <PropertySearchForm onSearch={handleSearch} />
      <ListProperties filters={filters} />
    </div>
  );
};

export default HomePage;
