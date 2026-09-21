import { contactData, contactItems } from "./contactData";

const ContactInfo = () => {
  if (!contactData) {
    return null;
  }

  return (
    <section className="bg-background-secondary px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactItems.map((item) => {
            const Icon = item.icon;

            if (!Icon || !item.value) {
              return null;
            }

            const content = (
              <div className="flex h-full items-start gap-4 rounded-xl border border-border bg-background p-5 sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
                  <Icon size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-secondary">
                    {item.label}
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-text">
                    {item.value}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.id}
                href={item.href}
                target={item.id === "whatsapp" ? "_blank" : undefined}
                rel={item.id === "whatsapp" ? "noreferrer" : undefined}
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                {content}
              </a>
            ) : (
              <div key={item.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;