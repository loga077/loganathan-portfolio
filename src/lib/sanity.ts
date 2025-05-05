
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

// Helper function to build image URL with custom parameters
export const urlFor = (source: any) => {
  return `${source}?w=800&auto=format&fit=crop`;
};

// Types for Gallery items from Sanity
export interface SanityGalleryItem {
  _id: string;
  title: string;
  category: string;
  image: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  caption?: string;
}

// Types for Project items from Sanity
export interface SanityProject {
  _id: string;
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  category: string;
  technologies: string[];
  link?: string;
}

// Types for Certificate items from Sanity
export interface SanityCertificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'certificate' | 'internship';
}
