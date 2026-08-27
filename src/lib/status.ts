import type { EngineStatus } from "@/data/mockData";

export const statusText: Record<EngineStatus, string> = {
  NORMAL: "text-normal",
  CAUTION: "text-caution",
  CRITICAL: "text-critical",
};

export const statusBg: Record<EngineStatus, string> = {
  NORMAL: "bg-normal",
  CAUTION: "bg-caution",
  CRITICAL: "bg-critical",
};

export const statusBorder: Record<EngineStatus, string> = {
  NORMAL: "border-normal/50",
  CAUTION: "border-caution/50",
  CRITICAL: "border-critical/50",
};

export const statusSoftBg: Record<EngineStatus, string> = {
  NORMAL: "bg-normal/10",
  CAUTION: "bg-caution/10",
  CRITICAL: "bg-critical/10",
};

export const statusVar: Record<EngineStatus, string> = {
  NORMAL: "var(--normal)",
  CAUTION: "var(--caution)",
  CRITICAL: "var(--critical)",
};

export function healthStatus(health: number): EngineStatus {
  if (health >= 85) return "NORMAL";
  if (health >= 55) return "CAUTION";
  return "CRITICAL";
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
