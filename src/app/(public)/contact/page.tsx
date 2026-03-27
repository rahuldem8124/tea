"use client";

import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/ui/glass-card";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Get in <span className="text-primary italic">Touch</span></h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">Have questions about deploying Tea Tech at your facility? We&apos;re here to help.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="space-y-6">
              {[
                { icon: Mail, label: "Email Us", value: "ops@teatech.io" },
                { icon: Phone, label: "Call Us", value: "+94 11 234 5678" },
                { icon: MapPin, label: "Visit Us", value: "Tea Terrace, Colombo 07, Sri Lanka" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                   <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <item.icon className="h-5 w-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p>
                      <p className="text-lg font-bold text-foreground">{item.value}</p>
                   </div>
                </div>
              ))}
           </div>
           
           <GlassCard className="p-8 bg-primary/5 border-primary/20">
              <h4 className="font-bold mb-2">Technical Support</h4>
              <p className="text-sm text-muted-foreground">Existing customers can access 24/7 technical support through the dashboard help center.</p>
           </GlassCard>
        </div>

        <GlassCard className="p-10 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">First Name</label>
                 <Input className="h-12 rounded-xl bg-background/50 border-border/50" placeholder="John" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Last Name</label>
                 <Input className="h-12 rounded-xl bg-background/50 border-border/50" placeholder="Doe" />
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
              <Input className="h-12 rounded-xl bg-background/50 border-border/50" placeholder="john@factory.com" />
           </div>
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
              <Textarea className="min-h-[150px] rounded-xl bg-background/50 border-border/50 resize-none" placeholder="How can we help you?" />
           </div>
           <Button className="w-full h-14 rounded-2xl font-bold bg-primary text-primary-foreground glow-green gap-2">
              Send Message <Send className="h-4 w-4" />
           </Button>
        </GlassCard>
      </div>
    </div>
  );
}
