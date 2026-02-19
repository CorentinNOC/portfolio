export default function ImageInput({
  images,
  onImagesChange,
}: {
  images: File[];
  onImagesChange: (files: File[]) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onImagesChange([...images, ...files]);
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-bold mb-2 uppercase">Images</label>
      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-3 border border-secondary focus:bg-secondary/15 focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-secondary/25 file:cursor-pointer"
        />
      </div>
      <div className="space-y-2">
        {images.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-secondary bg-secondary/25"
          >
            <span className="text-sm truncate flex-1">{file.name}</span>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="ml-2 text-gray-600 hover:text-secondary cursor-pointer text-xl"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
