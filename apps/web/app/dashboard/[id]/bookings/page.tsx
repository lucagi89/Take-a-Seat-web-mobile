"use client";

import { useRestaurant } from "../../../../contexts/RestaurantContext";
import { Booking } from "../../../../data/types";

export default function BookingsPage() {
  const { restaurant, loading, restaurantSchema } = useRestaurant();
  const bookings = restaurantSchema?.bookings || [];

  // if (!restaurant) {
  //   return <div>Error: No restaurant selected.</div>;
  // }

  function toggleApproval(bookingId: string) {
    return async () => {
      try {
        const updatedBookings = bookings.map((booking: Booking) => {
          if (booking.id === bookingId) {
            return {
              ...booking,
              isApproved: !booking.isApproved,
            };
          }
          return booking;
        });
        // Here you would typically call an API to update the booking status
        console.log(
          `Toggled approval for booking ${bookingId}`,
          updatedBookings
        );
      } catch (error) {
        console.error(
          `Error toggling approval for booking ${bookingId}:`,
          error
        );
        alert(`Error toggling approval for booking ${bookingId}: ${error}`);
      }
    };
  }

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  // if (error) {
  //   alert(`Error fetching bookings: ${error}`);
  //   return <div>Oops! Error fetching bookings: {error}</div>;
  // }

  return (
    <div>
      <h1>{restaurant?.name}&apos; Bookings Page</h1>
      <p>This is the bookings page for the restaurant.</p>
      <h2>Bookings List</h2>
      <ul>
        {bookings.length > 0 ? (
          bookings.map((booking: Booking) => (
            <li key={booking.id}>
              <strong>{booking.userId}</strong> - {booking.bookedTime}
              <p>Guests: {booking.partySize}</p>
              <p>Status: {booking.isApproved}</p>
              <button onClick={toggleApproval(booking.id)}>
                {booking.isApproved ? "Cancel Approval" : "Approve Booking"}
              </button>
            </li>
          ))
        ) : (
          <li>No bookings found.</li>
        )}
      </ul>
    </div>
  );
}
