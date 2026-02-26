import type { ExperienceType } from "../types/experience.types";
import ExperienceForm from "./ExperienceForm";

export default function ExperienceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (experience: Omit<ExperienceType, "id">) => void;
  initialData?: ExperienceType | null;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center p-4 z-50">
      <div className="border border-secondary w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b-4 border-secondary px-8 py-6">
          <h2 className="text-3xl font-bold">
            {initialData ? "MODIFIER L'EXPÉRIENCE" : "NOUVELLE EXPÉRIENCE"}
          </h2>
        </div>

        <ExperienceForm
          key={initialData ? initialData.id : "new"}
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
