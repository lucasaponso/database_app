// components/ListProperties.tsx
import React, { useEffect, useState } from 'react';

interface Property {
  _id: string;
  name: string;
  summary: string;
  price: number; // Stored as string in MongoDB sample_airbnb dataset
  review_scores?: {
    review_scores_rating?: number;
  };
}

interface ListPropertiesProps {
  filters: {
    location?: string;
    propertyType?: string;
    bedrooms?: string;
  };
}

const ListProperties: React.FC<ListPropertiesProps> = ({ filters }) => {
    const [listings, setListings] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchListings = async () => {
        setLoading(true);
        setError(null);
        try {
          const query = new URLSearchParams(filters as Record<string, string>).toString();
          const response = await fetch(`/api/listings?${query}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Ensure _id exists and is a string
          const validatedListings = data.map((item: any) => ({
            ...item,
            _id: item._id?.toString() || Math.random().toString(36).substring(2, 9)
          }));
          
          setListings(validatedListings);
        } catch (err) {
          console.error('Failed to fetch listings:', err);
          setError('Failed to load listings. Please try again.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchListings();
    }, [filters]);
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4 text-black">Filtered Listings</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : listings.length === 0 ? (
          <p className="text-gray-600">No listings found.</p>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="text-xl font-bold text-black">{listing.name}</h3>
                <p className="text-sm text-gray-800 mb-2">{listing.summary}</p>
                <p className="text-sm text-gray-700">
                  <strong>Daily Price:</strong> ${listing.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Review Score:</strong>{' '}
                  {listing.review_scores?.review_scores_rating?.toFixed(1) ?? 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default ListProperties;
