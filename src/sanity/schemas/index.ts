import { type SchemaTypeDefinition } from "sanity";
import { edition } from "./edition";
import { event } from "./event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [edition, event],
};
