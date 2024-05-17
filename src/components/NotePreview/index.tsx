import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import React from "react";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
]);
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ["alt", "src"],
  },
);

export default async function NotePreview({ children }: { children: string }) {
  const html = await marked(children || "");
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(html, {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
}
