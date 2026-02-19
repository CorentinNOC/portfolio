import type { ProjectType } from "../types/project.types";
import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects,
  onDelete,
  onEdit,
}: {
  projects: ProjectType[];
  onDelete: (id: string) => void;
  onEdit?: (project: ProjectType) => void;
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
