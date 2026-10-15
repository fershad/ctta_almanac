import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { netlifyTool } from "sanity-plugin-netlify";

const isDevelopment = process.env.NODE_ENV === "development";
const dataset = "production";

export default defineConfig({
  name: "default",
  title: "CTTA Almanac",
  projectId: "nxypgfqb",
  dataset,
  plugins: [structureTool(), visionTool(), netlifyTool()],
  schema: {
    types: schemaTypes,
  },
});
