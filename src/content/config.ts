// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)
export const creationsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    link: z.optional(z.string()),
    sourceLink: z.optional(z.string()),
    thumbnail: z.string(),
    tags: z.array(z.string()),
    isPublished: z.boolean(),
    isOnline: z.boolean(),
    date: z.optional(z.date()),
    dateStart: z.optional(z.date()),
    dateEnd: z.optional(z.date()),
    description: z.string(),
    language: z.array(z.string()),
    iframe: z.optional(z.string()),
    iframeAspect: z.optional(z.string()),
    iframeStyle: z.optional(z.string()),
    creationType: z.enum(["video", "collaboration", "software", "writing"]),
    releases: z
      .array(z.object({ date: z.date(), version: z.optional(z.string()), description: z.string() }))
      .default([]),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  creations: creationsCollection,
};
