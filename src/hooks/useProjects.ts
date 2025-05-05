
import { useQuery } from '@tanstack/react-query';
import { sanityClient, SanityProject } from '@/lib/sanity';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      // GROQ query to fetch project items from Sanity
      const query = `*[_type == "project"] {
        _id,
        title,
        description,
        "image": image.asset->url,
        category,
        technologies,
        link
      }`;
      
      try {
        const sanityProjects = await sanityClient.fetch<SanityProject[]>(query);
        
        // Transform Sanity data to our app's format
        return sanityProjects.map((project) => ({
          id: project._id,
          title: project.title,
          description: project.description,
          image: project.image.asset.url,
          category: project.category,
          technologies: project.technologies,
          link: project.link
        }));
      } catch (error) {
        console.error('Error fetching project items:', error);
        
        // Return fallback data in case of error (until Sanity is set up)
        return [
          {
            id: "1",
            title: "Mathematical Assistant for Blind Users",
            description: "An accessible application designed to help visually impaired users solve mathematical problems through voice commands and audio feedback.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
            category: "accessibility",
            technologies: ["Python", "Speech Recognition", "Text-to-Speech", "Accessibility API"],
          },
          {
            id: "2",
            title: "Advocate-Client Interaction Webpage",
            description: "A platform facilitating seamless communication and document exchange between lawyers and their clients with secure messaging and file sharing.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
            category: "web",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
          },
          {
            id: "3",
            title: "Tennis Scoreboard Detection",
            description: "Computer vision system that automatically detects and records tennis scores from video footage using machine learning algorithms.",
            image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1400&auto=format&fit=crop",
            category: "ai",
            technologies: ["Python", "OpenCV", "Machine Learning", "TensorFlow"],
          },
          {
            id: "4",
            title: "Smart Restaurant Dining Table UI",
            description: "Interactive touchscreen interface for restaurant tables, allowing customers to browse menus, place orders, and make payments.",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop",
            category: "design",
            technologies: ["Figma", "Adobe XD", "UI/UX", "Interaction Design"],
          },
          {
            id: "5",
            title: "VFX Motion Graphics Portfolio",
            description: "Collection of visual effects and motion graphics projects showcasing advanced video editing and animation techniques.",
            image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1400&auto=format&fit=crop",
            category: "design",
            technologies: ["Adobe Premiere Pro", "After Effects", "Motion Graphics", "Video Editing"],
          }
        ];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
