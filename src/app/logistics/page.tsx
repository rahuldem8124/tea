"use client";

import { useState } from "react";
import Image from "next/image";
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
import { AlertCircle, ArrowRight, ShieldAlert } from "lucide-react";

export default function LogisticsPage() {
  const [dispatches, setDispatches] = useState<TruckDispatch[]>(initialData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inTransitCount = dispatches.filter(d => d.status === "in_transit").length;
  const deliveredCount = dispatches.filter(d => d.status === "delivered").length;
  const delayedCount = dispatches.filter(d => d.status === "delayed").length;
  

  const filteredDispatches = dispatches.filter(d => 
    d.truckId.toLowerCase().includes(search.toLowerCase()) ||
    d.driverName.toLowerCase().includes(search.toLowerCase()) ||
    d.destinationGodown.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: string, newStatus: TruckStatus) => {
    setDispatches(prev => prev.map(d => 
      d.id === id ? { 
        ...d, 
        status: newStatus,
        actualArrivalTime: newStatus === "delivered" ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : d.actualArrivalTime
      } : d
    ));
  };

  const getStatusColor = (status: TruckStatus) => {
    switch (status) {
      case "loading": return "text-warning border-warning/30 bg-warning/5";
      case "dispatched": return "text-blue-500 border-blue-500/30 bg-blue-500/5";
      case "in_transit": return "text-chart-2 border-chart-2/30 bg-chart-2/5";
      case "delivered": return "text-success border-success/30 bg-success/5";
      case "delayed": return "text-destructive border-destructive/30 bg-destructive/5 glow-red";
      default: return "";
    }
  };

  const getProgressWidth = (status: TruckStatus) => {
    switch (status) {
      case "loading": return "w-[10%]";
      case "dispatched": return "w-[30%]";
      case "in_transit": return "w-[65%]";
      case "delivered": return "w-full";
      case "delayed": return "w-[65%]";
      default: return "w-0";
    }
  };

  const getTruckImage = (status: TruckStatus) => {
    if (status === "delayed") {
      return "/images/truck-red.png";
    }
    if (status === "loading" || status === "delivered") {
      return "/images/truck-black.png";
    }
    return "/images/truck-green.png";
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
          title="Delayed Trucks"
          value={String(delayedCount)}
          subtitle="Requires attention"
          icon={AlertCircle}
          iconClassName={cn(delayedCount > 0 ? "bg-destructive/10 text-destructive border-destructive/20 shadow-lg shadow-destructive/20" : "bg-muted text-muted-foreground")}
        />
        <KPICard
          title="Avg Delivery Time"
          value="4.5 hrs"
          subtitle="Factory to Godown"
          icon={Clock}
          iconClassName="bg-warning/10 text-warning border-warning/20 shadow-none"
        />
      </div>

      {delayedCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-destructive/10 border border-destructive/20 p-6 rounded-3xl relative overflow-hidden group hover:bg-destructive/15 transition-all shadow-[0_0_30px_rgba(239,68,68,0.1)]"
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-destructive/20 flex items-center justify-center border border-destructive/30 glow-red">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground tracking-tight flex items-center gap-2">
                  Active Logistics Alerts
                  <Badge variant="destructive" className="h-5 px-1.5 text-[9px] font-black uppercase tracking-widest">{delayedCount} CRITICAL</Badge>
                </h3>
                <p className="text-sm font-medium text-muted-foreground/80 mt-1">
                  System detected {delayedCount} truck{delayedCount > 1 ? 's' : ''} with significant arrival delays. Operational intervention required.
                </p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white font-bold transition-all px-6">
              Investigate All Alerts
            </Button>
          </div>
          <div className="absolute -right-20 -top-20 h-40 w-40 bg-destructive/5 blur-[80px] rounded-full group-hover:bg-destructive/10 transition-colors" />
        </motion.div>
      )}

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
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Tracking Timeline</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14 text-center">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-14">Actions</TableHead>
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
                      <TableCell className="min-w-[300px]">
                         <div className="space-y-2">
                           <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground px-1">
                               <span>Factory</span>
                               <span>Road</span>
                               <span>Godown</span>
                           </div>
                            <div className="relative pt-6 pb-2">
                               <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative border border-border/40">
                                  <div className={cn("h-full bg-primary transition-all duration-1000", getProgressWidth(truck.status))} />
                               </div>
                               <motion.div 
                                 className="absolute top-0 -translate-y-[15%] z-10 transition-all duration-1000 ease-in-out pointer-events-none"
                                 initial={false}
                                 animate={{ 
                                   left: truck.status === "loading" ? "10%" : 
                                          truck.status === "dispatched" ? "30%" :
                                          truck.status === "in_transit" || truck.status === "delayed" ? "65%" : "95%"
                                 }}
                               >
                                 <div className="relative -ml-6">
                                   <Image 
                                     src={getTruckImage(truck.status)} 
                                     alt="truck" 
                                     width={48} 
                                     height={24} 
                                     className="object-contain drop-shadow-lg"
                                   />
                                   {(truck.status === "in_transit" || truck.status === "delayed") && (
                                     <motion.div 
                                       animate={{ opacity: [0, 1, 0], x: [-5, -15] }}
                                       transition={{ repeat: Infinity, duration: 1.5 }}
                                       className="absolute -left-2 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-primary/40 rounded-full"
                                     />
                                   )}
                                 </div>
                               </motion.div>
                            </div>
                         </div>
                      </TableCell>
                      <TableCell className="text-center">
                         <div className="flex flex-col items-center gap-1">
                            <Badge variant="outline" className={cn("text-[9px] font-black px-2 py-0.5 uppercase tracking-widest", getStatusColor(truck.status))}>
                                {truck.status.replace('_', ' ')}
                            </Badge>
                            {truck.status === "delayed" && (
                              <span className="text-[8px] font-black text-destructive uppercase flex items-center gap-1">
                                <ShieldAlert className="h-2.5 w-2.5" />
                                Overdue
                              </span>
                            )}
                         </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                         <div className="flex items-center justify-end gap-2">
                            {truck.status === "loading" && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 rounded-lg text-[10px] font-black uppercase gap-2 hover:bg-blue-500/10 border-blue-500/20 text-blue-500"
                                onClick={() => updateStatus(truck.id, "dispatched")}
                              >
                                <Navigation className="h-3 w-3" />
                                Dispatch
                              </Button>
                            )}
                            {(truck.status === "dispatched" || truck.status === "in_transit" || truck.status === "delayed") && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 rounded-lg text-[10px] font-black uppercase gap-2 hover:bg-success/10 border-success/20 text-success"
                                onClick={() => updateStatus(truck.id, "delivered")}
                              >
                                <CheckCircle2 className="h-3 w-3" />
                                Deliver
                              </Button>
                            )}
                            {truck.status === "delivered" && (
                              <div className="pr-4 py-2 flex flex-col items-end">
                                <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40">Complete</span>
                                <span className="text-[9px] font-bold text-success italic">{truck.actualArrivalTime}</span>
                              </div>
                            )}
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
      <div className="space-y-6 pt-4">
        <SectionHeader 
          title="Archive & Trip History" 
          description="View completed delivery logs and past truck movements" 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dispatches.map(truck => (
            <GlassCard key={truck.id} className="p-6 border-border/40 hover:border-primary/30 transition-all group">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                        <Truck className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                     </div>
                     <div>
                        <p className="text-sm font-black tracking-tight">{truck.truckId}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{truck.driverName}</p>
                     </div>
                  </div>
                  <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest opacity-60">
                    {truck.tripHistory?.length || 0} Trips
                  </Badge>
               </div>
               
               <div className="space-y-3">
                  {truck.tripHistory?.slice(0, 2).map((trip, i) => (
                    <div key={i} className="p-3 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-between text-xs transition-all hover:bg-muted/30">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <span className="font-black text-foreground">{trip.destination}</span>
                             <ArrowRight className="h-3 w-3 text-muted-foreground" />
                             <span className="font-bold text-muted-foreground">{trip.arrivalTime}</span>
                          </div>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{trip.tripId} • {trip.departureTime}</p>
                       </div>
                       <Badge className={cn(
                         "text-[8px] font-black uppercase px-2 py-0",
                         trip.status === "on-time" ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"
                       )}>
                         {trip.status}
                       </Badge>
                    </div>
                  ))}
                  {(!truck.tripHistory || truck.tripHistory.length === 0) && (
                    <div className="py-8 text-center border-2 border-dashed border-border/30 rounded-2xl">
                       <p className="text-[10px] font-bold text-muted-foreground italic uppercase">No trip history records</p>
                    </div>
                  )}
               </div>
               
               {truck.tripHistory && truck.tripHistory.length > 2 && (
                 <Button variant="ghost" className="w-full mt-4 h-9 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-xl">
                   View Full History
                 </Button>
               )}
            </GlassCard>
          ))}
        </div>
      </div>

      <DispatchTruckModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={(dispatch) => setDispatches(prev => [{...dispatch, tripHistory: []}, ...prev])}
      />
    </motion.div>
  );
}
