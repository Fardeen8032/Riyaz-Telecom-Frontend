import ProductActions from "../ProductActions/ProductActions";

const ProductInfo = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div>
      <p className="text-sm font-medium text-primary">
        {product?.category}
      </p>

      <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl lg:text-4xl">
        {product?.name}
      </h1>

      <p className="mt-4 text-2xl font-bold text-primary">
        ₹{product?.price?.toLocaleString("en-IN")}
      </p>

      <div className="mt-4">
        <p className="text-sm font-medium text-text">
          Brand
        </p>

        <p className="mt-1 text-sm text-text-secondary">
          {product?.brand}
        </p>
      </div>



      <div className="mt-6 border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-text">
          Description
        </h2>

        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary sm:text-base">
          {product?.description || "No description available."}
        </p>
      </div>

      <ProductActions product={product} />
    </div>
  );
};

export default ProductInfo;