import { servicesdata } from "./Servicelistdata";

const Servicelist = () => {
  const services = Array.isArray(servicesdata) ? servicesdata : [];

  if (!services.length) {
    return null;
  }

  return (
    <section className="bg-background-secondary px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">
            What We Do
          </p>

          <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            Our Services
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-6">
          {services.map((service) => {
            const Icon = service?.icon;

            if (!Icon) {
              return null;
            }

            return (
              <article
                key={service.id}
                className="rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-secondary">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-text">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Servicelist