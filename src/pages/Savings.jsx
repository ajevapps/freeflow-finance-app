export default function Savings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Savings
        </h1>

        <p className="text-gray-500 mt-1">
          Set goals, track progress,
          and grow savings over time.
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Savings Goals
        </h2>

        <p className="text-gray-500 mt-2">
          No savings goals created yet.
        </p>
      </div>
    </div>
  );
}