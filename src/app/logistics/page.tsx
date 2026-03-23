"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { truckDispatches as initialData } from "@/lib/data";
import { TruckDispatch, TruckStatus } from "@/types";
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
import { Truck, MapPin, Navigation, Clock, CheckCircle2, Plus, Search, Filter, Globe } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DispatchTruckModal } from "@/components/modals/DispatchTruckModal";

export default function LogisticsPage() {
  const [dispatches, setDispatches] = useState<TruckDispatch[]>(initialData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inTransitCount = dispatches.filter(d => d.status === "in_transit").length;
  const deliveredCount = dispatches.filter(d => d.status === "delivered").length;
  const totalWeight = dispatches.reduce((acc, d) => 
    acc + d.loadDetails.reduce((sum, item) => sum + item.quantity, 0), 0
  );

  const filteredDispatches = dispatches.filter(d => 
    d.truckId.toLowerCase().includes(search.toLowerCase()) ||
    d.driverName.toLowerCase().includes(search.toLowerCase()) ||
    d.destinationGodown.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: TruckStatus) => {
    switch (status) {
      case "loading": return "text-warning border-warning/30 bg-warning/5";
      case "dispatched": return "text-blue-500 border-blue-500/30 bg-blue-500/5";
      case "in_transit": return "text-chart-2 border-chart-2/30 bg-chart-2/5";
      case "delivered": return "text-success border-success/30 bg-success/5";
      default: return "";
    }
  };

  const getProgressWidth = (status: TruckStatus) => {
    switch (status) {
      case "loading": return "w-[10%]";
      case "dispatched": return "w-[30%]";
      case "in_transit": return "w-[65%]";
      case "delivered": return "w-full";
      default: return "w-0";
    }
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
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Fleet & Dispatch
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Truck <span className="text-primary italic">Logistics</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Real-time tracking of <span className="text-foreground font-black">Tea Dispatch Batches</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-sm border-border/60 hover:bg-muted/30 transition-all gap-2">
              <Navigation className="h-4 w-4" />
              Live Fleet Map
           </Button>
           <Button 
             onClick={() => setIsModalOpen(true)}
             className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
           >
              <Plus className="h-5 w-5" />
              Dispatch New Truck
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <KPICard
          title="In Transit"
          value={String(inTransitCount)}
          subtitle="Active deliveries"
          icon={Truck}
        />
        <KPICard
          title="Delivered Today"
          value={String(deliveredCount)}
          subtitle="Successful batches"
          icon={CheckCircle2}
          iconClassName="bg-success/10 text-success border-success/20 shadow-none"
        />
        <KPICard
          title="Total Dispatched"
          value={`${(totalWeight / 1000).toFixed(1)} Tons`}
          subtitle="Cumulative volume"
          icon={Navigation}
          iconClassName="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none"
        />
        <KPICard
          title="Avg Delivery Time"
          value="4.5 hrs"
          subtitle="Factory to Godown"
          icon={Clock}
          iconClassName="bg-warning/10 text-warning border-warning/20 shadow-none"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 py-2">
           <SectionHeader title="Dispatch Board" description="Track truck movement and delivery status" />
           <div className="flex items-center gap-3 bg-muted/20 p-1 rounded-2xl border border-border/50 backdrop-blur-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Filter by Truck ID / Driver..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 w-64 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold"
                />
              </div>
              <Separator orientation="vertical" className="h-6 bg-border/50" />
              <Button variant="ghost" size="sm" className="h-9 rounded-xl px-3 text-xs font-bold gap-2">
                 <Filter className="h-3.5 w-3.5" />
                 All Statuses
              </Button>
           </div>
        </div>

        <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent bg-muted/10">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6 h-14">Truck & Driver</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Destination</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Load Details</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Timeline</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14 text-center">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-14">Arrival Est.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredDispatches.map((truck, idx) => (
                    <motion.tr
                      key={truck.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group border-b border-border/40 hover:bg-primary/5 transition-all"
                    >
                       <TableCell className="pl-6 py-5">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                              <Truck className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <p className="font-black text-sm text-foreground tracking-tight">{truck.truckId}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">{truck.driverName}</p>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                           <MapPin className="h-3 w-3 text-muted-foreground" />
                           <span className="text-xs font-bold text-foreground italic">{truck.destinationGodown}</span>
                         </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex flex-col gap-1">
                           {truck.loadDetails.map((load, i) => (
                             <span key={i} className="text-[10px] font-bold text-muted-foreground">
                               {load.batchId} • <span className="text-primary">{load.grade}</span> • {load.quantity}kg
                             </span>
                           ))}
                         </div>
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                         <div className="space-y-2">
                           <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground px-1">
                              <span>Factory</span>
                              <span>Road</span>
                              <span>Godown</span>
                           </div>
                           <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative border border-border/40">
                              <div className={cn("h-full bg-primary transition-all duration-1000", getProgressWidth(truck.status))} />
                              <div className={cn(
                                "absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-background shadow-sm transition-all duration-1000",
                                truck.status === "loading" ? "left-[10%]" : 
                                truck.status === "dispatched" ? "left-[30%]" :
                                truck.status === "in_transit" ? "left-[65%]" : "left-[98%]",
                                truck.status === "delivered" ? "bg-success" : "bg-primary"
                              )} />
                           </div>
                         </div>
                      </TableCell>
                      <TableCell className="text-center">
                         <Badge variant="outline" className={cn("text-[9px] font-black px-2 py-0.5 uppercase tracking-widest", getStatusColor(truck.status))}>
                            {truck.status.replace('_', ' ')}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                         <div className="inline-flex flex-col items-end">
                            <span className="text-sm font-black text-foreground">{truck.estimatedArrivalTime}</span>
                            <span className="text-[9px] font-bold text-muted-foreground opacity-60">Dep: {truck.departureTime}</span>
                         </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
      <DispatchTruckModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={(dispatch) => setDispatches(prev => [dispatch, ...prev])}
      />
    </motion.div>
  );
}
