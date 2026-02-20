import type { ExperienceType } from "../types/experience.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface BackendExperience {
  _id: string;
  title: string;
  date: string;
  description: string;
  tag: string[];
  link: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const experienceService = {
  async getAll(): Promise<ExperienceType[]> {
    const response = await fetch(`${API_URL}/experiences`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des expériences");
    const data: BackendExperience[] = await response.json();

    return data.map((experience) => ({
      id: experience._id,
      title: experience.title,
      date: experience.date,
      description: experience.description,
      tag: experience.tag,
      link: experience.link,
    }));
  },

  async create(experience: ExperienceType): Promise<ExperienceType> {
    const response = await fetch(`${API_URL}/experiences`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(experience),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Erreur lors de la création de l'expérience",
      );
    }

    const data = await response.json();
    return {
      id: data.experience._id,
      title: data.experience.title,
      date: data.experience.date,
      description: data.experience.description,
      tag: data.experience.tag,
      link: data.experience.link,
    };
  },

  async update(id: string, experience: ExperienceType): Promise<void> {
    const response = await fetch(`${API_URL}/experiences/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ experience }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Erreur lors de la modification de l'expérience",
      );
    }
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/experiences/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Erreur lors de la suppression de l'expérience",
      );
    }
  },
};
