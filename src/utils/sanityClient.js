const sanityClientLib = require("@sanity/client");
const createClient = sanityClientLib.createClient || sanityClientLib;
require("dotenv").config();

const projectId = process.env.SANITY_PROJECT_ID || "nxypgfqb";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2026-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

module.exports = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !token,
  ...(token ? { token } : {}),
});
