import { Image, LayoutTemplate, WandSparkles } from "lucide-react";

export type CreationMode = "image" | "prompt" | "template";

interface CreationModesProps {
  activeMode: CreationMode;
  onModeChange: (mode: CreationMode) => void;
}

const CreationModes = ({
  activeMode,
  onModeChange,
}: CreationModesProps) => {
  const modes = [
    {
      id: "image" as CreationMode,
      title: "Image to Video",
      description: "Turn an image into an AI-generated video.",
      icon: Image,
    },
    {
      id: "prompt" as CreationMode,
      title: "Prompt to Video",
      description: "Describe your idea and create a video.",
      icon: WandSparkles,
    },
    {
      id: "template" as CreationMode,
      title: "Templates",
      description: "Start quickly with ready-made concepts.",
      icon: LayoutTemplate,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-[#7C3AED]">
          AI VIDEO CREATOR
        </p>

        <h2 className="text-4xl font-semibold tracking-[-0.035em] text-[#17121F] sm:text-5xl">
          What do you want to create?
        </h2>

        <p className="mt-4 max-w-[620px] text-base leading-7 text-[#6B6472]">
          Choose a creation method and bring your idea to life with
          ActionMotion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onModeChange(mode.id)}
              className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                isActive
                  ? "border-[#A855F7]/50 bg-gradient-to-br from-[#F5EEFF] via-[#FAF7FF] to-white shadow-[0_15px_40px_rgba(124,58,237,0.10)]"
                  : "border-[#E9E2F1] bg-white hover:-translate-y-1 hover:border-[#A855F7]/40 hover:shadow-[0_15px_40px_rgba(124,58,237,0.08)]"
              }`}
            >
              {/* Icon */}
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#A855F7]/15 text-[#7C3AED]"
                    : "bg-[#F5F1FA] text-[#8B8494] group-hover:bg-[#A855F7]/10 group-hover:text-[#7C3AED]"
                }`}
              >
                <Icon size={23} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#17121F]">
                {mode.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-[#756E7D]">
                {mode.description}
              </p>

              {/* Status */}
              <div
                className={`mt-5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#7C3AED]"
                    : "text-[#8B8494] group-hover:text-[#7C3AED]"
                }`}
              >
                {isActive ? "Selected" : "Select"} →
              </div>

              {/* Active Bottom Accent */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CreationModes;