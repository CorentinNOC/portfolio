import { useState } from "react";
import { projectService } from "../services/projectService";
import type { ProjectType } from "../types/project.types";
import HeaderDashboard from "./HeaderDashboard";
import ProjectList from "./ProjectList";
import ProjectModal from "./ProjectModal";

export default function DashboardContent({
  initialProjects,
}: {
  initialProjects: ProjectType[];
}) {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectType) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = async (
    project: Omit<ProjectType, "id" | "images">,
    imageFiles: File[],
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (editingProject?.id) {
        await projectService.update(
          editingProject.id,
          project as ProjectType,
          imageFiles,
        );
      } else {
        await projectService.create(project as ProjectType, imageFiles);
      }

      await loadProjects();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await projectService.delete(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <HeaderDashboard />

        {error && (
          <div className="mb-6 p-4 border border-red-500 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-lg">Chargement...</p>
          </div>
        )}

        <ProjectList
          projects={projects}
          onDelete={handleDelete}
          onEdit={openEditModal}
          onAddClick={openModal}
        />

        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          initialData={editingProject}
        />
      </div>
    </main>
  );
}
