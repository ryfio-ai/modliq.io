"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TaskSelectorProps {
  columns: any[];
  taskType: string;
  onTaskTypeChange: (val: string) => void;
  targetColumn: string;
  onTargetColumnChange: (val: string) => void;
}

export function TaskSelector({
  columns,
  taskType,
  onTaskTypeChange,
  targetColumn,
  onTargetColumnChange,
}: TaskSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <Label>Task Type</Label>
        <Select value={taskType} onValueChange={onTaskTypeChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Auto-Detect Task" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto-Detect (NLP + Data Heuristics)</SelectItem>
            <SelectItem value="binary_classification">Binary Classification</SelectItem>
            <SelectItem value="multiclass_classification">Multi-Class Classification</SelectItem>
            <SelectItem value="regression">Regression</SelectItem>
            <SelectItem value="clustering">Clustering</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Target Column</Label>
        <Select value={targetColumn} onValueChange={onTargetColumnChange}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Target Column" />
          </SelectTrigger>
          <SelectContent>
            {columns && columns.length > 0 ? (
              columns.map((col: any) => (
                <SelectItem key={typeof col === 'string' ? col : col.name} value={typeof col === 'string' ? col : col.name}>
                  {typeof col === 'string' ? col : col.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="target">target</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
