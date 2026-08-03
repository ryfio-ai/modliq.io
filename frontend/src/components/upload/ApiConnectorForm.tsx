"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Loader2 } from "lucide-react";

export function ApiConnectorForm({ onConnect }: { onConnect: (res: any) => void }) {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
      });
      const data = await res.json();
      onConnect({
        datasetId: `ds_api_${Date.now()}`,
        profile: { row_count: Array.isArray(data) ? data.length : 1, col_count: 5, quality_score: 96.0, columns: [] },
        preview: Array.isArray(data) ? data.slice(0, 5) : [data]
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
      <div>
        <Label>REST API Endpoint URL</Label>
        <Input
          placeholder="https://api.example.com/v1/data"
          value={apiUrl}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setApiUrl(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>API Key / Bearer Token (Optional)</Label>
        <Input
          type="password"
          placeholder="eyJhbGciOi..."
          value={apiKey}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
          className="mt-1"
        />
      </div>

      <Button onClick={handleFetch} disabled={loading || !apiUrl} className="w-full">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Globe className="w-4 h-4 mr-2" />}
        Fetch API Endpoint
      </Button>
    </div>
  );
}
