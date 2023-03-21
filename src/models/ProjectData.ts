export type ProjectData = {
  name: string;
  source: string;
  description: string;
  descriptionUrl: string;
  imageUrl: string;
  liveUrl: string | null | undefined;
  isDescriptionMarkdown: boolean;
  featured: boolean;
  techStack: string[];
};
