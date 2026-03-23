"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import { gradingRecords } from "@/lib/data";
import { PackagingRecord } from "@/types";
import { Archive, ArrowRight, Package, Weight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddPackagingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (record: PackagingRecord) => void;
}

export function AddPackagingModal({ open, onOpenChange, onAdd }: AddPackagingModalProps) {
  const [batchId, setBatchId] = React.useState("");
  const [packageType, setPackageType] = React.useState<"Bags" | "Boxes">("Bags");
  const [weightPerPackage, setWeightPerPackage] = React.useState("");
  const [totalPackages, setTotalPackages] = React.useState("");

  const selectedGrading = gradingRecords.find((r) => r.batchId === batchId);
  const totalVolume = Number(weightPerPackage) * Number(totalPackages);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: PackagingRecord = {
      id: `PKG-${Math.floor(1000 + Math.random() * 9000)}`,
      batchId,
      packageType,
      weightPerPackage: Number(weightPerPackage),
      totalPackages: Number(totalPackages),
    };
    onAdd(newRecord);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md glass-panel border-warning/20 p-0 overflow-hidden sm:rounded-3xl">
        <div className="bg-warning/5 p-6 border-b border-warning/10 relative overflow-hidden">
           <div className="flex items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center border border-warning/30">
                 <Archive className="h-5 w-5 text-warning" />
              </div>
              <div>
                 <DialogTitle className="text-xl font-black tracking-tight text-foreground">New Packaging Run</DialogTitle>
                 <DialogDescription className="text-xs font-medium text-muted-foreground/70">Final unit preparation for export/dispatch</DialogDescription>
              </div>
           </div>
           <div className="absolute -top-10 -right-10 h-32 w-32 bg-warning/5 blur-3xl rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Graded Batch</Label>
            <Select value={batchId} onValueChange={(val) => setBatchId(val || "")}>
              <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-border/50 font-bold">
                <SelectValue placeholder="Chose graded inventory..." />
              </SelectTrigger>
              <SelectContent className="glass-panel border-border/50 rounded-xl">
                {gradingRecords.map((r) => (
                  <SelectItem key={r.id} value={r.batchId} className="font-bold">
                    {r.batchId} <span className="text-[9px] opacity-40 ml-2">({r.grades.gradeA + r.grades.gradeB + r.grades.gradeC} kg total)</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Type</Label>
                <div className="grid grid-cols-2 gap-2">
                   <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setPackageType("Bags")}
                    className={cn("rounded-xl h-12 font-bold", packageType === 'Bags' && "bg-warning/10 border-warning/30 text-warning")}
                   >Bags</Button>
                   <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setPackageType("Boxes")}
                    className={cn("rounded-xl h-12 font-bold", packageType === 'Boxes' && "bg-warning/10 border-warning/30 text-warning")}
                   >Boxes</Button>
                </div>
             </div>
             <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Unit Weight (kg)</Label>
                <Input 
                  type="number" 
                  placeholder="5.0"
                  value={weightPerPackage}
                  onChange={(e) => setWeightPerPackage(e.target.value)}
                  className="h-12 rounded-xl bg-muted/30 border-border/50 font-bold text-center"
                />
             </div>
          </div>

          <div className="space-y-4 text-center">
             <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Total Units</Label>
             <Input 
                type="number" 
                placeholder="00"
                value={totalPackages}
                onChange={(e) => setTotalPackages(e.target.value)}
                className="h-20 text-5xl font-black text-center rounded-3xl bg-warning/5 border-warning/20 text-warning focus-visible:ring-warning/30"
             />
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-warning" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Weight</span>
             </div>
             <span className="font-black text-foreground">{totalVolume.toFixed(1)} kg</span>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={!batchId || !totalPackages || !weightPerPackage}
              className="w-full h-14 rounded-2xl font-black text-lg bg-warning hover:bg-warning/90 text-white shadow-xl shadow-warning/20 transition-all active:scale-95 disabled:grayscale"
            >
               Confirm Packaging <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
