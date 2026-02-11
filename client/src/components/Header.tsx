function Header() {
  return (
    <header className="lg:flex lg:flex-col justify-between lg:w-[48%] flex-shrink-0 lg:py-24 lg:sticky lg:top-0 lg:max-h-screen">
      <div>
        <div className="title pl-4">
          <h1 className="font-bold tracking-[.25em]">Corentin Nicolas</h1>
          <h2>Développeur Web</h2>
        </div>

        <nav className="flex mt-16">
          <ul>
            <li>
              <a href="#about">À propos</a>
            </li>
            <li>
              <a href="#experience">Expériences</a>
            </li>
            <li>
              <a href="#projet">Projets</a>
            </li>
          </ul>
        </nav>
      </div>

      <article className="flex mt-16 mb-4 lg:mb-0">
        <h3 className="w-1/5">Link</h3>
        <a href="https://github.com/CorentinNOC" className="w-2/3">
          Github
        </a>
      </article>
    </header>
  );
}

export default Header;
