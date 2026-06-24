// Pricing section - shows plans users can pay for

export default function Pricing() {
  return (
    <section className="py-20 px-6 text-center">

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800">
        Simple Pricing
      </h2>

      <p className="mt-4 text-gray-600">
        Choose a plan that fits your cleaning business
      </p>

      {/* Pricing cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">

        {/* Basic plan */}
        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold">Starter</h3>
          <p className="text-3xl font-bold mt-4">$9</p>
          <p className="text-gray-500">/month</p>

          <ul className="mt-6 text-sm text-gray-600 space-y-2">
            <li>✔ Basic bookings</li>
            <li>✔ Customer list</li>
            <li>✔ Email support</li>
          </ul>

          <button className="mt-6 bg-gray-200 px-4 py-2 rounded-lg w-full">
            Get Started
          </button>
        </div>

        {/* Pro plan */}
        <div className="p-6 border-2 border-blue-500 rounded-xl">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="text-3xl font-bold mt-4">$29</p>
          <p className="text-gray-500">/month</p>

          <ul className="mt-6 text-sm text-gray-600 space-y-2">
            <li>✔ Everything in Starter</li>
            <li>✔ Invoices</li>
            <li>✔ Scheduling system</li>
          </ul>

          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
            Most Popular
          </button>
        </div>

        {/* Business plan */}
        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold">Business</h3>
          <p className="text-3xl font-bold mt-4">$59</p>
          <p className="text-gray-500">/month</p>

          <ul className="mt-6 text-sm text-gray-600 space-y-2">
            <li>✔ Everything in Pro</li>
            <li>✔ AI assistant</li>
            <li>✔ Priority support</li>
          </ul>

          <button className="mt-6 bg-gray-900 text-white px-4 py-2 rounded-lg w-full">
            Upgrade
          </button>
        </div>

      </div>
    </section>
  );
}