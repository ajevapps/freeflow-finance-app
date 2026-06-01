export default function Expenses() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Expenses
        </h1>

        <p className="text-gray-500 mt-1">
          Track spending, recurring costs,
          and budget categories.
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Expense Tracking
        </h2>

        <p className="text-gray-500 mt-2">
          No expenses added yet.
        </p>
      </div>
    </div>
  );
}