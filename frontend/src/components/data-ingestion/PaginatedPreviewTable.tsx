'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Table as TableIcon } from 'lucide-react';

interface PaginatedPreviewTableProps {
  rows: any[];
  title?: string;
}

export default function PaginatedPreviewTable({ rows, title = 'Ingested Dataset Preview' }: PaginatedPreviewTableProps) {
  const [pageSize, setPageSize] = useState<number | 'all'>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!rows || rows.length === 0) return null;

  const headers = Object.keys(rows[0]);

  // Filter rows by search query
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const query = searchQuery.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((val) => String(val ?? '').toLowerCase().includes(query))
    );
  }, [rows, searchQuery]);

  // Calculate pagination
  const totalRows = filteredRows.length;
  const effectivePageSize = pageSize === 'all' ? totalRows : pageSize;
  const totalPages = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(totalRows / effectivePageSize));
  const activePage = Math.min(currentPage, totalPages);

  const startIndex = pageSize === 'all' ? 0 : (activePage - 1) * effectivePageSize;
  const endIndex = pageSize === 'all' ? totalRows : Math.min(startIndex + effectivePageSize, totalRows);
  const visibleRows = filteredRows.slice(startIndex, endIndex);

  const handlePageSizeChange = (val: string) => {
    if (val === 'all') {
      setPageSize('all');
    } else {
      setPageSize(Number(val));
    }
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <TableIcon size={18} className="text-[#2B70AB]" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            <p className="text-[11px] text-slate-500">
              Showing {totalRows > 0 ? startIndex + 1 : 0} to {endIndex} of {totalRows} rows
              {rows.length !== totalRows && ` (filtered from ${rows.length} total)`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Search Box */}
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search table rows..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2B70AB]"
            />
          </div>

          {/* Rows Per Page Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span>Show:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2B70AB]"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value="all">Show All ({rows.length})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scrollable Data Table */}
      <div className="overflow-x-auto max-h-[420px] border border-slate-200 rounded-xl scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full text-xs text-left text-slate-700">
          <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider sticky top-0 z-10 font-bold border-b border-slate-200">
            <tr>
              <th className="px-3 py-2.5 w-12 text-center bg-slate-100 border-r border-slate-200">#</th>
              {headers.map((h) => (
                <th key={h} className="px-3 py-2.5 whitespace-nowrap bg-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {visibleRows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-3 py-2 text-center font-mono text-[10px] text-slate-400 border-r border-slate-100">
                  {startIndex + i + 1}
                </td>
                {headers.map((h) => {
                  const val = row[h];
                  return (
                    <td key={h} className="px-3 py-2 truncate max-w-[200px] text-slate-800">
                      {val === null || val === undefined ? (
                        <span className="text-slate-300 italic">null</span>
                      ) : (
                        String(val)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination Controls */}
      {pageSize !== 'all' && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs text-slate-600 font-medium">
          <div>
            Page <span className="font-bold text-slate-900">{activePage}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={activePage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="First Page"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-3 py-1 font-semibold text-slate-800">
              {activePage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={activePage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Last Page"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
