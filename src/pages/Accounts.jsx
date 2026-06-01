export default function Accounts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Accounts
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your bank accounts, savings,
          loans, and credit cards.
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Your Accounts
        </h2>

        <p className="text-gray-500 mt-2">
          No accounts added yet.
        </p>
      </div>
    </div>
  );
}