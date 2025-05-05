
import { useQuery } from '@tanstack/react-query';
import { sanityClient, SanityGalleryItem } from '@/lib/sanity';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  caption?: string;
}

export const useGalleryItems = () => {
  return useQuery({
    queryKey: ['galleryItems'],
    queryFn: async (): Promise<GalleryItem[]> => {
      // GROQ query to fetch gallery items from Sanity
      const query = `*[_type == "galleryItem"] {
        _id,
        title,
        category,
        "image": image.asset->url,
        caption
      }`;
      
      try {
        const sanityItems = await sanityClient.fetch<SanityGalleryItem[]>(query);
        
        // Transform Sanity data to our app's format
        return sanityItems.map((item) => ({
          id: item._id,
          image: item.image.asset.url,
          title: item.title,
          category: item.category,
          caption: item.caption,
        }));
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        
        // Return fallback data in case of error (until Sanity is set up)
        return [
          {
            id: "1",
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
            title: "UI Design - Smart Home App",
            category: "ui",
            caption: "Modern interface for smart home control"
          },
          {
            id: "2",
            image: "https://images.unsplash.com/photo-1620674156044-52b714665d46?q=80&w=800&auto=format&fit=crop",
            title: "3D Character Model",
            category: "3d",
            caption: "Character design for animation project"
          },
          {
            id: "3",
            image: "https://images.unsplash.com/photo-1591169469138-cce8604ea2d7?q=80&w=800&auto=format&fit=crop",
            title: "Video Editing Project",
            category: "video",
            caption: "Commercial video editing with special effects"
          },
          {
            id: "4",
            image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=800&auto=format&fit=crop",
            title: "Marketing Graphics",
            category: "graphic",
            caption: "Brand marketing campaign visuals"
          },
          {
            id: "5",
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop", 
            title: "E-commerce App Design",
            category: "ui",
            caption: "UI/UX design for e-commerce application"
          },
          {
            id: "6",
            image: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=800&auto=format&fit=crop",
            title: "Game Asset Design",
            category: "3d",
            caption: "3D assets for mobile gaming"
          }
        ];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
