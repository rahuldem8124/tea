"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { Box } from "lucide-react";

interface ProfitChartProps {
  data: any[];
}

const chartConfig = {
  revenue: { label: "Revenue (Lakhs)", color: "var(--success)" },
};

export function ProfitChart({ data }: ProfitChartProps) {
  return (
    <Card className="border border-border/60 shadow-none h-full bg-transparent">
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="w-full h-[320px]">
          <BarChart data={data} margin={{ top: 20, right: 10, bottom: 20, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v}L`}
            />
            <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${value}L`} />} />
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill="var(--success)"
                  fillOpacity={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
