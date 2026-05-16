import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "e558x893";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-04-27";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getEditions() {
  const query = `*[_type == "edition"] | order(id asc) {
    id,
    edition,
    title,
    year,
    text,
    "images": images[].secure_url
  }`;
  return client.fetch(query);
}

export async function getEvents() {
  const query = `*[_type == "event"] | order(date asc) {
    _id,
    title,
    date,
    location,
    description,
    "image": image.secure_url,
    link,
    category
  }`;
  return client.fetch(query);
}
