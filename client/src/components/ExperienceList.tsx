import type { ExperienceType } from "../types/experience.types";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceList({
  experiences,
  onDelete,
  onEdit,
  onAddClick,
}: {
  experiences: ExperienceType[];
  onDelete: (id: string) => void;
  onEdit?: (experience: ExperienceType) => void;
  onAddClick: () => void;
}) {
  return (
    <section className="space-y-8 mt-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Expériences</h3>
        <button
          onClick={onAddClick}
          className="border border-secondary px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
        >
          AJOUTER
        </button>
      </div>
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}
