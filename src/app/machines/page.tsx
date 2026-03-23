"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { machines as initialData } from "@/lib/data";
import { Machine } from "@/types";
import { MachineCard } from "@/components/machines/MachineCard";
import { AddMachineModal } from "@/components/machines/AddMachineModal";
import { MachineMaintenanceTimeline } from "@/components/machines/MachineMaintenanceTimeline";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle, CheckCircle2, Wrench, Cog, Activity, Thermometer, Zap, Gauge, RefreshCw, Filter, Package } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProcessStage } from "@/types";


export default function MachinesPage() {
  const [machines, setMachines] = useState<Machine[]>(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMachine, setEditMachine] = useState<Machine | null>(null);

  const activeCount = machines.filter((m) => m.status === "Active").length;
  const maintenanceCount = machines.filter((m) => m.status === "Maintenance").length;
  const brokenCount = machines.filter((m) => m.status === "Broken").length;

  const handleEdit = (machine: Machine) => {
    setEditMachine(machine);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditMachine(null);
    setModalOpen(true);
  };

  const handleSave = (machine: Machine) => {
    setMachines((prev) => {
      const exists = prev.find((m) => m.id === machine.id);
      if (exists) return prev.map((m) => (m.id === machine.id ? machine : m));
      return [machine, ...prev];
    });
  };

  const handleToggleRental = (id: string, value: boolean) => {
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRental: value } : m))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-20"
      suppressHydrationWarning
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cog className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Processing Center
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
             Machine <span className="text-primary italic">Operations</span>
          </h1>
           <p className="text-muted-foreground mt-2 font-medium">
            Real-time telemetry and stage grouping for {machines.length} units.
          </p>
        </div>
        <Button onClick={handleAdd} className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg">
          <Plus className="h-5 w-5" />
          Add Equipment
        </Button>
      </div>


      {/* Status summary cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 flex items-center gap-4 border-success/20 bg-success/5" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center glow-green border border-success/20">
             <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Units</p>
            <p className="text-xl font-black">{machines.filter(m => m.status === 'Active').length}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4 border-warning/20 bg-warning/5" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center glow-yellow border border-warning/20">
             <Wrench className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">In Maintenance</p>
            <p className="text-xl font-black">{maintenanceCount}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4 border-destructive/20 bg-destructive/5" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center glow-red border border-destructive/20">
             <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Breakdowns</p>
            <p className="text-xl font-black">{brokenCount}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4 border-primary/20 bg-primary/5" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center glow-green border border-primary/20">
             <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg Load %</p>
            <p className="text-xl font-black">{(machines.reduce((s, m) => s + (m.loadPercentage || 0), 0) / (machines.length || 1)).toFixed(1)}%</p>
          </div>
        </GlassCard>
      </div>

      {/* Machine Groups by Stage */}
      <div className="space-y-12">
        {(["Withering", "Rolling", "Fermentation", "Drying", "Sorting", "Packaging"] as ProcessStage[]).map((stage) => {
          const stageMachines = machines.filter(m => m.stage === stage);
          if (stageMachines.length === 0) return null;

          return (
            <div key={stage} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                   {stage === "Withering" && <Activity className="h-5 w-5" />}
                   {stage === "Rolling" && <RefreshCw className="h-5 w-5" />}
                   {stage === "Fermentation" && <Thermometer className="h-5 w-5" />}
                   {stage === "Drying" && <Zap className="h-5 w-5" />}
                   {stage === "Sorting" && <Filter className="h-5 w-5" />}
                   {stage === "Packaging" && <Package className="h-5 w-5" />}
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-foreground">{stage}</h2>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stageMachines.length} Units Active</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stageMachines.map((machine) => (
                  <GlassCard
                    key={machine.id}
                    className={cn(
                      "p-6 h-full border-border/40 hover:border-primary/30 transition-all group relative overflow-hidden",
                      machine.status === 'Broken' && "border-destructive/30 bg-destructive/5",
                      machine.status === 'Maintenance' && "border-warning/30 bg-warning/5"
                    )}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">{machine.name}</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{machine.type}</p>
                      </div>
                      <Badge 
                        className={cn(
                          "rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border shadow-none",
                          machine.status === 'Active' ? "bg-success/10 text-success border-success/20 glow-green" :
                          machine.status === 'Maintenance' ? "bg-warning/10 text-warning border-warning/20 glow-yellow" :
                          "bg-destructive/10 text-destructive border-destructive/20 glow-red"
                        )}
                      >
                        {machine.status}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {machine.temperature && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Thermometer className="h-3 w-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Temperature</span>
                          </div>
                          <span className={cn("text-xs font-black", machine.temperature > 100 ? "text-orange-500" : "text-foreground")}>
                            {machine.temperature}°C
                          </span>
                        </div>
                      )}
                      
                      {machine.loadPercentage !== undefined && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Gauge className="h-3 w-3" />
                              <span>Load Factor</span>
                            </div>
                            <span className="text-foreground">{machine.loadPercentage}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full bg-primary transition-all duration-1000",
                                machine.loadPercentage > 90 ? "bg-destructive glow-red" : 
                                machine.loadPercentage > 75 ? "bg-warning glow-yellow" : "bg-primary glow-green"
                              )} 
                              style={{ width: `${machine.loadPercentage}%` }} 
                            />
                          </div>
                        </div>
                      )}
                      
                      {machine.currentBatchId && (
                        <div className="pt-2 border-t border-border/40">
                           <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Current Batch</p>
                           <p className="text-xs font-black text-primary italic">{machine.currentBatchId}</p>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AddMachineModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setEditMachine(null);
        }}
        onSave={handleSave}
        editMachine={editMachine}
      />
    </motion.div>
  );
}
