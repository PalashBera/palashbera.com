import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0d",
          color: "#f4f4f5",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#a5b4fc" }}>
          {site.url.replace("https://", "")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 700 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#a1a1aa" }}>
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#71717a" }}>
          Ruby on Rails · Python · React · AWS
        </div>
      </div>
    ),
    size,
  );
}
