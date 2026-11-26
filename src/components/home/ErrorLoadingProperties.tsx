
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorLoadingPropertiesProps {
  error: string;
  handleRetry: () => void;
}

const ErrorLoadingProperties = ({
  error,
  handleRetry,
}: ErrorLoadingPropertiesProps) => {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-8 text-center"
    >
      <AlertCircle
        aria-hidden="true"
        className="mx-auto h-8 w-8 text-red-600"
      />

      <h3 className="mt-3 font-semibold text-red-900">
        Couldn't load properties
      </h3>

      <p className="mt-2 text-sm leading-6 text-red-800">
        {error}
      </p>

      <button
        type="button"
        onClick={handleRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 active:bg-red-900"
      >
        <RefreshCw aria-hidden="true" className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
};

export default ErrorLoadingProperties;
