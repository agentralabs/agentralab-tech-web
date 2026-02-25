import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2f1ea",
          color: "#0a0a0a",
          padding: "44px 52px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, #c4c2b8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.4,
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            paddingBottom: 16,
            borderBottom: "2px solid #0a0a0a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                border: "2px solid #0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid #ea580c",
                }}
              />
            </div>
            <span
              style={{ fontSize: 20, letterSpacing: 5, fontWeight: 700 }}
            >
              AGENTRA LABS
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{ fontSize: 12, letterSpacing: 3, color: "#666666" }}
            >
              // REAL USER FEEDBACK
            </span>
            <div
              style={{ width: 8, height: 8, background: "#ea580c" }}
            />
          </div>
        </div>

        {/* Before / After */}
        <div
          style={{
            display: "flex",
            gap: 24,
            position: "relative",
            flex: 1,
            paddingTop: 24,
          }}
        >
          {/* BEFORE column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              border: "2px solid #d1d0c8",
              padding: "20px 24px",
              background: "rgba(255,255,255,0.3)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: "#999999",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              WITHOUT
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 12,
              }}
            >
              &quot;My agent hallucinates a lot and forgets important parts of
              the tasks I give it&quot;
            </span>
            <span
              style={{
                fontSize: 13,
                color: "#666666",
                lineHeight: 1.5,
              }}
            >
              Porting a large C++ codebase to Rust. The agent loses track of
              what&apos;s been ported, invents functions that don&apos;t exist,
              and can&apos;t hold both codebases in context.
            </span>
          </div>

          {/* AFTER column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              border: "2px solid #0a0a0a",
              padding: "20px 24px",
              background: "rgba(234,88,12,0.04)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: "#ea580c",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              WITH AGENTICCODEBASE
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 12,
              }}
            >
              &quot;The agent is navigating my codebase much more easily&quot;
            </span>
            <span
              style={{
                fontSize: 13,
                color: "#666666",
                lineHeight: 1.5,
              }}
            >
              Semantic graph of both codebases. Agent checks the graph before
              answering — can&apos;t hallucinate structure. Tracks migration
              progress across sessions.
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            position: "relative",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.1,
              letterSpacing: -1,
              fontWeight: 700,
            }}
          >
            YOUR AI AGENT FORGETS.
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.1,
              letterSpacing: -1,
              fontWeight: 700,
              color: "#ea580c",
            }}
          >
            OURS UNDERSTANDS THE GRAPH.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            paddingTop: 16,
            borderTop: "2px solid #0a0a0a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span
              style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2 }}
            >
              agentralabs.tech
            </span>
            <span style={{ fontSize: 13, color: "#999999" }}>|</span>
            <span
              style={{ fontSize: 13, color: "#666666", letterSpacing: 1 }}
            >
              github.com/agentralabs/agentic-codebase
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{ fontSize: 12, color: "#ea580c", letterSpacing: 2 }}
            >
              .ACB
            </span>
            <div
              style={{ width: 8, height: 8, background: "#ea580c" }}
            />
            <div
              style={{ width: 8, height: 8, background: "#0a0a0a" }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 627,
    }
  )
}
