import DashboardContent from "../components/DashboardContent";
import { useFetch } from "../hooks/useFetch";
import type { ProjectType } from "../types/project.types";

export default function Dashboard() {
  const { data, isLoading, error } = useFetch<ProjectType[]>("/projects.json");

  if (isLoading) return <p>Chargement...</p>;
  if (error || !data) return <span>Oups, il y a un problème</span>;

  return <DashboardContent initialProjects={data} />;
}
