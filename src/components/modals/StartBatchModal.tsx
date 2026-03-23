"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { machines } from "@/lib/data";
import { ProcessingBatch } from "@/types";
import { Zap, Cog, Timer, ArrowRight, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StartBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (batch: ProcessingBatch) => void;
}

export function StartBatchModal({ open, onOpenChange, onAdd }: StartBatchModalProps) {
  const [machineId, setMachineId] = React.useState("");
  const [inputQty, setInputQty] = React.useState("");

  const selectedMachine = machines.find((m) => m.id === machineId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: ProcessingBatch = {
      id: `PB-${Math.floor(1000 + Math.random() * 9000)}`,
      machineId,
      inputQtyKg: Number(inputQty),
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "processing",
    };
    onAdd(newBatch);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md glass-panel border-primary/20 p-0 overflow-hidden sm:rounded-3xl">
        <div className="bg-primary/5 p-6 border-b border-primary/10 relative overflow-hidden">
           <div className="flex items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                 <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                 <DialogTitle className="text-xl font-black tracking-tight">Start New Batch</DialogTitle>
                 <DialogDescription className="text-xs font-medium text-muted-foreground/70">Initiate factory-floor processing run</DialogDescription>
              </div>
           </div>
           <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/5 blur-3xl rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Select Machine</Label>
            <Select value={machineId} onValueChange={(val) => setMachineId(val || "")}>
              <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-border/50 font-bold">
                <SelectValue placeholder="Chose processing unit..." />
              </SelectTrigger>
              <SelectContent className="glass-panel border-border/50 rounded-xl">
                {machines.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="font-bold">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", m.status === 'Active' ? 'bg-success' : 'bg-warning')} />
                      {m.name} <span className="text-[9px] opacity-40 uppercase ml-2 tabular-nums">({m.type})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
             <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Input Quantity (kg)</Label>
             <div className="grid grid-cols-1 gap-2">
                <Input 
                  type="number" 
                  placeholder="00.0" 
                  required
                  value={inputQty}
                  onChange={(e) => setInputQty(e.target.value)}
                  className="h-20 text-4xl font-black text-center rounded-3xl bg-primary/5 border-primary/20 text-primary transition-all focus-visible:ring-primary/30 focus-visible:ring-offset-4"
                />
             </div>
          </div>

          {selectedMachine && (
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 animate-in fade-in slide-in-from-top-2">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency Rating</span>
                  <Badge variant="outline" className="text-[9px] font-black bg-success/10 text-success border-success/30 uppercase tracking-widest">Optimal</Badge>
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Timer className="h-4 w-4 text-primary" />
                  Estimated Process Time: 45m
               </div>
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" disabled={!machineId || !inputQty} className="w-full h-14 rounded-2xl font-black text-lg glow-green shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:grayscale">
               Start Production <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
