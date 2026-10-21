import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CategorySlider = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  if (!Array.isArray(categories) || !categories.length) {
    return null;
  }

  return (
    <div className="mt-6">
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        breakpoints={{
          640: {
            spaceBetween: 12,
          },
          768: {
            spaceBetween: 14,
          },
          1024: {
            spaceBetween: 16,
          },
        }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <SwiperSlide
              key={category}
              className="!w-auto"
            >
              <button
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 sm:px-5 ${
                  isActive
                    ? "border-primary bg-primary text-secondary"
                    : "border-border bg-background text-text hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategorySlider;