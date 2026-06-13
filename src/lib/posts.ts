import { BlogPost } from '../types';
import matter from 'gray-matter';

const blogModules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseBlogPosts(): BlogPost[] {
  const postMap = new Map<string, { en?: string; es?: string }>();

  for (const [path, content] of Object.entries(blogModules)) {
    const filename = path.split('/').pop()!;
    const isEs = filename.endsWith('.es.md');
    const baseId = filename.replace(/\.es\.md$/, '').replace(/\.md$/, '');
    const lang = isEs ? 'es' : 'en';

    if (!postMap.has(baseId)) {
      postMap.set(baseId, {});
    }
    postMap.get(baseId)![lang] = content;
  }

  const posts: BlogPost[] = [];

  for (const [id, contents] of postMap) {
    const enContent = contents.en;
    const esContent = contents.es;

    if (!enContent && !esContent) continue;

    const sourceContent = enContent || esContent;

    const { data, content: body } = matter(sourceContent!);

    let esBody: string | undefined;
    if (esContent) {
      esBody = matter(esContent).content;
    }

    posts.push({
      id: data.id || id,
      date: data.date || '',
      readTime: data.readTime || '',
      readTimeEs: data.readTimeEs || data.readTime || '',
      title: data.title || '',
      titleEs: data.titleEs || data.title || '',
      summary: data.summary || '',
      summaryEs: data.summaryEs || data.summary || '',
      author: data.author || '',
      authorRole: data.authorRole || '',
      authorRoleEs: data.authorRoleEs || data.authorRole || '',
      authorAvatar: data.authorAvatar || '',
      publishedDate: data.publishedDate || data.date || '',
      tags: data.tags || [],
      content: body,
      contentEs: esBody,
    });
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));

  return posts;
}

let cachedPosts: BlogPost[] | null = null;

export function getBlogPosts(): BlogPost[] {
  if (!cachedPosts) {
    cachedPosts = parseBlogPosts();
  }
  return cachedPosts;
}
