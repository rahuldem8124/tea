"use client";

import React from "react";
import { Check, Zap, Factory, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const plans = [
    { name: "Single Factory", price: "299", icon: Factory, features: ["Up to 10 machines", "Full traceability", "Email support"] },
    { name: "Multi-Factory", price: "799", icon: Zap, features: ["Unlimited machines", "Real-time sync", "Priority support", "API access"], highlight: true },
    { name: "Enterprise", price: "Custom", icon: Globe, features: ["Custom integrations", "Dedicated account manager", "On-site training"] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight"><span className="text-primary italic">Pricing</span> Plans</h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">Scale your factory operations with a plan that fits your production volume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <GlassCard key={i} className={cn("p-10 flex flex-col gap-6", plan.highlight ? "border-primary/50 shadow-2xl relative" : "border-border/50")}>
            {plan.highlight && (
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Most Popular</div>
            )}
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
               <plan.icon className="h-7 w-7" />
            </div>
            <div>
               <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
               <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground font-medium">/month</span>}
               </div>
            </div>
            <div className="space-y-3 flex-1">
               {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-medium">
                     <Check className="h-4 w-4 text-primary" />
                     {feature}
                  </div>
               ))}
            </div>
            <Button className={cn("w-full h-12 rounded-xl font-bold transition-all", plan.highlight ? "glow-green" : "variant-outline")}>
               Get Started
            </Button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

