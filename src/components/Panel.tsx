import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  title: string;
  icon?: ReactNode;
  right?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

export function Panel({ title, icon, right, className, bodyClassName, children }: PanelProps) {
  return (
    <section className={cn("panel flex flex-col", className)}>
      <header className="flex items-center justify-between gap-3 border-b border-border bg-panel-header/60 px-4 py-2">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="panel-title">{title}</h2>
        </div>
        {right}
      </header>
      <div className={cn("flex-1 p-4", bodyClassName)}>{children}</div>
    </section>
  );
}
