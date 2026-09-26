import { Sparkles } from "lucide-react";

const templates = [
  {
    title: "Cinematic Portrait",
    description: "Turn your photo into a cinematic portrait.",
  },
  {
    title: "Luxury Product",
    description: "Create a premium product showcase.",
  },
  {
    title: "Travel Reel",
    description: "Transform your travel photos into a reel.",
  },
  {
    title: "Epic Action",
    description: "Create an energetic cinematic action scene.",
  },
];

const TemplateCreator = () => {
  return (
    <div className="rounded-3xl border border-[#E9E2F1] bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] lg:p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#17121F]">
          Choose a template
        </h3>

        <p className="mt-2 text-sm text-[#756E7D]">
          Start with a creative concept and personalize it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((template) => (
          <button
            key={template.title}
            type="button"
            className="group overflow-hidden rounded-2xl border border-[#E9E2F1] bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#A855F7]/50 hover:shadow-[0_15px_35px_rgba(124,58,237,0.10)]"
          >
            {/* Template Preview */}
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#F5EEFF] via-[#FAF7FF] to-[#F3EDF9]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#C084FC]/15" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#7C3AED] shadow-[0_8px_25px_rgba(124,58,237,0.12)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Sparkles size={20} />
                </div>
              </div>

              {/* Purple Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-[#17121F]">
                {template.title}
              </h4>

              <p className="mt-2 text-xs leading-5 text-[#756E7D]">
                {template.description}
              </p>

              <div className="mt-4 text-xs font-medium text-[#8B8494] transition-colors duration-200 group-hover:text-[#7C3AED]">
                Use template →
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateCreator;