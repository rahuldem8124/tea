"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { gradingRecords as initialData } from "@/lib/data";
import { GradingRecord } from "@/types";
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
import { 
  Layers, 
  PieChart, 
  TrendingUp, 
  CheckCircle2, 
  LayoutGrid, 
  Box, 
  Plus, 
  MoreVertical 
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { AddGradingModal } from "@/components/modals/AddGradingModal";

export default function GradingPage() {
  const [records, setRecords] = useState<GradingRecord[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalA = records.reduce((acc, r) => acc + r.grades.gradeA, 0);
  const totalB = records.reduce((acc, r) => acc + r.grades.gradeB, 0);
  const totalC = records.reduce((acc, r) => acc + r.grades.gradeC, 0);
  const total = totalA + totalB + totalC;

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
            <Layers className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Quality Assurance
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Grade <span className="text-primary italic">Distribution</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Analyze tea grade turnout and quality consistency
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-sm border-border/60 hover:bg-muted/30 transition-all gap-2">
              <PieChart className="h-4 w-4" />
              Detailed Analytics
           </Button>
           <Button 
             onClick={() => setIsModalOpen(true)}
             className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
           >
              <Plus className="h-5 w-5" />
              Record Grading
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Summary Metrics */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
           <KPICard title="Grade A Yield" value={`${((totalA/total)*100).toFixed(1)}%`} subtitle={`${totalA.toLocaleString()} kg total`} icon={TrendingUp} />
           <KPICard title="Grade B Yield" value={`${((totalB/total)*100).toFixed(1)}%`} subtitle={`${totalB.toLocaleString()} kg total`} icon={LayoutGrid} iconClassName="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none" />
           <KPICard title="Grade C Yield" value={`${((totalC/total)*100).toFixed(1)}%`} subtitle={`${totalC.toLocaleString()} kg total`} icon={Box} iconClassName="bg-warning/10 text-warning border-warning/20 shadow-none" />
        </div>

        {/* Right: Visual Distribution */}
        <div className="lg:col-span-4">
           <GlassCard className="h-full flex flex-col p-6 items-center justify-center">
              <div className="w-full flex items-center justify-between mb-6">
                 <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Turnout Split</h4>
                 <Badge variant="outline" className="text-[10px] font-black border-success/30 text-success bg-success/5">Above Target</Badge>
              </div>
              <div className="flex w-full h-8 rounded-full overflow-hidden border border-border/40 shadow-inner">
                 <div className="h-full bg-primary glow-green transition-all" style={{ width: `${(totalA/total)*100}%` }} />
                 <div className="h-full bg-blue-500 transition-all" style={{ width: `${(totalB/total)*100}%` }} />
                 <div className="h-full bg-warning transition-all" style={{ width: `${(totalC/total)*100}%` }} />
              </div>
              <div className="w-full grid grid-cols-3 gap-2 mt-6">
                 <div className="flex flex-col items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mb-1" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Premium</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mb-1" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Standard</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-warning mb-1" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Off-Grade</span>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Grading Records" description="Post-processing batch quality analysis" />
        <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent bg-muted/10">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6 h-14">Record ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Batch Reference</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Grading Date</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center h-14">Grade A (kg)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center h-14">Grade B (kg)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center h-14">Grade C (kg)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-14">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id} className="group border-b border-border/40 hover:bg-primary/5 transition-all">
                    <TableCell className="pl-6 py-5 font-black text-sm text-foreground">{record.id}</TableCell>
                    <TableCell>
                       <Badge variant="outline" className="text-[10px] font-black border-primary/20 text-primary bg-primary/5">
                          {record.batchId}
                       </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-muted-foreground">{record.date}</TableCell>
                    <TableCell className="text-center font-black text-primary lining-nums">{record.grades.gradeA.toLocaleString()}</TableCell>
                    <TableCell className="text-center font-black text-blue-500 lining-nums">{record.grades.gradeB.toLocaleString()}</TableCell>
                    <TableCell className="text-center font-black text-warning lining-nums">{record.grades.gradeC.toLocaleString()}</TableCell>
                    <TableCell className="text-right pr-6">
                       <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
      <AddGradingModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={(record) => setRecords(prev => [record, ...prev])}
      />
    </motion.div>
  );
}
