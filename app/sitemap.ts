import type { MetadataRoute } from "next";
import { projects } from "./data/projects";
import { NAV_ITEMS, projectHref, siteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ["/", ...NAV_ITEMS.map((item) => item.href), ...projects.map((p) => projectHref(p.slug))];

  return paths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
