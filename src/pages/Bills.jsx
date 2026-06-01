export default function Bills() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bills
        </h1>

        <p className="text-gray-500 mt-1">
          Track recurring bills, due dates,
          and upcoming payments.
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Upcoming Bills
        </h2>

        <p className="text-gray-500 mt-2">
          No bills added yet.
        </p>
      </div>
    </div>
  );
}