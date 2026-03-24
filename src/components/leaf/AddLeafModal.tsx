"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { LeafEntry, QualityGrade } from "@/types";
import { toast } from "sonner";

interface AddLeafModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (entry: LeafEntry) => void;
}

const grades: QualityGrade[] = ["A+", "A", "B", "C"];
const priceMap: Record<QualityGrade, number> = {
  "A+": 85,
  A: 75,
  B: 60,
  C: 45,
};

export function AddLeafModal({ open, onOpenChange, onAdd }: AddLeafModalProps) {
  const [farmerName, setFarmerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [quantityKg, setQuantityKg] = useState("");
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>("A");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !quantityKg) {
      toast.error("Please fill all required fields.");
      return;
    }
    const qty = parseFloat(quantityKg);
    const price = priceMap[qualityGrade];
    const entry: LeafEntry = {
      id: `L${Date.now()}`,
      farmerName,
      date,
      quantityKg: qty,
      qualityGrade,
      pricePerKg: price,
      totalCost: qty * price,
    };
    onAdd(entry);
    toast.success(`Entry added for ${farmerName} — ${qty} kg`);
    onOpenChange(false);
    setFarmerName("");
    setQuantityKg("");
    setQualityGrade("A");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Leaf Collection Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="farmerName">Farmer Name *</Label>
            <Input
              id="farmerName"
              placeholder="Enter farmer name"
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="date">Collection Date *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="quantity">Quantity (kg) *</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              step="0.1"
              placeholder="0"
              value={quantityKg}
              onChange={(e) => setQuantityKg(e.target.value)}
            />
          </div>
          {quantityKg && (
            <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Estimated cost: </span>
              <span className="font-semibold text-foreground">
                Rs. {(parseFloat(quantityKg || "0") * priceMap[qualityGrade]).toLocaleString()}
              </span>
            </div>
          )}
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="min-w-24">
              Add Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
