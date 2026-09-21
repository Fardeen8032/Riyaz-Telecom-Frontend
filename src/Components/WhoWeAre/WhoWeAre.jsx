import { whoWeAreData } from "./whoWeAreData";

const WhoWeAre = () => {
  const { title, description } = whoWeAreData;

  if (!title || !description) {
    return null;
  }

  return (
    <section className="bg-background-secondary px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="text-sm font-medium text-primary">
          About Us
        </p>

        <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
          {title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
};

export default WhoWeAre;