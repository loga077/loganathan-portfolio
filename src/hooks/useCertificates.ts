
import { useQuery } from '@tanstack/react-query';
import { sanityClient, SanityCertificate } from '@/lib/sanity';
import { Award, Calendar, Code, LucideIcon } from 'lucide-react';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'certificate' | 'internship';
  icon: LucideIcon;
}

const getIconForTitle = (title: string): LucideIcon => {
  if (title.toLowerCase().includes('python') || title.toLowerCase().includes('code')) {
    return Code;
  }
  return Award;
};

export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async (): Promise<Certificate[]> => {
      // GROQ query to fetch certificate items from Sanity
      const query = `*[_type == "certificate"] {
        _id,
        title,
        issuer,
        date,
        type
      }`;
      
      try {
        const sanityCertificates = await sanityClient.fetch<SanityCertificate[]>(query);
        
        // Transform Sanity data to our app's format
        return sanityCertificates.map((cert) => ({
          id: cert._id,
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          type: cert.type,
          icon: cert.type === 'internship' ? Calendar : getIconForTitle(cert.title)
        }));
      } catch (error) {
        console.error('Error fetching certificate items:', error);
        
        // Return fallback data in case of error (until Sanity is set up)
        return [
          {
            id: "1",
            title: "ChatGPT for Everyone",
            issuer: "OpenAI",
            date: "2023",
            type: "certificate" as const,
            icon: Award
          },
          {
            id: "2",
            title: "Python",
            issuer: "Coursera",
            date: "2022",
            type: "certificate" as const,
            icon: Code
          },
          {
            id: "3",
            title: "Advanced Premiere Pro",
            issuer: "Adobe",
            date: "2022",
            type: "certificate" as const,
            icon: Award
          },
          {
            id: "4",
            title: "UI/UX Build Career",
            issuer: "Udemy",
            date: "2023",
            type: "certificate" as const,
            icon: Award
          },
          {
            id: "5",
            title: "Mobile App Development Intern",
            issuer: "NSIC",
            date: "15 days",
            type: "internship" as const,
            icon: Calendar
          },
          {
            id: "6",
            title: "UI/UX Designer Intern",
            issuer: "Eluid Technology, Bangalore",
            date: "2 months",
            type: "internship" as const,
            icon: Calendar
          },
          {
            id: "7",
            title: "Graphic Designer Intern",
            issuer: "DevTown",
            date: "3 months",
            type: "internship" as const,
            icon: Calendar
          }
        ];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
