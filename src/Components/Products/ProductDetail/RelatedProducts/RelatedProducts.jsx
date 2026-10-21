import ProductGrid from "../../ProductGrid/ProductGrid";

const RelatedProducts = ({ products }) => {
  if (!products?.length) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-border pt-10">
      <div>
        <p className="text-sm font-medium text-primary">
          You May Also Like
        </p>

        <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
          Related Products
        </h2>
      </div>

      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default RelatedProducts;