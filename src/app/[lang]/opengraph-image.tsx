import { ImageResponse } from "next/og";

export const alt = "SC-200 Study Hub — bilingual learning paths, practice labs, exam blueprint, and simulator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const spanish = lang === "es";
  const eyebrow = spanish ? "ANALISTA DE OPERACIONES DE SEGURIDAD DE MICROSOFT" : "MICROSOFT SECURITY OPERATIONS ANALYST";
  const headline = spanish ? "Estudiá con contexto. Practicá con criterio." : "Study with context. Practice with judgment.";
  const labels = spanish
    ? ["Rutas de aprendizaje", "Temario", "Laboratorios", "Simulador de 50 preguntas", "EN · ES"]
    : ["Learning paths", "Exam blueprint", "Practice labs", "50-question simulator", "EN · ES"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #eef3f6 0%, #f5f1e8 58%, #dbe8e9 100%)",
          color: "#102a43",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 18, background: "#2a7180" }} />
        <div style={{ position: "absolute", right: -120, top: -160, width: 520, height: 520, border: "70px solid rgba(42, 113, 128, .12)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", right: 105, bottom: -235, width: 470, height: 470, border: "2px solid rgba(23, 50, 77, .18)", borderRadius: "50%" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "72px 84px 62px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ width: 88, height: 88, display: "flex", alignItems: "center", justifyContent: "center", background: "#17324d", color: "#ffffff", fontSize: 35, fontWeight: 800, letterSpacing: -2 }}>SC</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 800 }}>SC-200 Study Hub</span>
              <span style={{ marginTop: 5, color: "#526779", fontSize: 19, letterSpacing: 1.3 }}>CREATED BY IN7RUDER</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
            <span style={{ color: "#2a7180", fontSize: 22, fontWeight: 800, letterSpacing: 2.4 }}>{eyebrow}</span>
            <span style={{ marginTop: 18, fontSize: 68, lineHeight: 1.03, fontWeight: 850, letterSpacing: -3.5 }}>{headline}</span>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 19, fontWeight: 700 }}>
            {labels.map((label) => (
              <span key={label} style={{ padding: "11px 16px", border: "1px solid rgba(23, 50, 77, .24)", background: "rgba(255,255,255,.48)" }}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
