
import { render, screen } from "@testing-library/react";
import Home from "./page";
import getProperties from "@/service/property-api";

jest.mock("@/service/property-api", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/service/watchlist-api", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({ data: [] }),
  addToWatchlist: jest.fn(),
  removeFromWatchlist: jest.fn(),
}));

jest.mock("@/lib/auth-storage", () => ({
  getToken: jest.fn(() => null),
}));

jest.mock("@/hooks/usePropertyUpdates", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("@/components/home/LoadingProperties", () => ({
  __esModule: true,
  default: () => <div>Loading properties...</div>,
}));

jest.mock("@/components/home/ErrorLoadingProperties", () => ({
  __esModule: true,
  default: ({ error }: { error: string }) => <div>{error}</div>,
}));

jest.mock("@/components/home/PropertyCard", () => ({
  __esModule: true,
  default: ({
    property,
  }: {
    property: {
      id: number;
      title: string;
      price: number | string;
    };
  }) => (
    <div>
      <h2>{property.title}</h2>
      <p>{Number(property.price).toLocaleString("en-AU")}</p>
    </div>
  ),
}));

jest.mock("@/components/Footer", () => ({
  __esModule: true,
  default: () => <footer>Footer</footer>,
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
        per_page: 6,
        total: 1,
        total_pages: 1,
      },
    });
  });

  it("displays properties returned by the API", async () => {
    render(<Home />);

    expect(await screen.findByText("Family House")).toBeInTheDocument();
    expect(screen.getByText("500,000")).toBeInTheDocument();
  });
});
