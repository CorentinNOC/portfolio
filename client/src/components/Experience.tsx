import { useEffect, useState } from "react";
import { experienceService } from "../services/experienceService";
import type { ExperienceType } from "../types/experience.types";

const Experience = () => {
  const [data, setData] = useState<ExperienceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    experienceService
      .getAll()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Chargement...</p>;
  if (error || !data) return <span>Oups, il y a un problème</span>;

  return (
    <section id="experience" className="flex flex-col">
      <h3 className="text-xl text-third font-bold uppercase mt-8">
        Expériences
      </h3>
      {data.map((experience) => (
        <article
          key={experience.id}
          className="wave transition duration-500 delay-300 group overflow-hidden relative flex lg:flex-row flex-col lg:mt-8 mt-6 justify-between border border-transparent hover:border-secondary hover:text-primary p-6"
        >
          <p className="lg:w-1/5 mb-2 lg:mb-0">{experience.date}</p>
          <div className="lg:w-md">
            <h4 className="font-bold text-third group-hover:text-primary transition-colors duration-500 delay-300">
              {experience.title}
            </h4>
            <p className="text-sm mt-2">{experience.description}</p>
            <ul className="flex flex-wrap gap-2 mt-2 text-sm">
              {experience.tag.map((tag, index) => (
                <li
                  key={`${tag}-${index}`}
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
  );
};

export default Experience;
