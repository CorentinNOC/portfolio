function Content() {
  return (
    <div className="w-1/2 flex-shrink-0 overflow-y-auto">
      {/* Ajoutez du contenu pour tester le scroll */}
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>Ligne {i + 1}</p>
      ))}
    </div>
  );
}

export default Content;
