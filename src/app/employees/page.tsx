"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { employees as initialData } from "@/lib/data";
import { Employee } from "@/types";
import { KPICard } from "@/components/dashboard/KPICard";
import { AddEmployeeModal } from "@/components/employees/AddEmployeeModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Plus, UserCheck, Search, Filter, Briefcase, Clock, Zap, MoreHorizontal, ShieldCheck, Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const shiftColors: Record<string, string> = {
  Morning: "bg-success/10 text-success border-success/20 glow-green",
  Afternoon: "bg-warning/10 text-warning border-warning/20 glow-yellow",
  Night: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const roleColors: Record<string, string> = {
  Manager: "border-primary/40 text-primary bg-primary/5",
  Supervisor: "border-warning/40 text-warning bg-warning/5",
  Operator: "border-blue-400/40 text-blue-400 bg-blue-400/5",
  Picker: "border-border/50 text-muted-foreground bg-muted/20",
  Sorter: "border-border/50 text-muted-foreground bg-muted/20",
  Driver: "border-border/50 text-muted-foreground bg-muted/20",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const totalCount = employees.length;
  const presentCount = employees.filter((e) => e.attendance).length;

  const handleAttendanceToggle = (id: string, value: boolean) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, attendance: value } : e))
    );
    const emp = employees.find((e) => e.id === id);
    if (emp) {
      toast.success(
        `${emp.name} marked as ${value ? "Present" : "Absent"}`
      );
    }
  };

  const handleAdd = (emp: Employee) => {
    setEmployees((prev) => [emp, ...prev]);
  };

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.role.toLowerCase().includes(search.toLowerCase())
  );

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
            <Users className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Workforce Optimization
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Staff <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Monitor attendance and productivity for {totalCount} team members.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg">
          <Plus className="h-5 w-5" />
          Onboard Staff
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Headcount"
          value={String(totalCount)}
          subtitle="Total workforce"
          icon={Users}
        />
        <KPICard
          title="Presence"
          value={String(presentCount)}
          subtitle={`${((presentCount/totalCount)*100).toFixed(0)}% attendance rate`}
          icon={UserCheck}
          iconClassName="bg-success/10 text-success border-success/20 shadow-none"
        />
        <KPICard
          title="Active Shifts"
          value="3"
          subtitle="24/7 coverage active"
          icon={Clock}
          iconClassName="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none"
        />
        <KPICard
          title="Team Efficiency"
          value="94%"
          subtitle="+4.2% from last week"
          icon={Zap}
          iconClassName="bg-warning/10 text-warning border-warning/20 shadow-none"
        />
      </div>

      {/* Employee List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 py-2">
           <SectionHeader title="Staff Directory" description="Real-time status and assignment monitoring" />
           <div className="flex items-center gap-3 bg-muted/20 p-1 rounded-2xl border border-border/50 backdrop-blur-sm shadow-inner">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name or role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 w-64 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold"
                />
              </div>
              <Separator orientation="vertical" className="h-6 bg-border/50" />
              <Button variant="ghost" size="sm" className="h-9 rounded-xl px-3 text-xs font-bold gap-2">
                 <Filter className="h-3.5 w-3.5" />
                 All Shifts
              </Button>
           </div>
        </div>

        <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent bg-muted/10">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6 h-14">Identity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Assignment</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Shift Logs</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Productivity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-center h-14">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-14">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredEmployees.map((emp, idx) => (
                    <motion.tr
                      key={emp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.03 }}
                      className={cn(
                        "group border-b border-border/50 hover:bg-primary/5 transition-all text-sm",
                        !emp.attendance && "bg-muted/5 opacity-80"
                      )}
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-4">
                           <div className="relative">
                             <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-xs font-black text-primary">
                               {emp.name.split(' ').map(n=>n[0]).join('')}
                             </div>
                             {emp.attendance && (
                               <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-success rounded-full border-2 border-background glow-green pulse-glow" />
                             )}
                           </div>
                           <div>
                              <p className="font-black text-foreground tracking-tight">{emp.name}</p>
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">ID: EMP-{emp.id.slice(0,4)}</p>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-[10px] font-black uppercase tracking-widest rounded-lg px-2 py-0.5", roleColors[emp.role])}>
                          {emp.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-[10px] font-black uppercase tracking-widest rounded-lg px-2 py-0.5", shiftColors[emp.shift])}>
                          {emp.shift}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <div className="w-32 space-y-1.5">
                            <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                               <span>KPI Score</span>
                               <span className="text-foreground">88%</span>
                            </div>
                            <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                               <div className="h-full w-[88%] bg-primary glow-green" />
                            </div>
                         </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-3">
                           <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", emp.attendance ? "text-success" : "text-muted-foreground")}>
                              {emp.attendance ? "Present" : "Absent"}
                           </span>
                           <Switch
                             checked={emp.attendance}
                             onCheckedChange={(v) => handleAttendanceToggle(emp.id, v)}
                             className="scale-75 data-[state=checked]:bg-success"
                           />
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon-xs" className="rounded-lg h-8 w-8">
                               <Mail className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon-xs" className="rounded-lg h-8 w-8 hover:bg-primary/10 hover:text-primary">
                               <ShieldCheck className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon-xs" className="rounded-lg h-8 w-8">
                               <MoreHorizontal className="h-4 w-4" />
                            </Button>
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

      <AddEmployeeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAdd={handleAdd}
      />
    </motion.div>
  );
}
