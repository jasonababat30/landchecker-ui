import { render, screen } from "@testing-library/react";
import Home from "./page";
import { getProperties } from "@/lib/api";

jest.mock("@/lib/api", () => ({
  getProperties: jest.fn(),
}));

jest.mock("@/lib/watchlist", () => ({
  getWatchlist: jest.fn().mockResolvedValue({ data: [] }),
  addToWatchlist: jest.fn(),
  removeFromWatchlist: jest.fn(),
}));

jest.mock("@/lib/auth-storage", () => ({
  getToken: jest.fn(() => null),
}));

jest.mock("@/hooks/usePropertyUpdates", () => ({
  usePropertyUpdates: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const mockProperties = [
  {
    id: 1,
    title: "Family House",
    price: 500000,
    bedrooms: 3,
    property_type: "house",
    status: "available",
    created_at: "2026-11-25T00:00:00Z",
  },
];

describe("Property search page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getProperties as jest.Mock).mockResolvedValue({
      data: mockProperties,
      pagination: {
        page: 1,
        per_page: 10,
        total: 1,
        total_pages: 1,
      },
    });
  });

  it("displays properties returned by the API", async () => {
    render(<Home />);

    expect(await screen.findByText("Family House")).toBeInTheDocument();
    expect(screen.getByText(/500,000/)).toBeInTheDocument();
  });
});
