import HomeClient from "./HomeClient";
import { getEvents, getAboutContent } from "@/sanity/client";
import { CarouselEvent } from "@/components/EventsCarousel";

// Server Component — fetches events from Sanity at request time
export const revalidate = 60; // Revalidate every 60 seconds

const fallbackEvents: CarouselEvent[] = [
  {
    id: 1,
    day: "15",
    month: "DEC",
    year: "2026",
    description: "Annual winter dance festival featuring senior disciples executing complex rhythmic patterns.",
    location: "Chennai, India",
    category: "Festival",
    image: "/assets/dancer1.jpg"
  },
  {
    id: 2,
    day: "10",
    month: "FEB",
    year: "2027",
    description: "Celebrating Maha Shivaratri with all-night classical devotion performances.",
    location: "Chidambaram, India",
    category: "Festival",
    image: "/assets/dancer4.jpg"
  }
];

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
        description: e.description,
        location: e.location || "TBA",
        category: e.category || "All",
        image: e.image || "/assets/dancer1.jpg",
      };
    });
  } else {
    formattedEvents = fallbackEvents;
  }

  // Filter upcoming events (date in the future)
  const now = new Date();
  const upcomingEvents = formattedEvents.filter((e) => {
    const eventDate = new Date(`${e.month} ${e.day}, ${e.year}`);
    return eventDate >= now;
  });

  // Show fallback if no upcoming events
  const eventsToShow = upcomingEvents.length > 0 ? upcomingEvents : fallbackEvents;

  return (
    <HomeClient upcomingEvents={eventsToShow} aboutData={aboutData} />
  );
}
