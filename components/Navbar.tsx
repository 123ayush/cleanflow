// Navbar component - this shows at the top of the website

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 border-b">
      
      {/* Left side - Logo / Brand */}
      <h1 className="text-2xl font-bold">
        🧹 CleanFlow
      </h1>

      {/* Right side - Login button */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Login
      </button>

    </nav>
  );
}