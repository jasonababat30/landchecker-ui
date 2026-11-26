import { LoaderCircle } from "lucide-react";

const LoadingWatchlistItems = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-gray-900">
      <div
        role="status"
        aria-live="polite"
        className="flex -translate-y-12 flex-col items-center gap-3"
      >
        <LoaderCircle
          className="h-8 w-8 animate-spin text-green-600"
          aria-hidden="true"
        />

        <p className="text-lg font-medium text-gray-600">
          Loading your watchlist...
        </p>
      </div>
    </main>
  );
};

export default LoadingWatchlistItems;
