import { ArrowUpRight, Mail } from "lucide-react";
import logo from "../../assets/logo/logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#08060D] text-white">
      {/* Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-20 lg:px-10 lg:pt-24">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.08] pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          
          {/* Brand */}
          <div className="max-w-[360px]">
            <a href="/" className="inline-flex items-center">
              <img
                src={logo}
                alt="ActionMotion"
                className="h-[48px] w-auto object-contain"
              />
            </a>

            <p className="mt-6 text-[15px] leading-7 text-white/55">
              Turn your imagination into motion. Create stunning AI-powered
              videos from your ideas, images, and prompts.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xs font-semibold text-white/55 transition-all duration-300 hover:border-[#A855F7]/40 hover:bg-[#A855F7]/10 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xs font-semibold text-white/55 transition-all duration-300 hover:border-[#A855F7]/40 hover:bg-[#A855F7]/10 hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xs font-semibold text-white/55 transition-all duration-300 hover:border-[#A855F7]/40 hover:bg-[#A855F7]/10 hover:text-white"
              >
                IG
              </a>

              <a
                href="mailto:hello@actionmotion.in"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/55 transition-all duration-300 hover:border-[#A855F7]/40 hover:bg-[#A855F7]/10 hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href="#create"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Create
              </a>

              <a
                href="#explore"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Explore
              </a>

              <a
                href="#pricing"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Pricing
              </a>

              <a
                href="#"
                className="flex items-center gap-1 text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Templates
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Help Center
              </a>

              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Documentation
              </a>

              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Blog
              </a>

              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                About
              </a>

              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Careers
              </a>

              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 py-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/40">
            © {new Date().getFullYear()} ActionMotion. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-white/40">
            <span>Made with</span>
            <span className="text-[#A855F7]">✦</span>
            <span>for creators.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;