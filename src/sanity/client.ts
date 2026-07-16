import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "e558x893";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-04-27";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any, width?: number) {
  if (!source) return "";
  let imgBuilder = builder.image(source).auto("format").quality(85).fit("max");
  if (width) {
    imgBuilder = imgBuilder.width(width);
  }
  return imgBuilder.url();
}

export async function getEditions() {
  const query = `*[_type == "edition"] | order(id asc) {
    id,
    edition,
    title,
    year,
    text,
    images[] {
      ...,
      asset->{
        ...,
        metadata
      }
    }
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
    image {
      ...,
      asset->{
        ...,
        metadata
      }
    },
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
    images[] {
      ...,
      asset->{
        ...,
        metadata
      }
    }
  }`;
  return client.fetch(query);
}

export async function getWorkshops() {
  const query = `*[_type == "workshop"] | order(_createdAt asc) {
    _id,
    title,
    text,
    images[] {
      ...,
      asset->{
        ...,
        metadata
      }
    }
  }`;
  return client.fetch(query);
}

export async function getAboutContent() {
  const query = `*[_type == "about"][0] {
    title,
    text
  }`;
  return client.fetch(query);
}

export async function getTeachingContent() {
  const query = `*[_type == "teaching"][0] {
    danceImages[] {
      ...,
      asset->{
        ...,
        metadata
      }
    },
    musicImages[] {
      ...,
      asset->{
        ...,
        metadata
      }
    }
  }`;
  return client.fetch(query);
}

export async function getLeelaAnnouncement() {
  const query = *[_type == "leelaAnnouncement"][0] {
    announcementText
  };
  return client.fetch(query);
}
