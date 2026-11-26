export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
};

export type Property = {
  id: number;
  title: string;
  price: number | string;
  bedrooms: number;
  property_type: "house" | "apartment" | "townhouse";
  status: "available" | "sold";
  created_at: string;
};

export type PropertyFilters = {
  min_price?: string;
  max_price?: string;
  bedrooms?: string;
  property_type?: string;
  page?: number;
  per_page?: number;
  title?: string;
};