
import type { Property } from "@/types";
import getPropertyIcon from "@/utils/property-icon";

type PropertyWatchlistCardProps = {
  property: Property;
  onRemove: (propertyId: number) => void;
};

const PropertyWatchlistCard = ({
  property,
  onRemove,
}: PropertyWatchlistCardProps) => {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Property type image area */}
      <div
        className={`flex h-40 items-center justify-center bg-gray-100 ${
            property.status === "sold" ? "grayscale" : ""
        }`}
      >
        <span
            className="text-7xl"
            role="img"
            aria-label={property.property_type}
        >
            {getPropertyIcon(property.property_type)}
        </span>
      </div>

      {/* Property details */}
      <div className="p-5">
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
          {property.bedrooms} bedrooms · {property.property_type}
        </p>

        <button
          type="button"
          onClick={() => onRemove(property.id)}
          className="mt-5 rounded-lg border border-red-200 px-4 py-2 text-red-700 hover:bg-red-50"
        >
          Remove from watchlist
        </button>
      </div>
    </article>
  );
};

export default PropertyWatchlistCard;
