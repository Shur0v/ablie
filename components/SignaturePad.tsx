'use client';

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { RotateCcw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SignaturePadProps {
  label: string;
  onSave: (dataUrl: string | null) => void;
  className?: string;
}

export default function SignaturePad({ label, onSave, className }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const clear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
    onSave(null);
  };

  const handleEnd = () => {
    if (sigCanvas.current) {
      setIsEmpty(sigCanvas.current.isEmpty());
      onSave(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative group">
        <div className="border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 overflow-hidden h-40 transition-colors group-hover:border-slate-300">
          <SignatureCanvas
            ref={sigCanvas}
            onEnd={handleEnd}
            canvasProps={{
              className: "w-full h-full cursor-crosshair",
            }}
          />
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-sm italic">
              Hier unterschreiben
            </div>
          )}
        </div>
        
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={clear}
            className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-500 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
            title="Löschen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-wider font-semibold px-1">
        <span>Digital Signature Pad</span>
        {!isEmpty && <span className="text-emerald-500">Erfasst</span>}
      </div>
    </div>
  );
}
