"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const router = useRouter();

  // Load user and dashboard data
  useEffect(() => {
    const loadDashboard = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);

      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*");

      const { data: customersData } = await supabase
        .from("customers")
        .select("*");

      const { data: invoicesData } = await supabase
        .from("invoices")
        .select("*");

      setBookings(bookingsData?.length || 0);
      setCustomers(customersData?.length || 0);

      const totalRevenue =
        invoicesData?.reduce(
          (sum, item) => sum + Number(item.amount || 0),
          0
        ) || 0;

      setRevenue(totalRevenue);
    };

    loadDashboard();
  }, [router]);

  // Logout user
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">
          🧹 CleanFlow
        </h1>

        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="block bg-blue-600 px-4 py-3 rounded-lg font-semibold"
          >
            Dashboard
          </Link>

          <Link
            href="/bookings"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            Bookings
          </Link>

          <Link
            href="/customers"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            Customers
          </Link>

          <Link
            href="/invoices"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            Invoices
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-10 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg w-full"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow">
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          {user && (
            <p className="mt-2 text-blue-100">
              Welcome back 👋 {user.email}
            </p>
          )}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-3xl mb-3">📅</div>
            <h2 className="text-gray-500">Bookings</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">
              {bookings}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-3xl mb-3">👥</div>
            <h2 className="text-gray-500">Customers</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">
              {customers}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-3xl mb-3">💰</div>
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">
              ${revenue}
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/bookings"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              Add Booking
            </Link>

            <Link
              href="/customers"
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >
              Add Customer
            </Link>

            <Link
              href="/invoices"
              className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700"
            >
              Add Invoice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}