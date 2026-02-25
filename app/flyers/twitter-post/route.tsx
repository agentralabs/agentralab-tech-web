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
              "radial-gradient(circle, #333333 1px, transparent 1px)",
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
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* CPU icon inline */}
            <div
              style={{
                width: 36,
                height: 36,
                border: "2px solid #ea580c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
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
              style={{
                fontSize: 20,
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
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                letterSpacing: 3,
                color: "#666666",
              }}
            >
              // OPEN SOURCE
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "9999px",
                background: "#ea580c",
              }}
            />
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              color: "#ea580c",
              marginBottom: 8,
            }}
          >
            AGENTIC INFRASTRUCTURE FOR AI SYSTEMS
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 700,
            }}
          >
            REMEMBER.
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 700,
            }}
          >
            SEE. UNDERSTAND.
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 700,
              color: "#ea580c",
            }}
          >
            PROVE.
          </div>
        </div>

        {/* Four sisters row */}
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
                border: "2px solid #3a3a3a",
                padding: "14px 20px",
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  marginBottom: 4,
                }}
              >
                01
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                MEMORY
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#666666",
                  marginTop: 2,
                }}
              >
                .amem
              </span>
            </div>

            {/* Vision */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #3a3a3a",
                borderLeft: "none",
                padding: "14px 20px",
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  marginBottom: 4,
                }}
              >
                02
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                VISION
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#666666",
                  marginTop: 2,
                }}
              >
                .avis
              </span>
            </div>

            {/* Codebase */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #3a3a3a",
                borderLeft: "none",
                padding: "14px 20px",
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  marginBottom: 4,
                }}
              >
                03
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                CODEBASE
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#666666",
                  marginTop: 2,
                }}
              >
                .acb
              </span>
            </div>

            {/* Identity */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #3a3a3a",
                borderLeft: "none",
                padding: "14px 20px",
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#ea580c",
                  marginBottom: 4,
                }}
              >
                04
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                IDENTITY
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#666666",
                  marginTop: 2,
                }}
              >
                .aid
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontSize: 16, color: "#a3a3a3", letterSpacing: 2 }}>
              agentralabs.tech
            </span>
            <span style={{ fontSize: 14, color: "#555555" }}>|</span>
            <span style={{ fontSize: 16, color: "#a3a3a3", letterSpacing: 2 }}>
              github.com/agentralabs
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "9999px",
                background: "#ea580c",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "9999px",
                background: "#ea580c",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "9999px",
                background: "#ea580c",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "9999px",
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
