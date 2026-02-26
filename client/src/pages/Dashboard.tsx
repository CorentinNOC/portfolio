import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContent from "../components/DashboardContent";
import { experienceService } from "../services/experienceService";
import { projectService } from "../services/projectService";
import type { ExperienceType } from "../types/experience.types";
import type { ProjectType } from "../types/project.types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const loadData = async () => {
      try {
        const [projectsData, experiencesData] = await Promise.all([
          projectService.getAll(),
          experienceService.getAll(),
        ]);
        setProjects(projectsData);
        setExperiences(experiencesData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <DashboardContent
      initialProjects={projects}
      initialExperiences={experiences}
    />
  );
};

export default Dashboard;
