import { BlogPost } from '../types';

const blogModules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontMatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {} as Record<string, any>, content: source };
  }

  const frontMatterBlock = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  const lines = frontMatterBlock.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes if any
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    // Check if the value is an array like ['NETWORKING', 'PYTHON', 'ANSIBLE'] or ['GENERAL']
    if (val.startsWith('[') && val.endsWith(']')) {
      const itemsString = val.slice(1, -1);
      const items = itemsString
        .split(',')
        .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
      data[key] = items;
    } else {
      data[key] = val;
    }
  }

  return { data, content };
}

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

    const { data, content: body } = parseFrontMatter(sourceContent!);

    let esBody: string | undefined;
    if (esContent) {
      esBody = parseFrontMatter(esContent).content;
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
      image: data.image || '',
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

export function resolveImagePath(src: string | undefined): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  let cleanSrc = src;
  if (cleanSrc.startsWith('./')) {
    cleanSrc = cleanSrc.slice(2);
  }
  if (!cleanSrc.startsWith('/')) {
    cleanSrc = '/' + cleanSrc;
  }
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${baseUrl}${cleanSrc}`;
}

