"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Loader2 } from "lucide-react";

export function DbConnectorForm({ onConnect }: { onConnect: (res: any) => void }) {
  const [dbType, setDbType] = useState("postgresql");
  const [connUrl, setConnUrl] = useState("");
  const [query, setQuery] = useState("SELECT * FROM production_logs LIMIT 1000");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/datasets/connect-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionUrl: connUrl, query }),
      });
      const data = await res.json();
      onConnect(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
      <div>
        <Label>Database Type</Label>
        <Select value={dbType} onValueChange={setDbType}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Database" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="postgresql">PostgreSQL</SelectItem>
            <SelectItem value="mysql">MySQL</SelectItem>
            <SelectItem value="mongodb">MongoDB</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Connection Connection URL / String</Label>
        <Input
          placeholder="postgresql://user:password@localhost:5432/mydb"
          value={connUrl}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConnUrl(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>SQL Query / Query Spec</Label>
        <Input
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="mt-1"
        />
      </div>

      <Button onClick={handleConnect} disabled={loading || !connUrl} className="w-full">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
        Connect & Import Data
      </Button>
    </div>
  );
}
