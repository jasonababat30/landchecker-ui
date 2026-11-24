import api from "./axios";
import type { Property } from "./api";

export type WatchlistResponse = {
  data: Property[];
};

export async function getWatchlist(): Promise<WatchlistResponse> {
  const response = await api.get<WatchlistResponse>("/watchlist");
  return response.data;
}

export async function addToWatchlist(
  propertyId: number,
): Promise<void> {
  await api.post("/watchlist", {
    property_id: propertyId,
  });
}

export async function removeFromWatchlist(
  propertyId: number,
): Promise<void> {
  await api.delete(`/watchlist/${propertyId}`);
}
