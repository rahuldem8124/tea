"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AlertBadgeProps {
  type: "critical" | "warning" | "success" | "info"
  children: React.ReactNode
  className?: string
}

export function AlertBadge({ type, children, className }: AlertBadgeProps) {
  const styles = {
    critical: "bg-destructive/20 text-destructive border-destructive/50 glow-red",
    warning: "bg-warning/20 text-warning border-warning/50 glow-yellow",
    success: "bg-success/20 text-success border-success/50 glow-green",
    info: "bg-primary/20 text-primary border-primary/50",
  }

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-widest",
        styles[type],
        className
      )}
    >
      {children}
    </span>
  )
}
