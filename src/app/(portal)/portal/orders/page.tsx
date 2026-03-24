"use client";

import { motion } from "framer-motion";
import { portalOrders } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle2, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const statusConfig = {
  processing: { label: "Processing", icon: Package, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  cancelled: { label: "Cancelled", icon: Search, color: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function OrdersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">My Orders</h1>
          <p className="text-muted-foreground font-medium mt-1">Track and manage your recent purchases</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9 h-11 w-64 bg-background/50 border-border/50 rounded-xl" />
          </div>
          <Button variant="outline" className="rounded-xl h-11 px-4 gap-2 border-border/50">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden border-border/40" hoverLift={false}>
        <Table>
          <TableHeader className="bg-muted/10">
            <TableRow className="hover:bg-transparent border-border/40 px-6">
              <TableHead className="font-black text-[10px] uppercase tracking-widest pl-8 py-5">Order ID</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Date</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Items</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Total Amount</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portalOrders.map((order) => {
              const status = statusConfig[order.status];
              const Icon = status.icon;
              return (
                <TableRow key={order.id} className="hover:bg-primary/[0.02] border-border/40">
                  <TableCell className="font-black pl-8 py-5 tracking-tight font-mono text-primary">{order.id}</TableCell>
                  <TableCell className="font-medium text-muted-foreground">{order.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold">{order.items[0].productName}</span>
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">+{order.items.length - 1} more items</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-black">LKR {order.total.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`${status.color} rounded-lg font-bold text-[10px] uppercase tracking-widest gap-2 py-1 px-3`}>
                      <Icon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" className="rounded-lg h-9 px-4 font-bold text-[11px] uppercase tracking-widest">
                      Track Order
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </GlassCard>
    </motion.div>
  );
}
