"use client";

import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  // Logged-in user
  const [user, setUser] = useState<any>(null);

  // Dashboard numbers
  const [bookings, setBookings] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [invoices, setInvoices] = useState(0);
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
      setInvoices(invoicesData?.length || 0);

      const totalRevenue =
        invoicesData?.reduce(
          (sum, item) => sum + Number(item.amount || 0),
          0
        ) || 0;

      setRevenue(totalRevenue);
    };

    loadDashboard();
  }, [router]);

  return (
    <AppLayout
      title="Dashboard"
      subtitle={`Welcome back 👋 ${user?.email || ""}`}
    >
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-3xl mb-3">📅</div>
          <h2 className="text-gray-500">Bookings</h2>
          <p className="text-4xl font-bold mt-2 text-gray-900">
            {bookings}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-3xl mb-3">👥</div>
          <h2 className="text-gray-500">Customers</h2>
          <p className="text-4xl font-bold mt-2 text-gray-900">
            {customers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-3xl mb-3">🧾</div>
          <h2 className="text-gray-500">Invoices</h2>
          <p className="text-4xl font-bold mt-2 text-gray-900">
            {invoices}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Add Booking
          </Link>

          <Link
            href="/customers"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            Add Customer
          </Link>

          <Link
            href="/invoices"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg"
          >
            Add Invoice
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}