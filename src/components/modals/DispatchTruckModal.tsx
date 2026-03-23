"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { godowns, packagingRecords } from "@/lib/data";
import { TruckDispatch } from "@/types";
import { Truck, ArrowRight, User, MapPin, Package } from "lucide-react";

interface DispatchTruckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (dispatch: TruckDispatch) => void;
}

export function DispatchTruckModal({ open, onOpenChange, onAdd }: DispatchTruckModalProps) {
  const [truckId, setTruckId] = React.useState("");
  const [driverName, setDriverName] = React.useState("");
  const [godownId, setGodownId] = React.useState("");
  const [packageId, setPackageId] = React.useState("");

  const selectedGodown = godowns.find(g => g.id === godownId);
  const selectedPackage = packagingRecords.find(p => p.id === packageId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    const newDispatch: TruckDispatch = {
      id: `TRK-${Math.floor(1000 + Math.random() * 9000)}`,
      truckId,
      driverName,
      destinationGodown: selectedGodown?.name || "Unknown Godown",
      loadDetails: [{
        batchId: selectedPackage.batchId,
        grade: "Standard", // Simplified for now
        quantity: selectedPackage.totalPackages * selectedPackage.weightPerPackage,
      }],
      departureTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrivalTime: new Date(Date.now() + 4 * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // +4 hours
      status: "dispatched",
    };
    onAdd(newDispatch);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md glass-panel border-success/20 p-0 overflow-hidden sm:rounded-3xl">
        <div className="bg-success/5 p-6 border-b border-success/10 relative overflow-hidden">
           <div className="flex items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center border border-success/30">
                 <Truck className="h-5 w-5 text-success" />
              </div>
              <div>
                 <DialogTitle className="text-xl font-black tracking-tight text-foreground">Dispatch New Truck</DialogTitle>
                 <DialogDescription className="text-xs font-medium text-muted-foreground/70">Assign a truck and driver to a godown delivery</DialogDescription>
              </div>
           </div>
           <div className="absolute -top-10 -right-10 h-32 w-32 bg-success/5 blur-3xl rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Truck ID</Label>
                <div className="relative">
                   <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="T-2245" value={truckId} onChange={(e) => setTruckId(e.target.value)} className="h-12 pl-10 rounded-xl bg-muted/30 border-border/50 font-bold" />
                </div>
             </div>
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Driver Name</Label>
                <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="John Doe" value={driverName} onChange={(e) => setDriverName(e.target.value)} className="h-12 pl-10 rounded-xl bg-muted/30 border-border/50 font-bold" />
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Destination Godown</Label>
             <Select value={godownId} onValueChange={(val) => setGodownId(val || "")}>
                <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-border/50 font-bold">
                   <SelectValue placeholder="Select target location..." />
                </SelectTrigger>
                <SelectContent className="glass-panel border-border/50 rounded-xl">
                   {godowns.map((g) => (
                      <SelectItem key={g.id} value={g.id} className="font-bold">
                         <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-primary" />
                            {g.name}
                         </div>
                      </SelectItem>
                   ))}
                </SelectContent>
             </Select>
          </div>

          <div className="space-y-4">
             <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Load Assignment</Label>
             <Select value={packageId} onValueChange={(val) => setPackageId(val || "")}>
                <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-border/50 font-bold">
                   <SelectValue placeholder="Select packed stock..." />
                </SelectTrigger>
                <SelectContent className="glass-panel border-border/50 rounded-xl">
                   {packagingRecords.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="font-bold">
                         <div className="flex items-center gap-2">
                            <Package className="h-3 w-3 text-warning" />
                            {p.id} <span className="text-[9px] opacity-40 italic">({p.totalPackages * p.weightPerPackage} kg)</span>
                         </div>
                      </SelectItem>
                   ))}
                </SelectContent>
             </Select>
          </div>

          <div className="p-4 rounded-2xl bg-success/5 border border-success/20 animate-in fade-in slide-in-from-bottom-2">
             <div className="flex items-center justify-between text-[10px] font-bold text-success uppercase tracking-widest mb-2">
                <span>Fleet Optimization</span>
                <span>Active</span>
             </div>
             <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                Dispatching to <span className="text-foreground font-bold">{selectedGodown?.name || "..."}</span>. 
                Estimated travel time: <span className="text-foreground font-bold">4.2 Hours</span>.
             </p>
          </div>

          <div className="pt-2">
            <Button 
               type="submit" 
               disabled={!truckId || !driverName || !godownId || !packageId}
               className="w-full h-14 rounded-2xl font-black text-lg bg-success hover:bg-success/90 text-white shadow-xl shadow-success/20 transition-all active:scale-95 disabled:grayscale"
            >
               Dispatch Truck <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
