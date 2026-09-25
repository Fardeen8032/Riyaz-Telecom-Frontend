import { Heart } from "lucide-react";
import { useWishlist } from "../../Context/WishlistContext";

const WishlistButton = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product?.id) {
    return null;
  }

  const active = isInWishlist(product.id);

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      aria-label={
        active
          ? `Remove ${product.name} from wishlist`
          : `Add ${product.name} to wishlist`
      }
      aria-pressed={active}
      className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform duration-200 hover:scale-105"
    >
      <Heart
        size={19}
        strokeWidth={1.8}
        className={
          active
            ? "fill-red-500 text-red-500"
            : "fill-transparent text-white"
        }
      />
    </button>
  );
};

export default WishlistButton;