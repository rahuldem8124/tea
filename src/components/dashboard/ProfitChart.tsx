"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { ChartDataPoint } from "@/types";
import { DollarSign } from "lucide-react";

interface ProfitChartProps {
  data: ChartDataPoint[];
}

const chartConfig = {
  profit: { label: "Profit (Rs. 000)", color: "var(--color-chart-1)" },
};

export function ProfitChart({ data }: ProfitChartProps) {
  return (
    <Card className="border border-border/60 shadow-none">
      <CardHeader className="pb-3 flex flex-row items-center gap-2">
        <DollarSign className="h-4 w-4 text-primary" />
        <CardTitle className="text-base font-semibold">
          Profit Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[220px]">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={
                    i === data.length - 1
                      ? "var(--color-chart-2)"
                      : "var(--color-chart-1)"
                  }
                  fillOpacity={i === data.length - 1 ? 0.7 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
