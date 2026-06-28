"use client";

import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function InvoicesPage() {
  // Store form inputs
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");

  // Store invoices from Supabase
  const [invoices, setInvoices] = useState<any[]>([]);

  // Get invoices from Supabase
  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from("invoices")
      .select("*");

    if (error) {
      alert(error.message);
    } else {
      setInvoices(data || []);
    }
  };

  // Run when page opens
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Create invoice
  const createInvoice = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      alert("You must be logged in.");
      return;
    }

    const { error } = await supabase.from("invoices").insert([
      {
        amount: amount,
        status: status,
        user_id: data.user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Invoice added!");
      setAmount("");
      setStatus("pending");
      fetchInvoices();
    }
  };

  // Delete invoice
  const deleteInvoice = async (id: string) => {
    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Invoice deleted!");
      fetchInvoices();
    }
  };

  return (
    <AppLayout
      title="Invoices"
      subtitle="Create and manage payments for your cleaning jobs"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Add Invoice
      </h1>

      {/* Invoice form */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-md space-y-4">
        <input
          type="number"
          placeholder="Invoice Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-5 rounded-2xl bg-white shadow text-gray-900"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-5 rounded-2xl bg-white shadow text-gray-900"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <button
          onClick={createInvoice}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Add Invoice
        </button>
      </div>

      {/* Invoice list */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Invoice List
        </h2>

        {invoices.length === 0 ? (
          <p className="text-gray-600">No invoices yet.</p>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="border p-5 rounded-2xl bg-white shadow text-gray-900"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">${invoice.amount}</p>

                    <p className="text-sm text-gray-500">
                      Status: {invoice.status}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteInvoice(invoice.id)}
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