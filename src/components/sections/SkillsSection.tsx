
import { useEffect, useState, useRef } from 'react';

interface Skill {
  name: string;
  percentage: number;
  category: string;
}

const skills: Skill[] = [
  // Design Tools
  { name: "Photoshop", percentage: 85, category: "design" },
  { name: "Adobe Premiere Pro", percentage: 90, category: "design" },
  { name: "Adobe XD", percentage: 80, category: "design" },
  { name: "Figma", percentage: 80, category: "design" },
  
  // 3D & Game
  { name: "Blender", percentage: 60, category: "3d" },
  { name: "Unity", percentage: 55, category: "3d" },
  
  // Programming
  { name: "Python", percentage: 75, category: "programming" },
  { name: "Java", percentage: 70, category: "programming" },
  { name: "HTML", percentage: 85, category: "programming" },
  { name: "CSS", percentage: 80, category: "programming" },
  { name: "JavaScript", percentage: 70, category: "programming" },
  
  // AI
  { name: "Machine Learning", percentage: 65, category: "ai" },
  { name: "Deep Learning", percentage: 60, category: "ai" },
  { name: "Model Training", percentage: 60, category: "ai" },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "design", name: "Design Tools" },
    { id: "programming", name: "Programming" },
    { id: "3d", name: "3D & Game" },
    { id: "ai", name: "AI Knowledge" },
  ];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container-wrapper">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">My Skills</h2>
          <p className="text-gray-300 mt-8 max-w-2xl mx-auto">
            I've developed a diverse set of skills across design, development, and emerging technologies.
            Here's a breakdown of my technical expertise and proficiency levels.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full transition-all ${
                activeCategory === category.id
                  ? "bg-teal text-navy font-medium"
                  : "bg-navy-light text-gray-300 hover:bg-navy-light/70"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {filteredSkills.map((skill, index) => (
            <div key={skill.name} className={`skill-item ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-teal">{skill.percentage}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ 
                    width: isVisible ? `${skill.percentage}%` : '0%',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-navy-light">
          <h3 className="text-2xl font-bold mb-10 text-center">Soft Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              "Communication", 
              "Leadership", 
              "Event Organization", 
              "R&D",
              "Problem Solving",
              "Teamwork",
              "Adaptability",
              "Creativity"
            ].map((skill, index) => (
              <div 
                key={skill}
                className={`bg-navy-light rounded-lg p-6 text-center hover:bg-navy-light/80 transition-all ${isVisible ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
