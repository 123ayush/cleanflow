"use client";

import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CustomersPage() {
  // Store form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Store customers from Supabase
  const [customers, setCustomers] = useState<any[]>([]);

  // Get customers from Supabase
  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*");

    if (error) {
      alert(error.message);
    } else {
      setCustomers(data || []);
    }
  };

  // Run when page opens
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Create customer
  const createCustomer = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      alert("You must be logged in.");
      return;
    }

    const { error } = await supabase.from("customers").insert([
      {
        name: name,
        phone: phone,
        user_id: data.user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Customer added!");
      setName("");
      setPhone("");
      fetchCustomers();
    }
  };

  // Delete customer
  const deleteCustomer = async (id: string) => {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Customer deleted!");
      fetchCustomers();
    }
  };

  return (
    <AppLayout
      title="Customers"
      subtitle="Add and manage your cleaning business customers"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Add Customer
      </h1>

      {/* Customer form */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-md space-y-4">
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-5 rounded-2xl bg-white shadow text-gray-900"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-5 rounded-2xl bg-white shadow text-gray-900"
        />

        <button
          onClick={createCustomer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Add Customer
        </button>
      </div>

      {/* Customer list */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Customer List
        </h2>

        {customers.length === 0 ? (
          <p className="text-gray-600">No customers yet.</p>
        ) : (
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="border p-5 rounded-2xl bg-white shadow text-gray-900"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{customer.name}</p>

                    <p className="text-sm text-gray-500">
                      {customer.phone}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteCustomer(customer.id)}
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