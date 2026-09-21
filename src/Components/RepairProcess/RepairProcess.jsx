import { Processdata } from "./Processdata";

const RepairProcess = () => {
  const steps = Array.isArray(Processdata) ? Processdata : [];

  if (!steps.length) {
    return null;
  }

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">
            Simple Process
          </p>

          <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            How Our Repair Process Works
          </h2>
        </div>

        <div className="mx-auto mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl border border-border p-5 sm:p-6"
            >
              <span className="text-2xl font-bold text-primary">
                {step.number}
              </span>

              <h3 className="mt-4 font-semibold text-text">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RepairProcess;