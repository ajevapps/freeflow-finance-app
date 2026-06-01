export default function Forecast() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Forecast
        </h1>

        <p className="text-gray-500 mt-1">
          Predict future balances and cash
          flow based on income and expenses.
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Cash Flow Forecast
        </h2>

        <p className="text-gray-500 mt-2">
          Forecast data will appear here.
        </p>
      </div>
    </div>
  );
}