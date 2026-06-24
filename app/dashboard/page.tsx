"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const loadDashboard = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);

      const { data: bookingsData } = await supabase.from("bookings").select("*");
      const { data: customersData } = await supabase.from("customers").select("*");
      const { data: invoicesData } = await supabase.from("invoices").select("*");

      setBookings(bookingsData?.length || 0);
      setCustomers(customersData?.length || 0);

      const totalRevenue =
        invoicesData?.reduce((sum, item) => sum + Number(item.amount || 0), 0) || 0;

      setRevenue(totalRevenue);
    };

    loadDashboard();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white p-6 border-r">
        <h1 className="text-xl font-bold mb-8">🧹 CleanFlow</h1>

        <nav className="space-y-4 text-gray-700">
          <p className="font-semibold bg-blue-600 text-white p-2 rounded">
            Dashboard
          </p>
          <p>Bookings</p>
          <p>Customers</p>
          <p>Invoices</p>
        </nav>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {user && (
          <p className="mt-2 text-gray-600">
            Welcome back 👋 {user.email}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Bookings</h2>
            <p className="text-2xl font-bold mt-2">{bookings}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Customers</h2>
            <p className="text-2xl font-bold mt-2">{customers}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold mt-2">${revenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}