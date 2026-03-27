"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { packagingRecords as initialData } from "@/lib/data";
import { PackagingRecord } from "@/types";
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
import { Archive, Package, LayoutGrid, CheckCircle2, Plus, Box, Weight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { AddPackagingModal } from "@/components/modals/AddPackagingModal";

export default function PackagingPage() {
  const [records, setRecords] = useState<PackagingRecord[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPackages = records.reduce((acc, r) => acc + r.totalPackages, 0);
  const totalWeight = records.reduce((acc, r) => acc + (r.weightPerPackage * r.totalPackages), 0);
  const bagCount = records.filter(r => r.packageType === "Bags").length;
  const boxCount = records.filter(r => r.packageType === "Boxes").length;

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
            <Archive className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Final Dispatch Prep
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Packaging <span className="text-primary italic">& Sealing</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Finalize processed batches into export-ready units
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-sm border-border/60 hover:bg-muted/30 transition-all gap-2">
              <LayoutGrid className="h-4 w-4" />
              Package Inventory
           </Button>
           <Button 
             onClick={() => setIsModalOpen(true)}
             className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
           >
              <Plus className="h-5 w-5" />
              New Packaging Run
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <KPICard
          title="Total Packages"
          value={String(totalPackages)}
          subtitle="Ready for dispatch"
          icon={Package}
        />
        <KPICard
          title="Total Volume"
          value={`${totalWeight.toLocaleString()} kg`}
          subtitle="Net packed weight"
          icon={Weight}
          iconClassName="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none"
        />
        <KPICard
          title="Bags / Boxes"
          value={`${bagCount} / ${boxCount}`}
          subtitle="Unit breakdown"
          icon={Archive}
          iconClassName="bg-warning/10 text-warning border-warning/20 shadow-none"
        />
        <KPICard
          title="QC Approval"
          value="100%"
          subtitle="All units verified"
          icon={CheckCircle2}
          iconClassName="bg-success/10 text-success border-success/20 shadow-none"
        />
      </div>

      <div className="space-y-4">
        <SectionHeader title="Packaging Logs" description="Authenticated sealing records by batch" />
        <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent bg-muted/10">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6 h-14">Run ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Batch Reference</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Package Type</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center h-14">Unit Weight (kg)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center h-14">Total Units</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center h-14">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-14">Total Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id} className="group border-b border-border/40 hover:bg-primary/5 transition-all">
                    <TableCell className="pl-6 py-5">
                       <span className="font-black text-sm text-foreground">{record.id}</span>
                    </TableCell>
                    <TableCell>
                       <Badge variant="outline" className="text-[10px] font-black border-primary/20 text-primary bg-primary/5">
                          {record.batchId}
                       </Badge>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          <Box className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs font-bold text-foreground italic">{record.packageType}</span>
                       </div>
                    </TableCell>
                    <TableCell className="text-center font-black text-xs text-foreground lining-nums">{record.weightPerPackage} kg</TableCell>
                    <TableCell className="text-center font-black text-foreground lining-nums">{record.totalPackages}</TableCell>
                    <TableCell className="text-center">
                       <Badge variant={record.status === 'completed' ? 'success' : 'secondary'} className="rounded-lg px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest">
                          {record.status}
                       </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 font-black text-primary lining-nums">
                       {(record.weightPerPackage * record.totalPackages).toLocaleString()} kg
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
      <AddPackagingModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onAdd={(record) => setRecords(prev => [record, ...prev])}
      />
    </motion.div>
  );
}
