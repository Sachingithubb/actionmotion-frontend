import { useEffect, useState } from "react";
import VideoPreview from "./VideoPreview";
import { ChevronDown, Sparkles } from "lucide-react";

const API_URL = "http://localhost:5000";

type VideoModel = "Gen-4.5" | "Google Veo";
type VideoDuration = 5 | 10;
type VideoQuality = "480p" | "720p";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

const PromptToVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [model, setModel] = useState<VideoModel>("Gen-4.5");

  const [duration, setDuration] = useState<VideoDuration>(5);

  const [quality, setQuality] = useState<VideoQuality>("480p");

  const [price, setPrice] = useState<number | null>(null);

  const [isPricing, setIsPricing] = useState(false);

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);

  const [error, setError] = useState("");

  const getBackendModel = (selectedModel: VideoModel) => {
    if (selectedModel === "Google Veo") {
      return "veo";
    }

    return "gen4_5";
  };

  const fetchPrice = async (
    selectedModel: VideoModel,
    selectedDuration: VideoDuration,
    selectedQuality: VideoQuality,
  ) => {
    try {
      setIsPricing(true);
      setError("");

      const response = await fetch(`${API_URL}/api/pricing/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: getBackendModel(selectedModel),

          duration: selectedDuration,

          quality: selectedQuality,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to calculate video price.");
      }

      setPrice(data.amountInRupees);
    } catch (err) {
      console.error("Prompt pricing error:", err);

      setPrice(null);

      setError(
        err instanceof Error ? err.message : "Unable to calculate video price.",
      );
    } finally {
      setIsPricing(false);
    }
  };

  useEffect(() => {
    fetchPrice(model, duration, quality);
  }, []);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true));

        existingScript.addEventListener("error", () => resolve(false));

        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const createPaymentOrder = async () => {
    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        creationType: "prompt_to_video",

        model: getBackendModel(model),

        duration,

        quality,

        prompt: prompt.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to create payment order.");
    }

    return data;
  };

  const verifyPayment = async (
    paymentResponse: RazorpayResponse,
    videoOrderId: string,
  ) => {
    const response = await fetch(`${API_URL}/api/payment/verify`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        razorpay_order_id: paymentResponse.razorpay_order_id,

        razorpay_payment_id: paymentResponse.razorpay_payment_id,

        razorpay_signature: paymentResponse.razorpay_signature,

        videoOrderId,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Payment verification failed.");
    }

    return data;
  };

  const startGeneration = async (videoOrderId: string) => {
    const response = await fetch(`${API_URL}/api/runway/prompt-generate`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        videoOrderId,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to generate video.");
    }

    return data;
  };

  const openRazorpayCheckout = async (paymentOrder: any) => {
    const loaded = await loadRazorpayScript();

    if (!loaded || !window.Razorpay) {
      throw new Error("Payment service could not be loaded. Please try again.");
    }

    const options: RazorpayOptions = {
      key: paymentOrder.keyId,

      amount: paymentOrder.order.amount,

      currency: paymentOrder.order.currency,

      name: "ActionMotion",

      description: `AI Prompt Video • ${model} • ${duration}s`,

      order_id: paymentOrder.order.id,

      handler: async (paymentResponse) => {
        try {
          setIsPaymentLoading(true);

          setError("");

          await verifyPayment(paymentResponse, paymentOrder.videoOrderId);

          setIsGenerating(true);

          const result = await startGeneration(paymentOrder.videoOrderId);

          if (typeof result.video === "string") {
            setVideoUrl(result.video);
          }

          setError("");
        } catch (err) {
          console.error("Prompt generation error:", err);

          setError(
            err instanceof Error
              ? err.message
              : "We couldn't generate your video right now. Please try again.",
          );
        } finally {
          setIsPaymentLoading(false);

          setIsGenerating(false);
        }
      },

      modal: {
        ondismiss: () => {
          setIsPaymentLoading(false);
        },
      },

      theme: {
        color: "#7C3AED",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt first.");

      return;
    }

    if (price === null) {
      setError("Unable to determine the video price.");

      return;
    }

    try {
      setError("");

      setIsPaymentLoading(true);

      const paymentOrder = await createPaymentOrder();

      await openRazorpayCheckout(paymentOrder);
    } catch (err) {
      console.error("Prompt payment error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to start payment. Please try again.",
      );

      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="grid overflow-hidden rounded-[28px] border border-[#E9E2F1] bg-white shadow-[0_20px_60px_rgba(124,58,237,0.06)] lg:grid-cols-[500px_1fr]">
      <div className="border-r border-[#E9E2F1] p-7 lg:p-10">
        <div>
          <p className="text-sm font-medium text-[#766F68]">
            Describe the video you want to create.
          </p>

          <label className="mt-8 block text-sm font-medium text-[#4B4452]">
            AI Model
          </label>

          <div className="relative mt-3">
            <select
              value={model}
              onChange={(e) => {
                const value = e.target.value as VideoModel;

                setModel(value);

                fetchPrice(value, duration, quality);
              }}
              className="h-[46px] w-full appearance-none rounded-xl border border-[#E5DFEA] bg-[#FAF9FC] px-4 pr-10 text-sm font-medium text-[#17121F] outline-none focus:border-[#A855F7]/60 focus:ring-2 focus:ring-[#A855F7]/10"
            >
              <option value="Gen-4.5">Gen-4.5</option>

              <option value="Google Veo">Google Veo</option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#766F68]"
            />
          </div>

          <label className="mt-6 block text-sm font-medium text-[#4B4452]">
            Your prompt
          </label>

          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Describe the video you want to generate..."
            className="mt-3 h-[170px] w-full resize-none rounded-2xl border border-[#E9E2F1] bg-[#FAF9FC] p-5 text-sm text-[#17121F] outline-none transition focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/10"
          />

          <div className="mt-5">
            <label className="text-sm font-medium text-[#4B4452]">
              Video duration
            </label>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {[5, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    const newDuration = value as VideoDuration;

                    setDuration(newDuration);

                    fetchPrice(model, newDuration, quality);
                  }}
                  className={`rounded-xl border px-3 py-3 text-left transition ${
                    duration === value
                      ? "border-[#A855F7] bg-[#A855F7]/[0.07]"
                      : "border-[#E5DFEA] bg-[#FAF9FC]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#17121F]">
                    {value} sec
                  </p>

                  <p className="mt-1 text-xs text-[#766F68]">
                    {value === 5 ? "Starting at ₹39" : "Starting at ₹59"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-medium text-[#4B4452]">
              Video quality
            </label>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {["480p", "720p"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    const newQuality = value as VideoQuality;

                    setQuality(newQuality);

                    fetchPrice(model, duration, newQuality);
                  }}
                  className={`rounded-xl border px-3 py-3 text-left transition ${
                    quality === value
                      ? "border-[#A855F7] bg-[#A855F7]/[0.07]"
                      : "border-[#E5DFEA] bg-[#FAF9FC]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#17121F]">
                    {value}
                  </p>

                  <p className="mt-1 text-xs text-[#766F68]">
                    {value === "480p" ? "Standard" : "HD"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-[#E9E2F1] bg-[#FAF9FC] px-4 py-3">
            <div>
              <p className="text-xs text-[#766F68]">Estimated price</p>

              <p className="mt-1 text-xs font-medium text-[#5E5666]">
                {model} • {duration}s • {quality}
              </p>
            </div>

            <div>
              {isPricing ? (
                <p className="text-sm text-[#9B94A3]">Calculating...</p>
              ) : (
                <p className="text-lg font-bold text-[#7C3AED]">₹{price}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm leading-6 text-red-600">{error}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={
              isGenerating || isPaymentLoading || isPricing || price === null
            }
            className="mt-6 flex h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#C084FC] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.25)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles size={18} />

            {isGenerating
              ? "Generating..."
              : isPaymentLoading
                ? "Opening Payment..."
                : price !== null
                  ? `Generate Video • ₹${price}`
                  : "Generate Video"}
          </button>
        </div>
      </div>

      <VideoPreview videoUrl={videoUrl} />
    </div>
  );
};

export default PromptToVideo;
