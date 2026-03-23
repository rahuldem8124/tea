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
import { processingBatches } from "@/lib/data";
import { GradingRecord } from "@/types";
import { Layers, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddGradingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (record: GradingRecord) => void;
}

export function AddGradingModal({ open, onOpenChange, onAdd }: AddGradingModalProps) {
  const [batchId, setBatchId] = React.useState("");
  const [gradeA, setGradeA] = React.useState("");
  const [gradeB, setGradeB] = React.useState("");
  const [gradeC, setGradeC] = React.useState("");

  const selectedBatch = processingBatches.find((b) => b.id === batchId);
  const totalGraded = Number(gradeA) + Number(gradeB) + Number(gradeC);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: GradingRecord = {
      id: `GR-${Math.floor(1000 + Math.random() * 9000)}`,
      batchId,
      grades: {
        gradeA: Number(gradeA),
        gradeB: Number(gradeB),
        gradeC: Number(gradeC),
      },
      date: new Date().toISOString().split("T")[0],
    };
    onAdd(newRecord);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md glass-panel border-purple-500/20 p-0 overflow-hidden sm:rounded-3xl">
        <div className="bg-purple-500/5 p-6 border-b border-purple-500/10 relative overflow-hidden">
           <div className="flex items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                 <Layers className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                 <DialogTitle className="text-xl font-black tracking-tight text-foreground">Record Grading</DialogTitle>
                 <DialogDescription className="text-xs font-medium text-muted-foreground/70">Split processed batch into production grades</DialogDescription>
              </div>
           </div>
           <div className="absolute -top-10 -right-10 h-32 w-32 bg-purple-500/5 blur-3xl rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Processed Batch</Label>
            <Select value={batchId} onValueChange={(val) => setBatchId(val || "")}>
              <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-border/50 font-bold">
                <SelectValue placeholder="Select completed batch..." />
              </SelectTrigger>
              <SelectContent className="glass-panel border-border/50 rounded-xl">
                {processingBatches.filter(b => b.status === 'completed').map((b) => (
                  <SelectItem key={b.id} value={b.id} className="font-bold">
                    {b.id} <span className="text-[9px] opacity-40 ml-2">({b.outputQtyKg} kg output)</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-3">
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-success/60 ml-1 text-center block">Grade A</Label>
                <Input 
                  type="number" 
                  placeholder="00"
                  value={gradeA}
                  onChange={(e) => setGradeA(e.target.value)}
                  className="h-16 text-xl font-black text-center rounded-2xl bg-success/5 border-success/20 text-success focus-visible:ring-success/30"
                />
             </div>
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1 text-center block">Grade B</Label>
                <Input 
                  type="number" 
                  placeholder="00"
                  value={gradeB}
                  onChange={(e) => setGradeB(e.target.value)}
                  className="h-16 text-xl font-black text-center rounded-2xl bg-primary/5 border-primary/20 text-primary focus-visible:ring-primary/30"
                />
             </div>
             <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-warning/60 ml-1 text-center block">Grade C</Label>
                <Input 
                  type="number" 
                  placeholder="00"
                  value={gradeC}
                  onChange={(e) => setGradeC(e.target.value)}
                  className="h-16 text-xl font-black text-center rounded-2xl bg-warning/5 border-warning/20 text-warning focus-visible:ring-warning/30"
                />
             </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
             <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                <span>Verification</span>
                <span>{selectedBatch ? `${totalGraded} / ${selectedBatch.outputQtyKg || 0} kg` : "—"}</span>
             </div>
             <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all", 
                    selectedBatch && selectedBatch.outputQtyKg && totalGraded > selectedBatch.outputQtyKg ? "bg-destructive w-full" : "bg-primary"
                  )} 
                  style={{ width: selectedBatch && selectedBatch.outputQtyKg ? `${Math.min(100, (totalGraded / selectedBatch.outputQtyKg) * 100)}%` : '0%' }}
                />
             </div>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={!batchId || totalGraded === 0 || !!(selectedBatch && selectedBatch.outputQtyKg && totalGraded > selectedBatch.outputQtyKg)}
              className="w-full h-14 rounded-2xl font-black text-lg bg-purple-500 hover:bg-purple-600 text-white shadow-xl shadow-purple-500/20 transition-all active:scale-95 disabled:grayscale"
            >
               Approve Grading <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
