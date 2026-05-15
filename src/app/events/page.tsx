import EventsCarousel, { CarouselEvent } from "@/components/EventsCarousel";
import SocialSidebar from "@/components/SocialSidebar";
import Footer from "@/components/Footer";
import { getEvents } from "@/sanity/client";

export const revalidate = 60;

const fallbackEvents: CarouselEvent[] = [
  {
    id: 1,
    day: "15",
    month: "DEC",
    year: "2026",
    title: "Margazhi Utsavam",
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
    title: "Natyanjali Festival",
    description: "Celebrating Maha Shivaratri with all-night classical devotion performances.",
    location: "Chidambaram, India",
    category: "Festival",
    image: "/assets/dancer2.jpg"
  }
];

export default async function EventsPage() {
  const sanityEvents = await getEvents();
  
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
        description: e.description,
        location: e.location || "TBA",
        category: e.category || "All",
        image: e.image || "/assets/dancer1.jpg",
        dateObj: d // Keep full date for filtering
      };
    });
  } else {
    // Fake dateObj for fallback
    formattedEvents = fallbackEvents.map(e => ({
      ...e,
      dateObj: new Date(`${e.month} ${e.day}, ${e.year}`)
    }));
  }

  const now = new Date();
  const upcomingEvents = formattedEvents.filter((e: any) => e.dateObj >= now);
  const pastEvents = formattedEvents.filter((e: any) => e.dateObj < now);

  return (
    <section id="events" className="max-w-[900px] mx-auto px-6 pt-24 pb-44 relative z-10">
      {/* Divider */}
      <div
        className="w-[1px] h-[80px] mx-auto mb-16"
        style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
      />

      {/* Upcoming Events */}
      <h2 className="font-display whitespace-nowrap text-[6.5vw] sm:text-5xl lg:text-6xl tracking-[3px] text-center text-gradient-wine mb-16">
        Upcoming Events
      </h2>
      <EventsCarousel events={upcomingEvents} />

      {/* Past/Archive Events */}
      {pastEvents.length > 0 && (
        <div className="mt-32">
          <div
            className="w-[1px] h-[80px] mx-auto mb-16"
            style={{ background: "linear-gradient(180deg, transparent, hsl(320 55% 55%), transparent)" }}
          />
          <h2 className="font-display whitespace-nowrap text-[6.5vw] sm:text-5xl lg:text-6xl tracking-[3px] text-center text-white/40 mb-16">
            Past Events
          </h2>
          <EventsCarousel events={pastEvents} />
        </div>
      )}

      <SocialSidebar />
      <Footer />
    </section>
  );
}
