import { Plane } from "lucide-react";
import { Panel } from "./Panel";
import type { EngineStatus } from "@/data/mockData";
import { statusText, statusVar } from "@/lib/status";

interface Props {
  uavId: string;
  status: EngineStatus;
  phase?: string;
}

/**
 * Technical top-view silhouette of a MALE UAV with the pusher engine highlighted.
 * Placeholder surface for a future Three.js model — keep the same props contract.
 */
export function UAVViewer({ uavId, status, phase }: Props) {
  const color = statusVar[status];

  return (
    <Panel
      title="3D MALE UAV"
      icon={<Plane className="size-4 text-primary" />}
      right={<span className="label-mono">{phase ?? "STATIC VIEW"}</span>}
      bodyClassName="relative flex min-h-[380px] flex-col justify-between p-0"
    >
      <div className="scanline pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative flex flex-1 items-center justify-center px-4 py-6">
        <svg viewBox="0 0 600 380" className="w-full max-w-[560px]" role="img" aria-label={`${uavId} airframe top view`}>
          <defs>
            <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--muted)" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* reference axes */}
          <line x1="300" y1="20" x2="300" y2="360" stroke="var(--grid)" strokeDasharray="4 6" />
          <line x1="40" y1="190" x2="560" y2="190" stroke="var(--grid)" strokeDasharray="4 6" />

          {/* wings */}
          <path
            d="M60 178 L540 178 L540 202 L60 202 Z"
            fill="url(#body)"
            stroke="var(--primary)"
            strokeOpacity="0.5"
          />
          <path d="M60 178 L100 168 L500 168 L540 178 Z" fill="var(--muted)" opacity="0.5" />

          {/* fuselage */}
          <path
            d="M292 60 Q300 44 308 60 L312 250 L288 250 Z"
            fill="url(#body)"
            stroke="var(--primary)"
            strokeOpacity="0.6"
          />
          {/* tail booms */}
          <rect x="216" y="200" width="8" height="120" fill="var(--muted)" opacity="0.8" />
          <rect x="376" y="200" width="8" height="120" fill="var(--muted)" opacity="0.8" />
          {/* v-tail */}
          <path d="M200 318 L400 318 L400 334 L200 334 Z" fill="var(--muted)" opacity="0.9" />
          <path d="M212 320 L200 356 L228 356 Z" fill="var(--muted)" />
          <path d="M388 320 L400 356 L372 356 Z" fill="var(--muted)" />

          {/* sensor ball */}
          <circle cx="300" cy="78" r="12" fill="var(--muted)" stroke="var(--border)" />

          {/* engine bay */}
          <g>
            <circle cx="300" cy="252" r="38" fill={color} opacity="0.12" className="status-pulse" />
            <rect
              x="278"
              y="234"
              width="44"
              height="40"
              rx="4"
              fill={color}
              fillOpacity="0.22"
              stroke={color}
              strokeWidth="2"
            />
            {/* pusher propeller */}
            <line x1="300" y1="278" x2="300" y2="288" stroke={color} strokeWidth="3" />
            <ellipse cx="300" cy="292" rx="70" ry="5" fill={color} fillOpacity="0.25" />
            <line x1="200" y1="254" x2="276" y2="254" stroke={color} strokeDasharray="3 4" />
            <text x="120" y="250" fill={color} className="font-mono" fontSize="13">
              ENGINE
            </text>
            <text x="120" y="268" fill="var(--muted-foreground)" className="font-mono" fontSize="11">
              ROTAX-914 CLASS
            </text>
          </g>

          <text x="470" y="150" fill="var(--muted-foreground)" className="font-mono" fontSize="11">
            {uavId}
          </text>
          <text x="470" y="166" fill="var(--muted-foreground)" className="font-mono" fontSize="10">
            SPAN 16.9 m
          </text>
        </svg>
      </div>

      <div className="relative flex items-center justify-between border-t border-border bg-panel-header/60 px-4 py-2.5">
        <span className="label-mono">Engine Bay Telemetry Link</span>
        <span className={`flex items-center gap-2 font-display text-lg font-bold tracking-widest ${statusText[status]}`}>
          <span className="size-2 rounded-full status-pulse" style={{ backgroundColor: color }} />
          ENGINE — {status}
        </span>
      </div>
    </Panel>
  );
}
