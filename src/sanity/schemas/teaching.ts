export const teaching = {
  name: "teaching",
  title: "Teaching Page",
  type: "document",
  fields: [
    {
      name: "danceImages",
      title: "Dance Wing Images (Max 5)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "caption", title: "Caption", type: "string" }
          ],
          preview: {
            select: {
              title: "caption",
              media: "image"
            }
          }
        }
      ]
    },
    {
      name: "musicImages",
      title: "Music Wing Images (Max 5)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "caption", title: "Caption", type: "string" }
          ],
          preview: {
            select: {
              title: "caption",
              media: "image"
            }
          }
        }
      ]
    }
  ]
};
