"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Machine } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { Cog, Calendar, Pencil, AlertTriangle, TrendingDown, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AlertBadge } from "@/components/ui/alert-badge";

interface MachineCardProps {
  machine: Machine;
  onEdit: (machine: Machine) => void;
  onToggleRental: (id: string, value: boolean) => void;
  index: number;
}

function isMaintenanceAlert(machine: Machine) {
  const due = new Date(machine.nextMaintenanceDue);
  const today = new Date();
  const diffDays = Math.ceil(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays <= 7 || machine.status === "Broken" || machine.status === "Maintenance";
}

export function MachineCard({
  machine,
  onEdit,
  onToggleRental,
  index,
}: MachineCardProps) {
  const alert = isMaintenanceAlert(machine);
  const estimatedLoss = machine.status === "Broken" ? "Rs 12.5K/hr" : machine.status === "Maintenance" ? "Rs 4.2K/hr" : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <GlassCard
        className={cn(
          "p-0 overflow-hidden relative group transition-all duration-500",
          alert ? "border-destructive/30 bg-destructive/5" : "border-border/40"
        )}
      >
        {alert && machine.status !== "Active" && (
          <div className="absolute inset-0 bg-destructive/5 animate-pulse pointer-events-none" />
        )}
        
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 duration-300 shadow-lg",
                  alert ? "bg-destructive/20 text-destructive glow-red" : "bg-primary/10 text-primary glow-green"
                )}
              >
                <Cog className={cn("h-6 w-6", machine.status === "Active" && "animate-[spin_4s_linear_infinite]")} />
              </div>
              <div>
                <h3 className="font-black text-base text-foreground tracking-tight leading-none mb-1">
                  {machine.name}
                </h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {machine.type}
                </p>
              </div>
            </div>
            {alert && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive animate-bounce">
                <AlertTriangle className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <StatusBadge status={machine.status} />
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-black text-foreground">84% <span className="text-[10px] text-muted-foreground font-medium">Efficiency</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-3 rounded-xl bg-muted/20 border border-border/50">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Downtime</p>
                <p className={cn("text-xs font-black", machine.status === "Active" ? "text-success" : "text-destructive")}>
                   {machine.status === "Active" ? "0.0h" : "4.2h"}
                </p>
             </div>
             <div className="p-3 rounded-xl bg-muted/20 border border-border/50">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Next Check</p>
                <p className="text-xs font-black text-foreground">{machine.nextMaintenanceDue}</p>
             </div>
          </div>

          {estimatedLoss && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
               <TrendingDown className="h-4 w-4 text-destructive" />
               <span className="text-xs font-bold text-destructive">Estimated Loss: {estimatedLoss}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Rental</span>
                 <Switch
                   checked={machine.isRental}
                   onCheckedChange={(v) => onToggleRental(machine.id, v)}
                   className="scale-75 data-[state=checked]:bg-primary"
                 />
               </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(machine)}
              className="h-9 px-4 rounded-xl text-xs font-bold gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              <Pencil className="h-3 w-3" />
              Modify
            </Button>
          </div>
        </div>
        
        {/* Progress indicator at bottom */}
        <div className="h-1 w-full bg-muted/30">
           <div 
             className={cn("h-full transition-all duration-1000", alert ? "bg-destructive glow-red" : "bg-primary glow-green")} 
             style={{ width: machine.status === "Active" ? "100%" : machine.status === "Maintenance" ? "40%" : "10%" }} 
           />
        </div>
      </GlassCard>
    </motion.div>
  );
}
