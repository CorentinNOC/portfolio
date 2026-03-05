import ContactForm from "./ContactForm";

function Header() {
  return (
    <header className="flex lg:w-[48%] pt-6 flex-shrink-0 lg:py-20 lg:sticky lg:top-0 lg:max-h-screen">
      <div className="flex lg:flex-no-wrap flex-wrap h-full">
        <div className="title pl-4 h-fit ">
          <h1 className="text-4xl font-bold tracking-[.25em]">
            Corentin Nicolas
          </h1>
          <h2 className="text-third text-lg">Développeur Web</h2>
        </div>

        <nav className="w-1/2 mt-8">
          <ul className="flex flex-col w-auto gap-4 uppercase">
            <li className="flex justify-center w-[120px] w-3xs border hover:bg-secondary/25 p-2">
              <a href="#about">À propos</a>
            </li>
            <li className="flex justify-center w-[120px] border hover:bg-secondary/25 p-2">
              <a href="#experience">Expériences</a>
            </li>
            <li className="flex justify-center w-[120px] border hover:bg-secondary/25 p-2">
              <a href="#projet">Projets</a>
            </li>
          </ul>
        </nav>
        <article className="flex lg:flex-row flex-col mt-8 w-1/2 lg:items-center lg:mb-4 lg:mb-0 uppercase h-fit">
          <h3 className="w-1/5 lg:mr-4 lg:mb-0 mb-2">Link</h3>
          <a
            href="https://github.com/CorentinNOC"
            className="border text-center hover:bg-secondary/25 p-2 w-[120px]"
          >
            Github
          </a>
        </article>
        <ContactForm />
      </div>
    </header>
  );
}

export default Header;
