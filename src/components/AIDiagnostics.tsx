import { BrainCircuit } from "lucide-react";
import { Panel } from "./Panel";
import type { UAVData } from "@/data/mockData";
import { statusText, statusVar } from "@/lib/status";

export function AIDiagnostics({ uav }: { uav: UAVData }) {
  const { anomaly, fault, confidence } = uav.ai;

  return (
    <Panel
      title="AI Diagnostics"
      icon={<BrainCircuit className="size-4 text-primary" />}
      right={<span className="label-mono">Model v2.4 · Inference 40 ms</span>}
      bodyClassName="space-y-4"
    >
      <div
        className={`flex items-center justify-between rounded-sm border px-4 py-3 ${
          anomaly ? "border-critical/60 bg-critical/10" : "border-normal/50 bg-normal/10"
        }`}
      >
        <span className="label-mono">Anomaly</span>
        <span
          className={`font-display text-2xl font-bold tracking-widest ${anomaly ? "text-critical" : "text-normal"}`}
        >
          {anomaly ? "DETECTED" : "NONE"}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-sm border border-border bg-card/50 px-4 py-3">
          <p className="label-mono">Fault Class</p>
          <p className={`mt-1 font-display text-xl font-bold tracking-wider ${anomaly ? "text-caution" : "text-normal"}`}>
            {fault}
          </p>
        </div>
        <div className="rounded-sm border border-border bg-card/50 px-4 py-3">
          <p className="label-mono">Remaining Useful Life</p>
          <p className={`mt-1 font-mono text-xl font-semibold ${statusText[uav.status]}`}>
            {uav.rul} <span className="text-sm text-muted-foreground">hrs</span>
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="label-mono">Prediction Confidence</span>
          <span className="font-mono text-sm text-primary">{confidence}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${confidence}%`, backgroundColor: statusVar[uav.status] }}
          />
        </div>
      </div>
    </Panel>
  );
}
