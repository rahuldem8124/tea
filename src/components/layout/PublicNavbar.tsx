"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Layers, 
  GitBranch, 
  CreditCard, 
  Mail, 
  LayoutDashboard,
  Factory
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Features", href: "/features", icon: Layers },
  { label: "Workflow", href: "/workflow", icon: GitBranch },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto flex items-center gap-1 p-1.5 rounded-full border border-white/20 backdrop-blur-2xl transition-all duration-500 shadow-2xl",
          scrolled 
            ? "bg-background/40 w-fit" 
            : "bg-background/20 w-fit px-4"
        )}
      >
        <div className="flex items-center gap-2 mr-4 ml-2 group cursor-pointer">
           <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <Factory className="h-4 w-4" />
           </div>
           {!scrolled && (
             <span className="font-black tracking-tighter text-sm uppercase hidden sm:block">Tea Tech</span>
           )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                      : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {isActive && !scrolled && (
                    <motion.span 
                      layoutId="nav-label"
                      className="absolute -bottom-8 text-[10px] font-bold uppercase tracking-widest text-primary whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="ml-4 mr-1">
           <Link href="/app">
              <Button size="sm" className="rounded-full px-5 font-bold h-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all gap-2 group">
                 <LayoutDashboard className="h-4 w-4" />
                 <span className="hidden sm:inline">Dashboard</span>
              </Button>
           </Link>
        </div>
      </motion.nav>
    </div>
  );
}
