import { Pause, Play, RotateCcw, History } from "lucide-react";
import { Panel } from "./Panel";
import type { MissionPhase, UAVData } from "@/data/mockData";
import { formatClock } from "@/lib/status";

interface Props {
  uav: UAVData;
  time: number;
  playing: boolean;
  phase: MissionPhase;
  onSeek: (t: number) => void;
  onTogglePlay: () => void;
  onReset: () => void;
}

export function MissionReplay({ uav, time, playing, phase, onSeek, onTogglePlay, onReset }: Props) {
  const duration = uav.mission.durationSeconds;

  return (
    <Panel
      title="Mission Replay"
      icon={<History className="size-4 text-primary" />}
      right={
        <span className="label-mono">
          Phase: <span className="text-primary">{phase.name}</span>
        </span>
      }
      bodyClassName="space-y-4"
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/15 px-4 py-1.5 font-display text-sm font-bold tracking-[0.18em] text-primary transition-colors hover:bg-primary/25"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          {playing ? "PAUSE" : "PLAY"}
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary px-4 py-1.5 font-display text-sm font-bold tracking-[0.18em] text-foreground transition-colors hover:border-primary/50"
        >
          <RotateCcw className="size-4" />
          RESET
        </button>
        <span className="ml-auto font-mono text-sm text-primary tabular-nums">
          {formatClock(time)} <span className="text-muted-foreground">/ {formatClock(duration)}</span>
        </span>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={duration}
          step={1}
          value={time}
          onChange={(e) => onSeek(Number(e.target.value))}
          aria-label="Mission timeline"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          style={{
            background: `linear-gradient(to right, var(--primary) ${(time / duration) * 100}%, var(--muted) ${(time / duration) * 100}%)`,
          }}
        />
        <div className="relative mt-3 h-14">
          {uav.mission.phases.map((p, i) => {
            const left = (p.start / duration) * 100;
            const active = p.name === phase.name;
            return (
              <button
                key={p.name}
                onClick={() => onSeek(p.start)}
                className="absolute -translate-x-1/2 text-center"
                style={{ left: `${Math.min(96, Math.max(4, left))}%`, top: i % 2 ? 16 : 0 }}
              >
                <span
                  className={`mx-auto block h-2 w-px ${active ? "bg-primary" : "bg-border"}`}
                  aria-hidden
                />
                <span
                  className={`mt-1 block font-mono text-[0.55rem] uppercase tracking-wider ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="font-mono text-[0.6rem] text-muted-foreground">
        REPLAYING SIMULATED HISTORICAL TELEMETRY · LIVE PARAMETER PANEL AND RESIDUALS TRACK THE TIMELINE
      </p>
    </Panel>
  );
}
