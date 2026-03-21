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
import { Employee, EmployeeRole, Shift } from "@/types";
import { toast } from "sonner";

interface AddEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (employee: Employee) => void;
}

const roles: EmployeeRole[] = [
  "Picker", "Sorter", "Operator", "Driver", "Supervisor", "Manager",
];
const shifts: Shift[] = ["Morning", "Afternoon", "Night"];

export function AddEmployeeModal({
  open,
  onOpenChange,
  onAdd,
}: AddEmployeeModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<EmployeeRole>("Picker");
  const [shift, setShift] = useState<Shift>("Morning");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !salary) {
      toast.error("Please fill all required fields.");
      return;
    }
    const employee: Employee = {
      id: `E${Date.now()}`,
      name,
      role,
      shift,
      attendance: true,
      salary: parseFloat(salary),
      joinDate: new Date().toISOString().split("T")[0],
    };
    onAdd(employee);
    toast.success(`${name} added to employee list`);
    onOpenChange(false);
    setName("");
    setSalary("");
    setRole("Picker");
    setShift("Morning");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="empName">Full Name *</Label>
            <Input
              id="empName"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select
                value={role}
                onValueChange={(v) => setRole((v ?? role) as EmployeeRole)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Shift</Label>
              <Select
                value={shift}
                onValueChange={(v) => setShift((v ?? shift) as Shift)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="salary">Monthly Salary (Rs.) *</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              placeholder="25000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
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
              Add Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
