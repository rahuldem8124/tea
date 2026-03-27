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
  { name: "Leaf Collection", icon: Leaf, active: true },
  { name: "Processing", icon: Zap, active: true },
  { name: "Grading", icon: Layers, active: true },
  { name: "Packaging", icon: Archive, active: false },
  { name: "Transport", icon: Truck, active: false },
  { name: "Godown", icon: Warehouse, active: false },
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
            Next Gen Factory intelligence
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[1.1]">
            Smart Tea Factory <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 italic">Operations, Simplified.</span>
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
            <Button variant="ghost" size="lg" className="h-14 px-8 rounded-2xl text-base font-bold border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all transition-all hover:scale-105 active:scale-95">
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* Floating Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full">
           {[
             { label: "Daily Processing", value: "45k+ kg" },
             { label: "Active Factories", value: "128+" },
             { label: "Logistics Fleet", value: "320+" },
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

      {/* Workflow Section */}
      <section id="workflow" className="px-6 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
           <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight italic">The Visual Pipeline</h2>
             <p className="text-muted-foreground font-medium max-w-xl mx-auto">Seamless flow from field to warehouse with real-time state monitoring at every node.</p>
          </div>

          <div className="relative pt-20">
             {/* Connection Line */}
             <div className="absolute top-[calc(5rem+2.5rem)] left-10 right-10 h-1 bg-muted/30 -z-10 hidden md:block">
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "45%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-primary to-blue-500 shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                />
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
                      "h-20 w-20 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                      step.active 
                        ? "bg-background border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-110 ring-4 ring-primary/10" 
                        : "bg-muted/50 border-muted/50 text-muted-foreground grayscale opacity-50"
                    )}>
                       <step.icon className={cn("h-8 w-8", step.active ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div className="space-y-1">
                       <h4 className={cn("text-sm font-black uppercase tracking-widest", step.active ? "text-foreground" : "text-muted-foreground")}>{step.name}</h4>
                       <p className="text-[10px] font-bold text-muted-foreground px-2">{step.active ? "Active Stage" : "Pending"}</p>
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
