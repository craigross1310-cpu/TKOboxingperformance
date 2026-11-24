import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "TKO Boxing & Performance Centre — Glasgow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/brand/tko-logo.jpg"));
const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} alt="" width={462} height={630} style={{ objectFit: "cover" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", flex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#ff4a3d", textTransform: "uppercase" }}>
            Glasgow · East End
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 900, lineHeight: 0.92, marginTop: 24, textTransform: "uppercase" }}>
            <span>Box.</span>
            <span>Build.</span>
            <span style={{ color: "#ff4a3d" }}>Perform.</span>
          </div>
          <div style={{ fontSize: 26, color: "#9a9fa8", marginTop: 32, lineHeight: 1.35 }}>
            Boxing, strength &amp; conditioning and personal training. All levels welcome.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
