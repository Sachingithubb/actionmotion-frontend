import { ImagePlus, Upload, X } from "lucide-react";

interface UploadBoxProps {
  selectedFiles: File[];
  onFilesSelect: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
}

const UploadBox = ({
  selectedFiles,
  onFilesSelect,
  onRemoveFile,
}: UploadBoxProps) => {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      onFilesSelect([...selectedFiles, ...files]);
    }

    event.target.value = "";
  };

  return (
    <div>
      {/* Selected Images */}
      {selectedFiles.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-[#E5DFEA] bg-[#F8F6FA]"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Selected image ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-red-500 group-hover:opacity-100"
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={14} />
              </button>

              {/* Image Number */}
              <div className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload */}
      <label className="group flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCD5E4] bg-[#FAF9FC] px-6 py-10 text-center transition-all duration-300 hover:border-[#A855F7]/50 hover:bg-[#A855F7]/[0.04]">
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#A855F7]/10 text-[#7C3AED] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#A855F7]/15">
          <ImagePlus size={25} />
        </div>

        <h4 className="mt-6 text-sm font-semibold text-[#17121F]">
          {selectedFiles.length > 0
            ? "Add more images"
            : "Upload your images"}
        </h4>

        <p className="mt-3 text-xs leading-6 text-[#8B8494]">
          PNG, JPG or WEBP
          <br />
          Select multiple images
        </p>

        <span className="mt-6 flex items-center gap-2 rounded-lg border border-[#E5DFEA] bg-white px-4 py-2 text-xs font-medium text-[#5E5666] shadow-sm transition-all group-hover:border-[#A855F7]/40 group-hover:bg-[#A855F7]/5 group-hover:text-[#7C3AED]">
          <Upload size={14} />
          {selectedFiles.length > 0 ? "Add Images" : "Choose Images"}
        </span>
      </label>
    </div>
  );
};

export default UploadBox;