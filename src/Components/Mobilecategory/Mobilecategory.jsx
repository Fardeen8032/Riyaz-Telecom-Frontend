import { Link } from "react-router-dom";
import { mobileData } from "./Mobilecategorydata";

const Mobilecategory = () => {
  const products = Array.isArray(mobileData) ? mobileData : [];

  if (!products.length) {
    return null;
  }

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">
              Featured
            </p>

            <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
              Mobile
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden shrink-0 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary-hover sm:block"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {products.map((product) => {
            if (!product?.id || !product?.name || !product?.image) {
              return null;
            }

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-xl border border-border bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-[#FFFFFF]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Information */}
                <div className="p-3 sm:p-4">
                  <p className="text-xs font-medium text-text-secondary sm:text-sm">
                    {product.category}
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-text sm:text-base">
                    {product.name}
                  </h3>

                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-text sm:text-base">
                    {product.price}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-primary-hover"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mobilecategory;