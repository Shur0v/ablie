'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function FormSection({ title, description, isVisible, children, className, id }: FormSectionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          id={id}
          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
          animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn("overflow-hidden", className)}
        >
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          </div>
          <div className="space-y-6">
            {children}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
