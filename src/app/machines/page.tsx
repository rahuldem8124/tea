"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { machines as initialData } from "@/lib/data";
import { Machine } from "@/types";
import { MachineCard } from "@/components/machines/MachineCard";
import { AddMachineModal } from "@/components/machines/AddMachineModal";
import { MachineMaintenanceTimeline } from "@/components/machines/MachineMaintenanceTimeline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertTriangle, CheckCircle2, Wrench, Cog, Activity } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";

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
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cog className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Hardware & Equipment
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Machine <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Monitoring {machines.length} units across 4 factory lines.
          </p>
        </div>
        <Button onClick={handleAdd} className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg">
          <Plus className="h-5 w-5" />
          Deploy New Machine
        </Button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 flex items-center gap-4 border-success/20 bg-success/5" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center glow-green border border-success/20">
             <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
             <p className="text-[10px] font-bold text-success uppercase tracking-widest">Active Units</p>
             <p className="text-xl font-black">{activeCount}</p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 flex items-center gap-4 border-warning/20 bg-warning/5" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center glow-yellow border border-warning/20">
             <Wrench className="h-5 w-5" />
          </div>
          <div>
             <p className="text-[10px] font-bold text-warning uppercase tracking-widest">In Service</p>
             <p className="text-xl font-black">{maintenanceCount}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4 border-destructive/20 bg-destructive/5" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center glow-red border border-destructive/20">
             <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
             <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">Critical Alert</p>
             <p className="text-xl font-black">{brokenCount}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4" hoverLift={false}>
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center glow-green border border-primary/20">
             <Activity className="h-5 w-5" />
          </div>
          <div>
             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">System Load</p>
             <p className="text-xl font-black">92%</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Machine Grid */}
        <div className="lg:col-span-8 space-y-6">
          <SectionHeader title="Fleet Management" description="Real-time status of all factory equipment" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {machines.map((machine, i) => (
              <MachineCard
                key={machine.id}
                machine={machine}
                index={i}
                onEdit={handleEdit}
                onToggleRental={handleToggleRental}
              />
            ))}
          </div>
        </div>

        {/* Maintenance Timeline Sidebars */}
        <div className="lg:col-span-4">
           <div className="sticky top-24">
              <MachineMaintenanceTimeline />
           </div>
        </div>
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
