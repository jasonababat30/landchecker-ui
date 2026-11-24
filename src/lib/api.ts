
import api from "./axios";

export type Property = {
  id: number;
  title: string;
  price: number | string;
  bedrooms: number;
  property_type: "house" | "apartment" | "townhouse";
  status: "available" | "sold";
  created_at: string;
};

export type PaginatedProperties = {
  data: Property[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
};

export type PropertyFilters = {
  min_price?: string;
  max_price?: string;
  bedrooms?: string;
  property_type?: string;
  page?: number;
  per_page?: number;
};

export async function getProperties(
  filters: PropertyFilters = {},
  signal?: AbortSignal,
): Promise<PaginatedProperties> {
  const response = await api.get<PaginatedProperties>(
    "/properties",
    {
      params: filters,
      signal,
    },
  );

  return response.data;
}
