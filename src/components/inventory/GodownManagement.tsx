"use client";

import React, { useState } from "react";
import { 
  Warehouse, 
  ChevronDown, 
  ChevronUp, 
  Package, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Plus
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { godowns } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export function GodownManagement() {
  const [expandedGodown, setExpandedGodown] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedGodown(expandedGodown === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {godowns.map((godown) => {
        const isExpanded = expandedGodown === godown.id;
        const totalStock = godown.availableStockKg;
        const isLow = totalStock < 1000;

        return (
          <GlassCard 
            key={godown.id} 
            className="p-0 overflow-hidden flex flex-col border-border/50 bg-background/40 hover:bg-background/60 transition-all duration-500"
            hoverLift={!isExpanded}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center border shadow-sm transition-transform duration-500",
                    isLow ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-primary/10 border-primary/20 text-primary"
                  )}>
                    <Warehouse className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight">{godown.name}</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{godown.id}</p>
                  </div>
                </div>
                {isLow && (
                  <div className="h-2 w-2 rounded-full bg-destructive glow-red animate-pulse" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Stock</p>
                  <p className={cn("text-2xl font-black tracking-tighter", isLow ? "text-destructive" : "text-foreground")}>
                    {totalStock.toLocaleString()} <span className="text-sm font-medium">kg</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Last Updated</p>
                  <div className="flex items-center justify-end gap-1.5">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-bold">{godown.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant={isLow ? "destructive" : "success"} className="rounded-lg font-black text-[9px] uppercase tracking-widest px-2 py-0.5">
                  {isLow ? "Low Stock" : "Optimal"}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleExpand(godown.id)}
                  className="rounded-xl h-8 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all group"
                >
                  {isExpanded ? "Show Less" : "Details"}
                  {isExpanded ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1 group-hover:translate-y-0.5 transition-transform" />}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-muted/30 border-t border-border/50"
                >
                  <div className="p-5 space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        <TrendingUp className="h-3 w-3" />
                        Grade Distribution
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(godown.stockPerGrade).map(([grade, stock]) => {
                          const percentage = Math.round((stock / totalStock) * 100);
                          return (
                            <div key={grade}>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-bold">Grade {grade}</span>
                                <span className="text-xs font-black">{stock.toLocaleString()} kg</span>
                              </div>
                              <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border/30">
                                <div 
                                  className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    grade === 'A' ? "bg-primary glow-green" : grade === 'B' ? "bg-blue-400" : "bg-warning"
                                  )}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        <Package className="h-3 w-3" />
                        Recent Arrivals
                      </h4>
                      {godown.recentArrivals.length > 0 ? (
                        <div className="space-y-2">
                          {godown.recentArrivals.map((arrival, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-background border border-border/50 shadow-sm group hover:border-primary/30 transition-all">
                              <div className="flex items-center gap-3">
                                <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center">
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-[11px] font-bold text-foreground">{arrival.batchId}</p>
                                  <p className="text-[9px] font-medium text-muted-foreground">{arrival.receivedTime}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-primary">+{arrival.quantity} kg</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-muted-foreground italic pl-1">No recent arrivals</p>
                      )}
                    </div>

                    <div className="pt-2 flex gap-2">
                       <Button className="flex-1 rounded-xl h-10 text-[10px] font-bold uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90">
                          <Plus className="h-3 w-3" />
                          Stock In
                       </Button>
                       <Button variant="outline" className="flex-1 rounded-xl h-10 text-[10px] font-bold uppercase tracking-widest gap-2 border-border/50 hover:bg-muted">
                          <ArrowRight className="h-3 w-3" />
                          Transfer
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background decorative element */}
            <div className="absolute -bottom-8 -right-8 h-20 w-20 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          </GlassCard>
        );
      })}
    </div>
  );
}
