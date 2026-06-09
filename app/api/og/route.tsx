import { ImageResponse } from "next/og";

export const runtime = "edge";

const SECTION_COLORS: Record<string, string> = {
  philosophy: "#c8a45a",
  mathematics: "#6366f1",
  "life-science": "#4a9e6f",
  "human-history": "#6ad0ff",
  "universe-physics": "#a88adf",
  cosmology: "#e07a5f",
  "knowledge-graph": "#d19a66",
};

const SECTION_LABELS: Record<string, string> = {
  philosophy: "哲学思想",
  mathematics: "数学",
  "life-science": "生命科学",
  "human-history": "人类历史",
  "universe-physics": "宇宙物理",
  cosmology: "宇宙学",
  "knowledge-graph": "知识图谱",
};

async function loadFont(): Promise<ArrayBuffer> {
  const url =
    "https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYxNbPzS5HE.woff2";
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("Failed to load font");
  return res.arrayBuffer();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Universe Knowledge";
  const section = searchParams.get("section") ?? "";
  const description = searchParams.get("description") ?? "";

  const accent = SECTION_COLORS[section] ?? "#c8a45a";
  const sectionLabel = SECTION_LABELS[section] ?? section;

  let fontData: ArrayBuffer;
  try {
    fontData = await loadFont();
  } catch {
    fontData = new ArrayBuffer(0);
  }

  const hasFont = fontData.byteLength > 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0f",
          padding: "60px",
          fontFamily: hasFont ? "'Noto Sans SC', sans-serif" : "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: accent,
            opacity: 0.08,
            filter: "blur(80px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: accent,
            opacity: 0.05,
            filter: "blur(60px)",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            display: "flex",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 1 }}>
          {sectionLabel && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: accent,
                  display: "flex",
                }}
              />
              <span
                style={{
                  fontSize: "18px",
                  color: accent,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {sectionLabel}
              </span>
            </div>
          )}

          <h1
            style={{
              fontSize: title.length > 30 ? "42px" : title.length > 20 ? "52px" : "64px",
              fontWeight: 700,
              color: "#f0f0f5",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                fontSize: "22px",
                color: "#8888a0",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "800px",
                display: "flex",
              }}
            >
              {description.length > 120 ? `${description.slice(0, 120)}…` : description}
            </p>
          )}
        </div>

        {/* Bottom brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#555570",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Universe Knowledge
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#333348",
              letterSpacing: "0.12em",
            }}
          >
            universe-knowledge.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: hasFont
        ? [
            {
              name: "Noto Sans SC",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined,
    }
  );
}
