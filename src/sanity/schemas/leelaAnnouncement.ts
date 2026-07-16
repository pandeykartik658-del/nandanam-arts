import { defineType, defineField } from "sanity";

export const leelaAnnouncement = defineType({
  name: "leelaAnnouncement",
  title: "Leela Page Announcement",
  type: "document",
  fields: [
    defineField({
      name: "announcementText",
      title: "Announcement Text",
      type: "string",
      description: "Text to display in the pill between Series One and Series Two. e.g., 'next Leela arts festival is on 20th september .Stay tuned for more updates.'",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
