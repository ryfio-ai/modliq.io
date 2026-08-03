"use client";

import React, { useState } from "react";
import {
  Radio,
  Wifi,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  Zap,
  Sliders,
  Server,
} from "lucide-react";

interface IotConnector {
  id: string;
  name: string;
  protocol: "OPC-UA" | "MQTT" | "Modbus TCP";
  endpoint: string;
  status: "CONNECTED" | "SYNCING" | "DISCONNECTED";
  pulseHz: number;
  mappedTagsCount: number;
  lastPingMs: number;
}

const INITIAL_CONNECTORS: IotConnector[] = [
  {
    id: "conn-001",
    name: "Munich Plant Siemens S7-1500 PLC",
    protocol: "OPC-UA",
    endpoint: "opc.tcp://192.168.1.104:4840",
    status: "CONNECTED",
    pulseHz: 10,
    mappedTagsCount: 24,
    lastPingMs: 4.2,
  },
  {
    id: "conn-002",
    name: "Stuttgart Telemetry MQTT Broker",
    protocol: "MQTT",
    endpoint: "mqtts://broker.stuttgart.plant:8883",
    status: "CONNECTED",
    pulseHz: 5,
    mappedTagsCount: 18,
    lastPingMs: 8.5,
  },
  {
    id: "conn-003",
    name: "Detroit Extrusion Modbus Bridge",
    protocol: "Modbus TCP",
    endpoint: "10.0.12.50:502",
    status: "SYNCING",
    pulseHz: 2,
    mappedTagsCount: 8,
    lastPingMs: 12.1,
  },
];

export default function IotConnectorsPage() {
  const [connectors] = useState<IotConnector[]>(INITIAL_CONNECTORS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Radio className="text-cyan-400" size={24} />
            Industrial OPC-UA & MQTT IoT Connectors
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Bi-directional telemetry streaming and closed-loop setpoint writeback to PLC / SCADA systems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-950/50 transition-all">
            <Plus size={15} />
            Add IoT Server Connector
          </button>
        </div>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {connectors.map((conn) => (
          <div key={conn.id} className="p-5 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Server size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight leading-tight">{conn.name}</h3>
                  <span className="text-[10px] font-mono text-cyan-400">{conn.protocol}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {conn.status}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 truncate">
              {conn.endpoint}
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs font-mono border-t border-slate-800 pt-3">
              <div>
                <span className="text-[10px] text-slate-400 block">Frequency</span>
                <span className="font-bold text-slate-200">{conn.pulseHz} Hz</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Mapped Tags</span>
                <span className="font-bold text-slate-200">{conn.mappedTagsCount} Tags</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Ping Latency</span>
                <span className="font-bold text-emerald-400">{conn.lastPingMs} ms</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
