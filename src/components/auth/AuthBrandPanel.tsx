import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logopng.png";

const benefits = [
  "Save your video generation history",
  "Access your creations anytime",
  "Unlock monthly creation plans",
];

const AuthBrandPanel = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden px-10 py-10 xl:px-14 xl:py-12">
      {/* Left cinematic gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08040F]/85 via-[#0B0613]/45 to-transparent" />

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#08040F]/80 via-transparent to-transparent" />

      {/* Purple ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-[-100px] h-[380px] w-[380px] rounded-full bg-[#7C3AED]/20 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <Link
          to="/"
          className="group inline-flex flex-col items-start"
        >
          <img
            src={logo}
            alt="ActionMotion"
            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="mt-2 text-[12px] underline font-medium text-white/70 transition-colors group-hover:text-white">
            Home
          </span>
        </Link>


        <h1 className="mt-5 max-w-[470px] text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-white xl:text-[56px]">
          Bring your ideas
          <span className="mt-1 block bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#E9D5FF] bg-clip-text text-transparent">
            to life.
          </span>
        </h1>

        <p className="mt-7 max-w-[470px] text-base leading-7 text-white/65">
          Create cinematic AI videos, save your creations, and keep everything
          in one place.
        </p>
      </div>

      {/* Benefits */}
      <div className="relative z-10 pb-7">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
          With an ActionMotion account
        </p>

        <div className="space-y-3.5">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/35 text-[#D8B4FE] ring-1 ring-[#C084FC]/20">
                <Check size={14} strokeWidth={2.5} />
              </span>

              <span className="text-sm font-medium text-white/75">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthBrandPanel;