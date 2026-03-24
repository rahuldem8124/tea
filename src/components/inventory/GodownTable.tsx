"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowDownCircle, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const inventoryData = [
  { id: "GDN-001", location: "North Wing", grade: "BOP", stock: 1250, status: "In Stock" },
  { id: "GDN-002", location: "West Annex", grade: "BOPF", stock: 850, status: "Low Stock" },
  { id: "GDN-003", location: "Main Storage", grade: "Dust", stock: 4500, status: "In Stock" },
  { id: "GDN-004", location: "East Wing", grade: "PF1", stock: 520, status: "Low Stock" },
  { id: "GDN-005", location: "South Block", grade: "PD", stock: 2100, status: "In Stock" },
];

const GodownTable = () => {
  return (
    <Card className="w-full bg-white/50 backdrop-blur-sm border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center space-x-2">
          <Package className="w-5 h-5 text-slate-500" />
          <span>Smart Inventory Godown</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead className="font-bold">Godown ID</TableHead>
                <TableHead className="font-bold">Location</TableHead>
                <TableHead className="font-bold">Tea Grade</TableHead>
                <TableHead className="text-right font-bold">Current Stock</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Reorder Point</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => {
                const isLow = item.stock < 1000;
                return (
                  <TableRow 
                    key={item.id} 
                    className={`transition-colors duration-200 ${isLow ? 'bg-rose-50/50 dark:bg-rose-500/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/20'}`}
                  >
                    <TableCell className="font-medium text-slate-700 dark:text-slate-300">{item.id}</TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">{item.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold text-[10px] tracking-wider bg-white dark:bg-slate-950">
                        {item.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${isLow ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'}`}>
                      {item.stock.toLocaleString()} kg
                    </TableCell>
                    <TableCell>
                      {isLow ? (
                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-800 flex items-center w-fit space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Restock Required</span>
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 flex items-center w-fit space-x-1">
                          <span>Optimal Stock</span>
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-slate-400 dark:text-slate-500">
                        <ArrowDownCircle className="w-4 h-4" />
                        <span className="text-xs">1000 kg</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default GodownTable;
