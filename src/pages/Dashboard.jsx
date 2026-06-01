export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Get a quick overview of your finances,
          balances, cash flow, and upcoming expenses.
        </p>
      </div>

      {/* Summary Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500">
            Total Balance
          </h2>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            $0.00
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500">
            Monthly Income
          </h2>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            $0.00
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500">
            Monthly Expenses
          </h2>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            $0.00
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500">
            Disposable Income
          </h2>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            $0.00
          </p>
        </div>
      </div>

      {/* Placeholder Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Financial Overview
        </h2>

        <p className="text-gray-500 mt-2">
          Your dashboard data will appear here.
        </p>
      </div>
    </div>
  );
}