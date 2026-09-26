import { ArrowRight, Play, Sparkles, X } from "lucide-react";
import { useState } from "react";
import homeVideo from "../../assets/videos/homevideo2.mp4";
import demoVideo from "../../assets/videos/homevideo.mp4";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#08060D] pt-[78px]">
        {/* Full Hero Background Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={homeVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#08060D]/45" />

        {/* Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08060D]/60 via-[#08060D]/45 to-[#08060D]/95" />

        {/* Purple Glow */}
        <div className="pointer-events-none absolute left-1/2 top-[25%] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[150px]" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-78px)] max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center lg:px-10">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C084FC]/30 bg-[#7C3AED]/20 px-4 py-2 text-sm text-[#E9D5FF] backdrop-blur-md">
            <Sparkles size={15} className="text-[#C084FC]" />
            <span>Pay once. Create one. No subscription.</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-[1050px] text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[82px]">
            Turn your imagination
            <br />
            <span className="bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#A855F7] bg-clip-text text-transparent">
              into motion.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-[700px] text-base leading-7 text-white/75 sm:text-lg">
            Create stunning AI-generated videos from your images and prompts.
            No subscription, no account, and no long-term commitment.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            {/* Start Creating */}
            <Link
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_50px_rgba(168,85,247,0.65)]"
              to="/create"
            >
              Create a Video
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* See How It Works */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-[15px] font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-[#C084FC]/50 hover:bg-[#7C3AED]/20"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                <Play size={13} fill="currentColor" />
              </span>

              See how it works
            </button>
          </div>

          {/* Trust / Feature Points */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/55">
            <span>No login required</span>

            <span className="h-1 w-1 rounded-full bg-[#A855F7]" />

            <span>Pay per video</span>

            <span className="h-1 w-1 rounded-full bg-[#A855F7]" />

            <span>Download & go</span>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#08060D] to-transparent" />
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-md"
          onClick={() => setIsVideoOpen(false)}
        >
          {/* Modal */}
          <div
            className="relative w-full max-w-[1000px] overflow-hidden rounded-2xl border border-white/10 bg-[#0D0A14] shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all duration-200 hover:border-[#C084FC]/50 hover:bg-[#7C3AED]/70"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video */}
            <div className="aspect-video w-full bg-black">
              <video
                src={demoVideo}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;



