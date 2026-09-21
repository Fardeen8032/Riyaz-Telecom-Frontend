import { whyChooseData } from "./whyChooseData";

const AboutWhyChooseUs = () => {
  const reasons = Array.isArray(whyChooseData)
    ? whyChooseData
    : [];

  if (!reasons.length) {
    return null;
  }

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">
            Why Us
          </p>

          <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            Why Choose Us
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason?.icon;

            if (!Icon) {
              return null;
            }

            return (
              <article
                key={reason.id}
                className="rounded-xl border border-border p-5 sm:p-6"
              >
                <Icon
                  size={26}
                  strokeWidth={1.8}
                  className="text-primary"
                />

                <h3 className="mt-4 font-semibold text-text">
                  {reason.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {reason.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutWhyChooseUs;