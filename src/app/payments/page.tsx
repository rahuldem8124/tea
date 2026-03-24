"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Wallet, 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Landmark,
  FileText
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const FARMER_PAYOUTS = [
  { id: "PAY-1001", date: "2026-03-24", entity: "Kumara Perera", amount: 24500, status: "Pending" },
  { id: "PAY-1002", date: "2026-03-23", entity: "Nimal Silva", amount: 18200, status: "Completed" },
  { id: "PAY-1003", date: "2026-03-23", entity: "Saman Fernando", amount: 32000, status: "Completed" },
  { id: "PAY-1004", date: "2026-03-22", entity: "Roshan Raj", amount: 15400, status: "Pending" },
];

const BUYER_INVOICES = [
  { id: "INV-5001", date: "2026-03-24", entity: "Ceylon Tea Exports", amount: 450000, status: "Completed" },
  { id: "INV-5002", date: "2026-03-24", entity: "Global Brews Ltd", amount: 285000, status: "Pending" },
  { id: "INV-5003", date: "2026-03-22", entity: "Highland Traders", amount: 120000, status: "Completed" },
];

export default function PaymentManagementPage() {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4 pt-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Landmark className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Finance & Accounts
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Payment <span className="text-primary italic">& Ledger</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isAdvanceModalOpen} onOpenChange={setIsAdvanceModalOpen}>
            <DialogTrigger render={<Button className="rounded-xl h-12 px-6 font-bold glow-green gap-2 shadow-lg shadow-primary/20" />}>
              <Plus className="h-5 w-5" />
              Record Advance Payment
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl border-border/50 bg-background/80 backdrop-blur-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight">Record Micro-Loan</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">Issue advance payment for farmer fertilizer or equipment.</p>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Farmer Name</label>
                  <Input placeholder="Search farmer..." className="h-12 bg-muted/20 border-border/50 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Amount (LKR)</label>
                    <Input type="number" placeholder="5,000" className="h-12 bg-muted/20 border-border/50 rounded-xl font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Advance Type</label>
                    <Input placeholder="e.g. Fertilizer" className="h-12 bg-muted/20 border-border/50 rounded-xl" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAdvanceModalOpen(false)} className="rounded-xl h-11 px-6 font-bold">Cancel</Button>
                <Button className="rounded-xl h-11 px-8 font-bold glow-green shadow-primary/20">Approve Advance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-border/50 gap-2">
            <FileText className="h-4 w-4" />
            Statement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-xl shadow-primary/[0.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Total Revenue</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">LKR 4.2M</div>
            <div className="flex items-center gap-1.5 mt-2 text-emerald-500 font-bold text-xs uppercase tracking-tight">
              <ArrowUpRight className="h-3 w-3" />
              12% vs last month
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-xl shadow-primary/[0.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Pending Payouts</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">LKR 125,400</div>
            <div className="mt-2 text-muted-foreground font-bold text-xs uppercase tracking-tight">
              For 14 active farmers
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-xl shadow-primary/[0.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Approved Advances</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">LKR 84,000</div>
            <div className="flex items-center gap-1.5 mt-2 text-rose-500 font-bold text-xs uppercase tracking-tight">
              <ArrowDownLeft className="h-3 w-3" />
              -5% deduction rate
            </div>
          </CardContent>
        </Card>
      </div>

      <GlassCard className="p-0 overflow-hidden" hoverLift={false}>
        <Tabs defaultValue="farmers" className="w-full">
          <div className="px-6 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-border/50 bg-muted/10">
            <TabsList className="bg-muted/30 p-1 h-12 rounded-xl">
              <TabsTrigger value="farmers" className="rounded-lg font-bold text-[11px] uppercase tracking-widest px-6 h-10 data-[state=active]:bg-background data-[state=active]:shadow-md">
                Farmer Payouts
              </TabsTrigger>
              <TabsTrigger value="buyers" className="rounded-lg font-bold text-[11px] uppercase tracking-widest px-6 h-10 data-[state=active]:bg-background data-[state=active]:shadow-md">
                Buyer Invoices
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transaction..." className="pl-9 h-11 w-64 bg-background/50 border-border/50 rounded-xl" />
              </div>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-border/50">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="farmers" className="m-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[140px] font-black text-[10px] uppercase tracking-widest py-5 pl-8 text-muted-foreground">Date</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Transaction ID</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Farmer Name</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground text-right">Amount (LKR)</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Status</TableHead>
                  <TableHead className="text-right pr-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FARMER_PAYOUTS.map((tx) => (
                  <TableRow key={tx.id} className="group border-border/40 hover:bg-primary/[0.02] transition-all">
                    <TableCell className="pl-8 font-medium text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className="font-bold text-foreground font-mono">{tx.id}</TableCell>
                    <TableCell className="font-black">{tx.entity}</TableCell>
                    <TableCell className="text-right font-black font-mono">
                      {tx.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded-lg font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 gap-1.5",
                          tx.status === "Completed" 
                            ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/10" 
                            : "border-amber-500/20 text-amber-500 bg-amber-500/10"
                        )}
                      >
                        {tx.status === "Completed" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="ghost" size="sm" className="rounded-lg font-bold text-[10px] uppercase tracking-widest h-8 px-4 hover:bg-primary/10 hover:text-primary transition-all">
                        Process
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="buyers" className="m-0">
            <Table>
              <TableHeader className="bg-muted/30 border-border/50">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[140px] font-black text-[10px] uppercase tracking-widest py-5 pl-8 text-muted-foreground">Date</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Invoice ID</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Buyer Entity</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground text-right">Amount (LKR)</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Status</TableHead>
                  <TableHead className="text-right pr-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BUYER_INVOICES.map((tx) => (
                  <TableRow key={tx.id} className="group border-border/40 hover:bg-primary/[0.02] transition-all">
                    <TableCell className="pl-8 font-medium text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className="font-bold text-foreground font-mono">{tx.id}</TableCell>
                    <TableCell className="font-black">{tx.entity}</TableCell>
                    <TableCell className="text-right font-black font-mono">
                      {tx.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded-lg font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 gap-1.5",
                          tx.status === "Completed" 
                            ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/10" 
                            : "border-amber-500/20 text-amber-500 bg-amber-500/10"
                        )}
                      >
                        {tx.status === "Completed" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                       <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </GlassCard>
    </motion.div>
  );
}
