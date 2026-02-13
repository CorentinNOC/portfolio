import { useState } from "react";
import type { Project } from "../types/project.types";
import ImageInput from "./ImageInput";
import TagInput from "./TagInput";

const emptyProject: Project = {
  title: "",
  description: "",
  tag: [],
  images: [],
  link: "",
};

export default function ProjectForm({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData?: Project | null;
  onSubmit: (project: Project) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Project>(
    initialData ?? emptyProject,
  );
  const [currentTag, setCurrentTag] = useState("");
  const [currentImage, setCurrentImage] = useState("");

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

  const addImage = () => {
    const image = currentImage.trim();
    if (!image || formData.images.includes(image)) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }));
    setCurrentImage("");
  };

  const removeImage = (imageToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imageToRemove),
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
          placeholder="Ex: Booki"
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
          placeholder="Décrivez votre projet..."
        />
      </div>

      <TagInput
        tags={formData.tag}
        currentTag={currentTag}
        onCurrentTagChange={setCurrentTag}
        onAddTag={addTag}
        onRemoveTag={removeTag}
      />

      <ImageInput
        images={formData.images}
        currentImage={currentImage}
        onCurrentImageChange={setCurrentImage}
        onAddImage={addImage}
        onRemoveImage={removeImage}
      />

      <div>
        <label className="block text-sm font-bold mb-2 uppercase">Lien</label>
        <input
          type="url"
          value={formData.link}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, link: e.target.value }))
          }
          className="w-full px-4 py-3 border border-secondarey focus:bg-secondary/25 focus:outline-none"
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
          className="px-8 border border border-secondary hover:bg-secondary/25 cursor-pointer transition-colors font-bold"
        >
          ANNULER
        </button>
      </div>
    </form>
  );
}
