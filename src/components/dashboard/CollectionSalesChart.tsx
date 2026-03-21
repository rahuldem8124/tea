"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartDataPoint } from "@/types";
import { TrendingUp } from "lucide-react";

interface CollectionSalesChartProps {
  data: ChartDataPoint[];
}

const chartConfig = {
  collection: { label: "Collection (kg)", color: "var(--color-chart-1)" },
  sales: { label: "Sales (kg)", color: "var(--color-chart-2)" },
};

export function CollectionSalesChart({ data }: CollectionSalesChartProps) {
  return (
    <Card className="border border-border/60 shadow-none">
      <CardHeader className="pb-3 flex flex-row items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <CardTitle className="text-base font-semibold">
          Daily Collection vs Sales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[220px]">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="collectionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.18} />
                <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.18} />
                <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="collection"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              fill="url(#collectionGrad)"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              fill="url(#salesGrad)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
