const ShopLocation = () => {
  return (
    <section className="bg-background-secondary px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">
            Find Us
          </p>

          <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            Visit Our Shop
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-text-secondary sm:text-base">
            Visit us at our store for mobile products, repairs,
            accessories, and other services.
          </p>
        </div>

        <div className="mt-8 overflow-hidden border border-border">
          <iframe src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d7167.024302952205!2d72.8898883!3d19.1054123!3m2!1i1024!2i768!4f13.1!2m1!1sShop%20No%202%20Khairani%20Road%20Pereira%20Wadi%20Opposite%20Sadaf%20Hardware%20Saki%20Naka%20Mumbai%20Maharashtra%20400072!5e1!3m2!1sen!2sin!4v1789995693450!5m2!1sen!2sin" width="100%" height="450"  loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>
    </section>
  );
};

export default ShopLocation;