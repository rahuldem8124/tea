"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  iconClassName?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  className,
  iconClassName,
}: KPICardProps) {
  return (
    <GlassCard className={cn("flex flex-col h-full", className)}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-lg",
            iconClassName
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        {trend && trendValue && (
          <div
            className={cn(
              "px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter",
              trend === "up" ? "bg-success/10 text-success border-success/20 glow-green" : 
              trend === "down" ? "bg-destructive/10 text-destructive border-destructive/20 glow-red" : 
              "bg-muted text-muted-foreground border-border"
            )}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "—"} {trendValue}
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <p className="text-label mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold tracking-tight text-foreground lining-nums">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-3xl" />
    </GlassCard>
  );
}
