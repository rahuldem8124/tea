"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Package, 
  AlertCircle, 
  ArrowRight, 
  Box, 
  Layers, 
  TrendingUp,
  Search,
  Filter,
  Download
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const GRADES = [
  { id: "BOP", price: 850 },
  { id: "BOPF", price: 920 },
  { id: "FBOP", price: 1100 },
  { id: "PEKOE", price: 1250 },
  { id: "Dust 1", price: 780 },
  { id: "OP", price: 1350 },
];

const INVENTORY = [
  { id: "GD-001", grade: "BOP", stock: 2450, reorder: 1000 },
  { id: "GD-002", grade: "FBOP", stock: 850, reorder: 1000 },
  { id: "GD-001", grade: "PEKOE", stock: 1200, reorder: 1000 },
  { id: "GD-003", grade: "Dust 1", stock: 450, reorder: 1000 },
  { id: "GD-002", grade: "BOPF", stock: 3100, reorder: 1000 },
  { id: "GD-001", grade: "OP", stock: 750, reorder: 1000 },
];

export default function GodownsPage() {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [quantity, setQuantity] = useState("");

  const totalPrice = useMemo(() => {
    const grade = GRADES.find(g => g.id === selectedGrade);
    if (!grade || !quantity) return 0;
    return grade.price * parseFloat(quantity);
  }, [selectedGrade, quantity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4 pt-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Inventory Management
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Godown <span className="text-primary italic">& Sales</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-border/50 gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="rounded-xl h-12 px-6 font-bold glow-green gap-2 shadow-lg shadow-primary/20">
            <Box className="h-5 w-5" />
            Transfer Stock
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-1 p-6 h-fit" hoverLift={false}>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Retail Point of Sale</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">
                Tea Grade
              </label>
              <Select onValueChange={(value: string | null) => setSelectedGrade(value ?? "")}>
                <SelectTrigger className="h-12 bg-muted/20 border-border/50 rounded-xl font-medium">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  {GRADES.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id} className="font-medium">
                      {grade.id} - LKR {grade.price}/kg
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">
                Quantity (KG)
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-12 bg-muted/20 border-border/50 rounded-xl font-bold text-lg"
              />
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                Estimated Total Price
              </span>
              <div className="text-3xl font-black tracking-tighter text-primary">
                LKR {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            <Button className="w-full h-14 rounded-xl font-black text-sm uppercase tracking-widest gap-2 glow-green shadow-xl shadow-primary/10">
              Process Sale
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </GlassCard>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-background/40 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Layers className="h-3 w-3" />
                  Total Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">10,700 kg</div>
              </CardContent>
            </Card>
            <Card className="bg-background/40 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="h-3 w-3 text-destructive" />
                  Low Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-destructive">3 Grades</div>
              </CardContent>
            </Card>
            <Card className="bg-background/40 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  Monthly Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">4.2 Tons</div>
              </CardContent>
            </Card>
          </div>

          <GlassCard className="p-0 overflow-hidden" hoverLift={false}>
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/10">
              <h3 className="font-bold text-lg">Inventory & Alerts</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search Grade..." className="pl-9 h-10 w-48 bg-background/50 border-border/50 rounded-xl" />
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-border/50">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[120px] font-black text-[10px] uppercase tracking-widest py-4 pl-6 text-muted-foreground">Godown ID</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Tea Grade</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground text-right">Current Stock</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground text-right">Reorder Level</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVENTORY.map((item, idx) => {
                  const isLow = item.stock < item.reorder;
                  return (
                    <TableRow 
                      key={idx} 
                      className={cn(
                        "group border-border/40 transition-all",
                        isLow ? "bg-destructive/5 hover:bg-destructive/10" : "hover:bg-primary/[0.02]"
                      )}
                    >
                      <TableCell className="font-bold pl-6 text-muted-foreground">{item.id}</TableCell>
                      <TableCell className="font-black text-foreground">{item.grade}</TableCell>
                      <TableCell className={cn("text-right font-bold font-mono", isLow && "text-destructive")}>
                        {item.stock.toLocaleString()} kg
                      </TableCell>
                      <TableCell className="text-right font-medium text-muted-foreground">{item.reorder.toLocaleString()} kg</TableCell>
                      <TableCell className="text-center">
                        {isLow ? (
                          <Badge variant="destructive" className="rounded-lg font-bold text-[10px] uppercase tracking-widest px-2 py-0.5">
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="rounded-lg font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 border-emerald-500/20 text-emerald-500 bg-emerald-500/10">
                            Adequate
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
