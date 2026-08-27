import { Radar } from "lucide-react";
import type { UAVData } from "@/data/mockData";
import { UAVSelector } from "./UAVSelector";

interface Props {
  fleet: UAVData[];
  selectedId: string;
  onSelect: (id: string) => void;
  clock: string;
}

export function Header({ fleet, selectedId, onSelect, clock }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/10">
            <Radar className="size-5 text-primary" />
          </div>
          <div className="leading-none">
            <h1 className="font-display text-2xl font-bold tracking-[0.22em] text-foreground">
              AEROSYNC
            </h1>
            <p className="label-mono mt-1">MALE UAV Engine Digital Twin</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden flex-col items-end leading-none md:flex">
            <span className="label-mono">MISSION CLOCK · UTC</span>
            <span className="mt-1 font-mono text-sm text-primary">{clock}</span>
          </div>
          <UAVSelector fleet={fleet} selectedId={selectedId} onSelect={onSelect} />
        </div>
      </div>
    </header>
  );
}
