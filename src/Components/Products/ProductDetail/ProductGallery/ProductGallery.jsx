import { useState } from "react";

const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product?.images || [];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[90px_1fr]">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-background-secondary ${
              selectedImage === index
                ? "border-primary"
                : "border-border"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 aspect-square overflow-hidden rounded-xl bg-background-secondary md:order-2">
        {images.length > 0 ? (
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-text-secondary">
            No image available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;