'use client';

import React, { useState } from 'react';
import { Upload, X, FileText, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FileUploadProps {
  label: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export default function FileUpload({ label, helperText, required, className }: FileUploadProps) {
  const [files, setFiles] = useState<{ id: string; url: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline gap-1">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {required && <span className="text-red-500">*</span>}
      </div>
      {helperText && <p className="text-xs text-slate-400">{helperText}</p>}
      
      <div className="grid grid-cols-1 gap-3">
        {/* Dropzone */}
        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-2 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Klicken</span> oder ziehen
            </p>
            <p className="text-[10px] text-slate-400 mt-1">PNG, JPG bis 10MB</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} multiple accept="image/*" />
        </label>

        {/* Preview Grid */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-1">
            {files.map((file) => (
              <div key={file.id} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                <Image 
                  src={file.url} 
                  alt="Preview" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
