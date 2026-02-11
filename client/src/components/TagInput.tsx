export default function TagInput({
  tags,
  currentTag,
  onCurrentTagChange,
  onAddTag,
  onRemoveTag,
}: {
  tags: string[];
  currentTag: string;
  onCurrentTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2 uppercase">
        Technologies
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={currentTag}
          onChange={(e) => onCurrentTagChange(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), onAddTag())
          }
          className="flex-1 px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
          placeholder="Ex: html & scss"
        />
        <button
          type="button"
          onClick={onAddTag}
          className="px-6 bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="text-gray-600 hover:text-black"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
