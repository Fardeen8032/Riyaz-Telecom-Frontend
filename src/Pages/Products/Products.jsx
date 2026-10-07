import { useEffect, useState } from "react";
import CategorySlider from "../../Components/Products/CategorySlider/CategorySlider";
import ProductGrid from "../../Components/Products/ProductGrid/ProductGrid";
import Pagination from "../../Components/Products/Pagination/Pagination";
import { getCategories, getProducts } from "../../Utils/api/Api";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchCategories = async () => {
      try {
        const response = await getCategories();

        const fetchedCategories = response?.data?.categories || [];

        setCategories(["All", ...fetchedCategories]);
      } catch (error) {
        console.error("Failed to load categories:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load categories."
        );
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getProducts({
          page: currentPage,
          limit: 12,
          category: activeCategory !== "All" ? activeCategory : "",
        });

        const formattedProducts = (response?.data || []).map(
          (product) => ({
            ...product,
            id: product._id,
          })
        );

        setProducts(formattedProducts);

        const paginationData = response?.pagination;

        setPagination({
          page: paginationData?.page || currentPage,
          limit: paginationData?.limit || 12,
          total: paginationData?.total || 0,
          totalPages: paginationData?.totalPages || 1,
        });
      } catch (error) {
        console.error("Failed to load products:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage,activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}

        <div>
          <p className="text-sm font-medium text-primary">
            Our Collection
          </p>

          <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            All Products
          </h1>

          <p className="mt-2 text-sm text-text-secondary sm:text-base">
            Browse our latest mobiles, accessories and more.
          </p>
        </div>

        {/* Categories */}

        <CategorySlider
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-text-secondary">
              Loading products...
            </p>
          </div>
        ) : (
          <>
            {/* Product Count */}

            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                {pagination.total}{" "}
                {pagination.total === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Products */}

            <div className="mt-5">
              <ProductGrid products={products} />
            </div>

            {/* Pagination */}

            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Products;