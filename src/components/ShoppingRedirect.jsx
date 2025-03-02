// ShoppingRedirect.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShoppingRedirect() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [numResults, setNumResults] = useState(2);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Attempts to load products from an external API.
  // If 'fetch' is unavailable in your environment, add polyfills or use an alternative.
  const fetchResults = async () => {
    if (!product || !quantity || !minPrice || !maxPrice) {
      // Optionally set an error or show a message if missing input
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    const encodedProduct = encodeURIComponent(`${quantity} ${product}`);
    // This is a placeholder URL. Replace with your actual API.
    const apiUrl = `https://api.example.com/search?query=${encodedProduct}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid response format");
      }

      // Enforce a 2-6 item range from the array
      const filteredResults = data.results.slice(0, Math.max(2, Math.min(numResults, 6)));
      setResults(filteredResults);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setError("Failed to load results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto space-y-4 bg-white shadow-lg rounded-xl">
      <CardContent>
        <h1 className="text-xl font-bold text-center">Shopping Search</h1>
        <div className="space-y-2">
          <Input
            placeholder="Enter product (e.g., Lacrosse Head, Gaming Laptop)"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter quantity (e.g., 1)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Min Price ($)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price ($)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Number of results (2-6)"
            value={numResults}
            min="2"
            max="6"
            onChange={(e) => setNumResults(Number(e.target.value))}
          />
          <Button onClick={fetchResults} className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Find Best Deals"}
          </Button>
        </div>

        <div className="space-y-2 mt-4">
          {loading && (
            <p className="text-center text-blue-500">Loading results...</p>
          )}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {!loading && !error && results.length === 0 && (
            <p className="text-center text-gray-500">No results found</p>
          )}
          {results.length > 0 && results.map((item, index) => (
            <div key={index} className="p-3 border rounded-lg shadow-sm">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-semibold"
              >
                {item.name}
              </a>
              <p className="text-sm text-gray-500">Price: ${item.price}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 