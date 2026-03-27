"use client";

import React from "react";
import { Layers, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Advanced <span className="text-primary italic">Features</span></h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">Explore the deep capabilities of the Tea Tech platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {[1, 2, 3, 4].map((i) => (
           <GlassCard key={i} className="p-10 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                 <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Feature Capability {i}</h3>
              <p className="text-muted-foreground leading-relaxed">Detailed explanation of how this feature optimizes your factory operations and improves overall efficiency.</p>
              <ul className="space-y-2 pt-4">
                 {["Real-time sync", "Advanced analytics", "Custom reports"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                       <CheckCircle2 className="h-4 w-4 text-primary" />
                       {item}
                    </li>
                 ))}
              </ul>
           </GlassCard>
         ))}
      </div>
    </div>
  );
}
