
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("shows login when the user is logged out", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("link", { name: /log in/i }),
    ).toBeInTheDocument();
  });

  it("shows the watchlist when the user is logged in", async () => {
    localStorage.setItem("landchecker_token", "test-token");

    render(<Navbar />);

    expect(
      await screen.findByRole("link", { name: /my watchlist/i }),
    ).toBeInTheDocument();
  });
});
