'use client';

import React from 'react';
import { BookmarkCheck } from 'lucide-react';

export default function AgentMemoryNotice({ preferences }: { preferences?: Record<string, any> }) {
  if (!preferences || Object.keys(preferences).length === 0) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-xs">
      <BookmarkCheck size={14} className="text-purple-600 shrink-0" />
      <span>
        <strong>Remembered Preferences:</strong> Target ({preferences.USER_PREFERENCE?.target || 'Yield'}), Template ({preferences.USER_PREFERENCE?.template || 'yield_optimizer'}).
      </span>
    </div>
  );
}
