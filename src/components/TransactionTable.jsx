import { formatCurrency } from "../utils/formatters";

export default function TransactionTable({
  transactions = [],
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Transactions
        </h2>
      </div>

      {transactions.length === 0 ? (
        <div className="p-6 text-gray-500">
          No transactions available.
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Name
              </th>

              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Category
              </th>

              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(
              (transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-200"
                >
                  <td className="px-6 py-4 text-gray-900">
                    {transaction.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {transaction.category}
                  </td>

                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    {formatCurrency(
                      transaction.amount
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}