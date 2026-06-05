import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title    = searchParams.get("title")    ?? "Neal Daftary";
  const subtitle = searchParams.get("subtitle") ?? "AI & ML Engineer · Computer Vision · LLM Systems";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "3px", background: "#E5001A" }} />
          <span style={{ fontSize: "18px", color: "#8A8A8A", letterSpacing: "4px", textTransform: "uppercase" }}>
            nealdaftary.com
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: title.length > 20 ? 68 : 96,
              fontWeight: 900,
              color: "#F2F2F2",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#8A8A8A",
              letterSpacing: "2px",
              textTransform: "uppercase",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "18px",
              color: "#E5001A",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E5001A" }} />
            AI · ML · Computer Vision
          </div>
          <div style={{ fontSize: "16px", color: "#222222" }}>Ahmedabad, India</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
