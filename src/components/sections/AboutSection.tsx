
import { useEffect, useRef } from "react";
import { Briefcase, GraduationCap, Heart } from "lucide-react";

const AboutSection = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            // Remove opacity-0 when element is visible
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Select all elements with about-animate class
    const elements = document.querySelectorAll('.about-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-navy-dark py-20 overflow-hidden">
      <div className="container-wrapper">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title text-center">About Me</h2>
          <p className="text-gray-300 mt-8">
            I'm a multi-skilled designer and technology enthusiast with a passion for creating unique digital experiences.
            My journey spans across various creative and technical disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="about-animate opacity-0 card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mb-6">
              <GraduationCap size={32} className="text-teal" />
            </div>
            <h3 className="text-xl font-bold mb-4">Education</h3>
            <p className="text-gray-300">
              Pursuing Information Technology at Vel Tech High Tech Dr.Rangarajan Dr.Sakunthala Engineering College.
            </p>
          </div>

          <div className="about-animate opacity-0 card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mb-6">
              <Briefcase size={32} className="text-teal" />
            </div>
            <h3 className="text-xl font-bold mb-4">Experience</h3>
            <p className="text-gray-300">
              Worked across UI/UX design, graphic design and mobile app development through multiple internships.
            </p>
          </div>

          <div className="about-animate opacity-0 card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mb-6">
              <Heart size={32} className="text-teal" />
            </div>
            <h3 className="text-xl font-bold mb-4">Passion</h3>
            <p className="text-gray-300">
              Passionate about design, technology, research, and creating solutions that make a positive impact.
            </p>
          </div>
        </div>

        <div ref={aboutRef} className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="about-animate opacity-0">
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <p className="text-gray-300 mb-6">
              I started my journey with a fascination for both design and technology, which led me to explore various creative tools and programming languages. 
              Through my education and internships, I've developed a versatile skill set that spans across design, development, and emerging technologies.
            </p>
            <p className="text-gray-300">
              As a student leader and volunteer, I've also honed my soft skills in communication, leadership, and event organization. I'm constantly learning and exploring new technologies, especially in AI and machine learning.
            </p>
          </div>

          <div className="about-animate opacity-0">
            <div className="glass p-8 rounded-xl gradient-border">
              <h3 className="text-2xl font-bold mb-6">Hobbies & Interests</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-teal">•</span>
                  <span className="text-gray-300">Playing Cricket and Kabaddi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal">•</span>
                  <span className="text-gray-300">Watching Sports</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal">•</span>
                  <span className="text-gray-300">Mobile and PC Gaming</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal">•</span>
                  <span className="text-gray-300">Reading Research Articles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal">•</span>
                  <span className="text-gray-300">Learning New Technologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal">•</span>
                  <span className="text-gray-300">Reading Books</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
