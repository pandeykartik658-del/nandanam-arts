import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemas";
import { cloudinarySchemaPlugin } from "sanity-plugin-cloudinary";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "775ehly9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "Nandanam Arts",

  plugins: [structureTool(), cloudinarySchemaPlugin()],

  schema: {
    types: schema.types,
  },
});
