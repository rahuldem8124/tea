"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { leafEntries as initialData } from "@/lib/data";
import { LeafEntry } from "@/types";
import { KPICard } from "@/components/dashboard/KPICard";
import { QualityBadge } from "@/components/leaf/QualityBadge";
import { AddLeafModal } from "@/components/leaf/AddLeafModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Leaf, Plus, Search, Filter, Mic, Zap, TrendingUp, MoreVertical } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { AlertBadge } from "@/components/ui/alert-badge";
import { FloatingPanel } from "@/components/ui/floating-panel";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const TODAY = new Date().toISOString().split("T")[0];

export default function LeafCollectionPage() {
  const [entries, setEntries] = useState<LeafEntry[]>(initialData);
  const [isQuickEntryOpen, setIsQuickEntryOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterFarmer, setFilterFarmer] = useState("all");

  const farmers = useMemo(
    () => Array.from(new Set(entries.map((e) => e.farmerName))),
    [entries]
  );

  const todayEntries = entries.filter((e) => e.date === TODAY);
  const totalTodayKg = todayEntries.reduce((s, e) => s + e.quantityKg, 0);
  const totalTodayCost = todayEntries.reduce((s, e) => s + e.totalCost, 0);
  const gradeMap: Record<string, number> = { "A+": 4, A: 3, B: 2, C: 1 };
  
  const avgGradeScore =
    todayEntries.length > 0
      ? todayEntries.reduce((s, e) => s + (gradeMap[e.qualityGrade] ?? 1), 0) /
        todayEntries.length
      : 0;
      
  const avgGradeLabel =
    avgGradeScore >= 3.5 ? "A+" : avgGradeScore >= 2.5 ? "A" : avgGradeScore >= 1.5 ? "B" : "C";

  const filtered = entries.filter((e) => {
    const dateMatch = filterDate ? e.date === filterDate : true;
    const farmerMatch =
      filterFarmer && filterFarmer !== "all"
        ? e.farmerName === filterFarmer
        : true;
    return dateMatch && farmerMatch;
  });

  const handleAdd = (entry: LeafEntry) => {
    setEntries((prev) => [entry, ...prev]);
    setIsQuickEntryOpen(false);
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
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Supply Chain
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Leaf <span className="text-primary italic">Collection</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Manage intake from {farmers.length} active suppliers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsQuickEntryOpen(true)} 
            className="rounded-xl h-12 px-6 font-bold text-sm bg-background/50 border-border/50 hover:bg-primary/5 hover:text-primary transition-all gap-2"
          >
            <Mic className="h-4 w-4 animate-pulse text-primary" />
            Voice Input
          </Button>
          <Button 
            onClick={() => setIsQuickEntryOpen(true)} 
            className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Quick Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard
          title="Collected Today"
          value={`${totalTodayKg.toLocaleString()} kg`}
          subtitle={`${todayEntries.length} total deliveries`}
          icon={Leaf}
        />
        <KPICard
          title="Avg Quality"
          value={avgGradeLabel}
          subtitle="Real-time grade index"
          icon={Filter}
          iconClassName="bg-chart-2/10 text-chart-2 border-chart-2/20 shadow-none"
        />
        <KPICard
          title="Total Cost"
          value={`Rs. ${(totalTodayCost / 1000).toFixed(1)}K`}
          subtitle="Estimated payable"
          icon={TrendingUp}
          iconClassName="bg-success/10 text-success border-success/20 shadow-none"
        />
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 py-2">
           <SectionHeader title="Intake Logs" />
           <div className="flex items-center gap-3 bg-muted/20 p-1 rounded-2xl border border-border/50 backdrop-blur-sm shadow-inner">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 h-10 w-44 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold"
                />
              </div>
              <Separator orientation="vertical" className="h-6 bg-border/50" />
              <Select value={filterFarmer} onValueChange={(v) => setFilterFarmer(v ?? "all")}>
                <SelectTrigger className="h-10 w-48 bg-transparent border-0 focus:ring-0 text-sm font-bold">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent className="glass-panel border-border/50 rounded-xl">
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {farmers.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
           </div>
        </div>

        <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
          <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent bg-muted/20">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6 h-12">Supplier</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Performance</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Date / Time</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right h-12">Qty (kg)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Grade</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Payment</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-12">Total (Rs)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-20">
                       <div className="flex flex-col items-center gap-3">
                          <Search className="h-10 w-10 text-muted-foreground/30" />
                          <p className="text-muted-foreground font-bold tracking-tight">No intake logs found for this filter</p>
                          <Button variant="ghost" size="sm" onClick={() => { setFilterDate(""); setFilterFarmer("all"); }}>Reset Filters</Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((entry, idx) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group border-b border-border/50 hover:bg-primary/5 transition-all cursor-default"
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                             {entry.farmerName.split(' ').map(n => n[0]).join('')}
                           </div>
                           <span className="font-bold tracking-tight text-foreground">{entry.farmerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-1">
                            <StarIcon className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs font-black">4.8</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-muted-foreground">
                        {entry.date} <span className="text-[10px] ml-1 bg-muted px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">08:45 AM</span>
                      </TableCell>
                      <TableCell className="text-right font-black text-foreground lining-nums">
                        {entry.quantityKg.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <QualityBadge grade={entry.qualityGrade} />
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                           <Switch className="scale-75 data-[state=checked]:bg-success border-border/50" />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">Pending</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-3">
                           <span className="font-black text-primary lining-nums">
                             {entry.totalCost.toLocaleString()}
                           </span>
                           <Button variant="ghost" size="icon-xs" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                             <MoreVertical className="h-4 w-4" />
                           </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>

      <FloatingPanel 
        isOpen={isQuickEntryOpen} 
        onClose={() => setIsQuickEntryOpen(false)} 
        title="Quick Intake Entry"
        className="max-w-lg"
      >
         <div className="space-y-8 py-4">
            <div className="space-y-4">
               <label className="text-label ml-1">Supplier Search</label>
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Type farmer name..." className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/50 text-base font-bold" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                  <label className="text-label ml-1">Quantity (kg)</label>
                  <Input type="number" placeholder="00.0" className="h-20 text-4xl font-black text-center rounded-3xl bg-primary/5 border-primary/20 text-primary focus-visible:ring-primary/40" />
               </div>
               <div className="space-y-4">
                  <label className="text-label ml-1">Intake Grade</label>
                  <div className="grid grid-cols-2 gap-2 h-20">
                     {["A+", "A", "B", "C"].map((g) => (
                        <Button key={g} variant="outline" className={cn("h-full rounded-xl font-black text-lg border-border/50", g === 'A+' && "border-success/50 bg-success/10 text-success glow-green")}>
                          {g}
                        </Button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="p-6 rounded-3xl bg-muted/20 border border-border/50 space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold opacity-60">Price per kg</span>
                  <span className="font-black">Rs. 245.00</span>
               </div>
               <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-base font-bold">Total Estimated Payable</span>
                  <span className="text-2xl font-black text-primary">Rs. 0.00</span>
               </div>
            </div>

            <div className="flex gap-3 pt-6">
               <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-bold" onClick={() => setIsQuickEntryOpen(false)}>Cancel</Button>
               <Button className="flex-[2] h-14 rounded-2xl font-black text-lg glow-green shadow-xl shadow-primary/20">Submit Intake</Button>
            </div>

            <div className="flex items-center justify-center pt-8">
               <button className="flex flex-col items-center gap-3 group">
                  <div className="h-20 w-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-[0_0_40px_rgba(var(--primary),0.4)]">
                     <Mic className="h-8 w-8 text-primary group-hover:pulse-glow" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Voice Assistant (⌘ + V)</span>
               </button>
            </div>
         </div>
      </FloatingPanel>

      <AddLeafModal
        open={false}
        onOpenChange={() => {}}
        onAdd={handleAdd}
      />
    </motion.div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
