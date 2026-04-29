"use client";

import * as React from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CollectionSalesChart } from "@/components/dashboard/CollectionSalesChart";
import { ProfitChart } from "@/components/dashboard/ProfitChart";
import { kpiData, recentActivity, dailyChartData, revenueChartData, alerts } from "@/lib/data";
import {
  TrendingUp,
  Leaf,
  Package,
  Zap,
  LayoutDashboard,
  Calendar,
  X,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { AlertBadge } from "@/components/ui/alert-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


import { ProcessPipeline } from "@/components/dashboard/ProcessPipeline";
import { BatchTraceabilityPanel } from "@/components/dashboard/BatchTraceabilityPanel";



export default function DashboardPage() {
  const [isAlertsOpen, setIsAlertsOpen] = React.useState(true);
  const [selectedBatchId, setSelectedBatchId] = React.useState<string | null>(null);
  const [isBatchPanelOpen, setIsBatchPanelOpen] = React.useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);

  const handleOpenBatch = (batchId: string) => {
    setSelectedBatchId(batchId);
    setIsBatchPanelOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4 pt-4"
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
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Button>
          <Button variant="default" size="sm" className="rounded-xl h-9 px-4 font-bold text-xs glow-green" onClick={() => setIsReportModalOpen(true)}>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
              title="Trucks in Transit"
              value={String(kpiData.trucksInTransit)}
              subtitle="Currently on route"
              icon={TrendingUp}
              trend="up"
              trendValue="2 New"
            />
            <KPICard
              title="Delayed Trucks"
              value={String(kpiData.delayedTrucks)}
              subtitle="Requires attention"
              icon={Clock}
              trend="down"
              trendValue="3 Delayed"
              iconClassName="bg-destructive/10 text-destructive border-destructive/20"
              className="border-destructive/20"
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
                <ProfitChart data={revenueChartData} />
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ActivityFeed 
                items={recentActivity} 
                onItemClick={(item) => {
                  if (item.type === 'process' || item.type === 'leaf' || item.message.includes('Batch')) {
                    const match = item.message.match(/BT-\d+/);
                    if (match) handleOpenBatch(match[0]);
                  }
                }}
              />
            </div>
            <div className="xl:col-span-1">
               <GlassCard className="h-full flex flex-col p-6 space-y-6 border-l-4 border-l-success bg-success/5 shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12 transition-transform duration-500 group-hover:scale-110">
                    <Zap className="h-32 w-32 text-success" />
                 </div>
                 <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-success/80 mb-1">AI Insight</p>
                    <h4 className="font-bold mb-3 tracking-tight flex items-center gap-2 text-foreground">
                       <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center text-success border border-success/30">
                          <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
                       </div>
                       Quick Insight
                    </h4>
                    <p className="text-sm text-foreground/90 font-medium leading-relaxed bg-background/40 p-4 rounded-xl border border-success/10">
                      Production is <span className="text-success font-black">12% higher</span> than last Tuesday. Recommended to increase sorting staff for the evening shift.
                    </p>
                 </div>
                 <div className="pt-4 border-t border-success/20 relative z-10 mt-auto">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Energy Efficiency</span>
                       <span className="text-xs font-bold text-success">94%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/30">
                       <div className="h-full w-[94%] bg-success shadow-[0_0_10px_rgba(var(--success),0.5)] glow-green" />
                    </div>
                 </div>
                 <Button className="w-full rounded-xl py-6 font-bold tracking-tight group overflow-hidden relative" onClick={() => handleOpenBatch("BT-1001")}>
                    <span className="relative z-10 flex items-center gap-2">
                      View Active Batch <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                 </Button>
               </GlassCard>
            </div>
          </div>
        </div>

        {/* Right Floating Alerts Panel */}
        <AnimatePresence>
        {isAlertsOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="lg:col-span-3"
          >
             <div className="sticky top-24 space-y-6">
                <GlassCard className="border-primary/20 p-5 relative overflow-hidden bg-background/40" hoverLift={false}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                       <div className="h-2 w-2 rounded-full bg-primary glow-green" />
                       <h4 className="font-bold text-sm tracking-tight text-foreground">Operational Alerts</h4>
                    </div>
                    <Button variant="ghost" size="icon-xs" onClick={() => setIsAlertsOpen(false)} className="hover:bg-primary/10 hover:text-primary">
                       <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={cn(
                        "p-3 rounded-xl relative overflow-hidden border transition-all duration-300 hover:shadow-lg group",
                        alert.severity === 'high' ? "bg-destructive/10 border-destructive/20 hover:bg-destructive/15" : 
                        alert.severity === 'medium' ? "bg-warning/10 border-warning/20 hover:bg-warning/15" : "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15"
                      )}>
                         <div className="flex items-center justify-between mb-2">
                            <AlertBadge type={alert.severity === 'high' ? 'critical' : alert.severity === 'medium' ? 'warning' : 'info'}>
                               {alert.type.toUpperCase()}
                            </AlertBadge>
                            <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{alert.time}</span>
                         </div>
                         <p className="text-xs font-bold text-foreground mb-3 leading-snug">{alert.message}</p>
                         
                         <div className="flex gap-2">
                            <Button size="xs" variant="outline" className="h-7 text-[9px] font-black uppercase tracking-tighter px-2 rounded-md border-border/50 bg-background/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                               {alert.type === 'delay' ? 'View Truck' : alert.type === 'stock' ? 'Inspect Godown' : 'Start Processing'}
                            </Button>
                            <Button size="xs" variant="ghost" className="h-7 text-[9px] font-bold uppercase tracking-tighter px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                               Dismiss
                            </Button>
                         </div>

                         <div className={cn(
                           "absolute inset-y-0 left-0 w-1",
                           alert.severity === 'high' ? "bg-destructive glow-red" : 
                           alert.severity === 'medium' ? "bg-warning glow-yellow" : "bg-blue-500"
                         )} />
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border/50 hover:bg-primary/5 hover:text-primary transition-all py-6">
                    Resolve All Alerts <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                  
                  <div className="absolute -top-10 -right-10 h-24 w-24 bg-primary/10 blur-3xl rounded-full" />
                </GlassCard>

                <GlassCard className="p-5" hoverLift={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-sm tracking-tight">Storage Capacity</h4>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Green Leaf Bin</span>
                        <span className="text-xs font-black">78%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden border border-border/50">
                        <div className="h-full w-[78%] bg-primary glow-green" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Processed Tea</span>
                        <span className="text-xs font-black">42%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden border border-border/50">
                        <div className="h-full w-[42%] bg-blue-500" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
             </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <BatchTraceabilityPanel 
        batchId={selectedBatchId} 
        isOpen={isBatchPanelOpen} 
        onClose={() => setIsBatchPanelOpen(false)} 
      />

      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsReportModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg z-10 p-6"
            >
              <GlassCard className="p-8 border-primary/30 shadow-2xl space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black">Batch Summary Report</h3>
                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsReportModalOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4 bg-muted/20 rounded-xl p-4 border border-border/50">
                   <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Leaf Collected:</span> <span className="font-bold">1,245 kg</span></div>
                   <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Processed:</span> <span className="font-bold">840 kg</span></div>
                   <div className="flex justify-between text-sm"><span className="text-muted-foreground">Outturn:</span> <span className="font-bold text-primary">22.4%</span></div>
                   <div className="flex justify-between text-sm"><span className="text-muted-foreground">Grade A Output:</span> <span className="font-bold text-success">45%</span></div>
                   <div className="flex justify-between text-sm"><span className="text-muted-foreground">Trucks Dispatched:</span> <span className="font-bold">8</span></div>
                   <div className="flex justify-between text-sm"><span className="text-muted-foreground">Alerts Raised:</span> <span className="font-bold text-destructive">4</span></div>
                </div>
                <Button className="w-full h-12 text-base font-bold rounded-xl glow-green" onClick={() => window.print()}>
                  Download PDF
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
