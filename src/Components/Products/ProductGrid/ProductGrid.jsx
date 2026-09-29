import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({ products }) => {
  if (!Array.isArray(products) || !products.length) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-lg font-semibold text-text">
          No products found
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          Try selecting another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;