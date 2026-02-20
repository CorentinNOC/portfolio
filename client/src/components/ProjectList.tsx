import type { ProjectType } from "../types/project.types";
import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects,
  onDelete,
  onEdit,
  onAddClick,
}: {
  projects: ProjectType[];
  onDelete: (id: string) => void;
  onEdit?: (project: ProjectType) => void;
  onAddClick: () => void;
}) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Projets</h3>
        <button
          onClick={onAddClick}
          className="border border-secondary px-6 py-3 hover:bg-gray-800 transition-colors cursor-pointer"
        >
          AJOUTER
        </button>
      </div>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}
