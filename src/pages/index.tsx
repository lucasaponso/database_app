import {PropertySearchForm} from "../components/PropertySearchForm";
import {BookingList} from "../components/ListBookings";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
    <PropertySearchForm/>
    <BookingList />
  </div>

  );
}