export default function PayCycleCard({
  title,
  frequency,
  amount,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm text-gray-500">
        {frequency}
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mt-1">
        {title}
      </h3>

      <p className="text-2xl font-bold text-gray-900 mt-4">
        ${amount || 0}
      </p>
    </div>
  );
}