import { useState } from "react";
import type { Project } from "../types/project.types";
import HeaderDashboard from "./HeaderDashboard";
import ProjectList from "./ProjectList";
import ProjectModal from "./ProjectModal";

export default function DashboardContent({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (project: Project) => {
    if (editingProject?.id) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? { ...project, id: editingProject.id }
            : p,
        ),
      );
    } else {
      setProjects((prev) => [
        ...prev,
        { ...project, id: Date.now().toString() },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <HeaderDashboard onAddClick={openModal} />

        <ProjectList
          projects={projects}
          onDelete={handleDelete}
          onEdit={openEditModal}
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
