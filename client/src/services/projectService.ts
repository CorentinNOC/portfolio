import type { ProjectType } from "../types/project.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface BackendProject {
  _id: string;
  title: string;
  description: string;
  tag: string[];
  imageUrls: string[];
  link: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const projectService = {
  async getAll(): Promise<ProjectType[]> {
    const response = await fetch(`${API_URL}/projects`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des projets");
    const data: BackendProject[] = await response.json();

    return data.map((project) => ({
      id: project._id,
      title: project.title,
      description: project.description,
      tag: project.tag,
      images: project.imageUrls,
      link: project.link,
    }));
  },

  async create(project: ProjectType, imageFiles: File[]): Promise<ProjectType> {
    const formData = new FormData();

    const projectData = {
      title: project.title,
      description: project.description,
      tag: project.tag,
      link: project.link,
    };

    formData.append("project", JSON.stringify(projectData));

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la création du projet");
    }

    const data = await response.json();
    return {
      id: data.project._id,
      title: data.project.title,
      description: data.project.description,
      tag: data.project.tag,
      images: data.project.imageUrls,
      link: data.project.link,
    };
  },

  async update(
    id: string,
    project: ProjectType,
    imageFiles?: File[],
  ): Promise<void> {
    const formData = new FormData();

    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("tag", JSON.stringify(project.tag));
    formData.append("link", project.link);

    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Erreur lors de la modification du projet",
      );
    }
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la suppression du projet");
    }
  },
};
