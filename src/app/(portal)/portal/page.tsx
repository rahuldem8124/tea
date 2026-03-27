"use client";

import { motion } from "framer-motion";
import { portalProducts } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Info, ChevronRight } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function PortalPage() {
  const addToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <section className="relative rounded-[2rem] overflow-hidden bg-slate-900 aspect-[21/9] flex items-center px-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=1600" 
            alt="Tea Plantation" 
            fill 
            className="object-cover opacity-80"
          />
        </div>
        
        <div className="relative z-20 max-w-2xl space-y-6">
          <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-4 py-1 text-xs font-black uppercase tracking-[0.2em]">
            Direct from Origin
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.9]">
            Exquisite <span className="text-primary italic">Ceylon</span> Tea
          </h1>
          <p className="text-lg text-slate-300 font-medium leading-relaxed">
            Experience the purest flavors of the central highlands, processed with century-old traditions and modern precision.
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg" className="rounded-2xl h-14 px-8 font-bold text-lg glow-green shadow-xl shadow-primary/20">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl h-14 px-8 font-bold text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Our Collection</h2>
            <p className="text-muted-foreground font-medium">Finest hand-picked tea grades for connoisseurs</p>
          </div>
          <Button variant="ghost" className="font-bold gap-2 text-primary hover:bg-primary/5">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalProducts.map((product) => (
            <GlassCard key={product.id} className="p-0 overflow-hidden group border-border/40" hoverLift={true}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-foreground border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 scale-90 origin-left">
                    {product.grade}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price per kg</span>
                    <span className="text-2xl font-black text-primary tracking-tighter">₹ {product.pricePerKg.toLocaleString()}</span>
                  </div>
                  <Button 
                    onClick={() => addToCart(product.name)}
                    className="rounded-xl h-12 w-12 p-0 glow-green shadow-primary/10"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </div>
                
                <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5">
                  <Info className="h-4 w-4" />
                  Product Details
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-black tracking-tight">Wholesale Inquiries?</h2>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            Looking to stock our premium tea in your establishment? We offer special pricing for bulk orders and business partnerships.
          </p>
          <Button className="rounded-2xl h-14 px-8 font-bold text-lg glow-green">
            Contact Wholesale Team
          </Button>
        </div>
        <div className="flex-1 relative aspect-square w-full max-w-sm rounded-[2rem] overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl rotate-3">
          <Image 
            src="https://images.unsplash.com/photo-1594631252845-59fc59739e83?w=800" 
            alt="Wholesale" 
            fill 
            className="object-cover"
          />
        </div>
      </section>
    </motion.div>
  );
}
