// Footer section - bottom of the website

export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-gray-100 text-center">

      <h3 className="text-xl font-bold text-gray-800">
        🧹 CleanFlow
      </h3>

      <p className="mt-2 text-gray-600 text-sm">
        Built to help cleaning businesses grow faster.
      </p>

      <p className="mt-6 text-xs text-gray-400">
        © {new Date().getFullYear()} CleanFlow. All rights reserved.
      </p>

    </footer>
  );
}