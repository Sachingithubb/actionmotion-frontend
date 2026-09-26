import { useEffect, useState } from "react";
import UploadBox from "./UploadBox";
import GenerationSettings from "./GenerationSettings";
import VideoPreview from "./VideoPreview";

const API_URL = "http://localhost:5000";

type VideoModel = "Gen-4 Turbo" | "Google Veo";
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
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
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

const ImageToVideo = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [model, setModel] = useState<VideoModel>("Gen-4 Turbo");
  const [duration, setDuration] = useState<VideoDuration>(5);
  const [quality, setQuality] = useState<VideoQuality>("480p");

  const [price, setPrice] = useState<number | null>(null);
  const [isPricing, setIsPricing] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const [error, setError] = useState("");

  const getBackendModel = (selectedModel: VideoModel) => {
    if (selectedModel === "Google Veo") return "veo";
    return "gen4_turbo";
  };

  const getUserFriendlyError = (message: string) => {
    if (
      message.toLowerCase().includes("payment") ||
      message.toLowerCase().includes("razorpay")
    ) {
      return message;
    }

    return message || "Something went wrong. Please try again.";
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
      console.error("Pricing error:", err);

      setPrice(null);

      setError(
        err instanceof Error
          ? getUserFriendlyError(err.message)
          : "Unable to calculate video price.",
      );
    } finally {
      setIsPricing(false);
    }
  };

  useEffect(() => {
    fetchPrice(model, duration, quality);
  }, []);

  const handleModelChange = (value: VideoModel) => {
    setModel(value);
    fetchPrice(value, duration, quality);
  };

  const handleDurationChange = (value: VideoDuration) => {
    setDuration(value);
    fetchPrice(model, value, quality);
  };

  const handleQualityChange = (value: VideoQuality) => {
    setQuality(value);
    fetchPrice(model, duration, value);
  };

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files);
    setError("");
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | STEP 1 — CREATE RAZORPAY ORDER
  |--------------------------------------------------------------------------
  */

  const createPaymentOrder = async () => {
    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

  /*
  |--------------------------------------------------------------------------
  | STEP 2 — VERIFY PAYMENT
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | STEP 3 — START VIDEO GENERATION
  |--------------------------------------------------------------------------
  */

  const startVideoGeneration = async (videoOrderId: string) => {
    if (selectedFiles.length === 0) {
      throw new Error(
        "Your image is no longer available. Please upload it again.",
      );
    }

    const formData = new FormData();

    formData.append("image", selectedFiles[0]);
    formData.append("prompt", prompt.trim());
    formData.append("model", getBackendModel(model));
    formData.append("duration", String(duration));
    formData.append("quality", quality);
    formData.append("videoOrderId", videoOrderId);

    const response = await fetch(`${API_URL}/api/runway/generate`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to start video generation.");
    }

    return data;
  };

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
        existingScript.addEventListener("load", () => {
          resolve(true);
        });

        existingScript.addEventListener("error", () => {
          resolve(false);
        });

        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  /*
  |--------------------------------------------------------------------------
  | STEP 4 — OPEN RAZORPAY CHECKOUT
  |--------------------------------------------------------------------------
  */

  const openRazorpayCheckout = async (paymentOrder: {
    order: {
      id: string;
      amount: number;
      currency: string;
    };
    videoOrderId: string;
    keyId: string;
  }) => {
    const razorpayLoaded = await loadRazorpayScript();

    if (!razorpayLoaded || !window.Razorpay) {
      throw new Error("Payment service could not be loaded. Please try again.");
    }

    const options: RazorpayOptions = {
      key: paymentOrder.keyId,

      amount: paymentOrder.order.amount,

      currency: paymentOrder.order.currency,

      name: "ActionMotion",

      description: `AI Video Generation • ${model} • ${duration}s • ${quality}`,

      order_id: paymentOrder.order.id,

      handler: async (paymentResponse: RazorpayResponse) => {
        try {
          setIsPaymentLoading(true);
          setError("");

          /*
          |--------------------------------------------------------------------------
          | VERIFY PAYMENT ON BACKEND
          |--------------------------------------------------------------------------
          */

          await verifyPayment(paymentResponse, paymentOrder.videoOrderId);

          /*
          |--------------------------------------------------------------------------
          | PAYMENT SUCCESS
          |--------------------------------------------------------------------------
          */

          console.log("✅ Razorpay payment verified.");

          /*
          |--------------------------------------------------------------------------
          | START AI GENERATION
          |--------------------------------------------------------------------------
          */

          setIsGenerating(true);

          const generationResult = await startVideoGeneration(
            paymentOrder.videoOrderId,
          );

          console.log("🎬 Generation started:", generationResult);

          /*
          |--------------------------------------------------------------------------
          | CURRENT BACKEND DOES NOT YET RETURN VIDEO
          |--------------------------------------------------------------------------
          */

          if (generationResult.video) {
            setVideoUrl(generationResult.video);
          }

          setError("");

          /*
          |--------------------------------------------------------------------------
          | TEMPORARY STATUS
          |--------------------------------------------------------------------------
          */

          if (!generationResult.video) {
            setError(
              "Payment successful. Your video generation has been queued.",
            );
          }
        } catch (err) {
          console.error("Post-payment error:", err);

          setError(
            err instanceof Error
              ? getUserFriendlyError(err.message)
              : "Payment was successful, but we couldn't start video generation.",
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

  /*
  |--------------------------------------------------------------------------
  | GENERATE VIDEO
  |--------------------------------------------------------------------------
  */

  const handleGenerate = async () => {
    if (selectedFiles.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter an animation prompt.");
      return;
    }

    if (price === null) {
      setError("Unable to determine the video price.");
      return;
    }

    if (isPricing) {
      return;
    }

    try {
      setError("");

      setIsPaymentLoading(true);

      /*
      |--------------------------------------------------------------------------
      | CREATE RAZORPAY ORDER
      |--------------------------------------------------------------------------
      */

      const paymentOrder = await createPaymentOrder();

      console.log("💳 Razorpay order created:", paymentOrder.order.id);

      /*
      |--------------------------------------------------------------------------
      | OPEN RAZORPAY CHECKOUT
      |--------------------------------------------------------------------------
      */

      openRazorpayCheckout(paymentOrder);
    } catch (err) {
      console.error("Payment order error:", err);

      setError(
        err instanceof Error
          ? getUserFriendlyError(err.message)
          : "Unable to start payment. Please try again.",
      );

      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="grid min-h-[500px] grid-cols-1 overflow-hidden rounded-3xl border border-[#E9E2F1] bg-white shadow-[0_15px_50px_rgba(124,58,237,0.06)] lg:grid-cols-[420px_1fr]">
      <div className="border-b border-[#E9E2F1] bg-white p-6 lg:border-b-0 lg:border-r">
        <div className="mb-7">
          <h3 className="text-lg font-semibold text-[#17121F]">
            Image to Video
          </h3>

          <p className="mt-1 text-sm text-[#756E7D]">
            Upload one or more images to create your video.
          </p>
        </div>

        <UploadBox
          selectedFiles={selectedFiles}
          onFilesSelect={handleFilesSelect}
          onRemoveFile={handleRemoveFile}
        />

        {selectedFiles.length > 0 && (
          <div className="mt-3 rounded-lg border border-[#A855F7]/20 bg-[#A855F7]/[0.06] px-3 py-2">
            <p className="text-xs font-medium text-[#7C3AED]">
              {selectedFiles.length}{" "}
              {selectedFiles.length === 1 ? "image" : "images"} selected
            </p>
          </div>
        )}

        <GenerationSettings
          prompt={prompt}
          setPrompt={setPrompt}
          model={model}
          setModel={handleModelChange}
          duration={duration}
          setDuration={handleDurationChange}
          quality={quality}
          setQuality={handleQualityChange}
          price={price}
          isPricing={isPricing}
          onGenerate={handleGenerate}
          isGenerating={isGenerating || isPaymentLoading}
        />

        {isPaymentLoading && (
          <div className="mt-3 rounded-xl border border-[#A855F7]/20 bg-[#A855F7]/[0.06] px-3 py-2.5">
            <p className="text-xs font-medium text-[#7C3AED]">
              Opening secure payment...
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="mt-3 rounded-xl border border-[#A855F7]/20 bg-[#A855F7]/[0.06] px-3 py-2.5">
            <p className="text-xs font-medium text-[#7C3AED]">
              Payment successful. Starting video generation...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
            <p className="text-xs leading-5 text-red-600">{error}</p>
          </div>
        )}
      </div>

      <VideoPreview videoUrl={videoUrl} />
    </div>
  );
};

export default ImageToVideo;
