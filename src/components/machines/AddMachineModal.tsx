"use client";

import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Machine, MachineStatus } from "@/types";
import { toast } from "sonner";

interface AddMachineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (machine: Machine) => void;
  editMachine?: Machine | null;
}

const statuses: MachineStatus[] = ["Active", "Maintenance", "Broken"];
const machineTypes = [
  "Withering", "Rolling", "Fermentation", "Drying",
  "Sorting", "Packaging", "Grading", "CTC Processing", "Other",
];

export function AddMachineModal({
  open,
  onOpenChange,
  onSave,
  editMachine,
}: AddMachineModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Withering");
  const [status, setStatus] = useState<MachineStatus>("Active");
  const [lastMaintenance, setLastMaintenance] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [nextMaintenance, setNextMaintenance] = useState("");
  const [isRental, setIsRental] = useState(false);

  useEffect(() => {
    if (editMachine) {
      setName(editMachine.name);
      setType(editMachine.type);
      setStatus(editMachine.status);
      setLastMaintenance(editMachine.lastMaintenanceDate);
      setNextMaintenance(editMachine.nextMaintenanceDue);
      setIsRental(editMachine.isRental);
    } else {
      setName("");
      setType("Withering");
      setStatus("Active");
      setLastMaintenance(new Date().toISOString().split("T")[0]);
      setNextMaintenance("");
      setIsRental(false);
    }
  }, [editMachine, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Machine name is required.");
      return;
    }
    const machine: Machine = {
      id: editMachine?.id ?? `M${Date.now()}`,
      name,
      type,
      status,
      lastMaintenanceDate: lastMaintenance,
      nextMaintenanceDue: nextMaintenance,
      isRental,
    };
    onSave(machine);
    toast.success(
      editMachine
        ? `${name} updated successfully`
        : `${name} added successfully`
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editMachine ? "Edit Machine" : "Add Machine"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="machineName">Machine Name *</Label>
            <Input
              id="machineName"
              placeholder="e.g. Rolling Machine 2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v ?? type)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {machineTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus((v ?? status) as MachineStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Last Maintenance</Label>
              <Input
                type="date"
                value={lastMaintenance}
                onChange={(e) => setLastMaintenance(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Next Due Date</Label>
              <Input
                type="date"
                value={nextMaintenance}
                onChange={(e) => setNextMaintenance(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <Switch
              id="rentalSwitch"
              checked={isRental}
              onCheckedChange={setIsRental}
            />
            <Label htmlFor="rentalSwitch" className="cursor-pointer">
              Rental Machine
            </Label>
          </div>
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="min-w-24">
              {editMachine ? "Save Changes" : "Add Machine"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
