"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

export function Select({ value, onValueChange, children }: any) {
  return (
    <div className="relative w-full">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as any, { value, onValueChange })
      })}
    </div>
  )
}

export function SelectTrigger({ className, children }: any) {
  return (
    <div className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}>
      {children}
    </div>
  )
}

export function SelectValue({ placeholder, value }: any) {
  return <span>{value || placeholder || "Select option"}</span>
}

export function SelectContent({ value, onValueChange, className, children }: any) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      className={cn("w-full border rounded-md p-2 mt-1 bg-white text-sm focus:outline-none", className)}
    >
      {children}
    </select>
  )
}

export function SelectItem({ value, children }: any) {
  return <option value={value}>{children}</option>
}
