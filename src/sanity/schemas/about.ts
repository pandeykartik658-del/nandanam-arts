import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Us",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About Us",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "About Us Text",
      type: "text",
      description: "The description text for NAF (non-profit organization founded with an aim...).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Showcase Images (Exactly 3 recommended)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
