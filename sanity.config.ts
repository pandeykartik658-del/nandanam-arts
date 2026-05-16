import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "e558x893",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "Nandanam Arts",

  plugins: [structureTool()],

  schema: {
    types: schema.types,
  },
});
