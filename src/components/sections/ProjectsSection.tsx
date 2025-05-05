
import { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const ProjectsSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const [visibleProjects, setVisibleProjects] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Fetch projects data using our custom hook
  const { data: projects = [], isLoading } = useProjects();

  useEffect(() => {
    if (filter === "all") {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter((project) => project.category === filter));
    }
  }, [filter, projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "design", name: "Design & VFX" },
    { id: "ai", name: "AI & ML" },
    { id: "accessibility", name: "Accessibility" },
  ];

  return (
    <section id="projects" ref={sectionRef} className="bg-navy-dark py-20">
      <div className="container-wrapper">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Projects</h2>
          <p className="text-gray-300 mt-8 max-w-2xl mx-auto">
            Here are some of my featured projects that demonstrate my skills across
            different domains from design to development.
            {isLoading && " Loading projects..."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-5 py-2 rounded-full transition-all ${
                filter === category.id
                  ? "bg-teal text-navy font-medium"
                  : "bg-navy-light text-gray-300 hover:bg-navy-light/70"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative overflow-hidden ${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="aspect-video overflow-hidden rounded-lg mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 3).map((tech: string) => (
                  <span key={tech} className="text-xs px-3 py-1 bg-navy rounded-full text-teal">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-3 py-1 bg-navy rounded-full text-gray-300">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <button className="text-teal text-sm flex items-center gap-1 hover:underline">
                  View Details <ChevronRight size={16} />
                </button>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:text-teal-light"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
