// Feature section - shows what the app can do

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50 text-center">

      {/* Section title */}
      <h2 className="text-3xl font-bold text-gray-800">
        Everything you need in one place
      </h2>

      <p className="mt-4 text-gray-600">
        CleanFlow helps you run your cleaning business smoothly.
      </p>

      {/* Feature cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">

        <div className="p-6 bg-white rounded-xl shadow">
          📅
          <h3 className="mt-2 font-semibold">Bookings</h3>
          <p className="text-sm text-gray-500">Manage customer bookings easily</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          👥
          <h3 className="mt-2 font-semibold">Customers</h3>
          <p className="text-sm text-gray-500">Keep all customer info organized</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          💳
          <h3 className="mt-2 font-semibold">Invoices</h3>
          <p className="text-sm text-gray-500">Send and track payments</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          📊
          <h3 className="mt-2 font-semibold">Reports</h3>
          <p className="text-sm text-gray-500">See your business growth</p>
        </div>

      </div>

    </section>
  );
}