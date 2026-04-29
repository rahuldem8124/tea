"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Leaf, 
  Zap, 
  Truck, 
  Warehouse, 
  Bell,
  CheckCircle2,
  Search,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const features = [
  {
    title: "Batch Traceability",
    description: "Track every leaf from collection to final packaging with full digital provenance.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Processing & Grading",
    description: "Monitor real-time machine performance and quality distribution across grades A, B, and C.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Truck Dispatch Monitoring",
    description: "Live tracking of transit times, expected arrivals, and automated delay alerts.",
    icon: Truck,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Godown Stock Management",
    description: "Efficient inventory control with real-time stock levels per grade and location.",
    icon: Warehouse,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Smart Alerts",
    description: "Instant notifications for machine downtime, delayed shipments, or low stock levels.",
    icon: Bell,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Quality Assurance",
    description: "Maintain high standards with integrated grading records and outturn percentage tracking.",
    icon: ShieldCheck,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

const workflowSteps = [
  { name: "Leaf Collection", icon: Leaf, active: true, data: "1,245 kg today" },
  { name: "Processing", icon: Zap, active: true, data: "840 kg/hr" },
  { name: "Grading", icon: Layers, active: true, data: "A:45% B:35% C:20%" },
  { name: "Packaging", icon: Archive, active: true, data: "125 units ready" },
  { name: "Transport", icon: Truck, active: true, data: "8 trucks active" },
  { name: "Godown", icon: Warehouse, active: true, data: "GD-01: 78% capacity" },
];

import { Layers, Archive } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 flex flex-col items-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-40 -right-20 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <CheckCircle2 className="h-4 w-4" />
            🌿 Built for Indian & Sri Lankan Tea Operations
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[1.1]">
            From Leaf to Godown — <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 italic">Full Visibility in One Dashboard.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Manage collection, processing, grading, and transport in one unified platform. 
            Automate your workflow and gain real-time visibility into every batch.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/app">
               <Button size="lg" className="h-14 px-8 rounded-2xl text-base font-bold glow-green shadow-xl transition-all hover:scale-105 active:scale-95 gap-2">
                 Get Started <ArrowRight className="h-5 w-5" />
               </Button>
            </Link>
            <Button variant="ghost" size="lg" asChild className="h-14 px-8 rounded-2xl text-base font-bold border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
              <a href="#workflow">View Demo</a>
            </Button>
          </div>

          <div className="mt-16 w-full max-w-5xl mx-auto rounded-xl border border-white/10 bg-background/50 backdrop-blur-md shadow-2xl overflow-hidden aspect-[16/9] flex flex-col relative hidden sm:flex">
             <div className="h-8 bg-muted/50 border-b border-border/50 flex items-center px-4 gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
             </div>
             <div className="flex flex-1 overflow-hidden">
                <div className="w-48 border-r border-border/50 bg-muted/20 p-4 space-y-4 hidden md:block">
                   <div className="h-6 bg-primary/20 rounded w-full mb-8" />
                   {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 bg-white/5 rounded w-3/4" />
                   ))}
                </div>
                <div className="flex-1 p-6 space-y-6">
                   <div className="flex justify-between items-center">
                      <div className="h-8 bg-white/10 rounded w-1/3" />
                      <div className="h-8 bg-primary/20 rounded w-24" />
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      {[...Array(3)].map((_, i) => (
                         <div key={i} className="h-24 bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                            <div className="h-3 bg-primary/40 rounded w-1/2" />
                            <div className="h-6 bg-white/40 rounded w-3/4" />
                         </div>
                      ))}
                   </div>
                   <div className="h-48 bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="h-full w-full bg-gradient-to-t from-primary/20 to-transparent rounded" />
                   </div>
                </div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Floating Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full">
           {[
             { label: "Tracked Simultaneously", value: "50+ Batches" },
             { label: "Alert Response Time", value: "< 2s" },
             { label: "Full Pipeline Coverage", value: "6 Stages" },
             { label: "Uptime", value: "99.9%" },
           ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + i * 0.1 }}
               className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
             >
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-32 bg-muted/5 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight">Powerful Features for <br /> <span className="text-primary italic">Modern Logistics</span></h2>
             <p className="text-muted-foreground font-medium max-w-xl mx-auto">Everything you need to run a high-efficiency tea production facility with precision and control.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-8 h-full space-y-4 hover:border-primary/50 transition-all group" hoverLift={true}>
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3", feature.bg, "border-white/10")}>
                    <feature.icon className={cn("h-7 w-7", feature.color)} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Digitise Section */}
      <section className="px-6 py-32 bg-background relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight">Why Tea Factories Are <br /> <span className="text-primary italic">Going Digital</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <GlassCard className="p-8 space-y-6 flex flex-col relative overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-destructive to-primary" />
                <div className="space-y-2">
                   <p className="text-sm font-black uppercase text-destructive/80">Before</p>
                   <p className="text-xl font-bold text-muted-foreground line-through">Manual batch registers</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0 self-center md:self-start opacity-50 group-hover:scale-110 group-hover:text-primary transition-all" />
                <div className="space-y-2">
                   <p className="text-sm font-black uppercase text-success">After</p>
                   <p className="text-xl font-bold text-foreground glow-green-text">Real-time batch tracking</p>
                </div>
             </GlassCard>

             <GlassCard className="p-8 space-y-6 flex flex-col relative overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-destructive to-primary" />
                <div className="space-y-2">
                   <p className="text-sm font-black uppercase text-destructive/80">Before</p>
                   <p className="text-xl font-bold text-muted-foreground line-through">Phone calls to drivers</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0 self-center md:self-start opacity-50 group-hover:scale-110 group-hover:text-primary transition-all" />
                <div className="space-y-2">
                   <p className="text-sm font-black uppercase text-success">After</p>
                   <p className="text-xl font-bold text-foreground glow-green-text">Live truck GPS monitoring</p>
                </div>
             </GlassCard>

             <GlassCard className="p-8 space-y-6 flex flex-col relative overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-destructive to-primary" />
                <div className="space-y-2">
                   <p className="text-sm font-black uppercase text-destructive/80">Before</p>
                   <p className="text-xl font-bold text-muted-foreground line-through">End-of-day stock count</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0 self-center md:self-start opacity-50 group-hover:scale-110 group-hover:text-primary transition-all" />
                <div className="space-y-2">
                   <p className="text-sm font-black uppercase text-success">After</p>
                   <p className="text-xl font-bold text-foreground glow-green-text">Instant godown alerts</p>
                </div>
             </GlassCard>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-6 pb-32 bg-background relative">
        <div className="max-w-4xl mx-auto">
           <GlassCard className="p-12 md:p-16 relative overflow-hidden border-primary/20">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Leaf className="h-48 w-48 text-primary" />
              </div>
              <div className="relative z-10 space-y-8">
                 <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                       <svg key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                    ))}
                 </div>
                 <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-white/90">
                    "We reduced dispatch delays by 40% in the first month. The alert system alone saved us from two major losses."
                 </p>
                 <div className="pt-6 border-t border-white/10">
                    <p className="font-bold text-lg text-primary">Rajan Pillai</p>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Operations Manager — Green Valley Tea Estates, Munnar</p>
                 </div>
              </div>
           </GlassCard>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="px-6 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
           <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight italic">The Visual Pipeline</h2>
             <p className="text-muted-foreground font-medium max-w-xl mx-auto">Seamless flow from field to warehouse with real-time state monitoring at every node.</p>
          </div>

          <div className="relative pt-20">
             {/* Connection Line */}
             <div className="absolute top-[calc(5rem+2.5rem)] left-10 right-10 h-1 bg-muted/30 -z-10 hidden md:block overflow-hidden rounded-full">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                  className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(var(--primary),0.5)] relative"
                >
                   <div className="absolute top-1/2 right-0 w-2 h-2 bg-white rounded-full -translate-y-1/2 shadow-[0_0_10px_#fff]" />
                </motion.div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-6 gap-8 relative items-start">
               {workflowSteps.map((step, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.15 }}
                   className="flex flex-col items-center text-center gap-6"
                 >
                     <div className={cn(
                       "h-20 w-20 rounded-full flex items-center justify-center border-4 transition-all duration-500 relative",
                       step.active 
                         ? "bg-background border-primary shadow-[0_0_30px_rgba(var(--primary),0.6)] scale-110 ring-4 ring-primary/20" 
                         : "bg-muted/50 border-muted/50 text-muted-foreground grayscale opacity-50"
                     )}>
                        {step.active && (
                           <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-50" />
                        )}
                        <step.icon className={cn("h-8 w-8 relative z-10", step.active ? "text-primary" : "text-muted-foreground")} />
                     </div>
                     <div className="space-y-1">
                        <h4 className={cn("text-sm font-black uppercase tracking-widest", step.active ? "text-foreground" : "text-muted-foreground")}>{step.name}</h4>
                        <p className="text-[10px] font-bold text-muted-foreground px-2 text-primary glow-green-text">{step.data || (step.active ? "Active Stage" : "Pending")}</p>
                     </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
         <div className="max-w-5xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative rounded-[3rem] bg-gradient-to-br from-primary to-blue-700 p-12 md:p-20 overflow-hidden text-center text-white"
            >
               <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 to-black/30" />
               
               <div className="relative z-10 space-y-8">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">Ready to Digitise your <br /> Tea Supply Chain?</h2>
                  <p className="text-xl text-white/80 font-medium max-w-xl mx-auto">Join the 100+ factories moving tea production into the future with Tea Tech Intelligence.</p>
                  <Link href="/app">
                    <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-2xl hover:scale-105 active:scale-95 transition-all mt-4">
                      Deploy Your Factory <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
}
