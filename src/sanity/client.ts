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
    "images": images[].asset->url
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
    "image": image.asset->url,
    link,
    category
  }`;
  return client.fetch(query);
}

export async function getChambers() {
  const query = `*[_type == "chamber"] | order(_createdAt asc) {
    _id,
    title,
    text,
    "images": images[].asset->url
  }`;
  return client.fetch(query);
}

export async function getWorkshops() {
  const query = `*[_type == "workshop"] | order(_createdAt asc) {
    _id,
    title,
    text,
    "images": images[].asset->url
  }`;
  return client.fetch(query);
}

export async function getAboutContent() {
  const query = `*[_type == "about"][0] {
    title,
    text,
    "frame1Images": frame1Images[].asset->url,
    "frame2Images": frame2Images[].asset->url,
    "frame3Images": frame3Images[].asset->url
  }`;
  return client.fetch(query);
}
