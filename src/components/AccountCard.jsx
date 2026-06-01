import { formatCurrency } from "../utils/formatters";

export default function AccountCard({
  account,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {account?.type || "Account"}
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-1">
            {account?.name || "Unnamed Account"}
          </h3>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500">
          Balance
        </p>

        <p className="text-2xl font-bold text-gray-900 mt-1">
          {formatCurrency(
            account?.balance || 0
          )}
        </p>
      </div>
    </div>
  );
}