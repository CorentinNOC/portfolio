import { useState } from "react";
import { experienceService } from "../services/experienceService";
import { projectService } from "../services/projectService";
import type { ExperienceType } from "../types/experience.types";
import type { ProjectType } from "../types/project.types";
import ExperienceList from "./ExperienceList";
import ExperienceModal from "./ExperienceModal";
import HeaderDashboard from "./HeaderDashboard";
import ProjectList from "./ProjectList";
import ProjectModal from "./ProjectModal";

export default function DashboardContent({
  initialProjects,
  initialExperiences,
}: {
  initialProjects: ProjectType[];
  initialExperiences: ExperienceType[];
}) {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [experiences, setExperiences] =
    useState<ExperienceType[]>(initialExperiences);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<ProjectType | null>(
    null,
  );
  const [editingExperience, setEditingExperience] =
    useState<ExperienceType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- PROJECTS ---
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

  const openProjectModal = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project: ProjectType) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleProjectSubmit = async (
    project: Omit<ProjectType, "id" | "images">,
    imageFiles: File[],
    imagesToDelete: string[],
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (editingProject?.id) {
        await projectService.update(
          editingProject.id,
          project as ProjectType,
          imageFiles,
          imagesToDelete,
        );
      } else {
        await projectService.create(project as ProjectType, imageFiles);
      }

      await loadProjects();
      closeProjectModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectDelete = async (id: string) => {
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

  // --- EXPERIENCES ---
  const loadExperiences = async () => {
    try {
      setIsLoading(true);
      const data = await experienceService.getAll();
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openExperienceModal = () => {
    setEditingExperience(null);
    setIsExperienceModalOpen(true);
  };

  const openEditExperienceModal = (experience: ExperienceType) => {
    setEditingExperience(experience);
    setIsExperienceModalOpen(true);
  };

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);
    setEditingExperience(null);
  };

  const handleExperienceSubmit = async (
    experience: Omit<ExperienceType, "id">,
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (editingExperience?.id) {
        await experienceService.update(
          editingExperience.id,
          experience as ExperienceType,
        );
      } else {
        await experienceService.create(experience as ExperienceType);
      }

      await loadExperiences();
      closeExperienceModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExperienceDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await experienceService.delete(id);
      await loadExperiences();
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
          onDelete={handleProjectDelete}
          onEdit={openEditProjectModal}
          onAddClick={openProjectModal}
        />

        <ExperienceList
          experiences={experiences}
          onDelete={handleExperienceDelete}
          onEdit={openEditExperienceModal}
          onAddClick={openExperienceModal}
        />

        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={closeProjectModal}
          onSubmit={handleProjectSubmit}
          initialData={editingProject}
        />

        <ExperienceModal
          isOpen={isExperienceModalOpen}
          onClose={closeExperienceModal}
          onSubmit={handleExperienceSubmit}
          initialData={editingExperience}
        />
      </div>
    </main>
  );
}
