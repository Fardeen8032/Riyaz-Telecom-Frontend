import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getProductById,getRelatedProducts} from "../../../Utils/api/Api";
import ProductGallery from "../../../Components/Products/ProductDetail/ProductGallery/ProductGallery";
import ProductInfo from "../../../Components/Products/ProductDetail/ProductInfo/ProductInfo";
import RelatedProducts from "../../../Components/Products/ProductDetail/RelatedProducts/RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [productResponse, relatedResponse] =
          await Promise.all([
            getProductById(id),
            getRelatedProducts(id),
          ]);

        const productData = productResponse?.data;

        const productsData = relatedResponse?.data || [];

        setProduct(productData);

        const formattedRelatedProducts = productsData.map(
          (item) => ({
            ...item,
            id: item._id,
          })
        );

        setRelatedProducts(formattedRelatedProducts);
      } catch (error) {
        console.error(
          "Failed to load product details:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load product details."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  return (
     <>
        {isLoading && (
          <section className="bg-background px-4 py-10 sm:px-6 md:px-8 lg:px-10">
            <div className="mx-auto flex min-h-[500px] max-w-[1440px] items-center justify-center">
              <p className="text-sm text-text-secondary">
                Loading product...
              </p>
            </div>
          </section>
        )}

        {!isLoading && error && (
          <section className="bg-background px-4 py-10 sm:px-6 md:px-8 lg:px-10">
            <div className="mx-auto max-w-[1440px]">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            </div>
          </section>
        )}

        {!isLoading && !error && !product && (
          <section className="bg-background px-4 py-10">
            <div className="mx-auto max-w-[1440px]">
              <p className="text-sm text-text-secondary">
                Product not found.
              </p>
            </div>
          </section>
        )}

        {!isLoading && !error && product && (
          <main className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
            <div className="mx-auto max-w-[1440px]">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                <ProductGallery product={product} />

                <ProductInfo product={product} />
              </div>

              <RelatedProducts products={relatedProducts} />
            </div>
          </main>
        )}
      </>
   )
};

export default ProductDetail;