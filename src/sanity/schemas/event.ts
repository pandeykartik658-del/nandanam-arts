import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [

    defineField({
      name: "date",
      title: "Event Date",
      type: "datetime",
      description: "Events with dates in the future will appear in Upcoming. Events in the past will go to Archives.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "e.g., '6:30 PM'",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., 'Main Auditorium' or 'Online'",
    }),

    defineField({
      name: "image",
      title: "Poster / Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Action Link (e.g. Booking URL)",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Date, Descending",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, Ascending",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
