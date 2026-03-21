"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Leaf,
  Cog,
  Users,
  BarChart3,
  Factory,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Leaf Collection", href: "/leaf-collection", icon: Leaf },
  { label: "Machines", href: "/machines", icon: Cog },
  { label: "Employees", href: "/employees", icon: Users },
  { label: "Sales & Export", href: "/sales", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/50 backdrop-blur-xl">
      <SidebarHeader className="px-6 py-8">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] glow-green transition-transform hover:scale-105 duration-300">
            <Factory className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-lg font-black tracking-tighter text-foreground leading-none">
              TEA TECH
            </p>
            <p className="truncate text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
              Factory Intelligence
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "h-12 px-4 rounded-xl transition-all duration-300 relative group overflow-hidden",
                        isActive 
                          ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent"
                      )}
                      onClick={() => router.push(item.href)}
                    >
                      <div className={cn(
                        "transition-transform duration-300 group-hover:scale-110",
                        isActive && "text-primary"
                      )}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-bold tracking-tight ml-2">{item.label}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="absolute right-2 h-1.5 w-1.5 rounded-full bg-primary glow-green"
                        />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 px-6">
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="Settings" 
              className="h-11 rounded-xl hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
            >
              <Settings className="h-5 w-5" />
              <span className="font-bold text-sm tracking-tight text-label">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="h-11 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/5 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-bold text-sm tracking-tight">Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10 group-data-[collapsible=icon]:hidden">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success pulse-glow" />
            <p className="text-xs font-medium text-foreground">Operational</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
