import {
  Clapperboard,
  Film,
  ImagePlay,
  Megaphone,
  Package,
  Share2,
  Sparkles,
  WandSparkles,
  Zap,
} from "lucide-react";

const creations = [
  {
    icon: Sparkles,
    title: "Text to Video",
    description:
      "Turn your ideas and written prompts into cinematic AI-generated video scenes.",
  },
  {
    icon: ImagePlay,
    title: "Image to Video",
    description:
      "Bring still images to life with natural movement, camera motion, and cinematic energy.",
  },
  {
    icon: WandSparkles,
    title: "AI Creative Videos",
    description:
      "Create unique videos from your ideas, images, prompts, and creative concepts.",
  },
  {
    icon: Megaphone,
    title: "Marketing Content",
    description:
      "Create engaging promotional videos for launches, campaigns, products, and digital marketing.",
  },
  {
    icon: Package,
    title: "Product Videos",
    description:
      "Transform product images into dynamic videos designed to capture attention and showcase products.",
  },
  {
    icon: Share2,
    title: "Social Media Videos",
    description:
      "Create short-form content made for Instagram, YouTube Shorts, and other social platforms.",
  },
  {
    icon: Zap,
    title: "Promo Videos",
    description:
      "Generate eye-catching promotional clips, teasers, announcements, and campaign visuals.",
  },
  {
    icon: Clapperboard,
    title: "Cinematic Stories",
    description:
      "Turn simple ideas into dramatic scenes, visual stories, and cinematic experiences.",
  },
  {
    icon: Film,
    title: "Video Templates",
    description:
      "Start with creative templates and transform your photos and ideas into ready-to-share videos.",
  },
];

const WhatYouCanMake = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 lg:px-10 lg:py-20">
      {/* Background Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[750px] -translate-x-1/2 rounded-full bg-[#A855F7]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-[760px] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#F5F3FF] px-4 py-2 text-xs font-semibold tracking-wide text-[#7C3AED]">
            <Sparkles size={14} />
            <span>CREATE WITHOUT LIMITS</span>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#17121F] sm:text-5xl lg:text-6xl">
            What You Can Make With{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#A855F7] bg-clip-text text-transparent">
              ActionMotion
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-[#6B6473] sm:text-lg">
            From a simple idea to a cinematic video, ActionMotion gives you
            everything you need to turn imagination into motion.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {creations.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative min-h-[190px] overflow-hidden rounded-[22px] border border-[#E7E0F2] bg-white p-7 shadow-[0_8px_30px_rgba(91,33,182,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C4B5FD] hover:bg-[#FCFAFF] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)]"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#A855F7]/0 blur-[70px] transition-all duration-500 group-hover:bg-[#A855F7]/15" />

                {/* Number */}
                <span className="absolute right-6 top-6 text-xs font-semibold text-[#DDD6FE] transition-colors duration-300 group-hover:text-[#A855F7]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED] transition-all duration-300 group-hover:border-[#C4B5FD] group-hover:bg-[#EDE9FE] group-hover:text-[#6D28D9]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-semibold tracking-[-0.02em] text-[#211A2B] transition-colors duration-300 group-hover:text-[#6D28D9]">
                  {item.title}
                </h3>

                <p className="relative mt-3 max-w-[440px] text-sm leading-6 text-[#756D80] transition-colors duration-300 group-hover:text-[#5B5266]">
                  {item.description}
                </p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-7 right-7 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouCanMake;