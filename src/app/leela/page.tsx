import LeelaClient from "./LeelaClient";
import { getEditions } from "@/sanity/client";

// This is the server component that fetches from Sanity
export const revalidate = 60; // Revalidate every 60 seconds

export default async function LeelaPage() {
  const sanityEditions = await getEditions();
  return <LeelaClient sanityEditions={sanityEditions} />;
}
