// components/BookingList.tsx
import React, { useEffect, useState } from 'react';

interface Booking {
  _id: string;
  clientName: string;
  startDate: string;
  endDate: string;
  email: string;
  daytimePhone: string;
}

export const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Recent Bookings</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <h3 className="text-lg font-bold text-black">{booking.clientName}</h3>
              <p className="text-sm text-gray-700">
                <strong>Dates:</strong> {booking.startDate} to {booking.endDate}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {booking.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Phone:</strong> {booking.daytimePhone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
