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
          background: "#0a0a0a",
          color: "#f2f1ea",
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
              "radial-gradient(circle, #333333 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.35,
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 34,
                height: 34,
                border: "2px solid #ea580c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid #ea580c",
                }}
              />
            </div>
            <span
              style={{ fontSize: 18, letterSpacing: 5, fontWeight: 700 }}
            >
              AGENTRA LABS
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{ fontSize: 11, letterSpacing: 3, color: "#555555" }}
            >
              REAL USER STORY
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#ea580c",
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "relative",
          }}
        >
          {/* User quote */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #3a3a3a",
              padding: "18px 24px",
              background: "rgba(234,88,12,0.06)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: "#ea580c",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              USER FEEDBACK — C++ TO RUST PORT
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              &quot;My agent hallucinates a lot and forgets important parts.
              I&apos;d like to know if it&apos;s possible for a single agent
              to work with two graphs.&quot;
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div
              style={{
                fontSize: 48,
                lineHeight: 1.1,
                letterSpacing: -2,
                fontWeight: 700,
              }}
            >
              GRAPH-GROUNDED.
            </div>
            <div
              style={{
                fontSize: 48,
                lineHeight: 1.1,
                letterSpacing: -2,
                fontWeight: 700,
                color: "#ea580c",
              }}
            >
              ZERO HALLUCINATION.
            </div>
          </div>

          {/* Subtext */}
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "#888888",
              maxWidth: 900,
            }}
          >
            AgenticCodebase gives your AI agent a semantic graph of your code.
            It checks the graph before answering — if it&apos;s not in the
            graph, it can&apos;t hallucinate it.
          </div>
        </div>

        {/* Feature strip */}
        <div
          style={{
            display: "flex",
            gap: 0,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #3a3a3a",
              padding: "12px 20px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: "#ea580c",
                marginBottom: 3,
              }}
            >
              TODAY
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
              DUAL-GRAPH MCP
            </span>
            <span style={{ fontSize: 11, color: "#666666", marginTop: 2 }}>
              Two servers, both codebases
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #3a3a3a",
              borderLeft: "none",
              padding: "12px 20px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: "#ea580c",
                marginBottom: 3,
              }}
            >
              COMING
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
              MIGRATION TRACKING
            </span>
            <span style={{ fontSize: 11, color: "#666666", marginTop: 2 }}>
              What&apos;s ported, what&apos;s left
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #3a3a3a",
              borderLeft: "none",
              padding: "12px 20px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: "#ea580c",
                marginBottom: 3,
              }}
            >
              + MEMORY
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
              NEVER FORGETS
            </span>
            <span style={{ fontSize: 11, color: "#666666", marginTop: 2 }}>
              Pick up where you left off
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span
              style={{ fontSize: 14, color: "#a3a3a3", letterSpacing: 2 }}
            >
              agentralabs.tech
            </span>
            <span style={{ fontSize: 13, color: "#444444" }}>|</span>
            <span
              style={{ fontSize: 14, color: "#a3a3a3", letterSpacing: 2 }}
            >
              github.com/agentralabs
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#ea580c",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#ea580c",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#ea580c",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 675,
    }
  )
}
