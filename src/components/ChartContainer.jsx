export default function ChartContainer({
  title,
  children,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="min-h-[250px] flex items-center justify-center text-gray-400">
        {children || "Chart coming soon"}
      </div>
    </div>
  );
}