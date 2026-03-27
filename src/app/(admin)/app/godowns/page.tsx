"use client";

import { motion } from "framer-motion";
import { 
  Package, 
  Box, 
  Download,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GodownManagement } from "@/components/inventory/GodownManagement";

export default function GodownsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4 pt-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Inventory Management
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Godown <span className="text-primary italic">Distribution</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Real-time stock tracking across all factory warehouses.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-border/50 gap-2 hover:bg-muted">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="rounded-xl h-12 px-6 font-bold glow-green gap-2 shadow-lg shadow-primary/20">
            <Box className="h-5 w-5" />
            Transfer Stock
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background/40 backdrop-blur-md p-4 rounded-3xl border border-border/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search batch or godown..." className="pl-9 h-12 bg-background/50 border-border/50 rounded-2xl" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-2xl border-border/50 px-6 font-bold gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <GodownManagement />

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Recent Arrivals Pipeline</h2>
          <Button variant="ghost" className="text-primary font-bold text-xs uppercase tracking-widest">View All Arrivals</Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
           {/* Summary of recent movements could go here, but GodownManagement cards already show them */}
           <div className="p-8 border-2 border-dashed border-border/50 rounded-3xl flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                 <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold">End of Distribution List</h3>
              <p className="text-xs text-muted-foreground max-w-xs mt-1">All batches currently in transit or recently delivered are accounted for in the godown management view above.</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
