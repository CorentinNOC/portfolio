import { useState } from "react";
import type { ProjectType } from "../types/project.types";

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: {
  project: ProjectType;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const hasMultipleImages = project.images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
    if (e.key === "ArrowLeft" && hasMultipleImages) prevImage();
    if (e.key === "ArrowRight" && hasMultipleImages) nextImage();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="bg-primary border border-secondary w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-3xl bg-primary/80 border
          border-secondary w-12 h-12 flex items-center justify-center
          hover:bg-secondary/25 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="border-b border-secondary px-8 py-6">
          <h2 className="text-3xl font-bold text-third">{project.title}</h2>
        </div>

        <div className="relative bg-black/5">
          <div className="relative aspect-video flex items-center justify-center">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[60vh] object-contain"
            />

            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 border border-secondary text-2xl w-12 h-12 flex items-center justify-center hover:bg-secondary/25 transition-colors cursor-pointer"
                  aria-label="Image précédente"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute text-2xl right-4 top-1/2 -translate-y-1/2 bg-primary/80 border border-secondary w-12 h-12 flex items-center justify-center hover:bg-secondary/25 transition-colors cursor-pointer"
                  aria-label="Image suivante"
                >
                  ›
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-secondary w-8"
                          : "bg-gray-400 hover:bg-gray-300"
                      }`}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase text-third mb-2">
              Description
            </h3>
            <p className="leading-relaxed">{project.description}</p>
          </div>

          {project.tag.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase text-third mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tag.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-secondary/25 px-4 py-2 border border-secondary rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.link && (
            <div className="pt-4 text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-4 inline-block border border-secondary px-8 py-4 hover:bg-secondary/25 transition-colors font-bold"
              >
                VOIR LE PROJET
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
