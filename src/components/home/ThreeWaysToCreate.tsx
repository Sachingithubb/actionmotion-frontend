import {
  ImagePlay,
  Sparkles,
  WandSparkles,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const creationMethods = [
  {
    number: "01",
    icon: ImagePlay,
    title: "Image to Video",
    description:
      "Upload a photo and transform it into a cinematic video with AI-powered motion and camera movement.",
    action: "Animate an image",
  },
  {
    number: "02",
    icon: WandSparkles,
    title: "Prompt to Video",
    description:
      "Describe the scene you imagine and let ActionMotion turn your words into an engaging AI-generated video.",
    action: "Create from prompt",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Templates",
    description:
      "Choose from creative video concepts and personalize them with your own photo, idea, and style.",
    action: "Explore templates",
  },
];

const ThreeWaysToCreate = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#F8F7FC] px-6 py-24 lg:px-10 lg:py-20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#A855F7]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-[760px] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#7C3AED] shadow-sm">
            <Sparkles size={14} />
            <span>CREATE YOUR WAY</span>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-[#17121F] sm:text-5xl lg:text-6xl">
            Three Ways to Create{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#A855F7] bg-clip-text text-transparent">
              AI Videos
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-[#6B6473] sm:text-lg">
            Start with an image, an idea, or a template. ActionMotion gives you
            the freedom to create videos your way.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {creationMethods.map((method) => {
            const Icon = method.icon;

            return (
              <button
                key={method.number}
                type="button"
                onClick={() => navigate("/create")}
                className="group relative overflow-hidden rounded-[28px] border border-[#E5DDF2] bg-white p-8 text-left shadow-[0_10px_40px_rgba(91,33,182,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C4B5FD] hover:shadow-[0_25px_60px_rgba(124,58,237,0.14)]"
              >
                {/* Top Gradient */}
                <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Background Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#A855F7]/0 blur-[80px] transition-all duration-500 group-hover:bg-[#A855F7]/15" />

                {/* Number */}
                <div className="relative flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED] transition-all duration-300 group-hover:border-[#C4B5FD] group-hover:bg-[#EDE9FE]">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-semibold tracking-wider text-[#DDD6FE] transition-colors duration-300 group-hover:text-[#A855F7]">
                    {method.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-8">
                  <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[#211A2B] transition-colors duration-300 group-hover:text-[#6D28D9]">
                    {method.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[#756D80]">
                    {method.description}
                  </p>
                </div>

                {/* Action */}
                <div className="group/button relative mt-8 flex items-center gap-2 text-sm font-semibold text-[#7C3AED]">
                  <span>{method.action}</span>

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                  />
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreeWaysToCreate;