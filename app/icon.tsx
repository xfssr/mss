// app/icon.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const blue = "rgba(145,190,255,1)";
  const red = "rgb(255,107,107)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f14",
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.14)",
            background:
              "radial-gradient(70% 70% at 30% 25%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.45) 100%)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.45)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* subtle blue glow */}
          <div
            style={{
              position: "absolute",
              inset: -6,
              background:
                "radial-gradient(55% 55% at 35% 30%, rgba(145,190,255,0.18) 0%, rgba(145,190,255,0.05) 45%, rgba(0,0,0,0) 70%)",
            }}
          />

          {/* MSS with last S red */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "baseline",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -1.6,
              lineHeight: 1,
              textShadow: "0 1px 0 rgba(0,0,0,0.38)",
              transform: "translateY(0.5px)",
            }}
          >
            <div style={{ display: "block", color: blue }}>MS</div>
            <div style={{ display: "block", color: red }}>S</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
