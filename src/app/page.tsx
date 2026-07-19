import HomeClient from "./HomeClient";
import { getEvents, getAboutContent, urlFor } from "@/sanity/client";
import { CarouselEvent } from "@/components/EventsCarousel";

// Server Component — fetches events from Sanity at request time
export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [sanityEvents, aboutData] = await Promise.all([
    getEvents(),
    getAboutContent().catch(() => null),
  ]);

  let formattedEvents: CarouselEvent[] = [];

  if (sanityEvents && sanityEvents.length > 0) {
    formattedEvents = sanityEvents.map((e: any) => {
      const d = new Date(e.date);
      return {
        id: e._id,
        day: d.getDate().toString().padStart(2, '0'),
        month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
        year: d.getFullYear().toString(),
        title: e.title,
        time: e.time || "TBA",
        description: e.description,
        location: e.location ? e.location.replace(/^Venue\s*:\s*/i, "") : "TBA",
        category: e.category || "All",
        image: e.image ? urlFor(e.image).toString() : "/assets/dancer1.jpg",
      };
    });
  }

  // Filter upcoming events (date in the future)
  const now = new Date();
  const upcomingEvents = formattedEvents.filter((e) => {
    const eventDate = new Date(`${e.month} ${e.day}, ${e.year}`);
    return eventDate >= now;
  });

  // Pass upcoming events directly
  const eventsToShow = upcomingEvents;

  return (
    <HomeClient upcomingEvents={eventsToShow} aboutData={aboutData} />
  );
}
