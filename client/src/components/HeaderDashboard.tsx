export default function Header({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div className="flex justify-between items-center mb-12">
      <h1 className="text-4xl font-bold">PROJETS</h1>
      <button
        onClick={onAddClick}
        className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
      >
        AJOUTER
      </button>
    </div>
  );
}
