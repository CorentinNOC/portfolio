import { useEffect, useState } from "react";
import ProjectDetailModal from "../components/ProjectDetailModal";
import { projectService } from "../services/projectService";
import type { ProjectType } from "../types/project.types";

const Project = () => {
  const [data, setData] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    projectService
      .getAll()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const openProjectModal = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  if (isLoading) return <p>Chargement...</p>;
  if (error || !data) return <span>Oups, il y a un problème</span>;

  return (
    <>
      <section id="projet" className="flex-shrink-0">
        <h2 className="text-xl text-third font-bold uppercase my-8">Projets</h2>
        {data.map((project) => (
          <article
            key={project.id}
            onClick={() => openProjectModal(project)}
            className="wave transition duration-500 delay-300 group overflow-hidden relative flex flex-col-reverse lg:flex-row mb-4 lg:mt-8 mt-8 gap-4 transition border border-transparent hover:border-secondary hover:text-primary p-6 cursor-pointer"
          >
            <img
              className="max-w-[200px] lg:min-w-[140px] h-[110px] lg:h-[80px] object-cover"
              src={project.images[0]}
              alt={`Capture d'écran du projet ${project.title}`}
            />
            <div className="w-full">
              <h2 className="font-bold text-third group-hover:text-primary transition-colors duration-500 delay-300">
                {project.title}
              </h2>
              <p className="text-sm mt-2 line-clamp-2">{project.description}</p>
              <ul className="flex gap-2 mt-2 text-sm">
                {project.tag.slice(0, 3).map((tag, index) => (
                  <li
                    key={`${tag}-${index}`}
                    className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
                {project.tag.length > 3 && (
                  <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                    +{project.tag.length - 3}
                  </li>
                )}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      )}
    </>
  );
};

export default Project;
