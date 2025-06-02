import { useRouter } from 'next/router';
import BookingForm from '../components/BookingsForm';

const BookingPage = () => {
  const router = useRouter();
  const { listingId } = router.query;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Book Listing</h1>
      {typeof listingId === 'string' && <BookingForm listingId={listingId} />}
      {!listingId && <p className="text-gray-700">No listing selected.</p>}
    </div>
  );
};

export default BookingPage;
