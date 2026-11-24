import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const routes: [string, number][] = [
    ["", 1],
    ["/booking", 0.9],
    ["/timetable", 0.9],
    ["/classes", 0.8],
    ["/start", 0.8],
    ["/membership", 0.8],
    ["/coaches", 0.7],
    ["/about", 0.6],
    ["/faq", 0.6],
    ["/contact", 0.6],
  ];
  return routes.map(([path, priority]) => ({ url: `${base}${path}`, changeFrequency: "weekly", priority }));
}
