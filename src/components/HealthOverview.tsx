import { AlertTriangle, CheckCircle2, OctagonAlert, Timer } from "lucide-react";
import type { UAVData } from "@/data/mockData";
import { statusBorder, statusSoftBg, statusText, statusVar } from "@/lib/status";

function HealthRing({ value, status }: { value: number; status: UAVData["status"] }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <div className="relative size-28 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--muted)" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={statusVar[status]}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-mono text-2xl font-semibold ${statusText[status]}`}>{value}%</span>
        <span className="label-mono">Health</span>
      </div>
    </div>
  );
}

export function HealthOverview({ uav }: { uav: UAVData }) {
  const Icon =
    uav.status === "NORMAL" ? CheckCircle2 : uav.status === "CAUTION" ? AlertTriangle : OctagonAlert;

  return (
    <section
      className={`panel flex flex-wrap items-center gap-6 border-l-4 px-5 py-4 ${statusBorder[uav.status]} ${statusSoftBg[uav.status]}`}
    >
      <HealthRing value={uav.health} status={uav.status} />

      <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-5">
        <div>
          <p className="label-mono">Airframe</p>
          <p className="font-display text-4xl font-bold tracking-widest">{uav.id}</p>
        </div>

        <div>
          <p className="label-mono">Engine Status</p>
          <p className={`flex items-center gap-2 font-display text-3xl font-bold tracking-widest ${statusText[uav.status]}`}>
            <Icon className="size-6" />
            {uav.status}
          </p>
        </div>

        <div>
          <p className="label-mono">Remaining Useful Life</p>
          <p className="flex items-center gap-2 font-mono text-3xl font-semibold">
            <Timer className="size-5 text-muted-foreground" />
            {uav.rul}
            <span className="text-base text-muted-foreground">h</span>
          </p>
        </div>

        <div className="min-w-52 flex-1">
          <div className="flex items-center justify-between">
            <span className="label-mono">Health Index</span>
            <span className="font-mono text-xs text-muted-foreground">{uav.health}/100</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${uav.health}%`, backgroundColor: statusVar[uav.status] }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[0.6rem] text-muted-foreground">
            <span>0</span>
            <span>CRIT 55</span>
            <span>CAUT 85</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </section>
  );
}
