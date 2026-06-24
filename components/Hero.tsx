export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-bold text-gray-900">
        CleanFlow
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        The simplest way to manage your cleaning business — bookings, customers, invoices, all in one place.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Get Started
        </button>

        <button className="border px-6 py-3 rounded-lg">
          View Demo
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-400">
        No credit card required
      </p>

    </section>
  );
}