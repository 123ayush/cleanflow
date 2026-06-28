"use client";

import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookingsPage() {
  // Store form input
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // Store bookings from Supabase
  const [bookings, setBookings] = useState<any[]>([]);

  // Get bookings from Supabase
  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      alert(error.message);
    } else {
      setBookings(data || []);
    }
  };

  // Run when page opens
  useEffect(() => {
    fetchBookings();
  }, []);

  // Create new booking
  const createBooking = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      alert("You must be logged in to create a booking.");
      return;
    }

    const { error } = await supabase.from("bookings").insert([
      {
        title: title,
        date: date,
        user_id: data.user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Booking created successfully!");
      setTitle("");
      setDate("");
      fetchBookings();
    }
  };

  // Delete booking
  const deleteBooking = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Booking deleted successfully!");
      fetchBookings();
    }
  };

  return (
    <AppLayout
      title="Bookings"
      subtitle="Create and manage cleaning appointments"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Add Booking
      </h1>

      {/* Booking form */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-md space-y-4">
        <input
          type="text"
          placeholder="Booking Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-5 rounded-2xl bg-white shadow text-gray-900"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-5 rounded-2xl bg-white shadow text-gray-900"
        />

        <button
          onClick={createBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Create Booking
        </button>
      </div>

      {/* Booking list */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Your Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border p-5 rounded-2xl bg-white shadow text-gray-900"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{booking.title}</p>

                    <p className="text-sm text-gray-500">
                      {booking.date?.split("T")[0]}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}