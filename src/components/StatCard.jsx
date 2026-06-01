export default function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-2">
        {value}
      </h2>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}