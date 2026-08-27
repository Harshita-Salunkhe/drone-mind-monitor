import { Activity } from "lucide-react";
import { Panel } from "./Panel";
import { ParameterCard } from "./ParameterCard";
import type { EngineParameters } from "@/data/mockData";

const ORDER: (keyof EngineParameters)[] = [
  "rpm",
  "cht",
  "egt",
  "oilPressure",
  "vibration",
  "fuel",
  "current",
];

interface Props {
  params: EngineParameters;
  live: boolean;
  source: string;
}

export function LiveParameters({ params, live, source }: Props) {
  return (
    <Panel
      title="Live Parameters"
      icon={<Activity className="size-4 text-primary" />}
      right={
        <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
          <span className={`size-1.5 rounded-full bg-normal ${live ? "status-pulse" : ""}`} />
          {source}
        </span>
      }
      bodyClassName="grid gap-3 sm:grid-cols-2"
    >
      {ORDER.map((key) => (
        <ParameterCard key={key} paramKey={key} value={params[key]} />
      ))}
    </Panel>
  );
}
