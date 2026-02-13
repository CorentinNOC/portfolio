import ProjectForm from "../components/ProjectForm";
import type { Project } from "../types/project.types";

export default function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Project) => void;
  initialData?: Project | null;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center p-4 z-50">
      <div className="border border-secondary w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b-4 border-secondary px-8 py-6">
          <h2 className="text-3xl font-bold">
            {initialData ? "MODIFIER LE PROJET" : "NOUVEAU PROJET"}
          </h2>
        </div>

        <ProjectForm
          key={initialData ? initialData.id : "new"}
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
