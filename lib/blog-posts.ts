export interface BlogPostSection {
  heading: string
  paragraphs: string[]
  command?: string
  imageSrc?: string
  imageAlt?: string
  imageCaption?: string
}

export interface BlogPost {
  slug: string
  title: string
  dateIso: string
  category: "Showcase" | "Research" | "Ecosystem"
  excerpt: string
  readTime: string
  tags: string[]
  sections: BlogPostSection[]
  links: { label: string; href: string }[]
}

export const blogPosts: BlogPost[] = []

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
