import { defineStaticConfig, type Collection } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

const globalData: Collection = {
  label: "Global Data",
  name: "global",
  path: "content/page",
  match: {
    include: "global",
  },
  format: "yaml",
  fields: [
    {
      name: "title",
      label: "Test Content",
      type: "string",
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
};

const home: Collection = {
  label: "Home Page",
  name: "home",
  path: "content/page",
  match: {
    include: "home",
  },
  format: "mdx",
  fields: [
    {
      name: "body",
      label: "Main Content",
      type: "rich-text",
      isBody: true,
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return undefined;
    },
  },
};

const about: Collection = {
  label: "About Page",
  name: "about",
  path: "content/page",
  match: {
    include: "about",
  },
  format: "mdx",
  fields: [
    {
      name: "body",
      label: "Main Content",
      type: "rich-text",
      isBody: true,
    },
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: ({ document }) => {
      if (document._sys.filename === "about") {
        return `/about`;
      }
      return undefined;
    },
  },
};

export default defineStaticConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [globalData, home, about],
  },
});
