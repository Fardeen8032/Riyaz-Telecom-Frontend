import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../Utils/api/Api";
import ProductGrid from "../Products/ProductGrid/ProductGrid";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const response = await getProducts({
          page: 1,
          limit: 4,
        });

        // Your API returns products in response.data
        const productList = response?.data ?? [];

        setProducts(
          productList.map((product) => ({
            ...product,
            id: product._id,
            image: product.images?.[0] ?? "",
          }))
        );
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Unable to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-5 py-10 md:px-8 lg:px-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-blue-500">Mobile</p>
          <h2 className="text-3xl font-bold">Accessories</h2>
        </div>

        <Link to="/products" className="text-blue-500">
          View All
        </Link>
      </div>

      {isLoading && <p>Loading products...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && products.length === 0 && (
        <p>No products available.</p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <ProductGrid products={products} />
      )}
    </section>
  );
};

export default FeaturedProducts;