"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { time: "15:00", temp: 24.5 },
  { time: "16:00", temp: 26.2 },
  { time: "17:00", temp: 28.8 },
  { time: "18:00", temp: 27.5 },
  { time: "19:00", temp: 29.1 },
];

export function FermentationMonitor({ temperature = 28.5, humidity = 92 }) {
  const getStatus = (t: number) => {
    if (t >= 25 && t <= 30) return { label: "Optimal", color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20" };
    if ((t >= 20 && t < 25) || (t > 30 && t <= 35)) return { label: "Warning", color: "bg-amber-500/15 text-amber-500 border-amber-500/20" };
    return { label: "Critical", color: "bg-rose-500/15 text-rose-500 border-rose-500/20" };
  };

  const status = getStatus(temperature);

  return (
    <Card className="overflow-hidden border-border/50 bg-background/50 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Fermentation Monitor
        </CardTitle>
        <Badge variant="outline" className={`${status.color} font-bold`}>
          {status.label}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Thermometer className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">Temperature</span>
            </div>
            <div className="text-3xl font-black tracking-tighter">
              {temperature}°C
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Droplets className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">Humidity</span>
            </div>
            <div className="text-3xl font-black tracking-tighter">
              {humidity}%
            </div>
          </div>
        </div>

        <div className="h-[120px] w-full mt-4">
          <ChartContainer config={{ temp: { label: "Temperature", color: "var(--primary)" } }}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
              <XAxis 
                dataKey="time" 
                hide 
              />
              <YAxis 
                hide 
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="var(--primary)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
        
        {status.label !== "Optimal" && (
          <div className={`mt-4 p-3 rounded-xl border flex items-center gap-3 ${status.color}`}>
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-xs font-bold leading-tight uppercase tracking-tight">
              {status.label === "Critical" ? "Immediate action required: adjust ventilation" : "Environment drifting: monitor closely"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
