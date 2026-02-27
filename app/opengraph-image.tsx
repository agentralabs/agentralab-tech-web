import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AGENTRA LABS — AgenticMemory, AgenticVision, AgenticCodebase, AgenticIdentity, AgenticTime"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
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
          position: "relative",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 22, letterSpacing: 5 }}>AGENTRA LABS</div>
          <div style={{ fontSize: 16, letterSpacing: 3, color: "#a3a3a3" }}>OPEN SOURCE AGENTIC LAB</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 74, lineHeight: 1, letterSpacing: -2, fontWeight: 700 }}>REMEMBER. SEE.</div>
          <div style={{ fontSize: 74, lineHeight: 1, letterSpacing: -2, fontWeight: 700, color: "#ea580c" }}>
            UNDERSTAND. PROVE. SCHEDULE.
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.3, color: "#b8b8b8", marginTop: 8 }}>
            AgenticMemory (.amem) + AgenticVision (.avis) + AgenticCodebase (.acb) + AgenticIdentity (.aid) + AgenticTime (.atime)
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 20, color: "#a3a3a3", letterSpacing: 2 }}>agentralabs.tech</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ width: 10, height: 10, borderRadius: "9999px", background: "#ea580c" }} />
            <span style={{ width: 10, height: 10, borderRadius: "9999px", background: "#ea580c" }} />
            <span style={{ width: 10, height: 10, borderRadius: "9999px", background: "#ea580c" }} />
            <span style={{ width: 10, height: 10, borderRadius: "9999px", background: "#ea580c" }} />
            <span style={{ width: 10, height: 10, borderRadius: "9999px", background: "#ea580c" }} />
          </div>
        </div>
      </div>
    ),
    size
  )
}
