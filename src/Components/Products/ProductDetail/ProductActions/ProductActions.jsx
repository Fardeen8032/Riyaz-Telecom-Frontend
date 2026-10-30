import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemToCart } from "../../../../Redux/cart/cartSlice";

const ProductActions = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isOutOfStock = Number(product?.stock ?? 1) <= 0;
  const productId = product?._id ?? product?.id;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    if (!productId) {
      toast.error("Invalid product.");
      return;
    }

    try {
      setIsAddingToCart(true);

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
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await handleAddToCart();
  };

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        disabled={isOutOfStock || isAddingToCart}
        onClick={handleAddToCart}
        className="w-full rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </button>

      <button
        type="button"
        disabled={isOutOfStock || isAddingToCart}
        onClick={handleBuyNow}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductActions;