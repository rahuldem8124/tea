"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingPanelProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  className?: string
}

export function FloatingPanel({ isOpen, onClose, children, title, className }: FloatingPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={cn(
            "fixed top-0 right-0 h-screen w-full max-w-md z-50 glass-panel shadow-2xl p-6",
            className
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="overflow-auto h-[calc(100vh-100px)] custom-scrollbar">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
