
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGalleryItems } from '@/hooks/useGalleryItems';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  caption?: string;
}

const GallerySection = () => {
  const [filter, setFilter] = useState<string>("all");
  const [visible, setVisible] = useState<GalleryItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Fetch gallery items using our custom hook
  const { data: galleryItems = [], isLoading } = useGalleryItems();

  useEffect(() => {
    if (filter === "all") {
      setVisible(galleryItems);
    } else {
      setVisible(galleryItems.filter((item) => item.category === filter));
    }
  }, [filter, galleryItems]);

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
    { id: "all", name: "All Work" },
    { id: "ui", name: "UI/UX Design" },
    { id: "graphic", name: "Graphic Design" },
    { id: "video", name: "Video Editing" },
    { id: "3d", name: "3D Modeling" }
  ];

  return (
    <section id="gallery" ref={sectionRef} className="py-20">
      <div className="container-wrapper">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Creative Gallery</h2>
          <p className="text-gray-300 mt-8 max-w-2xl mx-auto">
            A visual showcase of my design work, video edits, and other creative projects.
            {isLoading && " Loading gallery..."}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item, index) => (
            <div
              key={item.id}
              className={`group relative aspect-video overflow-hidden rounded-xl cursor-pointer ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="text-teal text-sm">{categories.find(c => c.id === item.category)?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image popup dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedImage && (
              <div>
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  className="w-full h-auto rounded-lg" 
                />
                {selectedImage.caption && (
                  <p className="mt-4 text-gray-300 text-center">{selectedImage.caption}</p>
                )}
                <p className="text-teal text-sm mt-2 text-center">
                  {categories.find(c => c.id === selectedImage.category)?.name}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
