import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedMobiles } from "../../Utils/api/Api";
import ProductGrid from "../Products/ProductGrid/ProductGrid";

const Mobilecategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedMobiles = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getFeaturedMobiles();
        const featuredMobiles = response?.data ?? [];

        const formattedProducts = featuredMobiles.map((product) => ({
          ...product,
          id: product?._id,
          image: product?.images?.[0] ?? "",
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch featured mobiles:", error);

        setError("Unable to load featured mobiles.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedMobiles();
  }, []);

  return (
    <section className="px-5 py-10 md:px-8 lg:px-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-blue-500">Mobile</p>
          <h2 className="text-3xl font-bold">Featured Mobiles</h2>
        </div>

        <Link to="/products" className="text-blue-500 hover:text-blue-700">
          View All
        </Link>
      </div>

      {isLoading && (
        <p className="py-6 text-gray-500">
          Loading featured mobiles...
        </p>
      )}

      {!isLoading && error && (
        <div className="py-6" role="alert">
          <p className="mb-3 text-red-500">{error}</p>
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <p className="py-6 text-gray-500">
          No featured mobiles available.
        </p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <ProductGrid products={products} />
      )}
    </section>
  );
};

export default Mobilecategory;