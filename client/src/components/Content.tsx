import { useFetch } from "../hooks/useFetch";
import type { Project } from "../types/project.types";

function Content() {
  const { data, isLoading, error } = useFetch<Project[]>("/projects.json");

  if (isLoading) return <p>load</p>;
  if (error || !data) return <span>Oups, il y a un problème</span>;

  return (
    <div className="lg:overflow-y-auto lg:w-[48%] lg:py-24 lg:mt-0 mt-6 no-scrollbar">
      <section id="about">
        <article className="flex">
          <p>
            Je m'appelle Corentin, j'ai 28 ans, développeur front-end. Après
            avoir travaillé dans une entreprise de grande envergure avec
            plusieurs sites pendant plusieurs années. Je cherche à mettre mes
            compétences à votre service : création de maquette, intégration de
            pages, création de site. Mon expérience me permet d'être autonome et
            de m'intégrer facilement à une équipe et son environnement.
          </p>
        </article>
      </section>
      <section id="experience" className="flex flex-col">
        <article className="wave transition duration-500 lg:delay-300 group overflow-hidden relative flex flex-col lg:flex-row lg:mt-16 mt-6 justify-between border border-transparent hover:border-secondary hover:text-primary p-6">
          <p className="lg:w-1/5 mb-2 lg:mb-0">2022 - 2025</p>
          <div className="lg:w-md">
            <h4 className="font-bold">
              North Star Network - Développeur front
            </h4>
            <p className="text-sm mt-2">
              Intégration et développement front-end de sites médias à fort
              trafic sous WordPress. Travail à partir de maquettes pour
              l’intégration de thèmes et de blocs sur mesure (HTML, CSS,
              JavaScript), avec mise en place de la logique des templates et de
              l’affichage via PHP et Blade. Optimisation des performances, de la
              maintenabilité et du build front grâce à Webpack. Travail en
              environnement collaboratif avec Git et CI/CD, tests via Docker, et
              suivi des tâches via tickets internes, en lien avec les
              différentes équipes.
            </p>
            <ul className="flex flex-wrap gap-2 mt-2 text-sm">
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                HTML & SCSS
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                Javascript
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                jQuery
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                PHP (Wordpress)
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                Blade
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                Webpack
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                Git
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                CI/CD
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                Docker
              </li>
            </ul>
          </div>
        </article>
        <article className="wave transition duration-500 delay-300 group overflow-hidden relative flex lg:flex-row flex-col lg:mt-16 mt-6 justify-between border border-transparent hover:border-secondary hover:text-primary p-6">
          <p className="lg:w-1/5 mb-2 lg:mb-0">2021 - 2022</p>
          <div className="lg:w-md">
            <h4 className="font-bold">Freelance</h4>
            <p className="text-sm mt-2">
              Réalisation de sites web vitrines et e-commerce sous WordPress, de
              la conception de maquettes (Figma) à l’intégration sur mesure
              (HTML, CSS, JavaScript). Création de thèmes personnalisés, mise en
              place de plugins facilitant l’ajout de contenu et intégration de
              solutions e-commerce (WooCommerce). Interventions variées incluant
              webdesign, UX/UI, responsive design, pages de réservation,
              templates d’emails et refontes de sites.
            </p>
            <ul className="flex flex-wrap gap-2 mt-2 text-sm">
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                Figma
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                HTML & SCSS
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                Javascript
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                jQuery
              </li>
              <li className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full">
                PHP (Wordpress)
              </li>
            </ul>
          </div>
        </article>
      </section>
      <section id="projet" className="flex-shrink-0">
        {data.map((project) => (
          <article
            key={project.title}
            className="wave transition duration-500 delay-300 group overflow-hidden relative flex flex-col-reverse lg:flex-row mb-4 lg:mt-16 mt-8 gap-4 transition border border-transparent hover:border-secondary hover:text-primary p-6"
          >
            <img
              className="max-w-[200px] lg:min-w-[140px] h-[110px] lg:h-[80px] object-cover"
              src={project.images[0]}
              alt=""
            />
            <div className="w-full">
              <h2 className="font-bold">{project.title}</h2>
              <p className="text-sm mt-2">{project.description}</p>
              <ul className="flex gap-2 mt-2 text-sm">
                {project.tag.map((tag) => (
                  <li
                    key={tag}
                    className="bg-secondary/25 group-hover:bg-primary/25 transition-colors duration-500 delay-300 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Content;
