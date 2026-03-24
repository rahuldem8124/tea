"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FermentationMonitor = () => {
  const [temp, setTemp] = useState(27.5);
  const [humidity, setHumidity] = useState(96.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((prev) => +(prev + (Math.random() - 0.5) * 0.5).toFixed(1));
      setHumidity((prev) => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isTempSafe = temp >= 25 && temp <= 30;
  const isHumiditySafe = humidity >= 95 && humidity <= 98;

  return (
    <Card className="w-full max-w-md bg-white/50 backdrop-blur-sm border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">IoT Fermentation Monitor</CardTitle>
        <div className="flex space-x-2">
          {!isTempSafe || !isHumiditySafe ? (
            <Badge variant="destructive" className="animate-pulse">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Check Range
            </Badge>
          ) : (
            <Badge variant="outline" className="text-emerald-500 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Optimal
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl transition-all duration-500 ${isTempSafe ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20'} border`}>
            <div className="flex items-center space-x-2 mb-2">
              <Thermometer className={`w-4 h-4 ${isTempSafe ? 'text-emerald-500' : 'text-rose-500'}`} />
              <span className="text-xs font-semibold text-slate-500 uppercase">Temperature</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl font-bold ${isTempSafe ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                {temp}°C
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${isTempSafe ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                style={{ width: `${Math.min(Math.max((temp - 20) * 10, 0), 100)}%` }}
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl transition-all duration-500 ${isHumiditySafe ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-100 dark:border-sky-500/20' : 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20'} border`}>
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className={`w-4 h-4 ${isHumiditySafe ? 'text-sky-500' : 'text-rose-500'}`} />
              <span className="text-xs font-semibold text-slate-500 uppercase">Humidity</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl font-bold ${isHumiditySafe ? 'text-sky-700 dark:text-sky-400' : 'text-rose-700 dark:text-rose-400'}`}>
                {humidity}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${isHumiditySafe ? 'bg-sky-500' : 'bg-rose-500'}`} 
                style={{ width: `${Math.min(Math.max((humidity - 90) * 10, 0), 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FermentationMonitor;
