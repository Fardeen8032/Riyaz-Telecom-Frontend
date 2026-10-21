import { useNavigate } from "react-router-dom";
import WishlistButton from "../../Wishlist/WishlistButton";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  if (!product?._id || !product?.name) {
    return null;
  }
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-background-secondary">
        <WishlistButton product={product} />

        <img
          src={product?.image}
          alt={product?.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-3 sm:p-4 cursor-pointer"  onClick={() => navigate(`/products/${product.id}`)}>
        <p className="text-xs font-medium text-text-secondary sm:text-sm">
          {product.category}
        </p>

        <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-text sm:text-base">
          {product.name}
        </h2>

        <p className="mt-2 text-sm font-semibold text-primary sm:text-base">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;