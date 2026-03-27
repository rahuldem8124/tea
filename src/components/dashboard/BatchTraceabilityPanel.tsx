"use client";

import React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { 
  Leaf, 
  Cog, 
  Layers, 
  Archive, 
  Truck, 
  Warehouse,
  Clock,
  User,
  Package as PackageIcon,
  Download,
  FileText,
  CheckCircle2,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { processingBatches, leafEntries, truckDispatches, godowns } from "@/lib/data";

interface BatchTraceabilityPanelProps {
  batchId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BatchTraceabilityPanel({ batchId, isOpen, onClose }: BatchTraceabilityPanelProps) {
  const batch = processingBatches.find(b => b.id === batchId);
  const leaf = leafEntries.find(l => l.batchId === batchId);
  const dispatch = truckDispatches.find(d => d.loadDetails.some(l => l.batchId === batchId));
  const godown = godowns.find(g => g.name === dispatch?.destinationGodown);

  if (!batchId) return null;

  const steps = [
    {
      id: "collection",
      title: "Collection",
      icon: Leaf,
      status: leaf ? "completed" : "pending",
      details: leaf ? [
        { label: "Supplier", value: leaf.farmerName, icon: User },
        { label: "Quantity", value: `${leaf.quantityKg} kg`, icon: PackageIcon },
        { label: "Collected At", value: leaf.collectionTime, icon: Clock },
      ] : []
    },
    {
      id: "processing",
      title: "Processing",
      icon: Cog,
      status: batch?.status === "completed" ? "completed" : batch?.status === "processing" ? "active" : "pending",
      details: batch ? [
        { label: "Machine", value: batch.machineId, icon: Cog },
        { label: "Start Time", value: batch.startTime, icon: Clock },
        { label: "Duration", value: batch.duration || "N/A", icon: Clock },
      ] : []
    },
    {
      id: "grading",
      title: "Grading",
      icon: Layers,
      status: batch?.gradingDistribution ? "completed" : "pending",
      details: batch?.gradingDistribution ? [
        { label: "Grade A / B / C", value: `${batch.gradingDistribution.A} / ${batch.gradingDistribution.B} / ${batch.gradingDistribution.C} kg`, icon: Layers },
      ] : []
    },
    {
      id: "packaging",
      title: "Packaging",
      icon: Archive,
      status: batch?.packagingInfo ? "completed" : "pending",
      details: batch?.packagingInfo ? [
        { label: "Packages", value: `${batch.packagingInfo.count} ${batch.packagingInfo.packageType}`, icon: Archive },
      ] : []
    },
    {
      id: "transport",
      title: "Transport",
      icon: Truck,
      status: dispatch?.status === "delivered" ? "completed" : dispatch?.status === "in_transit" || dispatch?.status === "dispatched" ? "active" : "pending",
      details: dispatch ? [
        { label: "Truck ID", value: dispatch.truckId, icon: Truck },
        { label: "Departure", value: dispatch.departureTime, icon: Clock },
        { label: "Status", value: dispatch.status, icon: Circle },
      ] : []
    },
    {
      id: "godown",
      title: "Godown",
      icon: Warehouse,
      status: dispatch?.status === "delivered" ? "completed" : "pending",
      details: godown ? [
        { label: "Destination", value: godown.name, icon: Warehouse },
        { label: "Last Updated", value: godown.lastUpdated, icon: Clock },
      ] : []
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-hidden border-l border-primary/20 bg-background/80 backdrop-blur-xl">
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 border-b border-border/50 bg-primary/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <PackageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-2xl font-black tracking-tight">Batch <span className="text-primary">{batchId}</span></SheetTitle>
                <SheetDescription className="font-medium">Complete lifecycle traceability</SheetDescription>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="flex-1 rounded-xl h-9 text-[10px] font-bold uppercase tracking-widest border-primary/20 hover:bg-primary/5">
                <FileText className="h-3 w-3 mr-2" />
                Generate Doc
              </Button>
              <Button size="sm" variant="outline" className="flex-1 rounded-xl h-9 text-[10px] font-bold uppercase tracking-widest border-primary/20 hover:bg-primary/5">
                <Download className="h-3 w-3 mr-2" />
                Download PDF
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
            <div className="relative space-y-8 pl-4">
              {/* Vertical line connector */}
              <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />

              {steps.map((step) => {
                const isCompleted = step.status === "completed";
                const isActive = step.status === "active";
                
                return (
                  <div key={step.id} className="relative group">
                    <div className={cn(
                      "absolute -left-[14px] top-1.5 h-6 w-6 rounded-full border-4 border-background flex items-center justify-center z-10 transition-all duration-500",
                      isCompleted ? "bg-success glow-green" : 
                      isActive ? "bg-primary pulse-glow" : "bg-muted border-muted"
                    )}>
                      {isCompleted && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>

                    <div className={cn(
                      "p-4 rounded-2xl border transition-all duration-300",
                      isActive ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/5" : 
                      isCompleted ? "bg-muted/30 border-border/50" : "bg-muted/10 border-transparent opacity-50"
                    )}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center border",
                          isActive ? "bg-primary/20 border-primary/30 text-primary" : 
                          isCompleted ? "bg-success/20 border-success/30 text-success" : "bg-muted/50 border-border text-muted-foreground"
                        )}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm tracking-tight">{step.title}</h4>
                          <Badge variant={step.status === 'completed' ? 'success' : step.status === 'active' ? 'default' : 'secondary'} className="h-4 px-1.5 text-[8px] font-black uppercase tracking-widest rounded-md mt-0.5">
                            {step.status}
                          </Badge>
                        </div>
                      </div>

                      {step.details.length > 0 && (
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {step.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-center justify-between text-[11px] py-1.5 border-b border-border/30 last:border-0">
                              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                <detail.icon className="h-3 w-3" />
                                {detail.label}
                              </div>
                              <div className="font-bold text-foreground">{detail.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-t border-border/50 bg-muted/5">
             <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border/50 shadow-sm relative overflow-hidden group">
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Blockchain Hash</p>
                   <p className="text-[10px] font-mono font-medium truncate w-[180px]">tea_0x4f2a9b8c7d1e6f5g4h3i2j1...</p>
                </div>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 glow-green animate-pulse" />
                </div>
                {/* Decorative glow */}
                <div className="absolute -right-4 -bottom-4 h-12 w-12 bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-colors" />
             </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
