import LeelaClient from "./LeelaClient";
import { getEditions, getChambers, getWorkshops } from "@/sanity/client";

// This is the server component that fetches from Sanity
export const revalidate = 60; // Revalidate every 60 seconds

export default async function LeelaPage() {
  const [sanityEditions, sanityChambers, sanityWorkshops] = await Promise.all([
    getEditions(),
    getChambers(),
    getWorkshops(),
  ]);
  
  return (
    <LeelaClient 
      sanityEditions={sanityEditions} 
      sanityChambers={sanityChambers}
      sanityWorkshops={sanityWorkshops}
    />
  );
}
