import { Link } from "react-router-dom";

const Calltoaction = () => {
  return (
    <section className="bg-[#FAFAFA] px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">

        <div>
          <h2 className="text-2xl font-bold text-[#333333] sm:text-3xl">
            Need Help With Your Mobile?
          </h2>

          <p className="mt-2 text-sm text-[#666666] sm:text-base">
            Get expert mobile repair and support from us.
          </p>
        </div>

        <Link
          to="/contact"
          className="shrink-0 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2a6acc] sm:px-6 sm:py-3"
        >
          Contact Us
        </Link>

      </div>
    </section>
  );
};

export default Calltoaction;