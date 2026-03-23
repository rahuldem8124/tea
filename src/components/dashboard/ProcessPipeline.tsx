"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Cog, Layers, Archive, Truck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: "leaf", name: "Leaf Intake", icon: Leaf, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", status: "1,245 kg Today" },
  { id: "processing", name: "Processing", icon: Cog, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", status: "840 kg/hr" },
  { id: "grading", name: "Grading", icon: Layers, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", status: "94% A-Grade" },
  { id: "packaging", name: "Packaging", icon: Archive, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", status: "125 Units Ready" },
  { id: "logistics", name: "Logistics", icon: Truck, color: "text-success", bg: "bg-success/10", border: "border-success/20", status: "3 Trucks En Route" },
];

export function ProcessPipeline() {
  return (
    <div className="w-full py-8 px-4 bg-muted/20 rounded-3xl border border-border/50 backdrop-blur-sm overflow-hidden relative group">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-3 relative min-w-[120px]"
            >
              <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center border shadow-lg transition-all duration-500 group-hover:scale-105",
                stage.bg, stage.border, stage.color
              )}>
                <stage.icon className="h-8 w-8" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground">{stage.name}</p>
                <p className="text-[9px] font-bold text-muted-foreground mt-0.5">{stage.status}</p>
              </div>
              
              {stage.id !== "logistics" && (
                <div className="hidden md:flex absolute -right-6 top-8 text-muted-foreground/30 items-center justify-center">
                   <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          </React.Fragment>
        ))}
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-primary/5 blur-3xl rounded-full" />
      
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-success glow-green animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-widest text-success">Live Throughput: 840kg/hr</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-primary glow-green" />
           <span className="text-[9px] font-black uppercase tracking-widest text-primary">Est. Outturn: 22.4%</span>
        </div>
      </div>
    </div>
  );
}
