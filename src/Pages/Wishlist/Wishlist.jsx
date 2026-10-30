import { Heart, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import WishlistButton from "../../Components/Wishlist/WishlistButton";
import { useWishlist } from "../../Context/WishlistContext";
import { addItemToCart } from "../../Redux/cart/cartSlice";

const Wishlist = () => {
  const {wishlist,wishlistCount,removeFromWishlist,clearWishlist} = useWishlist();
  const dispatch = useDispatch();
  const hasProducts = wishlist.length > 0;

  const handleAddToCart = async (product) => {
    const productId = product?._id ?? product?.id;

    if (!productId) {
      toast.error("Unable to add this product to your cart.");
      return;
    }

    try {
      await dispatch(
        addItemToCart({
          productId,
          quantity: 1,
        })
      ).unwrap();

      toast.success("Product added to cart.");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Unable to add this product to your cart."
      );
    }
  };

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {!hasProducts && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex max-w-md flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background-secondary">
                <Heart
                  size={34}
                  strokeWidth={1.5}
                  className="text-text-secondary"
                />
              </div>

              <h1 className="mt-6 text-2xl font-bold text-text sm:text-3xl">
                Your Wishlist Is Empty
              </h1>

              <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
                Save products you like to your wishlist and find them here
                whenever you want.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-primary-hover"
              >
                <ShoppingBag size={17} />
                Explore Products
              </Link>
            </div>
          </div>
        )}

        {hasProducts && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-primary">
                  Saved Products
                </p>

                <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
                  My Wishlist
                </h1>

                <p className="mt-2 text-sm text-text-secondary">
                  {wishlistCount}{" "}
                  {wishlistCount === 1 ? "product" : "products"} saved
                </p>
              </div>

              <button
                type="button"
                onClick={clearWishlist}
                className="hidden items-center gap-2 text-sm font-medium text-error transition-opacity hover:opacity-70 sm:flex"
              >
                <Trash2 size={16} />
                Clear Wishlist
              </button>
            </div>

            {/* Products */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
              {wishlist.map((product) => (
                <article
                  key={product?._id ?? product?.id}
                  className="group overflow-hidden rounded-xl border border-border bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Product Image and Actions */}
                  <div className="relative aspect-square overflow-hidden bg-background">
                    <WishlistButton product={product} />

                    <button
                      type="button"
                      title="Add to Cart"
                      aria-label={`Add ${product?.name ?? "product"} to cart`}
                      onClick={() => handleAddToCart(product)}
                      className="absolute right-2 top-[50px] z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-transform duration-200 hover:scale-105"
                    >
                      <ShoppingCart size={18} strokeWidth={1.8} />
                    </button>

                    <img
                      src={product?.images?.[0] ?? ""}
                      alt={product?.name ?? "Product image"}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-3 sm:p-4">
                    <p className="text-xs font-medium text-text-secondary sm:text-sm">
                      {product?.category ?? "Uncategorized"}
                    </p>

                    <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-text sm:text-base">
                      {product?.name ?? "Unnamed product"}
                    </h2>

                    {product?.price != null && (
                      <p className="mt-2 text-sm font-semibold text-primary">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product?._id ?? product?.id)}
                      className="mt-3 cursor-pointer text-xs font-medium text-error hover:opacity-70"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile Clear */}
            <button
              type="button"
              onClick={clearWishlist}
              className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-error sm:hidden"
            >
              <Trash2 size={16} />
              Clear Wishlist
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;