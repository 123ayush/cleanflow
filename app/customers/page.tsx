"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CustomersPage() {
  // These store what the user types in the form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // This stores all customers that come from Supabase
  const [customers, setCustomers] = useState<any[]>([]);

  // This function loads customers from the Supabase customers table
  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*");

    if (error) {
      alert(error.message);
    } else {
      // Save the customers into React so they can show on the page
      setCustomers(data || []);
    }
  };

  // This runs one time when the page first opens
  useEffect(() => {
    fetchCustomers();
  }, []);

  // This function saves a new customer into Supabase
  const createCustomer = async () => {
    // Get the currently logged-in user
    const { data } = await supabase.auth.getUser();

    // If no user is logged in, stop the function
    if (!data.user) {
      alert("You must be logged in.");
      return;
    }

    // Add the customer to the customers table
    const { error } = await supabase.from("customers").insert([
      {
        name,
        phone,
        user_id: data.user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Customer added!");

      // Clear the form after saving
      setName("");
      setPhone("");

      // Load the updated customer list
      void fetchCustomers();
    }
  };

  const deleteCustomer = async (id: string) => {
    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Customer deleted!");
      void fetchCustomers();
    }
  };

  return (
    <div className="p-10">
      {/* Main page heading */}
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      {/* Form for adding a customer */}
      <div className="max-w-md space-y-4">
        {/* User types customer name here */}
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        />

        {/* User types customer phone number here */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        />

        {/* When clicked, this saves the customer */}
        <button
          onClick={createCustomer}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </div>

      {/* This section displays saved customers */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Customer List
        </h2>

        {/* If there are no customers, show this message */}
        {customers.length === 0 ? (
          <p>No customers yet.</p>
        ) : (
          // If customers exist, show them one by one
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="border p-4 rounded bg-gray-900 text-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold">{customer.name}</p>
                    <p className="text-sm text-gray-300">{customer.phone}</p>
                  </div>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}