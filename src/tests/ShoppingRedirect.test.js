import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingRedirect from "../components/ShoppingRedirect";

describe("ShoppingRedirect", () => {
  test("renders input fields and button", () => {
    render(<ShoppingRedirect />);
    expect(screen.getByPlaceholderText(/Enter product/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter quantity/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Number of results/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Best Deals/i)).toBeInTheDocument();
  });

  test("shows loading state when fetching", async () => {
    render(<ShoppingRedirect />);
    fireEvent.change(screen.getByPlaceholderText(/Enter product/i), {
      target: { value: "Laptop" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter quantity/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Min Price/i), {
      target: { value: "300" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Max Price/i), {
      target: { value: "1500" },
    });
    const button = screen.getByRole("button", { name: /find best deals/i });

    fireEvent.click(button);
    // The loading text should appear
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  });

  // Additional tests can verify results display, error handling, etc.
}); 