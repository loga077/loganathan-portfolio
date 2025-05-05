
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-pattern">
      <div className="rotating-bg"></div>
      <div className="container-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="block">Hi, I'm</span>
                <span className="text-gradient">Loganathan</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-teal-light font-medium">
                Designer & Tech Enthusiast
              </h2>
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                I blend creativity with technical skills to craft engaging digital experiences.
                From design to development, I'm passionate about innovation and problem-solving.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#contact" className="btn btn-primary">
                  Get In Touch
                </a>
                <a href="#projects" className="btn btn-outline">
                  View My Work
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="aspect-square w-full max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal/30 to-highlight/30 blur-3xl opacity-60"></div>
              <div className="absolute inset-8 bg-navy rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 rounded-full overflow-hidden border-4 border-teal/30 glass">
                  <div className="w-full h-full bg-gradient-to-br from-teal/20 to-highlight/20 flex items-center justify-center text-6xl font-bold text-white/80">
                    L
                  </div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute w-full h-full animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-teal/20 backdrop-blur-sm border border-teal/30"></div>
              </div>
              <div className="absolute w-full h-full animate-[spin-slow_25s_linear_infinite_reverse]">
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-highlight/20 backdrop-blur-sm border border-highlight/30"></div>
              </div>
            </div>
          </div>
        </div>

        <div ref={quoteRef} className="max-w-2xl mx-auto mt-20 opacity-0">
          <blockquote className="text-xl md:text-2xl italic text-center text-gray-300 glass rounded-xl p-8">
            <p className="mb-4">"Innovation distinguishes between a leader and a follower."</p>
            <footer className="text-right text-teal">— Steve Jobs</footer>
          </blockquote>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center gap-2 text-gray-400 hover:text-teal transition-colors">
            <span className="text-sm">Scroll Down</span>
            <ChevronDown />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
