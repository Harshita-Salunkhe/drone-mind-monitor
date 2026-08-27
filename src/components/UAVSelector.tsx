import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UAVData } from "@/data/mockData";
import { statusBg, statusText } from "@/lib/status";

interface Props {
  fleet: UAVData[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function UAVSelector({ fleet, selectedId, onSelect }: Props) {
  const selected = fleet.find((u) => u.id === selectedId)!;

  return (
    <div className="flex items-center gap-3">
      <span className="label-mono hidden sm:inline">Select UAV</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 rounded-sm border border-border bg-secondary px-3 py-2 font-mono text-sm tracking-wider text-foreground transition-colors hover:border-primary/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <span className={`size-2 rounded-full ${statusBg[selected.status]}`} />
          {selected.id}
          <ChevronDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 font-mono">
          {fleet.map((uav) => (
            <DropdownMenuItem
              key={uav.id}
              onSelect={() => onSelect(uav.id)}
              className="flex items-center justify-between gap-3 text-xs tracking-wider"
            >
              <span className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${statusBg[uav.status]}`} />
                {uav.id}
              </span>
              <span className="flex items-center gap-2">
                <span className={statusText[uav.status]}>{uav.status}</span>
                {uav.id === selectedId && <Check className="size-3 text-primary" />}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
