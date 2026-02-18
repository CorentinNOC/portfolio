export default function ImageInput({
  images,
  currentImage,
  onCurrentImageChange,
  onAddImage,
  onRemoveImage,
}: {
  images: string[];
  currentImage: string;
  onCurrentImageChange: (value: string) => void;
  onAddImage: () => void;
  onRemoveImage: (image: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 uppercase">
        Images (URLs)
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="url"
          value={currentImage}
          onChange={(e) => onCurrentImageChange(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), onAddImage())
          }
          className="flex-1 px-4 py-3 border border-secondary focus:bg-secondary/15 focus:outline-none"
          placeholder="https://..."
        />
        <button
          type="button"
          onClick={onAddImage}
          className="px-6 border border-secondary hover:bg-secondary/25 cursor-pointer transition-colors"
        >
          +
        </button>
      </div>
      <div className="space-y-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-secondary bg-secondary/25"
          >
            <span className="text-sm truncate flex-1">{image}</span>
            <button
              type="button"
              onClick={() => onRemoveImage(image)}
              className="ml-2 text-gray-600 hover:text-secondary cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
