import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Panel } from "./Panel";
import type { ShapFactor } from "@/data/mockData";

const COLORS = ["var(--critical)", "var(--caution)", "var(--primary)"];

export function SHAPExplanation({ factors }: { factors: ShapFactor[] }) {
  const data = [...factors].sort((a, b) => b.value - a.value);

  return (
    <Panel
      title="SHAP Explanation"
      icon={<BarChart3 className="size-4 text-primary" />}
      right={<span className="label-mono">Feature Attribution</span>}
      bodyClassName="flex flex-col gap-3"
    >
      <p className="label-mono">Why the model flagged this fault</p>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 40, top: 4, bottom: 4 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="label"
              width={110}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v}%`, "Contribution"]}
            />
            <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={22}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `${v}%`}
                style={{ fill: "var(--foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="font-mono text-[0.6rem] text-muted-foreground">
        VALUES SUPPLIED BY EXPLAINABILITY SERVICE · NOT COMPUTED CLIENT-SIDE
      </p>
    </Panel>
  );
}
