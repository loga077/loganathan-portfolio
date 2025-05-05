
import { useEffect, useState, useRef } from 'react';
import { useCertificates } from '@/hooks/useCertificates';

const CertificatesSection = () => {
  const [activeTab, setActiveTab] = useState<'certificates' | 'internships'>('certificates');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Fetch certificates data using our custom hook
  const { data: allCertificates = [], isLoading } = useCertificates();

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

  const items = activeTab === 'certificates' 
    ? allCertificates.filter(item => item.type === 'certificate') 
    : allCertificates.filter(item => item.type === 'internship');

  return (
    <section id="certificates" ref={sectionRef} className="py-20">
      <div className="container-wrapper">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Certificates & Experience</h2>
          <p className="text-gray-300 mt-8 max-w-2xl mx-auto">
            A showcase of my professional development through certifications and internship experiences.
            {isLoading && " Loading certificates..."}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-navy-dark rounded-lg p-1">
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-6 py-2.5 rounded-md text-sm md:text-base font-medium transition-all ${
                activeTab === 'certificates'
                  ? 'bg-teal text-navy'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Certificates
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`px-6 py-2.5 rounded-md text-sm md:text-base font-medium transition-all ${
                activeTab === 'internships'
                  ? 'bg-teal text-navy'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Internships
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {items.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`timeline-item ${isVisible ? "animate-fade-in" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="timeline-dot"></div>
                  <div className="glass p-6 rounded-lg ml-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <ItemIcon size={18} className="text-teal" />
                        {item.title}
                      </h3>
                      <span className="text-sm text-teal bg-teal/10 px-3 py-1 rounded-full">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-gray-300">{item.issuer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
