import { offerData } from "./offerData";

const WhatWeOffer = () => {
  const offers = Array.isArray(offerData) ? offerData : [];

  if (!offers.length) {
    return null;
  }

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">
            Our Services
          </p>

          <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            What We Offer
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            From mobile sales and repairs to recharges and accessories,
            we provide convenient solutions for all your mobile needs.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;

            if (!Icon) {
              return null;
            }

            return (
              <article
                key={offer.id}
                className="group rounded-xl border border-border bg-primary  p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-start rounded-lg bg-primary text-secondary">
                  <Icon size={24} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white transition-colors duration-200 group-hover:text-secondary sm:text-xl">
                  {offer.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {offer.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;