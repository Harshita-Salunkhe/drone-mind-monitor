import { useEffect, useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { Panel } from "./Panel";
import type { UAVData } from "@/data/mockData";
import { statusBorder, statusSoftBg, statusText } from "@/lib/status";

export function MissionFitness({ uav }: { uav: UAVData }) {
  const [state, setState] = useState<"idle" | "checking" | "done">("idle");

  // Reset the assessment whenever the operator switches airframe.
  useEffect(() => {
    setState("idle");
  }, [uav.id]);

  const runCheck = () => {
    setState("checking");
    window.setTimeout(() => setState("done"), 700);
  };

  const fit = uav.mission.fitness;
  const label = fit.status === "CRITICAL" ? "NOT FIT / CRITICAL" : fit.status;

  return (
    <Panel
      title="Mission Fitness"
      icon={<ShieldCheck className="size-4 text-primary" />}
      right={
        <button
          onClick={runCheck}
          disabled={state === "checking"}
          className="inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/15 px-4 py-1.5 font-display text-sm font-bold tracking-[0.18em] text-primary transition-colors hover:bg-primary/25 disabled:opacity-60"
        >
          {state === "checking" && <Loader2 className="size-4 animate-spin" />}
          CHECK MISSION
        </button>
      }
      bodyClassName="p-4"
    >
      {state !== "done" ? (
        <p className="label-mono py-6 text-center">
          {state === "checking"
            ? "Evaluating digital twin envelope against mission profile…"
            : "Run a fitness assessment for the selected airframe"}
        </p>
      ) : (
        <div
          className={`grid gap-5 rounded-sm border-l-4 border px-5 py-4 lg:grid-cols-[auto_1fr] ${statusBorder[fit.status]} ${statusSoftBg[fit.status]}`}
        >
          <div>
            <p className="label-mono">Mission Status</p>
            <p className={`font-display text-4xl font-bold tracking-widest ${statusText[fit.status]}`}>
              {label}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="label-mono">Reason</p>
              <p className="mt-1 text-sm">{fit.reason}</p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="label-mono">Health</p>
                <p className={`font-mono text-2xl font-semibold ${statusText[fit.status]}`}>{uav.health}%</p>
              </div>
              <div>
                <p className="label-mono">RUL</p>
                <p className="font-mono text-2xl font-semibold">{uav.rul} hrs</p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className="label-mono">Recommendation</p>
              <p className="mt-1 text-sm text-muted-foreground">{fit.recommendation}</p>
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
}
