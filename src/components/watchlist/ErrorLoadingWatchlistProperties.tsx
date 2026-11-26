interface ErrorLoadingWatchlistPropertiesProps {
    error: string;
}

const ErrorLoadingWatchlistProperties = ({ error }: ErrorLoadingWatchlistPropertiesProps) => {
    return (
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-red-800">
            Couldn't load your watchlist
          </h2>

          <p className="mt-2 text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Try again
          </button>
        </section>
    )
}

export default ErrorLoadingWatchlistProperties;
