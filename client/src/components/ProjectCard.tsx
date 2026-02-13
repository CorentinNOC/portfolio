import type { Project } from "../types/project.types";

export default function ProjectCard({
  project,
  onDelete,
  onEdit,
}: {
  project: Project;
  onDelete: (id: string) => void;
  onEdit?: (project: Project) => void;
}) {
  return (
    <div className="border-l-4 border-secondary pl-8 relative group">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="text-gray-400 hover:text-secondary cursor-pointer px-3 py-1"
              title="Modifier le projet"
            >
              ✎
            </button>
          )}
          <button
            onClick={() => project.id && onDelete(project.id)}
            className="text-gray-400 hover:text-red-600 cursor-pointer px-3 py-1"
            title="Supprimer le projet"
          >
            ✕
          </button>
        </div>
      </div>
      <p className="mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-3">
        {project.tag.map((tag, index) => (
          <span
            key={index}
            className="bg-secondary/25 px-3 py-1 border border-secondary uppercase rounded-full px-4 py-1 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
