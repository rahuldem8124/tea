"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const WasteTracker = () => {
  const [data, setData] = useState({
    inputWeight: 0,
    aGradeYield: 0,
    bGradeYield: 0,
    stalks: 0,
    fiberWaste: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const totalGoodYield = data.aGradeYield + data.bGradeYield;
  const outturnPercentage = data.inputWeight > 0 ? (totalGoodYield / data.inputWeight) * 100 : 0;
  const isHealthy = outturnPercentage > 22;

  return (
    <Card className="w-full bg-white/50 backdrop-blur-sm border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Waste & Refuse Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="space-y-2">
            <Label htmlFor="inputWeight" className="text-xs font-semibold text-slate-500 uppercase">Input Weight (kg)</Label>
            <Input id="inputWeight" name="inputWeight" type="number" onChange={handleChange} className="bg-white dark:bg-slate-950" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aGradeYield" className="text-xs font-semibold text-slate-500 uppercase">A-Grade Yield</Label>
            <Input id="aGradeYield" name="aGradeYield" type="number" onChange={handleChange} className="bg-white dark:bg-slate-950" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bGradeYield" className="text-xs font-semibold text-slate-500 uppercase">B-Grade Yield</Label>
            <Input id="bGradeYield" name="bGradeYield" type="number" onChange={handleChange} className="bg-white dark:bg-slate-950" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stalks" className="text-xs font-semibold text-slate-500 uppercase">Stalks</Label>
            <Input id="stalks" name="stalks" type="number" onChange={handleChange} className="bg-white dark:bg-slate-950" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fiberWaste" className="text-xs font-semibold text-slate-500 uppercase">Fiber Waste</Label>
            <Input id="fiberWaste" name="fiberWaste" type="number" onChange={handleChange} className="bg-white dark:bg-slate-950" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead className="font-bold">Metric</TableHead>
                <TableHead className="text-right font-bold">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total Good Yield</TableCell>
                <TableCell className="text-right font-semibold">{totalGoodYield.toFixed(2)} kg</TableCell>
              </TableRow>
              <TableRow className={isHealthy ? "bg-emerald-50/50 dark:bg-emerald-500/5" : "bg-orange-50/50 dark:bg-orange-500/5"}>
                <TableCell className="font-bold">Outturn Percentage</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${isHealthy ? "bg-emerald-500 hover:bg-emerald-600" : "bg-orange-500 hover:bg-orange-600"} text-white border-none px-4 py-1 text-sm`}>
                    {outturnPercentage.toFixed(2)}%
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteTracker;
