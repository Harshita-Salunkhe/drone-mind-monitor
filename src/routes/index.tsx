import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/pages/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AeroSync — MALE UAV Engine Digital Twin GCS" },
      {
        name: "description",
        content:
          "AeroSync ground control dashboard: live MALE UAV piston engine telemetry, digital twin residuals, AI fault diagnostics, SHAP explainability and mission fitness.",
      },
      { property: "og:title", content: "AeroSync — MALE UAV Engine Digital Twin GCS" },
      {
        property: "og:description",
        content:
          "Mission-control dashboard for predictive engine health monitoring of MALE UAV piston engines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
