import type { MetadataRoute } from "next"
import { navRoutes, siteConfig } from "@/lib/site"
import { getAllDocs } from "@/lib/docs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const docs = await getAllDocs()

  const docRoutes = docs
    .filter((doc) => doc.slug !== "index")
    .map((doc) => ({
      url: `${siteConfig.url}/docs/${doc.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

  return [
    ...navRoutes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...docRoutes,
  ]
}
