import TeachingClient from "./TeachingClient";
import { getTeachingContent } from "@/sanity/client";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function TeachingPage() {
  const teachingContent = await getTeachingContent();
  
  return (
    <TeachingClient 
      sanityDanceImages={teachingContent?.danceImages || null}
      sanityMusicImages={teachingContent?.musicImages || null}
    />
  );
}
