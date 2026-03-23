"use client";

import * as React from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CollectionSalesChart } from "@/components/dashboard/CollectionSalesChart";
import { ProfitChart } from "@/components/dashboard/ProfitChart";
import { kpiData, recentActivity, dailyChartData, alerts } from "@/lib/data";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Leaf,
  Package,
  AlertCircle,
  Zap,
  LayoutDashboard,
  Calendar,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { AlertBadge } from "@/components/ui/alert-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


import { ProcessPipeline } from "@/components/dashboard/ProcessPipeline";


function formatCurrency(v: number) {
  return `Rs. ${(v / 1000).toFixed(0)}K`;
}

export default function DashboardPage() {
  const [isAlertsOpen, setIsAlertsOpen] = React.useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-20"
      suppressHydrationWarning
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              Operations Control
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Factory <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Welcome back, Roshan. System status is <span className="text-success font-bold">Optimal</span>.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/30 p-1.5 rounded-2xl border border-border/50 backdrop-blur-sm shadow-sm self-start">
          <Button variant="ghost" size="sm" className="rounded-xl h-9 px-4 font-bold text-xs gap-2">
            <Calendar className="h-4 w-4" />
            March 21, 2026
          </Button>
          <Button variant="default" size="sm" className="rounded-xl h-9 px-4 font-bold text-xs glow-green">
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className={isAlertsOpen ? "lg:col-span-9 space-y-8" : "lg:col-span-12 space-y-8 transition-all duration-500"}>
          
          <SectionHeader 
            title="Live Process Pipeline" 
            description="Real-time status of tea batches across the production line"
          />

          <ProcessPipeline />


          {/* KPI Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KPICard
              title="Total Leaf Collected"
              value={`${kpiData.totalLeafCollected.toLocaleString()} kg`}
              subtitle="Overall intake to date"
              icon={Leaf}
              trend="up"
              trendValue="8.2%"
            />
            <KPICard
              title="Total Processed"
              value={`${kpiData.totalProcessed.toLocaleString()} kg`}
              subtitle="Finished tea production"
              icon={Zap}
              trend="up"
              trendValue="5.4%"
            />
            <KPICard
              title="Grade Distribution"
              value={`A:${kpiData.gradeDistribution.A}%`}
              subtitle={`B:${kpiData.gradeDistribution.B}% | C:${kpiData.gradeDistribution.C}%`}
              icon={Package}
              trend="neutral"
              trendValue="Stable"
            />
            <KPICard
              title="Logistics Flow"
              value={String(kpiData.trucksInTransit)}
              subtitle="Trucks currently on route"
              icon={TrendingUp}
              trend="up"
              trendValue="2 New"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <GlassCard className="p-0 overflow-hidden h-[400px]" hoverLift={false}>
              <div className="p-5 border-b border-border/50 flex items-center justify-between">
                <h4 className="font-bold tracking-tight">Production Trends</h4>
                <div className="flex gap-1">
                   <Button variant="ghost" size="xs" className="h-7 text-[10px] uppercase font-bold px-2 rounded-lg bg-primary/10 text-primary">Daily</Button>
                   <Button variant="ghost" size="xs" className="h-7 text-[10px] uppercase font-bold px-2 rounded-lg">Weekly</Button>
                </div>
              </div>
              <div className="p-2 h-[340px]">
                <CollectionSalesChart data={dailyChartData} />
              </div>
            </GlassCard>
            
            <GlassCard className="p-0 overflow-hidden h-[400px]" hoverLift={false}>
              <div className="p-5 border-b border-border/50 flex items-center justify-between">
                <h4 className="font-bold tracking-tight">Revenue Analysis</h4>
                <div className="flex gap-1">
                   <Button variant="ghost" size="xs" className="h-7 text-[10px] uppercase font-bold px-2 rounded-lg bg-primary/10 text-primary">Live</Button>
                </div>
              </div>
              <div className="p-2 h-[340px]">
                <ProfitChart data={dailyChartData} />
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ActivityFeed items={recentActivity} />
            </div>
            <div className="xl:col-span-1">
               <GlassCard className="h-full flex flex-col p-6 space-y-6">
                 <div>
                    <h4 className="font-bold mb-1 tracking-tight">Quick Insight</h4>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                      Production is 12% higher than last Tuesday. Recommended to increase sorting staff for the evening shift.
                    </p>
                 </div>
                 <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Energy Efficiency</span>
                       <span className="text-xs font-bold text-success">94%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/30">
                       <div className="h-full w-[94%] bg-success shadow-[0_0_10px_rgba(var(--success),0.5)] glow-green" />
                    </div>
                 </div>
                 <Button className="w-full rounded-xl py-6 font-bold tracking-tight group overflow-hidden relative">
                    <span className="relative z-10 flex items-center gap-2">
                      Optimise Workflow <TrendingUp className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                 </Button>
               </GlassCard>
            </div>
          </div>
        </div>

        {/* Right Floating Alerts Panel */}
        {isAlertsOpen && (
          <div className="lg:col-span-3">
             <div className="sticky top-24 space-y-6">
                <GlassCard className="border-primary/20 bg-primary/5 p-5 relative overflow-hidden" hoverLift={false}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      <h4 className="font-bold text-sm tracking-tight text-foreground">Active Alerts</h4>
                    </div>
                    <Button variant="ghost" size="icon-xs" onClick={() => setIsAlertsOpen(false)}>
                       <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={cn(
                        "p-3 rounded-xl relative overflow-hidden border",
                        alert.severity === 'high' ? "bg-destructive/10 border-destructive/20" : 
                        alert.severity === 'medium' ? "bg-warning/10 border-warning/20" : "bg-blue-500/10 border-blue-500/20"
                      )}>
                         <div className="flex items-center justify-between mb-1">
                            <AlertBadge type={alert.severity === 'high' ? 'critical' : alert.severity === 'medium' ? 'warning' : 'info'}>
                              {alert.type.toUpperCase()}
                            </AlertBadge>
                            <span className="text-[9px] font-medium text-muted-foreground">{alert.time}</span>
                         </div>
                         <p className="text-xs font-bold text-foreground mb-1 leading-snug">{alert.message}</p>
                         <div className={cn(
                           "absolute inset-y-0 left-0 w-1",
                           alert.severity === 'high' ? "bg-destructive glow-red" : 
                           alert.severity === 'medium' ? "bg-warning glow-yellow" : "bg-blue-500"
                         )} />
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border/50 hover:bg-primary/5 hover:text-primary transition-all">
                    Resolve All Alerts
                  </Button>
                  
                  <div className="absolute -top-10 -right-10 h-20 w-20 bg-primary/10 blur-3xl rounded-full" />
                </GlassCard>

                <GlassCard className="p-5" hoverLift={false}>
                  <h4 className="font-bold text-sm tracking-tight mb-4">Storage Capacity</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Green Leaf Bin</span>
                        <span className="text-xs font-bold">78%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-primary glow-green" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Processed Tea</span>
                        <span className="text-xs font-bold">42%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[42%] bg-blue-500" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
