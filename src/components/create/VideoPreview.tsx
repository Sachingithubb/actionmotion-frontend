import { Sparkles } from "lucide-react";

interface VideoPreviewProps {
  videoUrl?: string;
}

const VideoPreview = ({ videoUrl }: VideoPreviewProps) => {
  return (
    <div className="relative flex min-h-[500px] items-center justify-center bg-[#FAF9FC] p-6 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_55%)]" />

      <div className="relative flex aspect-video w-full max-w-[760px] items-center justify-center overflow-hidden rounded-2xl border border-[#E9E2F1] bg-white shadow-[0_20px_60px_rgba(124,58,237,0.08)]">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A855F7]/10 text-[#7C3AED]">
              <Sparkles size={24} />
            </div>

            <h3 className="mt-5 text-sm font-medium text-[#4B4452]">
              Your video will appear here
            </h3>

            <p className="mt-2 text-xs text-[#9B94A3]">
              Upload an image and generate your first video.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;