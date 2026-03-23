"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { godowns as initialData } from "@/lib/data";
import { Godown } from "@/types";
import { KPICard } from "@/components/dashboard/KPICard";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Warehouse, MapPin, Database, TrendingUp, MoreVertical, LayoutGrid, Package, Plus } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export default function GodownsPage() {
  const [godowns] = useState<Godown[]>(initialData);

  const totalStock = godowns.reduce((acc, g) => acc + g.availableStockKg, 0);
  const totalCapacity = godowns.reduce((acc, g) => acc + g.receivedQtyKg, 0);

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
            <Warehouse className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Inventory Storage
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Godown <span className="text-primary italic">Management</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Monitor stock levels and batch distribution across regional warehouses
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-sm border-border/60 hover:bg-muted/30 transition-all gap-2">
              <Database className="h-4 w-4" />
              Stock Audit
           </Button>
           <Button className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2">
              <Plus className="h-5 w-5" />
              New Godown
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <KPICard
          title="Total Available Stock"
          value={`${(totalStock / 1000).toFixed(1)} T`}
          subtitle="Net inventory across all hubs"
          icon={Package}
        />
        <KPICard
          title="Warehouse Utilization"
          value={`${((totalStock / totalCapacity) * 100).toFixed(1)}%`}
          subtitle="Current storage load"
          icon={TrendingUp}
          iconClassName="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none"
        />
        <KPICard
          title="Hubs Active"
          value={String(godowns.length)}
          subtitle="Global distribution nodes"
          icon={MapPin}
          iconClassName="bg-success/10 text-success border-success/20 shadow-none"
        />
      </div>

      <div className="space-y-4">
        <SectionHeader title="Godown Inventory" description="Detailed stock breakdown by location" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {godowns.map((godown) => (
             <GlassCard key={godown.id} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                         <Warehouse className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                         <h4 className="font-black text-sm text-foreground tracking-tight">{godown.name}</h4>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase">{godown.id}</p>
                      </div>
                   </div>
                   <Button variant="ghost" size="icon-xs">
                      <MoreVertical className="h-4 w-4" />
                   </Button>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Inventory Load</span>
                      <span className="text-foreground">{(godown.availableStockKg / godown.receivedQtyKg * 100).toFixed(0)}%</span>
                   </div>
                   <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/30">
                      <div 
                        className="h-full bg-primary glow-green transition-all" 
                        style={{ width: `${(godown.availableStockKg / godown.receivedQtyKg * 100)}%` }} 
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                   <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Available</p>
                      <p className="text-base font-black text-foreground">{godown.availableStockKg.toLocaleString()}kg</p>
                   </div>
                   <div className="p-3 rounded-2xl bg-muted/30 border border-border/50">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Received</p>
                      <p className="text-base font-black text-muted-foreground">{godown.receivedQtyKg.toLocaleString()}kg</p>
                   </div>
                </div>

                <Button variant="outline" className="w-full rounded-xl py-5 font-bold text-xs gap-2 border-border/60 hover:bg-primary/5 hover:text-primary transition-all">
                   <LayoutGrid className="h-4 w-4" />
                   Review Batches
                </Button>
             </GlassCard>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
