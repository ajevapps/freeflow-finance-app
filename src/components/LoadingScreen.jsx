export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Loading...
        </h2>

        <p className="text-gray-500 mt-2">
          Please wait.
        </p>
      </div>
    </div>
  );
}