const AuthLayout = ({ children, title, description }) => {
  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[70vh] max-w-[1440px] items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="text-sm font-medium text-primary">
              Welcome
            </p>

            <h1 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {description}
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-background-secondary p-5 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;