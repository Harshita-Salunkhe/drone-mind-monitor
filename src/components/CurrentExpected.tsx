import { GitCompareArrows } from "lucide-react";
import { Panel } from "./Panel";

export interface ComparisonRow {
  key: string;
  label: string;
  unit: string;
  current: number;
  expected: number;
  tolerance: number;
  scaleMax: number;
}

function Row({ row }: { row: ComparisonRow }) {
  const residual = Number((row.current - row.expected).toFixed(1));
  const abnormal = Math.abs(residual) > row.tolerance;
  const pct = (v: number) => Math.min(100, Math.max(0, (v / row.scaleMax) * 100));

  return (
    <div
      className={`rounded-sm border px-4 py-3 ${abnormal ? "border-critical/60 bg-critical/5" : "border-border bg-card/50"}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-display text-xl font-bold tracking-widest">{row.label}</span>
        <div className="flex flex-wrap items-baseline gap-6 font-mono text-sm">
          <span>
            <span className="label-mono mr-2">Current</span>
            {row.current}
            {row.unit}
          </span>
          <span className="text-muted-foreground">
            <span className="label-mono mr-2">Expected</span>
            {row.expected}
            {row.unit}
          </span>
          <span className={`font-semibold ${abnormal ? "text-critical" : "text-normal"}`}>
            <span className="label-mono mr-2">Residual</span>
            {residual > 0 ? "+" : ""}
            {residual}
            {row.unit}
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="label-mono w-16 shrink-0">Twin</span>
          <div className="h-2.5 flex-1 rounded-sm bg-muted">
            <div className="h-full rounded-sm bg-primary/50" style={{ width: `${pct(row.expected)}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="label-mono w-16 shrink-0">Actual</span>
          <div className="h-2.5 flex-1 rounded-sm bg-muted">
            <div
              className={`h-full rounded-sm transition-all duration-500 ${abnormal ? "bg-critical" : "bg-normal"}`}
              style={{ width: `${pct(row.current)}%` }}
            />
          </div>
        </div>
      </div>
      <p className="mt-2 font-mono text-[0.6rem] text-muted-foreground">
        TOLERANCE ±{row.tolerance}
        {row.unit} · {abnormal ? "DEVIATION OUT OF BAND" : "WITHIN DIGITAL TWIN ENVELOPE"}
      </p>
    </div>
  );
}

export function CurrentExpected({ rows }: { rows: ComparisonRow[] }) {
  return (
    <Panel
      title="Current vs Expected"
      icon={<GitCompareArrows className="size-4 text-primary" />}
      right={<span className="label-mono">Digital Twin Residual Analysis</span>}
      bodyClassName="grid gap-3 lg:grid-cols-2"
    >
      {rows.map((row) => (
        <Row key={row.key} row={row} />
      ))}
    </Panel>
  );
}
