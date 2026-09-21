import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { bannerData } from "./bannerData";

const HomeBanner = () => {
  if (!bannerData?.length) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        loop={bannerData.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={bannerData.length > 1}
        pagination={{
          clickable: true,
        }}
        a11y={{
          enabled: true,
        }}
        className="home-banner"
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full">
              {/* Banner Image */}
              <img
                src={banner.image}
                alt={banner.alt}
                className="block h-[300px] w-full object-cover sm:object-cover
                           sm:h-[300px]
                           sm:h-[350px]
                           md:h-[420px]
                           lg:h-[500px]
                           xl:h-[600px]"
              />
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div
                  className="mx-auto w-full max-w-[1440px]
                             px-4
                             sm:px-6
                             md:px-8
                             lg:px-10
                             xl:px-12"
                >
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeBanner;