"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import getWatchlist, { removeFromWatchlist } from "@/service/watchlist-api";
import { getToken } from "@/lib/auth-storage";
import type { Property } from "@/types";
import LoadingWatchlistItems from "@/components/watchlist/LoadingWatchlistItems";

const WatchlistPage = () => {
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadWatchlist = async () => {
      if (!getToken()) {
        router.replace("/auth");
        return;
      }

      try {
        const response = await getWatchlist();

        if (!cancelled) {
          setProperties(response.data);
        }
      } catch (err) {
        if (cancelled) return;

        if (
          isAxiosError(err) &&
          err.response?.status === 401
        ) {
          router.replace("/auth");
          return;
        }

        setError("Could not load your watchlist. Please try again.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWatchlist();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleRemove = async (propertyId: number) => {
    try {
      await removeFromWatchlist(propertyId);

      setProperties((current) =>
        current.filter((property) => property.id !== propertyId),
      );
    } catch {
      setError("Could not remove this property. Please try again.");
    }
  }

  if (loading) {
    return <LoadingWatchlistItems />;
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-5xl p-6 sm:p-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="mt-2 text-gray-600">
              Properties you've saved for later.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            Browse properties
          </Link>
        </header>

        {error && (
          <p role="alert" className="mb-4 text-red-600">
            {error}
          </p>
        )}

        {properties.length === 0 ? (
          <section className="rounded-xl border border-dashed p-10 text-center">
            <h2 className="text-xl font-semibold">
              Your watchlist is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Save a property from the search page to see it here.
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Explore properties
            </Link>
          </section>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2">
            {properties.map((property) => (
              <article
                key={property.id}
                className="rounded-xl border p-5 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">
                    {property.title}
                  </h2>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                    {property.status}
                  </span>
                </div>

                <p className="text-2xl font-bold">
                  ${Number(property.price).toLocaleString("en-AU")}
                </p>

                <p className="mt-2 text-gray-600">
                  {property.bedrooms} bedrooms ·{" "}
                  {property.property_type}
                </p>

                <button
                  type="button"
                  onClick={() => handleRemove(property.id)}
                  className="mt-5 rounded-lg border border-red-200 px-4 py-2 text-red-700 hover:bg-red-50"
                >
                  Remove from watchlist
                </button>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
    
  );
}

export default WatchlistPage;
