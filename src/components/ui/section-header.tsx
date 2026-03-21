"use client"

import * as React from "react"

interface SectionHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function SectionHeader({ title, description, actions }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{title}</h2>
        {description && <p className="text-muted-foreground mt-1 text-sm font-medium">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}
