"use client";

import React from "react";
import { GitBranch, Clock, Cog } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function WorkflowPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight">The <span className="text-primary italic">Workflow</span> Ecosystem</h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">Integrated systems that connect every stage of your tea production.</p>
      </div>

      <div className="space-y-12">
        {[
          { icon: GitBranch, title: "Automated Routing", desc: "Batch assignments and logistics routing are handled dynamically." },
          { icon: Clock, title: "Efficiency Monitoring", desc: "Track every minute spent in processing, grading, and transit." },
          { icon: Cog, title: "Machine Integration", desc: "Direct feedback loops from CTC and Sorting machinery." }
        ].map((item, i) => (
          <GlassCard key={i} className="p-8 flex items-center gap-8">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0 shadow-lg">
               <item.icon className="h-8 w-8" />
            </div>
            <div>
               <h3 className="text-2xl font-bold tracking-tight mb-2">{item.title}</h3>
               <p className="text-muted-foreground font-medium text-lg leading-relaxed">{item.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
