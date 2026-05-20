import { type SchemaTypeDefinition } from "sanity";
import { edition } from "./edition";
import { event } from "./event";
import { chamber } from "./chamber";
import { workshop } from "./workshop";
import { about } from "./about";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [edition, event, chamber, workshop, about],
};
