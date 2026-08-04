"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  FileText,
  Shield,
  Server,
  Cpu,
  Database,
  Brain,
  Cloud,
  CheckSquare,
  Rocket,
  Terminal,
  Archive,
  Layers,
  Layout,
  Menu,
  X,
  ExternalLink,
  ArrowLeft,
  Factory,
} from "lucide-react";
import { DOCS_DATA, DOC_CATEGORIES, DocItem } from "@/lib/docsData";

interface DocPortalProps {
  initialSlug?: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  index: <BookOpen size={16} />,
  "00-overview": <FileText size={16} />,
  "01-architecture": <Layers size={16} />,
  "02-frontend": <Layout size={16} />,
  "03-backend": <Server size={16} />,
  "04-ml-engine": <Cpu size={16} />,
  "05-database": <Database size={16} />,
  "06-ai": <Brain size={16} />,
  "07-security": <Shield size={16} />,
  "08-deployment": <Cloud size={16} />,
  "09-testing": <CheckSquare size={16} />,
  "10-launch": <Rocket size={16} />,
  "11-developer-onboarding": <Terminal size={16} />,
  archive: <Archive size={16} />,
};

export default function DocPortal({ initialSlug }: DocPortalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    if (initialSlug && DOCS_DATA[initialSlug.toLowerCase()]) {
      return initialSlug.toLowerCase();
    }
    return "readme";
  });
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    index: true,
    "00-overview": true,
    "01-architecture": true,
    "02-frontend": true,
    "03-backend": true,
    "04-ml-engine": true,
    "05-database": true,
    "06-ai": true,
    "07-security": true,
    "08-deployment": true,
    "09-testing": true,
    "10-launch": true,
    "11-developer-onboarding": true,
    archive: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const currentDoc: DocItem = DOCS_DATA[selectedSlug] || DOCS_DATA["readme"] || {
    relPath: "README.md",
    title: "Modliq Documentation Portal",
    category: "index",
    filename: "README.md",
    content: "# Modliq Documentation\nDocument not found.",
  };

  const handleSelectDoc = (slug: string) => {
    setSelectedSlug(slug);
    setMobileMenuOpen(false);
    router.push(`/doc/${slug}`, { scroll: false });
  };

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Group docs by category
  const groupedDocs = useMemo(() => {
    const map: Record<string, { slug: string; doc: DocItem }[]> = {};
    DOC_CATEGORIES.forEach((cat) => {
      map[cat.id] = [];
    });

    Object.entries(DOCS_DATA).forEach(([slug, doc]) => {
      const cat = map[doc.category] ? doc.category : "index";
      if (!map[cat]) map[cat] = [];
      map[cat].push({ slug, doc });
    });

    // Sort files within categories
    Object.keys(map).forEach((cat) => {
      map[cat].sort((a, b) => a.doc.filename.localeCompare(b.doc.filename));
    });

    return map;
  }, []);

  // Filtered docs based on search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return Object.entries(DOCS_DATA)
      .filter(([slug, doc]) =>
        doc.title.toLowerCase().includes(q) ||
        doc.filename.toLowerCase().includes(q) ||
        doc.content.toLowerCase().includes(q) ||
        slug.includes(q)
      )
      .map(([slug, doc]) => ({ slug, doc }));
  }, [searchQuery]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Render markdown content safely
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = "";
    let codeBuffer: string[] = [];
    let inTable = false;
    let tableHeader: string[] = [];
    let tableRows: string[][] = [];

    const flushCodeBlock = (key: string) => {
      const codeText = codeBuffer.join("\n");
      elements.push(
        <div key={key} className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-[#0F172A] text-slate-100 font-mono text-xs shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-slate-400">
            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">{codeLanguage || "text"}</span>
            <button
              onClick={() => copyToClipboard(codeText, key)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
            >
              {copiedCode === key ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedCode === key ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-4 overflow-x-auto leading-relaxed whitespace-pre font-mono text-slate-200">
            {codeText}
          </pre>
        </div>
      );
      codeBuffer = [];
    };

    const flushTable = (key: string) => {
      elements.push(
        <div key={key} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-xs text-left text-slate-700 border-collapse">
            <thead className="bg-[#F0F6FA] border-b border-slate-200 text-[#1B2A4A] font-bold">
              <tr>
                {tableHeader.map((th, i) => (
                  <th key={i} className="px-4 py-3 border-r border-slate-200 last:border-r-0">
                    {th.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/80 transition">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 border-r border-slate-100 last:border-r-0 font-mono text-slate-800">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableHeader = [];
      tableRows = [];
    };

    lines.forEach((line, idx) => {
      const key = `line-${idx}`;

      // Handle Code Blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          inCodeBlock = false;
          flushCodeBlock(key);
        } else {
          inCodeBlock = true;
          codeLanguage = line.trim().replace("```", "").trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Handle Tables
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const cells = line.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1);
        if (!inTable) {
          inTable = true;
          tableHeader = cells;
        } else if (line.includes("---")) {
          // Separator line, ignore
        } else {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        inTable = false;
        flushTable(key);
      }

      // Handle GitHub Alert Banners (> [!IMPORTANT], etc.)
      if (line.trim().startsWith("> [!")) {
        const alertType = line.match(/\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]/)?.[1] || "NOTE";
        const alertColors: Record<string, string> = {
          NOTE: "bg-blue-50 border-blue-400 text-blue-900",
          IMPORTANT: "bg-amber-50 border-amber-400 text-amber-900",
          WARNING: "bg-red-50 border-red-400 text-red-900",
          TIP: "bg-emerald-50 border-emerald-400 text-emerald-900",
          CAUTION: "bg-rose-50 border-rose-400 text-rose-900",
        };

        elements.push(
          <div key={key} className={`my-4 p-4 rounded-xl border-l-4 ${alertColors[alertType] || alertColors.NOTE} shadow-sm`}>
            <span className="font-bold text-xs uppercase tracking-wider block mb-1">{alertType}</span>
            <span className="text-sm font-sans">{line.replace(/^>\s*\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]\s*/, "")}</span>
          </div>
        );
        return;
      }

      // Standard Blockquote
      if (line.trim().startsWith(">")) {
        elements.push(
          <blockquote key={key} className="my-4 pl-4 border-l-4 border-[#2B70AB] text-slate-700 italic bg-blue-50/50 py-2 rounded-r-lg text-sm">
            {line.replace(/^>\s*/, "")}
          </blockquote>
        );
        return;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={key} className="text-2xl sm:text-3xl font-extrabold text-[#1B2A4A] mt-6 mb-4 pb-2 border-b border-slate-200">
            {line.replace("# ", "")}
          </h1>
        );
        return;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key} className="text-xl sm:text-2xl font-bold text-[#1B2A4A] mt-8 mb-3 pt-2">
            {line.replace("## ", "")}
          </h2>
        );
        return;
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={key} className="text-lg font-bold text-[#2B70AB] mt-6 mb-2">
            {line.replace("### ", "")}
          </h3>
        );
        return;
      }

      // Lists
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().replace(/^[-*]\s+/, "");
        elements.push(
          <li key={key} className="ml-6 list-disc text-sm text-slate-700 my-1 leading-relaxed">
            {parseInlineMarkdown(itemText)}
          </li>
        );
        return;
      }

      // Horizontal Rule
      if (line.trim() === "---" || line.trim() === "***") {
        elements.push(<hr key={key} className="my-8 border-slate-200" />);
        return;
      }

      // Empty Lines
      if (!line.trim()) {
        elements.push(<div key={key} className="h-2" />);
        return;
      }

      // Regular Paragraphs
      elements.push(
        <p key={key} className="text-sm text-slate-700 leading-relaxed my-2">
          {parseInlineMarkdown(line)}
        </p>
      );
    });

    if (inCodeBlock) flushCodeBlock("end-code");
    if (inTable) flushTable("end-table");

    return elements;
  };

  // Helper to parse inline markdown (bold, code, links)
  const parseInlineMarkdown = (text: string) => {
    // Convert status tags to badges
    if (text.includes("Status: Implemented") || text.includes("Status: Launch-Ready") || text.includes("Status: GO")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {text}
        </span>
      );
    }
    if (text.includes("Status: Partial")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
          {text}
        </span>
      );
    }

    // Bold text `**text**`
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={i} className="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200">{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("[") && part.includes("](")) {
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const label = linkMatch[1];
          const rawUrl = linkMatch[2];
          
          // Map file:/// or docs/ relative links to internal doc routes
          let targetSlug = "";
          if (rawUrl.includes("docs/")) {
            const cleanPath = rawUrl.split("docs/")[1].replace(".md", "").toLowerCase();
            if (DOCS_DATA[cleanPath]) targetSlug = cleanPath;
          }

          if (targetSlug) {
            return (
              <button
                key={i}
                onClick={() => handleSelectDoc(targetSlug)}
                className="text-[#2B70AB] hover:underline font-medium font-mono text-xs inline-flex items-center gap-1"
              >
                {label} <ChevronRight size={12} />
              </button>
            );
          }

          return (
            <a key={i} href={rawUrl} target="_blank" rel="noreferrer" className="text-[#2B70AB] hover:underline font-medium">
              {label}
            </a>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Header Bar for Documentation Portal */}
      <header className="bg-[#1B2A4A] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#2B70AB] flex items-center justify-center text-white">
                <Factory size={16} />
              </div>
              <span className="font-bold text-base tracking-tight text-white">Modliq</span>
            </Link>
            <span className="text-slate-400 text-sm hidden sm:inline">/</span>
            <span className="text-blue-300 text-sm font-semibold tracking-wide flex items-center gap-1.5">
              <BookOpen size={15} /> Launch Documentation Pack
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative w-48 sm:w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search 77 documentation files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Documentation Portal Layout */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky top-16 z-40 w-80 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-200 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              <span>Documentation Modules</span>
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">77 Files</span>
            </div>

            {/* If Search Active */}
            {searchResults ? (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-500 px-2 mb-2">
                  Found {searchResults.length} results
                </div>
                {searchResults.map(({ slug, doc }) => (
                  <button
                    key={slug}
                    onClick={() => handleSelectDoc(slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                      selectedSlug === slug
                        ? "bg-[#2B70AB] text-white shadow-sm font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="truncate">{doc.title}</span>
                    <span className="text-[10px] font-mono opacity-70 ml-2">{doc.category}</span>
                  </button>
                ))}
              </div>
            ) : (
              /* Category Tree */
              <div className="space-y-1">
                {DOC_CATEGORIES.map((cat) => {
                  const docsInCat = groupedDocs[cat.id] || [];
                  if (docsInCat.length === 0) return null;
                  const isOpen = openCategories[cat.id];

                  return (
                    <div key={cat.id} className="rounded-lg overflow-hidden border border-slate-100">
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition text-left"
                      >
                        <div className="flex items-center gap-2 text-[#1B2A4A]">
                          {CATEGORY_ICONS[cat.id] || <BookOpen size={16} />}
                          <span>{cat.title}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <span className="text-[10px] font-mono">{docsInCat.length}</span>
                          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="bg-white py-1 px-1 space-y-0.5">
                          {docsInCat.map(({ slug, doc }) => (
                            <button
                              key={slug}
                              onClick={() => handleSelectDoc(slug)}
                              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-2 ${
                                selectedSlug === slug
                                  ? "bg-[#2B70AB] text-white shadow-sm font-semibold"
                                  : "text-slate-600 hover:bg-blue-50 hover:text-[#2B70AB]"
                              }`}
                            >
                              <FileText size={13} className={selectedSlug === slug ? "text-white" : "text-slate-400"} />
                              <span className="truncate">{doc.filename}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right Main Content Viewer */}
        <main className="flex-1 min-w-0 bg-white p-6 sm:p-10 lg:p-12 overflow-y-auto min-h-[calc(100vh-4rem)]">
          {/* Header Metadata Ribbon */}
          <div className="mb-6 pb-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#2B70AB] font-semibold border border-blue-100 uppercase tracking-wider font-mono">
                {currentDoc.category}
              </span>
              <span className="font-mono text-slate-400">{currentDoc.filename}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500">Last verified: <strong>2026-08-04</strong></span>
              <button
                onClick={() => copyToClipboard(window.location.href, "doc-url")}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1.5 transition"
              >
                {copiedCode === "doc-url" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedCode === "doc-url" ? "URL Copied" : "Copy Page Link"}</span>
              </button>
            </div>
          </div>

          {/* Rendered Markdown Body */}
          <article className="prose prose-slate max-w-4xl">
            {renderMarkdown(currentDoc.content)}
          </article>
        </main>
      </div>
    </div>
  );
}
