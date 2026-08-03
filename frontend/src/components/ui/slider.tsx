import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps {
  value: number[]
  onValueChange?: (val: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0] ?? min}
      onChange={(e) => onValueChange && onValueChange([parseFloat(e.target.value)])}
      className={cn("w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer", className)}
    />
  )
}
