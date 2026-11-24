
"use client";

import { useMemo, useState } from "react";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: "House" | "Apartment" | "Townhouse";
  image: string;
  status: "Available" | "Sold";
};

const properties: Property[] = [
  {
    id: 1,
    title: "Modern Family House",
    location: "Richmond, Melbourne",
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    status: "Available",
  },
  {
    id: 2,
    title: "City Centre Apartment",
    location: "Melbourne CBD",
    price: 180000,
    bedrooms: 2,
    bathrooms: 1,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    status: "Available",
  },
  {
    id: 3,
    title: "Luxury Townhouse",
    location: "South Yarra, Melbourne",
    price: 650000,
    bedrooms: 4,
    bathrooms: 3,
    type: "Townhouse",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
    status: "Available",
  },
  {
    id: 4,
    title: "Cozy Starter Home",
    location: "Footscray, Melbourne",
    price: 220000,
    bedrooms: 2,
    bathrooms: 1,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
    status: "Available",
  },
  {
    id: 5,
    title: "Premium City Apartment",
    location: "Docklands, Melbourne",
    price: 420000,
    bedrooms: 3,
    bathrooms: 2,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    status: "Available",
  },
  {
    id: 6,
    title: "Riverside Townhouse",
    location: "Abbotsford, Melbourne",
    price: 380000,
    bedrooms: 3,
    bathrooms: 2,
    type: "Townhouse",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    status: "Available",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(price);

export default function Home() {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All types");
  const [bedrooms, setBedrooms] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("Any");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        `${property.title} ${property.location}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        propertyType === "All types" ||
        property.type === propertyType;

      const matchesBedrooms =
        bedrooms === "Any" ||
        (bedrooms === "4+" ? property.bedrooms >= 4 : property.bedrooms === Number(bedrooms));

      const matchesPrice =
        maxPrice === "Any" || property.price <= Number(maxPrice);

      const matchesWatchlist =
        !watchlistOnly || favorites.includes(property.id);

      return (
        matchesSearch &&
        matchesType &&
        matchesBedrooms &&
        matchesPrice &&
        matchesWatchlist &&
        property.status === "Available"
      );
    });
  }, [search, propertyType, bedrooms, maxPrice, favorites, watchlistOnly]);

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  }

  function resetFilters() {
    setSearch("");
    setPropertyType("All types");
    setBedrooms("Any");
    setMaxPrice("Any");
    setWatchlistOnly(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-lg font-bold text-white">
              L
            </span>
            <span className="text-xl font-bold tracking-tight">
              land<span className="text-emerald-700">checker</span>
            </span>
          </a>

          <nav className="flex items-center gap-4 sm:gap-7">
            <button
              onClick={() => setWatchlistOnly(false)}
              className={`text-sm font-medium ${
                !watchlistOnly
                  ? "text-emerald-800"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setWatchlistOnly(true)}
              className={`flex items-center gap-2 text-sm font-medium ${
                watchlistOnly
                  ? "text-emerald-800"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span aria-hidden="true">♡</span>
              Saved
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800">
                {favorites.length}
              </span>
            </button>
            <span className="hidden rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 sm:inline-block">
              Guest
            </span>
          </nav>
        </div>
      </header>

      <section className="bg-emerald-950">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Find your next place
          </p>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Your property search starts here.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-100/80 sm:text-base">
            Explore properties, narrow down your options, and keep your
            favourites close.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-2 shadow-xl shadow-emerald-950/20"
          >
            <span className="pl-3 text-xl text-slate-400" aria-hidden="true">
              ⌕
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search suburb or property..."
              aria-label="Search suburb or property"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-emerald-800">
              PROPERTY EXPLORER
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Find a property
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Browse listings and save the ones you love.
            </p>
          </div>
          <span className="text-sm text-slate-500">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "property" : "properties"} found
          </span>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Property type
            <select
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option>All types</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Townhouse</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Bedrooms
            <select
              value={bedrooms}
              onChange={(event) => setBedrooms(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option>Any</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3">3 bedrooms</option>
              <option value="4+">4+ bedrooms</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Maximum price
            <select
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="Any">Any price</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="400000">$400,000</option>
              <option value="500000">$500,000</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset filters
            </button>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => {
              const isFavorite = favorites.includes(property.id);

              return (
                <article
                  key={property.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                      {property.type}
                    </span>
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${property.title} from saved properties`
                          : `Save ${property.title}`
                      }
                      aria-pressed={isFavorite}
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-sm transition ${
                        isFavorite
                          ? "bg-rose-500 text-white"
                          : "bg-white/95 text-slate-700 hover:bg-rose-50 hover:text-rose-500"
                      }`}
                    >
                      {isFavorite ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="p-5">
                    <p className="text-xl font-bold tracking-tight text-slate-900">
                      {formatPrice(property.price)}
                    </p>
                    <h3 className="mt-2 text-base font-semibold">
                      {property.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      <span aria-hidden="true">⌖ </span>
                      {property.location}
                    </p>

                    <div className="my-5 flex items-center gap-4 border-y border-slate-100 py-4 text-sm text-slate-600">
                      <span>
                        <strong className="text-slate-900">
                          {property.bedrooms}
                        </strong>{" "}
                        beds
                      </span>
                      <span>
                        <strong className="text-slate-900">
                          {property.bathrooms}
                        </strong>{" "}
                        baths
                      </span>
                      <span className="ml-auto text-xs font-medium text-emerald-700">
                        {property.status}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isFavorite
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                          : "bg-emerald-700 text-white hover:bg-emerald-800"
                      }`}
                    >
                      {isFavorite ? "Saved to watchlist ✓" : "Add to watchlist +"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">No properties found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          Demo listings for the Landchecker coding challenge. Property prices
          are illustrative and shown in AUD.
        </p>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-semibold text-slate-700">landchecker</span>
          <span>Property discovery made simpler.</span>
        </div>
      </footer>
    </main>
  );
}
