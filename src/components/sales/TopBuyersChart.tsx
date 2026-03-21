"use client";

import { GlassCard } from "@/components/ui/glass-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { BuyerData } from "@/types";
import { Users, Crown, Award } from "lucide-react";

interface TopBuyersChartProps {
  data: BuyerData[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartConfig = {
  revenue: { label: "Revenue (Rs.)", color: "var(--color-primary)" },
};

export function TopBuyersChart({ data }: TopBuyersChartProps) {
  return (
    <GlassCard className="p-6 h-[350px] flex flex-col" hoverLift={false}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center glow-yellow border border-primary/20">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight text-foreground uppercase tracking-widest">Market <span className="text-primary italic">Dominance</span></h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Top Client Revenue</p>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-muted/20 border border-border/50 flex items-center justify-center">
           <Award className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 30, bottom: 0, left: 10 }}
            barSize={24}
          >
            <defs>
               <filter id="barGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} opacity={0.1} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: "var(--color-muted-foreground)", fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 10, fill: "var(--color-foreground)", fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              width={100}
              tickFormatter={(v: string) =>
                v.length > 12 ? `${v.slice(0, 12)}…` : v
              }
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="revenue" radius={[0, 8, 8, 0]} filter="url(#barGlow)">
              {data.map((_, i) => (
                <Cell 
                  key={i} 
                  fill={COLORS[i % COLORS.length]} 
                  style={{ filter: `drop-shadow(0 0 4px ${COLORS[i % COLORS.length]})` }} 
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </GlassCard>
  );
}
