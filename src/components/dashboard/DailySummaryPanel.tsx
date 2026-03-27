"use client";

import React from "react";
import { Leaf, Zap, Truck, Layers, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function DailySummaryPanel() {
  const summaryItems = [
    {
      label: "Total Leaf Collected",
      value: "1,245 kg",
      subtext: "Avg. 4.2 Quality",
      icon: Leaf,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      label: "Total Processed",
      value: "840 kg",
      subtext: "Outturn 22.4%",
      icon: Zap,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      label: "Grade Distribution",
      value: "A: 45%",
      subtext: "B: 35% | C: 20%",
      icon: Layers,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
    {
      label: "Trucks in Transit",
      value: "8 Trucks",
      subtext: "2 Expected now",
      icon: Truck,
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/20",
    },
    {
      label: "Delayed Trucks",
      value: "3 Trucks",
      subtext: "Requires attention",
      icon: Clock,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      pulsing: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {summaryItems.map((item, idx) => (
        <GlassCard key={idx} className={cn("p-4 flex flex-col gap-3", item.pulsing && "border-destructive/30 shadow-[0_0_15px_rgba(var(--destructive),0.1)]")} hoverLift={true}>
          <div className="flex items-center justify-between">
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center border shadow-sm",
              item.bg, item.border, item.color
            )}>
              <item.icon className="h-5 w-5" />
            </div>
            {item.pulsing && (
               <div className="h-2 w-2 rounded-full bg-destructive animate-pulse glow-red" />
            )}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">{item.label}</p>
            <p className="text-xl font-black tracking-tight text-foreground">{item.value}</p>
            <p className="text-[10px] font-bold text-muted-foreground mt-1">{item.subtext}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
