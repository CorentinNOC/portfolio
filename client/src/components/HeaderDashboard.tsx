import { useNavigate } from "react-router-dom";

export default function Header({ onAddClick }: { onAddClick: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <div className="flex lg:flex-row flex-col justify-between items-start gap-2 lg:items-center mb-12">
      <h1 className="text-4xl font-bold">PROJETS</h1>
      <button
        onClick={onAddClick}
        className="border border-secondary px-6 py-3 hover:bg-gray-800 transition-colors"
      >
        AJOUTER
      </button>
      <button
        onClick={handleLogout}
        className="border border-secondary px-6 py-3 hover:bg-secondary/25 cursor-pointer transition-colors font-bold"
      >
        DÉCONNEXION
      </button>
    </div>
  );
}
