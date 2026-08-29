import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: `Portfolio of ${site.name}, ${site.role.toLowerCase()} based in ${site.location}.`,
    start_url: "/",
    display: "browser",
    background_color: "#fbfbfa",
    theme_color: "#4f46e5",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
