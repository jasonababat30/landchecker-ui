import { useMemo } from "react";
import type { Property } from "@/types";
import getPropertyIcon from "@/utils/property-icon";

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSaved: (propertyId: number) => void;
}

const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(Number(price));
};

const PropertyCard = ({
  property,
  isSaved,
  onToggleSaved,
}: PropertyCardProps) => {
    const propertyIcon = useMemo(() => getPropertyIcon(property.property_type), [property.property_type]);

    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100">
            <span className="text-5xl" aria-hidden="true">
            {propertyIcon}
            </span>
        </div>

        <div className="p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-800">
                {property.property_type}
            </span>

            <button
                type="button"
                onClick={() => onToggleSaved(property.id)}
                aria-pressed={isSaved}
                aria-label={
                isSaved
                    ? `Remove ${property.title} from saved properties`
                    : `Save ${property.title}`
                }
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                isSaved
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-300 text-slate-600 hover:border-emerald-700 hover:text-emerald-700"
                }`}
            >
                {isSaved ? "♥ Saved" : "♡ Save"}
            </button>
            </div>

            <h3 className="text-lg font-semibold">{property.title}</h3>

            <p className="mt-2 text-2xl font-bold text-emerald-700">
            {formatPrice(property.price)}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-600">
            <span>
                🛏️ {property.bedrooms}{" "}
                {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </span>

            <span className="capitalize">{property.status}</span>
            </div>
        </div>
        </article>
    );
};

export default PropertyCard;
