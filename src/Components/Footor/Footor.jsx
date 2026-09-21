import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Services", path: "/services" },
];

const workingHours = [
  { day: "Monday - Sunday", time: "10:00 AM - 11:00 PM" }
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6 lg:gap-10">

          {/* Business Information */}
          <div>
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Riyaz Telecom
            </h2>

            <p className="mt-3 max-w-xs text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
              Your trusted destination for quality products and reliable
              services.
            </p>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-sm font-semibold sm:text-base">
              Working Hours
            </h3>

            <div className="mt-4 space-y-3">
              {workingHours.map(({ day, time }) => (
                <div key={day}>
                  <p className="text-xs text-gray-300 sm:text-sm">
                    {day}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold sm:text-base">
              Quick Links
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              {quickLinks.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="w-fit text-xs text-gray-400 transition-colors hover:text-white sm:text-sm"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold sm:text-base">
              Contact Us
            </h3>

            <div className="mt-4 space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-gray-300"
                />

                <p className="text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                  Shop No. 2, Khairani Road, Pereira Wadi, Opposite Sadaf Hardware, Saki Naka
                  <br />
                  Mumbai, Maharashtra 400072
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+919819267257"
                className="flex items-center gap-3 text-xs text-gray-400 transition-colors hover:text-white sm:text-sm"
              >
                <Phone
                  size={17}
                  strokeWidth={1.5}
                  className="shrink-0 text-gray-300"
                />

                <span>+91 98192 67257</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-[1440px] px-4 py-4 text-center sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <p className="text-[11px] text-gray-500 sm:text-xs">
            © {new Date().getFullYear()} Riyaz Telecom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;