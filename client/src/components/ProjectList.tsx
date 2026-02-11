import type { Project } from "../types/project.types";
import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects,
  onDelete,
  onEdit,
}: {
  projects: Project[];
  onDelete: (id: string) => void;
  onEdit?: (project: Project) => void;
}) {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
