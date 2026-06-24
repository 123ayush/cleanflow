
"use client";

import { useState } from "react";
import {supabase} from "@/lib/supabase";

export default function BookingsPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

const createBooking = async () => {
    const{ data } = await supabase.auth.getUser();
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
    }
        else {
            alert("Booking created successfully!");
            setTitle("");
            setDate("");
        }
    };



  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Add Booking
      </h1>

      <div className="max-w-md space-y-4">

        <input
          type="text"
          placeholder="Booking Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        />

        <button
            onClick={createBooking} 
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Booking
        </button>

      </div>
    </div>
  );
}