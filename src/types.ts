export type TabType = 'home' | 'blog' | 'blog-detail' | 'research';

export type LanguageType = 'en' | 'es';

export interface BlogPost {
  id: string;
  date: string;
  readTime: string;
  readTimeEs: string;
  title: string;
  titleEs: string;
  summary: string;
  summaryEs: string;
  author: string;
  authorRole: string;
  authorRoleEs: string;
  authorAvatar: string;
  publishedDate: string;
  tags: string[];
  content: string;
  contentEs?: string;
}

export interface Publication {
  id: string;
  permissions: string;
  title: string;
  titleEs: string;
  authors: string;
  year: string;
  venue: string;
  venueType: 'premium' | 'conference' | 'whitepaper' | 'journal';
  pdfAvailable: boolean;
  srcAvailable: boolean;
  bibAvailable: boolean;
}

export interface LogEntry {
  id: string;
  tag: 'SECURITY' | 'TOR_NETWORK' | 'PRIVACY' | 'CRYPTOGRAPHY';
  date: string;
  readTime: string;
  readTimeEs: string;
  command: string;
  description: string;
  descriptionEs: string;
  blogPostId?: string; // Linked blog post
}
