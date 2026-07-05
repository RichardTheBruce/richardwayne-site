import { ImageResponse } from "next/og";

export const alt = "Richard Wayne, Founding Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#060607",
          color: "#F4F4F5",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6B6B74",
          }}
        >
          Founding Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            marginTop: 24,
            letterSpacing: -2,
          }}
        >
          Richard Wayne
        </div>
        <div
          style={{
            display: "flex",
            width: 200,
            height: 4,
            background: "#0D90FF",
            marginTop: 32,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 32,
            color: "#A1A1AA",
          }}
        >
          Founding engineer. AI agents, cross-chain, full stack.
        </div>
      </div>
    ),
    { ...size }
  );
}
