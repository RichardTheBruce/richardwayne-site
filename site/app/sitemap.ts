import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/work";
import { posts, research } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/about",
    "/writing",
    "/contact",
  ];

  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  for (const study of caseStudies) {
    entries.push({
      url: `${site.url}/work/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const post of posts) {
    entries.push({
      url: `${site.url}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  for (const paper of research) {
    if (paper.localSlug) {
      entries.push({
        url: `${site.url}/writing/${paper.localSlug}`,
        lastModified: new Date(`${paper.year}-01-01`),
        changeFrequency: "yearly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
