import { ownerData } from "./aboutData";

const AboutHero = () => {
  const owner = ownerData;

  if (!owner?.name || !owner?.image || !owner?.description) {
    return null;
  }

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
        {/* Owner Image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={owner.image}
            alt={owner.name}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        {/* Owner Information */}
        <div>
          <p className="text-sm font-medium text-primary">
            Meet Shop Owner
          </p>

          <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            {owner.name}
          </h1>

          <p className="mt-2 text-base font-medium text-primary">
            {owner.role}
          </p>

          <p className="mt-5 text-sm leading-7 text-text-secondary sm:text-base">
            {owner.description}
          </p>

          <div className="mt-6 inline-flex rounded-lg bg-background-secondary px-4 py-3">
            <span className="text-sm font-semibold text-text">
              {owner.experience}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;