"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  hoverLift?: boolean
  className?: string
}

export function GlassCard({ children, hoverLift = true, className, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverLift ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "glass-card p-6 relative overflow-hidden",
        hoverLift && "hover:shadow-2xl hover:bg-card/90 cursor-default",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}
