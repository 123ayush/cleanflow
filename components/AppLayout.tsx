"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AppLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-gray-950 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">🧹 CleanFlow</h1>

        <nav className="space-y-3">
          <Link href="/dashboard" className="block px-4 py-3 rounded-lg hover:bg-gray-800">
            Dashboard
          </Link>

          <Link href="/bookings" className="block px-4 py-3 rounded-lg hover:bg-gray-800">
            Bookings
          </Link>

          <Link href="/customers" className="block px-4 py-3 rounded-lg hover:bg-gray-800">
            Customers
          </Link>

          <Link href="/invoices" className="block px-4 py-3 rounded-lg hover:bg-gray-800">
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

      <div className="flex-1 p-10">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow mb-8">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-blue-100">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}