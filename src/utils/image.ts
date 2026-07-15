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

/**
 * Extracts the Low Quality Image Placeholder (LQIP) base64 string
 * from a fully populated Sanity image asset.
 * If none exists, returns a generic solid color placeholder.
 */
export const getBlurDataURL = (source: any): string | undefined => {
  if (source?.asset?.metadata?.lqip) {
    return source.asset.metadata.lqip;
  }
  // Generic very dark placeholder if LQIP isn't available
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMM8GqYBAACgAEuS+6YyAAAAABJRU5ErkJggg==";
};
