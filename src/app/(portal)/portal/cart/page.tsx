"use client";

import { motion } from "framer-motion";
import { portalProducts } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, CreditCard, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const [items, setItems] = useState([
    { ...portalProducts[0], quantity: 2 },
    { ...portalProducts[1], quantity: 1 }
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.pricePerKg * item.quantity, 0);
  const shipping = 250;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-12"
    >
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-4xl font-black tracking-tight">Shopping Bag</h1>
        
        <div className="space-y-4">
          {items.map((item) => (
            <GlassCard key={item.id} className="p-4 flex items-center gap-6 border-border/40" hoverLift={false}>
              <div className="relative h-24 w-24 rounded-2xl overflow-hidden shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{item.grade}</p>
                <p className="text-primary font-black">₹ {item.pricePerKg.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-3 bg-muted/30 p-1.5 rounded-xl border border-border/50">
                <Button 
                  variant="ghost" 
                  size="icon-xs" 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="h-8 w-8 rounded-lg"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon-xs" 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="h-8 w-8 rounded-lg"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeItem(item.id)}
                className="text-muted-foreground hover:text-destructive transition-colors ml-4"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </GlassCard>
          ))}
          {items.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <p className="text-muted-foreground font-medium">Your bag is empty.</p>
              <Button onClick={() => window.location.href='/portal'} variant="outline" className="rounded-xl">Go Shopping</Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <GlassCard className="p-8 space-y-6 border-primary/10 bg-primary/5" hoverLift={false}>
          <h2 className="text-2xl font-black tracking-tight">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Shipping</span>
              <span>₹ {shipping.toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t border-border/50 flex justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-black text-primary tracking-tighter">₹ {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">Shipping Address</label>
              <Input placeholder="Enter your delivery address" className="h-12 bg-background/50 border-border/50 rounded-xl" />
            </div>
            
            <Button className="w-full h-14 rounded-xl font-black text-sm uppercase tracking-widest gap-2 glow-green shadow-xl shadow-primary/20">
              <CreditCard className="h-5 w-5" />
              Secure Checkout
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-center pt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            SSL Secure Checkout
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
