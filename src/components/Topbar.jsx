export default function Topbar() {
  const today = new Date().toLocaleDateString(
    "en-AU",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-500">
          {today}
        </p>
      </div>
    </header>
  );
}