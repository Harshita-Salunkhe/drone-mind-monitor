import { PARAM_META, isParamAbnormal, type EngineParameters } from "@/data/mockData";

interface Props {
  paramKey: keyof EngineParameters;
  value: number;
}

export function ParameterCard({ paramKey, value }: Props) {
  const meta = PARAM_META[paramKey];
  const abnormal = isParamAbnormal(paramKey, value);
  const pct = Math.min(100, (value / meta.scaleMax) * 100);
  const minPct = (meta.min / meta.scaleMax) * 100;
  const maxPct = (meta.max / meta.scaleMax) * 100;

  return (
    <div
      className={`rounded-sm border bg-card/60 px-3 py-2.5 transition-colors ${
        abnormal ? "border-critical/60 bg-critical/5" : "border-border"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="flex items-center gap-2">
          <span
            className={`size-1.5 rounded-full ${abnormal ? "bg-critical status-pulse" : "bg-normal"}`}
          />
          <span className="label-mono">{meta.label}</span>
        </span>
        <span
          className={`font-mono text-lg font-semibold tabular-nums ${
            abnormal ? "text-critical" : "text-foreground"
          }`}
        >
          {value}
          <span className="ml-1 text-xs text-muted-foreground">{meta.unit}</span>
        </span>
      </div>

      <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 bg-normal/20"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
            abnormal ? "bg-critical" : "bg-normal"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 font-mono text-[0.6rem] text-muted-foreground">
        NOMINAL {meta.min}–{meta.max} {meta.unit}
      </p>
    </div>
  );
}
