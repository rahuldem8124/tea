"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Wrench, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

const steps = [
  {
    time: "08:30 AM",
    title: "CTC Machine 1 Service",
    description: "Blade sharpening and lubrication completed",
    status: "done",
    technician: "Anura K.",
  },
  {
    time: "11:15 AM",
    title: "Conveyor Belt B-12",
    description: "Emergency sensor replacement in progress",
    status: "active",
    technician: "Saman P.",
  },
  {
    time: "02:00 PM",
    title: "Drier System A",
    description: "Filter cleaning and thermal check",
    status: "pending",
    technician: "Ravi S.",
  },
  {
    time: "04:30 PM",
    title: "Boiler Pressure Test",
    description: "Monthly safety certification",
    status: "pending",
    technician: "External Inspector",
  },
];

export function MachineMaintenanceTimeline() {
  return (
    <GlassCard className="p-6 h-full flex flex-col" hoverLift={false}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-black text-lg tracking-tight text-foreground">Maintenance <span className="text-primary italic">Timeline</span></h3>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Today&apos;s Schedule</p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
              TX
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative space-y-8">
        {/* Vertical line connector */}
        <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-muted/30" />

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-10 group"
          >
            {/* Indicator */}
            <div className={cn(
              "absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center z-10 border-4 border-background transition-all duration-300",
              step.status === "done" ? "bg-success text-success-foreground" : 
              step.status === "active" ? "bg-primary text-primary-foreground scale-110 glow-green" : 
              "bg-muted text-muted-foreground"
            )}>
              {step.status === "done" ? <CheckCircle2 className="h-4 w-4" /> : 
               step.status === "active" ? <Clock className="h-4 w-4 animate-pulse" /> : 
               <Wrench className="h-4 w-4" />}
            </div>

            <div className={cn(
              "p-4 rounded-2xl border transition-all duration-300",
              step.status === "active" ? "glass-card border-primary/30 shadow-lg translate-x-1" : "border-border/50 hover:border-border"
            )}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{step.time}</span>
                <span className="text-[10px] font-medium text-muted-foreground">{step.technician}</span>
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">{step.title}</h4>
              <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-3 rounded-xl border border-dashed border-border/60 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
        View Full History
      </button>
    </GlassCard>
  );
}
