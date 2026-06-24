"use client";

// useState = stores form data and bookings list
// useEffect = runs code when page first loads
import { useEffect, useState } from "react";

// Import Supabase connection
import { supabase } from "@/lib/supabase";

export default function BookingsPage() {
  // Stores the booking title typed by user
  const [title, setTitle] = useState("");

  // Stores the selected booking date
  const [date, setDate] = useState("");

  // Stores all bookings from Supabase
  const [bookings, setBookings] = useState<any[]>([]);

  // This function gets all bookings from Supabase
  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings") // choose bookings table
      .select("*") // get all columns
      .order("date", { ascending: true }); // sort by date

    if (error) {
      alert(error.message);
    } else {
      // Save bookings into React state
      setBookings(data || []);
    }
  };

  // This runs automatically when the page opens
  useEffect(() => {
    fetchBookings();
  }, []);

  // This function creates a new booking
  const createBooking = async () => {
    // Get currently logged-in user
    const { data } = await supabase.auth.getUser();

    // If no user is logged in, stop
    if (!data.user) {
      alert("You must be logged in to create a booking.");
      return;
    }

    // Insert new booking into Supabase
    const { error } = await supabase.from("bookings").insert([
      {
        title: title,
        date: date,
        user_id: data.user.id, // save booking under logged-in user
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Booking created successfully!");

      // Clear input fields after booking is created
      setTitle("");
      setDate("");

      // Refresh booking list after new booking is added
      fetchBookings();
    }
  };

  return (
    <div className="p-10">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">
        Add Booking
      </h1>

      {/* Booking form */}
      <div className="max-w-md space-y-4">
        {/* Booking title input */}
        <input
          type="text"
          placeholder="Booking Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        />

        {/* Booking date input */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        />

        {/* Create booking button */}
        <button
          onClick={createBooking}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Booking
        </button>
      </div>

      {/* Bookings list section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Your Bookings
        </h2>

        {/* If no bookings exist */}
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          // Show all bookings
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border p-4 rounded bg-gray-900 text-white"
              >
                <p className="font-bold">{booking.title}</p>
                <p className="text-sm text-gray-300">{booking.date?.split('T')[0]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}