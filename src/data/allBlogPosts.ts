import type { BlogPost } from './blogPosts';
import { usefulBlogPosts } from './usefulBlogPosts';

const postMap = new Map<string, BlogPost>();

for (const post of usefulBlogPosts) {
  postMap.set(post.slug, post);
}

export const allBlogPosts = [...postMap.values()];

export function getAllBlogPost(slug: string): BlogPost | undefined {
  return allBlogPosts.find((post) => post.slug === slug);
}
