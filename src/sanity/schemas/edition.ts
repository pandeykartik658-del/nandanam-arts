import { defineType, defineField } from "sanity";

export const edition = defineType({
  name: "edition",
  title: "Leela Edition",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Edition Number (ID)",
      type: "number",
      description: "e.g., 1, 2, 3... Used for sorting.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "edition",
      title: "Roman Numeral",
      type: "string",
      description: "e.g., I, II, III, IV...",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images (Max 5)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(5).required(),
    }),
  ],
  orderings: [
    {
      title: "Edition Number, Desc",
      name: "idDesc",
      by: [{ field: "id", direction: "desc" }],
    },
    {
      title: "Edition Number, Asc",
      name: "idAsc",
      by: [{ field: "id", direction: "asc" }],
    },
  ],
});
