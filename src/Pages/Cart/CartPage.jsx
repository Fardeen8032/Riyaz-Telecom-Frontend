import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {ArrowRight,Minus,Plus,ShoppingBag,Trash2} from "lucide-react";
import {changeCartItemQuantity,deleteCartItem} from "../../Redux/cart/cartSlice";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount ?? 0));

const CartPage = () => {
  const dispatch = useDispatch();
  const {items,subtotal,totalGst,totalAmount,status,error,actionStatus} = useSelector((state) => state.cart);
  const isLoading = status === "loading";
  const isUpdating = actionStatus === "loading";
  const itemCount = items.reduce((total, item) => total + Number(item?.quantity ?? 0),0);

  const handleQuantityChange = (productId, quantity) => {
    if (!productId || !Number.isInteger(quantity) || quantity < 1) {
      return;
    }
    dispatch(changeCartItemQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    if (!productId) return;
    dispatch(deleteCartItem(productId));
  };

  {isLoading && (
      <section className="px-4 py-16 text-center">
        <p className="text-text-secondary">Loading your cart...</p>
      </section>
    )}

    {status === "failed" && items.length === 0 && (
      <section className="px-4 py-16 text-center">
        <p role="alert" className="text-error">
          {error || "Unable to load your cart."}
        </p>

        <Link
          to="/products"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          <ShoppingBag size={17} />
          Explore Products
        </Link>
      </section>
    )}

    {!isLoading && status !== "failed" && items.length === 0 && (
      <section className="bg-background px-4 py-16 sm:px-6">
        <div className="mx-auto flex min-h-[45vh] max-w-lg flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background-secondary">
            <ShoppingBag
              size={34}
              strokeWidth={1.5}
              className="text-text-secondary"
            />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-text sm:text-3xl">
            Your Cart Is Empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Explore our collection and add products to your shopping cart.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>
      </section>
    )}

  return (
    <section className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Your Shopping Bag</p>

          <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {error && (
          <p role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Cart and Order Summary */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
          {/* Left: Cart Items */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="hidden grid-cols-[minmax(0,1fr)_100px_120px] gap-4 border-b border-border bg-background-secondary px-5 py-4 text-xs font-semibold uppercase tracking-wide text-text-secondary sm:grid">
                <span>Product</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Subtotal</span>
              </div>

              <div className="divide-y divide-border">
                {items.map((item) => {
                  const product = item?.product;
                  const productId = product?._id ?? product?.id;
                  const quantity = Number(item?.quantity ?? 1);
                  const price = Number(product?.price ?? 0);
                  const imageUrl = product?.images?.[0] ?? "";

                  return (
                    <article
                      key={productId}
                      className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_100px_120px] sm:items-center sm:gap-4 sm:p-5"
                    >
                      {/* Product Details */}
                      <div className="flex min-w-0 gap-4">
                        <Link
                          to={productId ? `/products/${productId}` : "/products"}
                          className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background-secondary sm:h-28 sm:w-28"
                        >
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt={product?.name ?? "Product image"}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.visibility = "hidden";
                              }}
                              className="h-full w-full object-contain"
                            />
                          )}
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col items-start">
                          <p className="text-xs text-text-secondary">
                            {product?.brand ?? "Unbranded"}
                          </p>

                          <Link
                            to={productId ? `/products/${productId}` : "/products"}
                            className="mt-1 line-clamp-2 text-sm font-semibold text-text hover:text-primary sm:text-base"
                          >
                            {product?.name ?? "Product unavailable"}
                          </Link>

                          <p className="mt-2 text-sm font-semibold text-primary">
                            {formatCurrency(price)}
                          </p>

                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleRemoveItem(productId)}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-error hover:opacity-70 disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-center">
                        <span className="text-xs text-text-secondary sm:hidden">
                          Quantity
                        </span>

                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${product?.name ?? "product"}`}
                            disabled={isUpdating || quantity <= 1}
                            onClick={() =>
                              handleQuantityChange(productId, quantity - 1)
                            }
                            className="p-2 text-text transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="min-w-8 text-center text-sm font-medium text-text">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase quantity of ${product?.name ?? "product"}`}
                            disabled={isUpdating || !productId}
                            onClick={() =>
                              handleQuantityChange(productId, quantity + 1)
                            }
                            className="p-2 text-text transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end">
                        <span className="text-xs text-text-secondary sm:hidden">
                          Subtotal
                        </span>

                        <p className="text-sm font-semibold text-text">
                          {formatCurrency(price * quantity)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <Link
              to="/products"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-70"
            >
              <ArrowRight size={16} className="rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Right: Order Summary */}
          <aside className="rounded-xl border border-border bg-background p-5 sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-text">Order Summary</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-text-secondary">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>

                <span className="font-medium text-text">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-text-secondary">GST</span>

                <span className="font-medium text-text">
                  {formatCurrency(totalGst)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-text-secondary">Shipping</span>

                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-text">Total</span>

                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <p className="mt-2 text-xs text-text-secondary">
                  Includes applicable GST. Shipping is currently free.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={items.length === 0 || isUpdating}
              onClick={() => {
                // Integrate your checkout flow here.
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Checkout
              <ArrowRight size={17} />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-secondary">
              <ShoppingBag size={14} />
              Secure checkout
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartPage;