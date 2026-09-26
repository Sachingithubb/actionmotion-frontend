import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    title: "Single Video",
    subtitle: "Perfect for trying ActionMotion",
    price: "₹39",
    amount: 39,
    videos: 1,
    period: "per video (5sec, 720p)",
    icon: Zap,
    features: [
      "1 AI-generated video",
      "No account required",
      "Upload your image",
      "AI video generation",
      "Download your video",
      "No subscription",
    ],
    buttonText: "Generate a Video",
    popular: false,
  },
  {
    title: "Creator Pack",
    subtitle: "For occasional creators",
    price: "₹179",
    amount: 179,
    videos: 5,
    period: "5 videos (5sec, 720p)",
    icon: Sparkles,
    features: [
      "5 AI-generated videos",
      "Upload multiple images",
      "AI video generation",
      "Generation history",
      "Download your videos",
      "One-time payment",
    ],
    buttonText: "Get 5 Videos",
    popular: false,
  },
  {
    title: "Pro Creator",
    subtitle: "For creators who create often",
    price: "₹349",
    amount: 349,
    videos: 10,
    period: "10 videos (5sec, 720p)",
    icon: Sparkles,
    features: [
      "10 AI-generated videos",
      "Upload multiple images",
      "AI video generation",
      "Generation history",
      "Download your videos",
      "Access to new templates",
    ],
    buttonText: "Get 10 Videos",
    popular: true,
  },
  {
    title: "15 Video Pack",
    subtitle: "For creators who create regularly",
    price: "₹499",
    amount: 499,
    videos: 15,
    period: "15 videos (5sec, 720p)",
    icon: Crown,
    features: [
      "15 AI-generated videos",
      "Upload multiple images",
      "AI video generation",
      "Generation history",
      "Download your videos",
      "Access to new templates",
      "One-time payment",
    ],
    buttonText: "Get 15 Videos",
    popular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white px-6 py-24 lg:px-10 lg:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[#A855F7]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-[780px] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#F5F3FF] px-4 py-2 text-xs font-semibold tracking-wide text-[#7C3AED]">
            <Sparkles size={14} />
            <span>SIMPLE PRICING</span>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-[#17121F] sm:text-5xl lg:text-6xl">
            Create More.{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#A855F7] bg-clip-text text-transparent">
              Pay Your Way.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-[#6B6473] sm:text-lg">
            Start with one video or choose a video pack. Pay once and create
            whenever you want — no recurring subscriptions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.title}
                className={`group relative flex flex-col overflow-hidden rounded-[28px] border bg-white p-7 transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "border-[#A855F7] shadow-[0_25px_70px_rgba(124,58,237,0.16)]"
                    : "border-[#E5DDF2] shadow-[0_10px_40px_rgba(91,33,182,0.05)] hover:border-[#C4B5FD] hover:shadow-[0_25px_60px_rgba(124,58,237,0.12)]"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white shadow-[0_5px_20px_rgba(124,58,237,0.25)]">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                    plan.popular
                      ? "border-[#C4B5FD] bg-[#EDE9FE] text-[#7C3AED]"
                      : "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <div className="mt-7 min-h-[70px]">
                  <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[#211A2B]">
                    {plan.title}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-[#756D80]">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-[-0.04em] text-[#17121F] sm:text-5xl">
                    {plan.price}
                  </span>

                  <span className="mb-2 text-sm text-[#756D80]">
                    {plan.period}
                  </span>
                </div>

                {/* One-time label */}
                <div className="mt-2">
                  <span className="text-[11px] font-medium text-[#7C3AED]">
                    One-time payment
                  </span>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-[#EEEAF4]" />

                {/* Features */}
                <div className="flex flex-1 flex-col gap-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm text-[#5F5868]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5F3FF] text-[#7C3AED]">
                        <Check size={12} strokeWidth={2.5} />
                      </span>

                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (plan.price === "₹39") {
                      navigate("/create");
                      return;
                    }

                    navigate("/package-checkout", {
                      state: {
                        title: plan.title,
                        price: plan.price,
                        videos: plan.videos,
                      },
                    });
                  }}
                  className={`mt-8 flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] text-white shadow-[0_10px_30px_rgba(124,58,237,0.2)] hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(124,58,237,0.35)]"
                      : "border border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9] hover:border-[#A855F7] hover:bg-[#EDE9FE]"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mx-auto mt-8 max-w-[700px] text-center">
          <p className="text-xs leading-5 text-[#8A8393]">
            All plans are one-time purchases. No monthly subscriptions or
            recurring charges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
