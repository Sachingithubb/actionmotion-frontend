import { ChevronDown, Sparkles } from "lucide-react";

type VideoModel = "Gen-4 Turbo" | "Google Veo";
type VideoDuration = 5 | 10;
type VideoQuality = "480p" | "720p";

interface GenerationSettingsProps {
  prompt: string;
  setPrompt: (value: string) => void;

  model: VideoModel;
  setModel: (value: VideoModel) => void;

  duration: VideoDuration;
  setDuration: (value: VideoDuration) => void;

  quality: VideoQuality;
  setQuality: (value: VideoQuality) => void;

  price: number | null;
  isPricing: boolean;

  onGenerate: () => void;
  isGenerating: boolean;
}

const GenerationSettings = ({
  prompt,
  setPrompt,
  model,
  setModel,
  duration,
  setDuration,
  quality,
  setQuality,
  price,
  isPricing,
  onGenerate,
  isGenerating,
}: GenerationSettingsProps) => {
  return (
    <div className="mt-7">
      {/* AI MODEL */}
      <label className="text-xs font-medium text-[#5E5666]">
        AI Model
      </label>

      <div className="relative mt-2">
        <select
          value={model}
          onChange={(event) =>
            setModel(event.target.value as VideoModel)
          }
          className="h-[46px] w-full appearance-none rounded-xl border border-[#E5DFEA] bg-[#FAF9FC] px-4 pr-10 text-sm font-medium text-[#17121F] outline-none transition-all focus:border-[#A855F7]/60 focus:bg-white focus:ring-2 focus:ring-[#A855F7]/10"
        >
          <option value="Gen-4 Turbo">
            Gen-4 Turbo
          </option>

          <option value="Google Veo">
            Google Veo
          </option>
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#766F68]"
        />
      </div>

      {/* ANIMATION PROMPT */}
      <label className="mt-5 block text-xs font-medium text-[#5E5666]">
        Animation prompt
      </label>

      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Describe how you want your image to move..."
        className="mt-2 min-h-[110px] w-full resize-none rounded-xl border border-[#E5DFEA] bg-[#FAF9FC] px-4 py-3 text-sm leading-6 text-[#17121F] outline-none transition-all placeholder:text-[#9B94A3] focus:border-[#A855F7]/60 focus:bg-white focus:ring-2 focus:ring-[#A855F7]/10"
      />

      {/* DURATION */}
      <div className="mt-5">
        <label className="text-xs font-medium text-[#5E5666]">
          Video duration
        </label>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {/* 5 SEC */}
          <button
            type="button"
            onClick={() => setDuration(5)}
            className={`rounded-xl border px-3 py-3 text-left transition-all ${
              duration === 5
                ? "border-[#A855F7] bg-[#A855F7]/[0.07] shadow-[0_4px_15px_rgba(168,85,247,0.08)]"
                : "border-[#E5DFEA] bg-[#FAF9FC] hover:border-[#C9B8D8]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-semibold ${
                  duration === 5
                    ? "text-[#7C3AED]"
                    : "text-[#17121F]"
                }`}
              >
                5 sec
              </p>

              {duration === 5 && (
                <span className="text-[9px] font-semibold text-[#7C3AED]">
                  SELECTED
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-[#766F68]">
              Starting at ₹39
            </p>
          </button>

          {/* 10 SEC */}
          <button
            type="button"
            onClick={() => setDuration(10)}
            className={`rounded-xl border px-3 py-3 text-left transition-all ${
              duration === 10
                ? "border-[#A855F7] bg-[#A855F7]/[0.07] shadow-[0_4px_15px_rgba(168,85,247,0.08)]"
                : "border-[#E5DFEA] bg-[#FAF9FC] hover:border-[#C9B8D8]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-semibold ${
                  duration === 10
                    ? "text-[#7C3AED]"
                    : "text-[#17121F]"
                }`}
              >
                10 sec
              </p>

              {duration === 10 && (
                <span className="text-[9px] font-semibold text-[#7C3AED]">
                  SELECTED
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-[#766F68]">
              Starting at ₹59
            </p>
          </button>
        </div>
      </div>

      {/* QUALITY */}
      <div className="mt-5">
        <label className="text-xs font-medium text-[#5E5666]">
          Video quality
        </label>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {/* 480P */}
          <button
            type="button"
            onClick={() => setQuality("480p")}
            className={`rounded-xl border px-3 py-3 text-left transition-all ${
              quality === "480p"
                ? "border-[#A855F7] bg-[#A855F7]/[0.07] shadow-[0_4px_15px_rgba(168,85,247,0.08)]"
                : "border-[#E5DFEA] bg-[#FAF9FC] hover:border-[#C9B8D8]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-semibold ${
                  quality === "480p"
                    ? "text-[#7C3AED]"
                    : "text-[#17121F]"
                }`}
              >
                480p
              </p>

              {quality === "480p" && (
                <span className="text-[9px] font-semibold text-[#7C3AED]">
                  SELECTED
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-[#766F68]">
              Standard
            </p>
          </button>

          {/* 720P */}
          <button
            type="button"
            onClick={() => setQuality("720p")}
            className={`rounded-xl border px-3 py-3 text-left transition-all ${
              quality === "720p"
                ? "border-[#A855F7] bg-[#A855F7]/[0.07] shadow-[0_4px_15px_rgba(168,85,247,0.08)]"
                : "border-[#E5DFEA] bg-[#FAF9FC] hover:border-[#C9B8D8]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-semibold ${
                  quality === "720p"
                    ? "text-[#7C3AED]"
                    : "text-[#17121F]"
                }`}
              >
                720p
              </p>

              {quality === "720p" && (
                <span className="text-[9px] font-semibold text-[#7C3AED]">
                  SELECTED
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-[#766F68]">
              HD
            </p>
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-[#E9E2F1] bg-[#FAF9FC] px-4 py-3">
        <div>
          <p className="text-xs text-[#766F68]">
            Estimated price
          </p>

          <p className="mt-0.5 text-xs font-medium text-[#5E5666]">
            {model} • {duration}s • {quality}
          </p>
        </div>

        <div className="text-right">
          {isPricing ? (
            <p className="text-sm font-medium text-[#9B94A3]">
              Calculating...
            </p>
          ) : price !== null ? (
            <p className="text-lg font-bold text-[#7C3AED]">
              ₹{price}
            </p>
          ) : (
            <p className="text-sm font-medium text-red-500">
              —
            </p>
          )}
        </div>
      </div>

      {/* GENERATE */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || isPricing || price === null}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(168,85,247,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(168,85,247,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <Sparkles size={16} />

        {isGenerating
          ? "Generating..."
          : isPricing
            ? "Calculating price..."
            : price !== null
              ? `Generate Video • ₹${price}`
              : "Generate Video"}
      </button>
    </div>
  );
};

export default GenerationSettings;