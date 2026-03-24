"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Truck, PackageCheck } from "lucide-react";
import { TruckStatus } from "@/types";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: TruckStatus;
  label: string;
  icon: React.ElementType;
  time?: string;
}

interface TruckTimelineProps {
  status: TruckStatus;
  departureTime?: string;
  expectedArrivalTime?: string;
  actualArrivalTime?: string;
  className?: string;
}

export function TruckTimeline({ 
  status, 
  departureTime, 
  expectedArrivalTime, 
  actualArrivalTime,
  className 
}: TruckTimelineProps) {
  const isDelayed = status === "delayed";
  
  const steps: TimelineStep[] = [
    { id: "loading", label: "Loading", icon: Clock },
    { id: "dispatched", label: "Dispatched", icon: TrackCheckIcon, time: departureTime },
    { id: "in_transit", label: "In Transit", icon: Truck },
    { id: "delivered", label: "Delivered", icon: PackageCheck, time: actualArrivalTime || expectedArrivalTime },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === (isDelayed ? "in_transit" : status));
  const activeIndex = status === "delivered" ? 4 : currentStepIndex;

  return (
    <div className={cn("relative flex items-center justify-between w-full", className)}>
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
      
      {/* Progress Line */}
      <motion.div 
        className={cn(
          "absolute top-1/2 left-0 h-0.5 -translate-y-1/2 z-0",
          isDelayed ? "bg-destructive/50" : "bg-primary"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {steps.map((step, idx) => {
        const isCompleted = idx < activeIndex;
        const isActive = idx === activeIndex && !isDelayed;
        const Icon = step.id === "delivered" && isCompleted ? CheckCircle2 : step.icon;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 group">
             <div className={cn(
               "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
               isCompleted ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" :
               isActive ? "bg-background border-primary text-primary animate-pulse" :
               isDelayed && step.id === "in_transit" ? "bg-destructive border-destructive text-destructive-foreground shadow-lg shadow-destructive/20 animate-bounce" :
               "bg-background border-border text-muted-foreground"
             )}>
                <Icon className="h-5 w-5" />
             </div>
             <div className="flex flex-col items-center">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  (isCompleted || isActive) ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {step.time && (
                  <span className="text-[9px] font-bold text-muted-foreground/60">
                    {step.time}
                  </span>
                )}
             </div>
             
             {isDelayed && step.id === "in_transit" && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-destructive text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                  DELAYED
                </div>
             )}
          </div>
        );
      })}
    </div>
  );
}

function TrackCheckIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Truck className="h-5 w-5" />
      <CheckCircle2 className="absolute -right-1 -bottom-1 h-3 w-3 text-white fill-primary" />
    </div>
  );
}
