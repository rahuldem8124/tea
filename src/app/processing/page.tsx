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
import { Cog, Zap, Play, CheckCircle2, AlertCircle, Plus, Search, Filter, MoreVertical, Timer, ArrowRight, Activity, TrendingDown } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StartBatchModal } from "@/components/modals/StartBatchModal";

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
           <Button className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg shadow-primary/20">
              <Plus className="h-5 w-5" />
              Start New Batch
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
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
          icon={Activity}
          iconClassName="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 py-2">
           <SectionHeader title="Production Ledger" description="Track batch movement from input to output" />
           <div className="flex items-center gap-3 bg-muted/20 p-1 rounded-2xl border border-border/50 backdrop-blur-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search Batch ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 w-64 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold"
                />
              </div>
              <Separator orientation="vertical" className="h-6 bg-border/50" />
              <Button variant="ghost" size="sm" className="h-9 rounded-xl px-3 text-xs font-bold gap-2">
                 <Filter className="h-3.5 w-3.5" />
                 All Machines
              </Button>
           </div>
        </div>

        <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent bg-muted/10">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6 h-14">Batch ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Machine</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Input (kg)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Time</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14 text-center">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right h-14">Output (kg)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-14">Wastage / Loss</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredBatches.map((batch, idx) => {
                    const machine = machines.find(m => m.id === batch.machineId);
                    return (
                      <motion.tr
                        key={batch.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="group border-b border-border/40 hover:bg-primary/5 transition-all"
                      >
                         <TableCell className="pl-6 py-5">
                            <span className="font-black text-sm text-foreground tracking-tight">{batch.id}</span>
                         </TableCell>
                         <TableCell>
                            <div className="flex items-center gap-2">
                               <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center border border-border/50">
                                  <Cog className="h-4 w-4 text-muted-foreground" />
                               </div>
                               <div>
                                  <p className="font-bold text-xs text-foreground uppercase tracking-tight">{machine?.name || batch.machineId}</p>
                                  <p className="text-[9px] font-bold text-muted-foreground">{machine?.type}</p>
                               </div>
                            </div>
                         </TableCell>
                         <TableCell className="font-black text-xs text-foreground lining-nums">
                            {batch.inputQtyKg.toLocaleString()}
                         </TableCell>
                         <TableCell>
                            <div className="flex items-center gap-1 text-[10px] font-bold">
                               <Timer className="h-3 w-3 text-muted-foreground" />
                               <span className="text-foreground">{batch.startTime}</span>
                               {batch.endTime && (
                                 <>
                                   <ArrowRight className="h-2 w-2 text-muted-foreground" />
                                   <span className="text-muted-foreground">{batch.endTime}</span>
                                 </>
                               )}
                            </div>
                         </TableCell>
                         <TableCell className="text-center">
                            <Badge variant="outline" className={cn(
                              "text-[9px] font-black px-2 py-0.5 uppercase tracking-widest",
                              batch.status === 'processing' ? "text-primary border-primary/30 bg-primary/5" :
                              batch.status === 'completed' ? "text-success border-success/30 bg-success/5" : "text-muted-foreground"
                            )}>
                               {batch.status}
                            </Badge>
                         </TableCell>
                         <TableCell className="text-right font-black text-sm text-foreground lining-nums">
                            {batch.outputQtyKg?.toLocaleString() || "—"}
                         </TableCell>
                         <TableCell className="text-right pr-6">
                            {batch.wastagePercentage ? (
                              <div className="inline-flex flex-col items-end">
                                 <span className="text-xs font-black text-destructive italic">-{batch.wastagePercentage}%</span>
                                 <span className="text-[9px] font-bold text-muted-foreground opacity-60">Process Loss</span>
                              </div>
                            ) : (
                              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Calculating...</span>
                            )}
                         </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
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
