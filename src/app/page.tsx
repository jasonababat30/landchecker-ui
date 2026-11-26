"use client";

import { useEffect, useState, useCallback } from "react";
import getProperties from "@/service/property-api";
import type { Property, PropertyFilters  } from "@/types";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth-storage";
import 
  getWatchlist, 
{
  addToWatchlist,
  removeFromWatchlist   
} from "@/service/watchlist-api";
import usePropertyUpdates from "@/hooks/usePropertyUpdates";
import LoadingProperties from "@/components/home/LoadingProperties";
import ErrorLoadingProperties from "@/components/home/ErrorLoadingProperties";
import PropertyCard from "@/components/home/PropertyCard";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const loadProperties = async () => {
      setLoading(true);
      setError(null);

      const filters: PropertyFilters = {
        page,
        per_page: 6,
      };

      if (propertyType) filters.property_type = propertyType;
      if (bedrooms) filters.bedrooms = bedrooms;
      if (minPrice) filters.min_price = minPrice;
      if (maxPrice) filters.max_price = maxPrice;
      if (title) filters.title = title;

      try {
        const result = await getProperties(filters, controller.signal);

        setProperties(result.data);
        setTotalPages(result.pagination.total_pages);
        setTotalProperties(result.pagination.total);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          isAxiosError(err)
            ? err.response?.data?.error ?? err.message
            : err instanceof Error
              ? err.message
              : "Something went wrong while loading properties.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProperties();

    return () => controller.abort();
  }, [
    page, 
    propertyType, 
    bedrooms, 
    minPrice, 
    maxPrice, 
    retryCount,
    title
  ]);

  useEffect(() => {
    let cancelled = false;

    const loadWatchlist = async () => {
      if (!getToken()) {
        setSavedIds([]);
        return;
      }

      try {
        const response = await getWatchlist();

        if (!cancelled) {
          setSavedIds(response.data.map((property) => property.id));
        }
      } catch (error) {
        if (cancelled) return;

        if (
          isAxiosError(error) &&
          error.response?.status === 401
        ) {
          setSavedIds([]);
          return;
        }

        console.error("Failed to load watchlist:", error);
      }
    }

    loadWatchlist();

    return () => {
      cancelled = true;
    };
  }, []);

  const handlePropertyUpdated = useCallback((updatedProperty: Property) => {
    setProperties((current) =>
      current.map((property) =>
        property.id === updatedProperty.id
          ? { ...property, ...updatedProperty }
          : property,
      ),
    );
  }, []);

  usePropertyUpdates(handlePropertyUpdated);

  useEffect(() => {
    if (!searchTerm) {
      setPage(1);
      setTitle("");
      return;
    };

    const delayDebounce = setTimeout(() => {
      setTitle(searchTerm);
      setPage(1);
    }, 500)

    return () => {
      clearTimeout(delayDebounce);
    }
  }, [searchTerm]);

  const updateFilter =(
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value);
    setPage(1);
  }

  const toggleSaved = async (propertyId: number) => {
    if (!getToken()) {
      router.push("/auth");
      return;
    }

    const isSaved = savedIds.includes(propertyId);

    try {
      if (isSaved) {
        await removeFromWatchlist(propertyId);
      } else {
        await addToWatchlist(propertyId);
      }

      setSavedIds((current) =>
        isSaved
          ? current.filter((id) => id !== propertyId)
          : [...current, propertyId],
      );
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === 401
      ) {
        router.push("/auth");
        return;
      }

      console.error("Failed to update watchlist:", error);
      alert("Could not update your watchlist. Please try again.");
    }
  }

  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(Number(price));
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Find your next property
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Discover properties worth watching.
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse available properties, narrow your search, and save
            the ones you want to keep an eye on.
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
          <label className="lg:col-span-2">
            <span className="mb-2 block text-sm font-medium">Search title</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="e.g. family house"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium">Property type</span>
            <select
              value={propertyType}
              onChange={(event) =>
                updateFilter(setPropertyType, event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            >
              <option value="">All types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium">Bedrooms</span>
            <select
              value={bedrooms}
              onChange={(event) =>
                updateFilter(setBedrooms, event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label>
              <span className="mb-2 block text-sm font-medium">Min price</span>
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) =>
                  updateFilter(setMinPrice, event.target.value)
                }
                placeholder="$0"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium">Max price</span>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) =>
                  updateFilter(setMaxPrice, event.target.value)
                }
                placeholder="Any"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </label>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Available properties</h2>
            <p className="mt-1 text-sm text-slate-500">
              {totalProperties} properties found
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
        </div>

        {loading && (
          <LoadingProperties />
        )}

        {
          !loading && error && (
            <ErrorLoadingProperties 
              error={error}
              handleRetry={() => setRetryCount((count) => count + 1)}
            />
          )
        }

        {!loading && !error && properties.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <h3 className="text-lg font-semibold">No properties found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different title or adjust your filters.
            </p>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedIds.includes(property.id)}
                onToggleSaved={toggleSaved}
              />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <nav
            aria-label="Property pagination"
            className="mt-8 flex items-center justify-center gap-4"
          >
            <button
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-slate-600">
              {page} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        )}
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        Landchecker coding challenge · Property discovery
      </footer>
    </main>
  );
}

export default Home;
