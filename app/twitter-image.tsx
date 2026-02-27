import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AGENTRA LABS — Open-source agentic infrastructure"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f2f1ea",
          padding: "56px 64px",
          border: "2px solid #3a3a3a",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 5 }}>AGENTRA LABS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 78, lineHeight: 1, letterSpacing: -2, fontWeight: 700 }}>BUILDING AGENTS</div>
          <div style={{ fontSize: 78, lineHeight: 1, letterSpacing: -2, fontWeight: 700, color: "#ea580c" }}>
            FOR TRUSTED SYSTEMS
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.25, color: "#b8b8b8", marginTop: 12 }}>
            AgenticMemory · AgenticVision · AgenticCodebase · AgenticIdentity · AgenticTime
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 20, color: "#a3a3a3", letterSpacing: 2 }}>github.com/agentralabs</div>
          <div style={{ width: 12, height: 12, borderRadius: "9999px", background: "#ea580c" }} />
        </div>
      </div>
    ),
    size
  )
}
