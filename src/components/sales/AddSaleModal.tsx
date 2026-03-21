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
import { Sale } from "@/types";
import { toast } from "sonner";

interface AddSaleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (sale: Sale) => void;
}

export function AddSaleModal({ open, onOpenChange, onAdd }: AddSaleModalProps) {
  const [buyerName, setBuyerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [quantityKg, setQuantityKg] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");

  const total =
    parseFloat(quantityKg || "0") * parseFloat(pricePerKg || "0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !quantityKg || !pricePerKg) {
      toast.error("Please fill all required fields.");
      return;
    }
    const sale: Sale = {
      id: `S${Date.now()}`,
      buyerName,
      date,
      quantityKg: parseFloat(quantityKg),
      pricePerKg: parseFloat(pricePerKg),
      totalRevenue: total,
    };
    onAdd(sale);
    toast.success(`Sale to ${buyerName} recorded — Rs. ${total.toLocaleString()}`);
    onOpenChange(false);
    setBuyerName("");
    setQuantityKg("");
    setPricePerKg("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="buyerName">Buyer / Store Name *</Label>
            <Input
              id="buyerName"
              placeholder="Enter buyer name"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="saleDate">Sale Date *</Label>
            <Input
              id="saleDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="saleQty">Quantity (kg) *</Label>
              <Input
                id="saleQty"
                type="number"
                min="0"
                step="0.1"
                placeholder="0"
                value={quantityKg}
                onChange={(e) => setQuantityKg(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salePrice">Price per kg (Rs.) *</Label>
              <Input
                id="salePrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
              />
            </div>
          </div>
          {total > 0 && (
            <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Total Revenue: </span>
              <span className="font-semibold text-foreground">
                Rs. {total.toLocaleString()}
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
              Add Sale
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
