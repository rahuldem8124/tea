"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processingBatches as initialData, machines } from "@/lib/data";
import { ProcessingBatch } from "@/types";
import { KPICard } from "@/components/dashboard/KPICard";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Zap, Play, CheckCircle2, Plus, Search, Filter, ArrowRight, Activity, TrendingDown, Thermometer } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StartBatchModal } from "@/components/modals/StartBatchModal";
import { FermentationMonitor } from "@/components/processing/FermentationMonitor";

export default function ProcessingPage() {
  const [batches, setBatches] = useState<ProcessingBatch[]>(initialData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCount = batches.filter(b => b.status === "processing").length;
  const completedToday = batches.filter(b => b.status === "completed").length;
  const totalWastage = batches.reduce((acc, b) => acc + (b.wastagePercentage || 0), 0) / (completedToday || 1);

  const filteredBatches = batches.filter(b => 
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.machineId.toLowerCase().includes(search.toLowerCase())
  );

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
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Factory Floor
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Processing <span className="text-primary italic">& Grinding</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Manage real-time production throughput and machine loads
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-sm border-border/60 hover:bg-muted/30 transition-all gap-2">
              <Zap className="h-4 w-4" />
              Machine Health
           </Button>
           <Button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg shadow-primary/20"
           >
              <Plus className="h-5 w-5" />
              Start New Batch
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
        <KPICard
          title="Active Batches"
          value={String(activeCount)}
          subtitle="Machines in operation"
          icon={Play}
          iconClassName="bg-primary/10 text-primary border-primary/20 shadow-none"
        />
        <KPICard
          title="Completed Today"
          value={String(completedToday)}
          subtitle="Ready for grading"
          icon={CheckCircle2}
          iconClassName="bg-success/10 text-success border-success/20 shadow-none"
        />
        <KPICard
          title="Avg Wastage"
          value={`${totalWastage.toFixed(1)}%`}
          subtitle="Target: < 3.0%"
          icon={TrendingDown}
          iconClassName="bg-destructive/10 text-destructive border-destructive/20 shadow-none"
        />
        <KPICard
          title="System Load"
          value="82%"
          subtitle="Optimal efficiency"
          icon={Zap}
          iconClassName="bg-warning/10 text-warning border-warning/20 shadow-none"
        />
        <div className="sm:col-span-2">
          <FermentationMonitor temperature={28} humidity={94} />
        </div>
      </div>

      <div className="space-y-4">
        <GlassCard className="p-4" hoverLift={false}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search batches..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 bg-muted/30 border-border/50 rounded-xl"
                />
             </div>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-lg h-9 gap-2 font-bold text-[11px] uppercase tracking-widest">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
                <Separator orientation="vertical" className="h-4 bg-border/50" />
                <Button variant="ghost" size="sm" className="rounded-lg h-9 gap-2 font-bold text-[11px] uppercase tracking-widest">
                  Export Data
                </Button>
             </div>
          </div>
        </GlassCard>

        <GlassCard className="p-0 overflow-hidden" hoverLift={false}>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="w-[120px] font-black text-[10px] uppercase tracking-widest py-4 pl-6 text-muted-foreground">Batch ID</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Machine</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Input (kg)</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Start Time</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="text-right pr-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {filteredBatches.map((batch) => {
                  const machine = machines.find(m => m.id === batch.machineId);
                  return (
                    <TableRow key={batch.id} className="group border-border/40 hover:bg-primary/[0.02] transition-all">
                      <TableCell className="font-bold pl-6">{batch.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{machine?.name || batch.machineId}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{machine?.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">{batch.inputQtyKg} kg</TableCell>
                      <TableCell className="text-muted-foreground font-medium">{batch.startTime}</TableCell>
                      <TableCell>
                         <Badge 
                          variant={batch.status === 'processing' ? 'default' : 'secondary'}
                          className={cn(
                            "rounded-lg px-2 py-0.5 font-bold text-[10px] uppercase tracking-widest",
                            batch.status === 'processing' ? "bg-primary/20 text-primary border-primary/20 animate-pulse" : "bg-success/20 text-success border-success/20"
                          )}
                         >
                           {batch.status}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </GlassCard>
      </div>
      
      <StartBatchModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        onAdd={(batch) => setBatches(prev => [batch, ...prev])} 
      />
    </motion.div>
  );
}
