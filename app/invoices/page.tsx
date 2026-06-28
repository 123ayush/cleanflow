"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function InvoicesPage() {
  // Form inputs
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");

  // Invoice list
  const [invoices, setInvoices] = useState<any[]>([]);

  // Get invoices
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

  // Add invoice
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
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Invoices
      </h1>

      <div className="max-w-md space-y-4">
        <input
          type="number"
          placeholder="Invoice Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-3 rounded text-white bg-gray-800"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <button
          onClick={createInvoice}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Invoice
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Invoice List
        </h2>

        {invoices.length === 0 ? (
          <p>No invoices yet.</p>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="border p-4 rounded bg-gray-900 text-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">${invoice.amount}</p>
                    <p className="text-sm text-gray-300">
                      Status: {invoice.status}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteInvoice(invoice.id)}
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