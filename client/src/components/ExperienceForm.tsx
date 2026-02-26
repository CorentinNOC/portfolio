import { useState } from "react";
import type { ExperienceType } from "../types/experience.types";
import TagInput from "./TagInput";

export default function ExperienceForm({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData?: ExperienceType | null;
  onSubmit: (experience: Omit<ExperienceType, "id">) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
    tag: initialData?.tag || [],
    link: initialData?.link || "",
  });
  const [currentTag, setCurrentTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const addTag = () => {
    const tag = currentTag.trim();
    if (!tag || formData.tag.includes(tag)) return;

    setFormData((prev) => ({
      ...prev,
      tag: [...prev.tag, tag],
    }));
    setCurrentTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tag: prev.tag.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div>
        <label className="block text-sm font-bold mb-2 uppercase">
          Titre *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full px-4 py-3 border border-secondary focus:bg-secondary/25 focus:outline-none"
          placeholder="Ex: Développeur Frontend"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 uppercase">Date *</label>
        <input
          type="text"
          required
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          className="w-full px-4 py-3 border border-secondary focus:bg-secondary/25 focus:outline-none"
          placeholder="Ex: 2023 - 2024"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 uppercase">
          Description *
        </label>
        <textarea
          required
          rows={6}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="w-full px-4 py-3 border border-secondary focus:bg-secondary/25 focus:outline-none resize-none"
          placeholder="Décrivez votre expérience..."
        />
      </div>

      <TagInput
        tags={formData.tag}
        currentTag={currentTag}
        onCurrentTagChange={setCurrentTag}
        onAddTag={addTag}
        onRemoveTag={removeTag}
      />

      <div>
        <label className="block text-sm font-bold mb-2 uppercase">Lien</label>
        <input
          type="url"
          value={formData.link}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, link: e.target.value }))
          }
          className="w-full px-4 py-3 border border-secondary focus:bg-secondary/25 focus:outline-none"
          placeholder="https://..."
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 border border-secondary px-6 py-4 hover:bg-secondary/25 cursor-pointer transition-colors font-bold"
        >
          {initialData ? "MODIFIER" : "CRÉER"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-8 border border-secondary hover:bg-secondary/25 cursor-pointer transition-colors font-bold"
        >
          ANNULER
        </button>
      </div>
    </form>
  );
}
