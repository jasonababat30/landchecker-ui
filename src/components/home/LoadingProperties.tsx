import { Loader2 } from "lucide-react";

const LoadingProperties = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-slate-200 bg-white p-12 text-center"
    >
      <Loader2
        aria-hidden="true"
        className="mx-auto h-8 w-8 animate-spin text-slate-500"
      />

      <p className="mt-3 font-medium text-slate-900">
        Loading properties...
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Fetching the latest listings from the API.
      </p>
    </div>
  );
};

export default LoadingProperties;
