import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {Heart,ShoppingCart,User,Menu,X} from "lucide-react";
import { useWishlist } from "../../Context/WishlistContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-100 bg-primary">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-[#FFFFFF]"
        >
          Riyaz Telecom
        </Link>
        {/* Desktop Navigation */}
        <div className="ml-auto hidden items-center md:flex">
          <div className="flex items-center gap-7 lg:gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-1 text-xs font-medium text-white transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white
                after:transition-all after:duration-300
                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative py-1 text-xs font-medium text-white transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white
                after:transition-all after:duration-300
                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative py-1 text-xs font-medium text-white transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white
                after:transition-all after:duration-300
                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `relative py-1 text-xs font-medium text-white transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-white
                after:transition-all after:duration-300
                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`
              }
            >
              Services
            </NavLink>
          </div>

          {/* Actions */}
          <div className="ml-8 flex items-center gap-5">
            <Link
              to="/wishlist"
              className="relative text-white transition-opacity duration-200 hover:opacity-70"
              aria-label={`Wishlist with ${wishlistCount} ${
                wishlistCount === 1 ? "item" : "items"
              }`}
            >
              <Heart size={19} strokeWidth={1.5} />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold leading-none text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="Shopping cart"
              className="text-white transition-opacity duration-200 hover:opacity-70"
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              aria-label="Account"
              className="text-white transition-opacity duration-200 hover:opacity-70"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="ml-auto flex items-center justify-center text-white md:hidden"
        >
          {isMenuOpen ? (
            <X size={23} strokeWidth={1.7} />
          ) : (
            <Menu size={23} strokeWidth={1.7} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-primary md:hidden">
          <div className="px-4 py-4 sm:px-6">
            {/* Mobile Navigation */}
            <div className="flex flex-col">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="border-b border-gray-100 py-3 text-sm text-[#FFFFFF]"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="border-b border-gray-100 py-3 text-sm text-[#FFFFFF]"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="border-b border-gray-100 py-3 text-sm text-[#FFFFFF]"
              >
                Contact Us
              </Link>

              <Link
                to="/services"
                onClick={closeMobileMenu}
                className="py-3 text-sm text-[#FFFFFF]"
              >
                Services
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="mt-4 flex items-center gap-6">

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="relative text-white transition-opacity duration-200 hover:opacity-70"
                aria-label={`Wishlist with ${wishlistCount} ${
                  wishlistCount === 1 ? "item" : "items"
                }`}
              >
                <Heart size={19} strokeWidth={1.5} />

                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold leading-none text-white">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                aria-label="Shopping cart"
                className="text-white"
              >
                <ShoppingCart size={19} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                aria-label="Account"
                className="text-white"
              >
                <User size={19} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;