'use client';

import React from 'react';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BaukastenToggleProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

export default function BaukastenToggle({ label, isActive, onToggle }: BaukastenToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm font-medium",
        isActive 
          ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm" 
          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded flex items-center justify-center transition-colors",
        isActive ? "bg-emerald-500 text-white" : "border border-slate-300 bg-slate-50"
      )}>
        {isActive && <Check className="w-3 h-3 stroke-[3]" />}
      </div>
      {label}
    </button>
  );
}
