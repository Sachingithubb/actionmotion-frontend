import { Sparkles } from "lucide-react";

const CreateHeader = () => {
  return (
    <header className="border-b border-white/[0.08] bg-[#08060D]">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Create
          </h1>

          <p className="mt-0.5 text-xs text-white/40">
            Turn your ideas into motion
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#A855F7]/20 bg-[#A855F7]/10 px-4 py-2 text-sm text-[#D8B4FE]">
          <Sparkles size={15} />
          <span>AI Studio</span>
        </div>
      </div>
    </header>
  );
};

export default CreateHeader;