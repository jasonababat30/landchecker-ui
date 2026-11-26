import api from "@/lib/axios";
import { PropertyFilters, PaginatedResponse, Property } from '@/types';

const getProperties = async(
  filters: PropertyFilters = {},
  signal?: AbortSignal,
): Promise<PaginatedResponse<Property>> => {
  const response = await api.get<PaginatedResponse<Property>>(
    "/properties",
    {
      params: filters,
      signal,
    },
  );

  return response.data;
}

export default getProperties;
