const ProductActions = ({ product }) => {
  const isOutOfStock = product?.stock <= 0;

  const handleAddToCart = () => {
    console.log("Add to cart:", product);
  };

  const handleBuyNow = () => {
    console.log("Buy now:", product);
  };

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        disabled={isOutOfStock}
        onClick={handleAddToCart}
        className="w-full rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        Add to Cart
      </button>

      <button
        type="button"
        disabled={isOutOfStock}
        onClick={handleBuyNow}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductActions;