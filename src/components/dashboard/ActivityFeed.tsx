"use client";

import { ActivityItem } from "@/types";
import { Leaf, Cog, Layers, Archive, Truck, Activity as ActivityIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

const typeConfig: Record<
  ActivityItem["type"],
  { icon: React.ElementType; color: string; glow: string }
> = {
  leaf: {
    icon: Leaf,
    color: "text-primary",
    glow: "bg-primary glow-green",
  },
  process: {
    icon: Cog,
    color: "text-blue-400",
    glow: "bg-blue-400/20",
  },
  grading: {
    icon: Layers,
    color: "text-purple-400",
    glow: "bg-purple-400/20",
  },
  packaging: {
    icon: Archive,
    color: "text-warning",
    glow: "bg-warning/20",
  },
  logistics: {
    icon: Truck,
    color: "text-success",
    glow: "bg-success/20",
  },
};

interface ActivityFeedProps {
  items: ActivityItem[];
  onItemClick?: (item: ActivityItem) => void;
}

export function ActivityFeed({ items, onItemClick }: ActivityFeedProps) {
  return (
    <GlassCard className="h-full flex flex-col p-0 overflow-hidden" hoverLift={false}>
      <div className="p-5 border-b border-border/50 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ActivityIcon className="h-4 w-4" />
        </div>
        <h3 className="font-bold tracking-tight">Recent Activity</h3>
      </div>
      
      <div className="flex-1 overflow-auto p-5 relative">
        {/* Timeline line */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />
        
        <div className="space-y-8">
          {items.map((item, i) => {
            const config = typeConfig[item.type] || typeConfig.leaf;
            const Icon = config.icon || Leaf;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "flex items-start gap-4 relative group",
                  onItemClick && "cursor-pointer"
                )}
                onClick={() => onItemClick?.(item)}
              >
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background border border-border mt-1">
                  <div className={cn("h-2 w-2 rounded-full", config.glow)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                       <Icon className={cn("h-3.5 w-3.5", config.color)} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed group-hover:text-primary transition-colors">
                    {item.message}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
