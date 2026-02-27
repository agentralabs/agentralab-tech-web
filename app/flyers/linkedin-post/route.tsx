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
          padding: "48px 56px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid overlay */}
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
            opacity: 0.5,
          }}
        />

        {/* Top bar with 2px border bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            paddingBottom: 20,
            borderBottom: "2px solid #0a0a0a",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* CPU icon */}
            <div
              style={{
                width: 40,
                height: 40,
                border: "2px solid #0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid #ea580c",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 22,
                letterSpacing: 5,
                fontWeight: 700,
              }}
            >
              AGENTRA LABS
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 13,
                letterSpacing: 3,
                color: "#666666",
              }}
            >
              // OPEN SOURCE AGENTIC LAB
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                background: "#ea580c",
              }}
            />
          </div>
        </div>

        {/* Main content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: 4,
              color: "#ea580c",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            PORTABLE AGENT INFRASTRUCTURE
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.1,
                letterSpacing: -2,
                fontWeight: 700,
              }}
            >
              PERSISTENT MEMORY.
            </div>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.1,
                letterSpacing: -2,
                fontWeight: 700,
              }}
            >
              WEB PERCEPTION.
            </div>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.1,
                letterSpacing: -2,
                fontWeight: 700,
                color: "#ea580c",
              }}
            >
              CODE INTELLIGENCE.
            </div>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.1,
                letterSpacing: -2,
                fontWeight: 700,
              }}
            >
              TEMPORAL REASONING.
            </div>
          </div>

          <div
            style={{
              fontSize: 20,
              lineHeight: 1.4,
              color: "#666666",
              marginTop: 8,
              maxWidth: 900,
            }}
          >
            Five independent runtime sisters. Portable artifact files you own
            forever. MCP-native integration. Built in Rust.
          </div>
        </div>

        {/* Five sisters grid */}
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 0,
              flex: 1,
            }}
          >
            {/* Memory */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #0a0a0a",
                padding: "16px 22px",
                flex: 1,
                background: "rgba(242, 241, 234, 0.8)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                01 STATE
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                AgenticMemory
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#666666",
                  marginTop: 4,
                }}
              >
                Cognitive graph in .amem
              </span>
            </div>

            {/* Vision */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #0a0a0a",
                borderLeft: "none",
                padding: "16px 22px",
                flex: 1,
                background: "rgba(242, 241, 234, 0.8)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                02 PERCEPTION
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                AgenticVision
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#666666",
                  marginTop: 4,
                }}
              >
                CLIP embeddings in .avis
              </span>
            </div>

            {/* Codebase */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #0a0a0a",
                borderLeft: "none",
                padding: "16px 22px",
                flex: 1,
                background: "rgba(242, 241, 234, 0.8)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                03 ANALYSIS
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                AgenticCodebase
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#666666",
                  marginTop: 4,
                }}
              >
                Semantic graph in .acb
              </span>
            </div>

            {/* Identity */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #0a0a0a",
                borderLeft: "none",
                padding: "16px 22px",
                flex: 1,
                background: "rgba(242, 241, 234, 0.8)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                04 TRUST
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                AgenticIdentity
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#666666",
                  marginTop: 4,
                }}
              >
                Ed25519 keys in .aid
              </span>
            </div>

            {/* Time */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #0a0a0a",
                borderLeft: "none",
                padding: "16px 22px",
                flex: 1,
                background: "rgba(242, 241, 234, 0.8)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                05 TEMPORAL
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                AgenticTime
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#666666",
                  marginTop: 4,
                }}
              >
                Temporal engine in .atime
              </span>
            </div>
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
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>
              agentralabs.tech
            </span>
            <span style={{ fontSize: 14, color: "#999999" }}>|</span>
            <span style={{ fontSize: 14, color: "#666666", letterSpacing: 2 }}>
              github.com/agentralabs
            </span>
            <span style={{ fontSize: 14, color: "#999999" }}>|</span>
            <span style={{ fontSize: 14, color: "#666666", letterSpacing: 2 }}>
              discord.gg/agentralabs
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                background: "#ea580c",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                background: "#0a0a0a",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                border: "2px solid #0a0a0a",
              }}
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
