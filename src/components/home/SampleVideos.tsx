import { Play, Sparkles } from "lucide-react";
import homeVideo from "../../assets/videos/homevideo.mp4";

const sampleVideos = [
  {
    title: "Cinematic Portrait",
    category: "Image to Video",
    description: "Turn a simple photo into a cinematic moving portrait.",
    size: "large",
  },
  {
    title: "Creative Story",
    category: "AI Creative",
    description: "Bring your imagination to life with AI-generated scenes.",
    size: "small",
  },
  {
    title: "Product Showcase",
    category: "Product Video",
    description: "Create engaging visuals for products and brands.",
    size: "small",
  },
  {
    title: "Social Media Reel",
    category: "Social Media",
    description: "Create scroll-stopping videos ready to share.",
    size: "small",
  },
  {
    title: "Cinematic Scene",
    category: "Prompt to Video",
    description: "Describe your idea and turn it into motion.",
    size: "small",
  },
];

const SampleVideos = () => {
  return (
    <section
      id="explore"
      className="relative overflow-hidden bg-white px-6 py-24 sm:py-28 lg:px-10 lg:py-6"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#A855F7]/[0.07] blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A855F7]/20 bg-[#A855F7]/[0.07] px-4 py-2 text-sm font-medium text-[#7C3AED]">
            <Sparkles size={15} />
            <span>Made with ActionMotion</span>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-[#17121F] sm:text-5xl lg:text-6xl">
            See what’s possible
            <span className="block bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] bg-clip-text text-transparent">
              with ActionMotion.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-base leading-7 text-[#6B6472] sm:text-lg">
            Explore AI-generated videos created from simple ideas, images, and
            prompts. Your imagination is the only limit.
          </p>
        </div>

        {/* Featured Video */}
        <div className="mt-16">
          <div className="group relative overflow-hidden rounded-[28px] border border-[#E9E2F1] bg-[#F8F5FC] shadow-[0_25px_80px_rgba(124,58,237,0.10)]">
            <div className="relative aspect-[16/8] overflow-hidden">
              <video
                src={homeVideo}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

              {/* Play Button */}
              <button
                type="button"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#7C3AED]"
                aria-label="Play sample video"
              >
                <Play size={23} fill="currentColor" />
              </button>

              {/* Featured Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <div>
                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      {sampleVideos[0].category}
                    </span>

                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      {sampleVideos[0].title}
                    </h3>

                    <p className="mt-2 max-w-[560px] text-sm leading-6 text-white/70 sm:text-base">
                      {sampleVideos[0].description}
                    </p>
                  </div>

                  <span className="hidden text-sm font-medium text-white/60 sm:block">
                    AI Generated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Videos */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sampleVideos.slice(1).map((video) => (
            <div
              key={video.title}
              className="group overflow-hidden rounded-[22px] border border-[#E9E2F1] bg-white shadow-[0_12px_40px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A855F7]/30 hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)]"
            >
              {/* Video */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F1FA]">
                <video
                  src={homeVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

                {/* Play */}
                <button
                  type="button"
                  className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#7C3AED] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                  aria-label={`Play ${video.title}`}
                >
                  <Play size={16} fill="currentColor" />
                </button>

                {/* Category */}
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                  {video.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[17px] font-semibold text-[#17121F]">
                  {video.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#756E7D]">
                  {video.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#7C3AED]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
                  AI Generated
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(168,85,247,0.35)]"
          >
            Create Your Own Video
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SampleVideos;