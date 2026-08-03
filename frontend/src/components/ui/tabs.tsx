"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  onValueChange: (val: string) => void
}

const TabsContext = React.createContext<TabsContextValue>({
  value: "",
  onValueChange: () => {},
})

export function Tabs({ defaultValue, value, onValueChange, className, children }: any) {
  const [selected, setSelected] = React.useState(value || defaultValue || "")

  const handleChange = (v: string) => {
    setSelected(v)
    if (onValueChange) onValueChange(v)
  }

  return (
    <TabsContext.Provider value={{ value: value !== undefined ? value : selected, onValueChange: handleChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: any) {
  return (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className, children }: any) {
  const ctx = React.useContext(TabsContext)
  const active = ctx.value === value
  return (
    <button
      type="button"
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        active ? "bg-background text-foreground shadow-sm font-semibold" : "hover:bg-background/50",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }: any) {
  const ctx = React.useContext(TabsContext)
  if (ctx.value !== value) return null
  return <div className={cn("mt-2", className)}>{children}</div>
}
