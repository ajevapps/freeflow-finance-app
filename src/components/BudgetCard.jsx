import { formatCurrency } from "../utils/formatters";

export default function BudgetCard({
  title,
  amount,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-2">
        {formatCurrency(amount || 0)}
      </h2>
    </div>
  );
}