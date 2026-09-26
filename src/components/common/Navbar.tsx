import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logopng.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.08] bg-[#08060D]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="ActionMotion"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          <Link
            to="/"
            className="text-[14px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
          >
            HOME
          </Link>

          <Link
            to="/create"
            className="text-[14px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
          >
            CREATE
          </Link>

          {/* <Link
            to="/explore"
            className="text-[14px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
          >
            EXPLORE
          </Link> */}

          <Link
            to="/pricing"
            className="text-[14px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
          >
            PRICING
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/login"
            className="text-[14px] font-medium text-white/70 transition-colors duration-200 hover:text-white"
          >
            LOG IN
          </Link>

          <Link
            to="/signup"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            <span className="relative z-10">GET STARTED</span>

            {/* Hover Shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white transition-all duration-200 hover:border-[#A855F7]/50 hover:bg-[#A855F7]/10 md:hidden"
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/[0.08] bg-[#08060D]/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-white/[0.06] py-4 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
            >
              HOME
            </Link>

            <Link
              to="/create"
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-white/[0.06] py-4 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
            >
              CREATE
            </Link>

            {/* <Link
              to="/explore"
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-white/[0.06] py-4 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
            >
              EXPLORE
            </Link> */}

            <Link
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-white/[0.06] py-4 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
            >
              PRICING
            </Link>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl border border-white/10 px-5 py-3 text-center text-sm font-medium text-white/75 transition-all duration-200 hover:border-[#A855F7]/40 hover:bg-[#A855F7]/10 hover:text-white"
              >
                LOG IN
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.45)]"
              >
                GET STARTED
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
