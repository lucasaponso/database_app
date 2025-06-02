import React from 'react';

const dummyBookings = [
  {
    id: 'b001',
    clientName: 'Alice Johnson',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    email: 'alice@example.com',
    phone: '+123456789',
  },
  {
    id: 'b002',
    clientName: 'Bob Smith',
    startDate: '2025-06-20',
    endDate: '2025-06-22',
    email: 'bob@example.com',
    phone: '+987654321',
  },
  {
    id: 'b003',
    clientName: 'Charlie Davis',
    startDate: '2025-07-01',
    endDate: '2025-07-05',
    email: 'charlie@example.com',
    phone: '+192837465',
  },
];

export const BookingList = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Recent Bookings</h2>
      <div className="space-y-4">
        {dummyBookings.map((booking) => (
          <div
            key={booking.id}
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
              <strong>Phone:</strong> {booking.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
