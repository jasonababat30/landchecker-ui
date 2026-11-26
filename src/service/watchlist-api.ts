import api from "@/lib/axios";
import type { WatchlistResponse } from "@/types";

const getWatchlist = async(): Promise<WatchlistResponse> => {
  const response = await api.get<WatchlistResponse>("/watchlist");
  return response.data;
}

export const addToWatchlist = async(
  propertyId: number,
): Promise<void> => {
  await api.post("/watchlist", {
    property_id: propertyId,
  });
}

export const removeFromWatchlist = async (
  propertyId: number,
): Promise<void> => {
  await api.delete(`/watchlist/${propertyId}`);
}

export default getWatchlist;
