import { Link } from "react-router-dom";
import logo from "../../assets/logo/logopng.png";

const AuthHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-6 sm:px-10">
      <Link
        to="/"
        className="inline-flex items-center transition-opacity duration-200 hover:opacity-80"
      >
        <img
          src={logo}
          alt="ActionMotion"
          className="h-9 w-auto object-contain"
        />
      </Link>

      <div className="flex items-center gap-2 text-sm text-[#756D80]">
        <span className="hidden sm:inline">Already have an account?</span>

        <Link
          to="/login"
          className="font-semibold text-[#7C3AED] transition-colors hover:text-[#6D28D9]"
        >
          Log in
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;