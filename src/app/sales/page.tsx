"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sales as initialSales, buyerChartData } from "@/lib/data";
import { Sale } from "@/types";
import { KPICard } from "@/components/dashboard/KPICard";
import { AddSaleModal } from "@/components/sales/AddSaleModal";
import { RevenueChart } from "@/components/sales/RevenueChart";
import { TopBuyersChart } from "@/components/sales/TopBuyersChart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Package, Plus, TrendingUp, Receipt, Download, Filter, Search, MoreHorizontal, Tag, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Build revenue-over-time from sales data
function buildRevenueTimeline(sales: Sale[]) {
  const grouped: Record<string, number> = {};
  sales.forEach((s) => {
    grouped[s.date] = (grouped[s.date] ?? 0) + s.totalRevenue;
  });
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({ date: date.slice(5), revenue }));
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const totalRevenue = useMemo(
    () => sales.reduce((s, e) => s + e.totalRevenue, 0),
    [sales]
  );
  const totalQty = useMemo(
    () => sales.reduce((s, e) => s + e.quantityKg, 0),
    [sales]
  );
  const avgPrice = useMemo(
    () => (totalQty > 0 ? totalRevenue / totalQty : 0),
    [totalRevenue, totalQty]
  );

  const revenueTimeline = useMemo(() => buildRevenueTimeline(sales), [sales]);

  const handleAdd = (sale: Sale) => {
    setSales((prev) => [sale, ...prev]);
  };

  const filteredSales = sales.filter(s => 
    s.buyerName.toLowerCase().includes(search.toLowerCase())
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
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Financial Ecosystem
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Revenue <span className="text-primary italic">Architecture</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Projected annual yield: <span className="text-foreground font-black">Rs. 4.2M</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-sm border-border/60 hover:bg-muted/30 transition-all gap-2">
              <Download className="h-4 w-4" />
              Annual Report
           </Button>
           <Button onClick={() => setModalOpen(true)} className="rounded-xl h-12 px-6 font-bold text-sm glow-green gap-2 shadow-lg">
              <Plus className="h-5 w-5" />
              Log New Transaction
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <KPICard
          title="Gross Revenue"
          value={`Rs. ${(totalRevenue / 1000).toFixed(0)}K`}
          subtitle={`${sales.length} transactions valid`}
          icon={DollarSign}
          trend="up"
          trendValue="12.4%"
        />
        <KPICard
          title="Volume Sold"
          value={`${totalQty.toLocaleString()} kg`}
          subtitle="Processed & Shipped"
          icon={Package}
          iconClassName="bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-none"
        />
        <KPICard
          title="Market Average"
          value={`Rs. ${avgPrice.toFixed(0)}`}
          subtitle="Price per KG yield"
          icon={TrendingUp}
          iconClassName="bg-warning/10 text-warning border-warning/20 shadow-none"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="xl:col-span-8">
           <RevenueChart data={revenueTimeline} />
        </div>
        <div className="xl:col-span-4">
           <TopBuyersChart data={buyerChartData} />
        </div>
      </div>

      {/* Sales List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 py-2">
           <SectionHeader title="Transaction Ledger" description="Authenticated export and retail records" />
           <div className="flex items-center gap-3 bg-muted/20 p-1 rounded-2xl border border-border/50 backdrop-blur-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Filter by buyer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 w-64 bg-transparent border-0 focus-visible:ring-0 text-sm font-bold"
                />
              </div>
              <Separator orientation="vertical" className="h-6 bg-border/50" />
              <Button variant="ghost" size="sm" className="h-9 rounded-xl px-3 text-xs font-bold gap-2">
                 <Filter className="h-3.5 w-3.5" />
                 Last 30 Days
              </Button>
           </div>
        </div>

        <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/50 hover:bg-transparent bg-muted/10">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6 h-14">Source / Buyer</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Batch ID</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-14">Log Date</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right h-14">Quantity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right h-14 text-primary">Yield (Rs)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6 h-14">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredSales.map((sale, idx) => (
                    <motion.tr
                      key={sale.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group border-b border-border/40 hover:bg-primary/5 transition-all"
                    >
                      <TableCell className="pl-6 py-5">
                        <div className="flex items-center gap-3">
                           <div className="h-9 w-9 rounded-full bg-muted/30 flex items-center justify-center border border-border/50">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                           </div>
                           <div>
                              <p className="font-black text-sm text-foreground tracking-tight">{sale.buyerName}</p>
                              <Badge variant="outline" className="text-[9px] font-medium h-4 px-1.5 opacity-60">Verified Buyer</Badge>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                            <Tag className="h-3.5 w-3.5 text-primary opacity-50" />
                            <span className="text-xs font-black tracking-tighter text-foreground">BTCH-24-{(100+idx)}</span>
                         </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-muted-foreground">
                        {sale.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex flex-col items-end">
                           <span className="text-sm font-black text-foreground">{sale.quantityKg.toLocaleString()} <span className="text-[10px] text-muted-foreground font-medium">kg</span></span>
                           <span className="text-[10px] font-bold text-muted-foreground/60">@ Rs. {sale.pricePerKg}/kg</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                         <div className="inline-flex flex-col items-end">
                            <span className="text-sm font-black text-primary glow-green">Rs. {sale.totalRevenue.toLocaleString()}</span>
                            <div className="flex items-center gap-1 text-[9px] font-bold text-success">
                               <Zap className="h-2.5 w-2.5" />
                               <span>PROFIT: 18%</span>
                            </div>
                         </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                           <Button variant="ghost" size="icon-xs" className="rounded-xl h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all group-hover:glow-orange" title="Generate Invoice">
                              <Receipt className="h-4 w-4" />
                           </Button>
                           <Button variant="ghost" size="icon-xs" className="rounded-xl h-9 w-9 hover:bg-muted/40 transition-all">
                              <Download className="h-4 w-4" />
                           </Button>
                           <Button variant="ghost" size="icon-xs" className="rounded-xl h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity">
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

      <AddSaleModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAdd={handleAdd}
      />
    </motion.div>
  );
}
