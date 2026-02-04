function Header() {
  return (
    <header className="flex flex-col justify-between w-1/2 flex-shrink-0">
      <div>
        <div className="title pl-4">
          <h1 className="font-bold tracking-[.25em]">Corentin Nicolas</h1>
          <h2>Développeur Web</h2>
        </div>
        <article className="flex mt-16">
          <h3 className="w-1/5">À propos</h3>
          <p className="w-2/3 border-l-20 pl-4">
            Je m'appelle Corentin, j'ai 28 ans, développeur front-end. Après
            avoir travaillé dans une entreprise de grande envergure avec
            plusieurs sites pendant plusieurs années. Je cherche à mettre mes
            compétences à votre service : création de maquette, intégration de
            pages, création de site. Mon expérience me permet d'être autonome et
            de m'intégrer facilement à une équipe et son environnement.
          </p>
        </article>
        <article className="flex mt-16">
          <h3 className="w-1/5">Expériences</h3>
          <ul className="w-2/3">
            <li className="mb-12">
              <div className="flex gap-4">
                <p>2022 - 2025</p>
                <h4>North Star Network - Développeur front</h4>
              </div>
              <p>
                Intégration et développement front-end de sites médias à fort
                trafic sous WordPress. Travail à partir de maquettes pour
                l’intégration de thèmes et de blocs sur mesure (HTML, CSS,
                JavaScript), avec mise en place de la logique des templates et
                de l’affichage via PHP et Blade. Optimisation des performances,
                de la maintenabilité et du build front grâce à Webpack. Travail
                en environnement collaboratif avec Git et CI/CD, tests via
                Docker, et suivi des tâches via tickets internes, en lien avec
                les différentes équipes.
              </p>
              <ul className="flex flex-wrap gap-2 mt-2">
                <li className="bg-gray-200 px-3 py-1 rounded-full">
                  HTML & SCSS
                </li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">
                  Javascript
                </li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">jQuery</li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">
                  PHP (Wordpress)
                </li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">Blade</li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">Webpack</li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">Git</li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">CI/CD</li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">Docker</li>
              </ul>
            </li>
            <li>
              <div className="flex gap-4">
                <p>2021 - 2022</p>
                <h4>Freelance</h4>
              </div>
              <p>
                Réalisation de sites web vitrines et e-commerce sous WordPress,
                de la conception de maquettes (Figma) à l’intégration sur mesure
                (HTML, CSS, JavaScript). Création de thèmes personnalisés, mise
                en place de plugins facilitant l’ajout de contenu et intégration
                de solutions e-commerce (WooCommerce). Interventions variées
                incluant webdesign, UX/UI, responsive design, pages de
                réservation, templates d’emails et refontes de sites.
              </p>
              <ul className="flex flex-wrap gap-2 mt-2">
                <li className="bg-gray-200 px-3 py-1 rounded-full">Figma</li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">
                  HTML & SCSS
                </li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">
                  Javascript
                </li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">jQuery</li>
                <li className="bg-gray-200 px-3 py-1 rounded-full">
                  PHP (Wordpress)
                </li>
              </ul>
            </li>
          </ul>
        </article>
        <article className="flex mt-16">
          <h3 className="w-1/5">Works</h3>
          <nav>
            <ul>
              <li>
                <a href="#booki">Booki</a>
              </li>
              <li>
                <a href="#architecte">Portfolio Architecte Sophie Buel</a>
              </li>
              <li>
                <a href="#carducci">Nani Carducci</a>
              </li>
              <li>
                <a href="#kasa">Kasa</a>
              </li>
              <li>
                <a href="#vieux-grimoire">Vieux Grimoire</a>
              </li>
            </ul>
          </nav>
        </article>
        <article className="flex mt-16">
          <h3 className="w-1/5">Link</h3>
          <a href="https://github.com/CorentinNOC" className="w-2/3">
            Github
          </a>
        </article>
      </div>
    </header>
  );
}

export default Header;
