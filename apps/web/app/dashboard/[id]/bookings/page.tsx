"use client";

import { useRestaurant } from "../../../../contexts/RestaurantContext";
import { Booking } from "../../../../lib/types";

export default function BookingsPage() {
  const { restaurant, bookings, loading } = useRestaurant();

  if (!restaurant) {
    return <div>Error: No restaurant selected.</div>;
  }

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    alert(`Error fetching bookings: ${error}`);
    return <div>Oops! Error fetching bookings: {error}</div>;
  }

  return (
    <div>
      <h1>{restaurant.name}&apos; Bookings Page</h1>
      <p>This is the bookings page for the restaurant.</p>
      <h2>Bookings List</h2>
      <ul>
        {bookings.length > 0 ? (
          bookings.map((booking: Booking) => (
            <li key={booking.id}>
              <strong>{booking.customerName}</strong> - {booking.date} at{" "}
              {booking.time}
              <p>Guests: {booking.guests}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))
        ) : (
          <li>No bookings found.</li>
        )}
      </ul>
    </div>
  );
}
