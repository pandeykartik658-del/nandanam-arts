import { urlFor } from "@/sanity/client";

/**
 * Universal image optimizer.
 * For Sanity image objects, routes to `urlFor` for formatting and quality optimization.
 * For Cloudinary URLs, injects width parameters.
 * Reduces bandwidth and image memory usage.
 */
export const optimizeImage = (source: any, width = 1200): string => {
  if (!source) return "";

  // Handle direct string URLs (Local / Cloudinary)
  if (typeof source === "string") {
    if (source.includes("res.cloudinary.com") && source.includes("/upload/")) {
      if (!source.includes("w_")) {
        return source.replace("/upload/", `/upload/w_${width},`);
      }
    }
    return source;
  }

  // Handle Sanity image objects
  try {
    return urlFor(source, width);
  } catch (e) {
    console.error("Error optimizing Sanity image:", e);
    return "";
  }
};
