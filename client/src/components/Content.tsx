import Experience from "./Experience";
import Project from "./Project";

function Content() {
  return (
    <div className="lg:overflow-y-auto lg:w-[48%] lg:py-24 lg:mt-0 mt-6 no-scrollbar">
      <section className="mb-8" id="about">
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
      <Experience />
      <Project />
    </div>
  );
}

export default Content;
