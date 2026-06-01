export default function EmptyState({
  title = "Nothing here yet",
  description = "Data will appear here once added.",
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
}