export default function ImageInput({
  images,
  existingImages = [],
  onImagesChange,
  onRemoveExisting,
}: {
  images: File[];
  existingImages?: string[];
  onImagesChange: (files: File[]) => void;
  onRemoveExisting?: (imageUrl: string) => void;
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

      {/* Images existantes */}
      {existingImages.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Images actuelles</p>
          <div className="space-y-2">
            {existingImages.map((imageUrl, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-secondary bg-secondary/10"
              >
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-16 h-16 object-cover border border-secondary"
                  />
                  <span className="text-sm truncate">Image {index + 1}</span>
                </div>
                {onRemoveExisting && (
                  <button
                    type="button"
                    onClick={() => onRemoveExisting(imageUrl)}
                    className="ml-2 text-gray-600 hover:text-red-600 cursor-pointer text-xl"
                    title="Supprimer cette image"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-3 border border-secondary focus:bg-secondary/15 focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-secondary/25 file:cursor-pointer"
        />
      </div>

      {images.length > 0 && (
        <div>
          <p className="text-xs text-green-600 mb-2">Nouvelles images</p>
          <div className="space-y-2">
            {images.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-green-500 bg-green-50"
              >
                <span className="text-sm truncate flex-1">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="ml-2 text-gray-600 hover:text-red-600 cursor-pointer text-xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
