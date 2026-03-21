"use client";

import { GlassCard } from "@/components/ui/glass-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Activity } from "lucide-react";

interface RevenueDataPoint {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

const chartConfig = {
  revenue: { label: "Revenue (Rs. 000)", color: "var(--color-primary)" },
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <GlassCard className="p-6 h-[350px] flex flex-col" hoverLift={false}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center glow-green border border-primary/20">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight text-foreground uppercase tracking-widest">Revenue <span className="text-primary italic">Stream</span></h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">30-Day Performance</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-xs font-black">+14.2%</span>
           </div>
           <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">vs prev period</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 mt-4">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} opacity={0.1} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "var(--color-muted-foreground)", fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              tickMargin={12}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--color-muted-foreground)", fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              filter="url(#glow)"
              animationDuration={1500}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </GlassCard>
  );
}
