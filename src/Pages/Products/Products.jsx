import { useMemo, useState } from "react";
import { productsData } from "../../Components/Products/Data/productsData";
import CategorySlider from "../../Components/Products/CategorySlider/CategorySlider";
import ProductGrid from "../../Components/Products/ProductGrid/ProductGrid";
import Pagination from "../../Components/Products/Pagination/Pagination";

const PRODUCTS_PER_PAGE = 8;

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const products = Array.isArray(productsData)
    ? productsData.filter(
        (product) =>
          product?.id &&
          product?.name &&
          product?.category &&
          product?.image
      )
    : [];

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [products, activeCategory]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const currentProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PRODUCTS_PER_PAGE;

    return filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
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

          {/* Product Count */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </p>
          </div>

          {/* Products */}
          <div className="mt-5">
            <ProductGrid products={currentProducts} />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default Products;