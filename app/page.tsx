'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckCircle2, 
  Download, 
  Printer, 
  ChevronRight, 
  Check,
  Info, 
  AlertCircle,
  LayoutGrid,
  ClipboardCheck,
  Camera,
  Signature as SignatureIcon,
  Settings2,
  Trash2,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import FormSection from '@/components/FormSection';
import BaukastenToggle from '@/components/BaukastenToggle';
import FileUpload from '@/components/FileUpload';
import SignaturePad from '@/components/SignaturePad';

// Types
type SectionKey = 'stammdaten' | 'team' | 'status' | 'foto' | 'tech' | 'unterschrift' | 'bemerkungen';

export default function AbliefernachweisForm() {
  // State
  const [activeSections, setActiveSections] = useState<Record<SectionKey, boolean>>({
    stammdaten: true,
    team: true,
    status: true,
    foto: true,
    tech: false, // Default OFF
    unterschrift: true,
    bemerkungen: false // Default OFF
  });

  const [status, setStatus] = useState<string>('installiert');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  // Toggle Section
  const toggleSection = (key: SectionKey) => {
    setActiveSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate PDF Generation
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      setPdfReady(true);
    }, 3000);
  };

  // Reset Form
  const resetForm = () => {
    if (confirm('Möchten Sie das Formular wirklich löschen? Alle Eingaben gehen verloren.')) {
      window.location.reload();
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Eintrag erfolgreich übermittelt</h1>
            <p className="text-slate-500 mb-8">Vielen Dank! Das Protokoll wurde gespeichert und wird nun verarbeitet.</p>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3 border border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Datum:</span>
                <span className="font-medium text-slate-900">{new Date().toLocaleString('de-DE')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Submitted by:</span>
                <span className="font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">REC_7A2B9X01</span>
              </div>
            </div>

            <div className="border-2 border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-32 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                <div className="w-full h-1 bg-slate-200 mb-1" />
                <div className="w-2/3 h-1 bg-slate-200 mb-1" />
                <div className="w-full h-1 bg-slate-200 mb-4" />
                <div className="grid grid-cols-2 gap-1 w-full">
                  <div className="aspect-square bg-slate-200 rounded-sm" />
                  <div className="aspect-square bg-slate-200 rounded-sm" />
                </div>
                {isGeneratingPdf && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    pdfReady ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {pdfReady ? "PDF bereit" : "PDF wird erstellt..."}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <button 
                    disabled={!pdfReady}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button 
                    disabled={!pdfReady}
                    className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Printer className="w-4 h-4" />
                    Drucken
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              Neues Formular erstellen
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Abliefernachweis</h1>
            <p className="text-xs text-slate-500 font-medium">Installationsprotokoll • Digitaler Baukasten</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Project</span>
              <span className="text-sm font-bold text-slate-800">JET-Digital-2026</span>
            </div>
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <LayoutGrid className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-32">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Intro */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <ClipboardCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Willkommen zum Protokoll-Assistenten</h2>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    Bitte füllen Sie alle Pflichtfelder aus. Fotos sind als Nachweis zwingend erforderlich. 
                    Nach dem Absenden wird automatisch ein PDF generiert.
                  </p>
                </div>
              </div>
            </div>

            {/* Baukasten Control Panel */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Module auswählen (Baukasten)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <BaukastenToggle label="Stammdaten" isActive={activeSections.stammdaten} onToggle={() => toggleSection('stammdaten')} />
                <BaukastenToggle label="Team" isActive={activeSections.team} onToggle={() => toggleSection('team')} />
                <BaukastenToggle label="Status & Checkpoints" isActive={activeSections.status} onToggle={() => toggleSection('status')} />
                <BaukastenToggle label="Fotodokumentation" isActive={activeSections.foto} onToggle={() => toggleSection('foto')} />
                <BaukastenToggle label="Technische Daten" isActive={activeSections.tech} onToggle={() => toggleSection('tech')} />
                <BaukastenToggle label="Unterschriften" isActive={activeSections.unterschrift} onToggle={() => toggleSection('unterschrift')} />
                <BaukastenToggle label="Bemerkungen" isActive={activeSections.bemerkungen} onToggle={() => toggleSection('bemerkungen')} />
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-4">
              
              {/* STAMMDATEN */}
              <FormSection 
                title="Stammdaten" 
                description="Allgemeine Informationen zum Standort und Auftrag."
                isVisible={activeSections.stammdaten}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-slate-700">Standort auswählen <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none">
                        <option value="">Bitte wählen...</option>
                        <option value="1">Berlin - Alexanderplatz (JET-001)</option>
                        <option value="2">Hamburg - Reeperbahn (JET-042)</option>
                        <option value="3">München - Marienplatz (JET-108)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                    <button type="button" className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">+ Neuen Standort anlegen</button>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">JET ID</label>
                    <input type="text" placeholder="z.B. JET-12345" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Display ID</label>
                    <input type="text" placeholder="z.B. DISP-99" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Location Name</label>
                    <input type="text" placeholder="Vollständiger Name des Restaurants" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>

                  <div className="md:col-span-2 grid grid-cols-4 gap-3">
                    <div className="col-span-3 space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Straße</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Nr.</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* TEAM */}
              <FormSection 
                title="Team & Zeit" 
                isVisible={activeSections.team}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Integrator</label>
                    <input type="text" defaultValue="Media Solutions GmbH" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Techniker</label>
                    <input type="text" placeholder="Name des Technikers" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Installationsstart</label>
                    <div className="flex gap-2">
                      <input type="datetime-local" className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                      <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-[10px] font-bold flex items-center">CET</div>
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* STATUS & CHECKPOINTS */}
              <FormSection 
                title="Status & Checkpoints" 
                isVisible={activeSections.status}
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Status Installation</label>
                      <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                      >
                        <option value="installiert">Installiert</option>
                        <option value="abgebrochen">Abgebrochen</option>
                        <option value="nicht_moeglich">Nicht möglich</option>
                      </select>
                    </div>
                    
                    {(status === 'abgebrochen' || status === 'nicht_moeglich') && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-slate-700">Abbruchgrund</label>
                        <select className="w-full bg-white border border-red-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all">
                          <option value="">Grund wählen...</option>
                          <option value="strom">Kein Stromanschluss</option>
                          <option value="platz">Platzmangel</option>
                          <option value="partner">Partner nicht vor Ort</option>
                          <option value="defekt">Hardware defekt</option>
                        </select>
                      </motion.div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'folie', label: 'Folie entfernt', helper: 'Schutzfolie vom Display abgezogen' },
                      { id: 'handout', label: 'Handout übergeben', helper: 'Bedienungsanleitung überreicht' },
                      { id: 'passpartout', label: 'Passpartout angebracht', helper: 'Rahmen korrekt montiert' }
                    ].map((item) => (
                      <label key={item.id} className="group flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="w-5 h-5 border-2 border-slate-300 rounded-md bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all" />
                          <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                          <span className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.helper}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Lieferumfang (Mehrfachauswahl)</label>
                    <div className="flex flex-wrap gap-2">
                      {['Display', 'Halterung', 'Kabel-Set', 'SIM-Karte', 'Dokumentation', 'OPS-Modul'].map((option) => (
                        <label key={option} className="relative inline-flex items-center cursor-pointer group">
                          <input type="checkbox" className="peer sr-only" defaultChecked={option === 'Display' || option === 'Kabel-Set'} />
                          <div className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-500 peer-checked:bg-slate-900 peer-checked:text-white peer-checked:border-slate-900 transition-all hover:border-slate-300">
                            {option}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* FOTODOKUMENTATION */}
              <FormSection 
                title="Fotodokumentation" 
                description="Laden Sie hier die erforderlichen Nachweise hoch."
                isVisible={activeSections.foto}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload label="Standort vorher" helperText="Gesamtansicht des Montageorts vor Beginn" required />
                  <FileUpload label="Außenansicht (nach Aufbau)" helperText="Sichtbarkeit von außen prüfen" required />
                  <FileUpload label="Rückseite (nach Aufbau)" helperText="Verkabelung und Halterung zeigen" required />
                  <FileUpload label="SIM Karte" helperText="Nahaufnahme der SIM-ID / ICCID" required />
                  <FileUpload label="Seriennummer Display / OPS" helperText="Typenschild deutlich lesbar" required />
                  <FileUpload label="Foto Abstand" helperText="Abstand zur Fensterseite / Decke" />
                </div>
              </FormSection>

              {/* TECHNISCHE DATEN */}
              <FormSection 
                title="Technische Daten" 
                isVisible={activeSections.tech}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Display Serial Number</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">SIM-ID (ICCID)</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">OPS SN</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Installationsart</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                      <option>Wandmontage</option>
                      <option>Deckenmontage</option>
                      <option>Standfuß</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                </div>
              </FormSection>

              {/* BEMERKUNGEN */}
              <FormSection 
                title="Bemerkungen" 
                isVisible={activeSections.bemerkungen}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Allgemeine Bemerkungen</label>
                    <textarea 
                      rows={4} 
                      placeholder="Besonderheiten, Mängel oder zusätzliche Arbeiten hier festhalten..."
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                    />
                  </div>
                  {status !== 'installiert' && (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      <p className="text-xs text-amber-700 leading-relaxed">
                        <strong>Hinweis:</strong> Bei Abbruch oder Problemen ist eine detaillierte Beschreibung der Ursache zwingend erforderlich, um Nacharbeiten planen zu können.
                      </p>
                    </div>
                  )}
                </div>
              </FormSection>

              {/* UNTERSCHRIFTEN */}
              <FormSection 
                title="Unterschriften" 
                isVisible={activeSections.unterschrift}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <SignatureIcon className="w-4 h-4 text-slate-500" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Unterschrift Techniker</h4>
                    </div>
                    <input type="text" placeholder="Name des Technikers" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none" />
                    <SignaturePad label="" onSave={() => {}} />
                  </div>

                  <div className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <SignatureIcon className="w-4 h-4 text-slate-500" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">Unterschrift Partner</h4>
                    </div>
                    <input type="text" placeholder="Name des Restaurantpartners" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none" />
                    <SignaturePad label="" onSave={() => {}} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="group flex items-center gap-3 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-all">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" required className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-emerald-200 rounded-md bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all" />
                        <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm font-medium text-emerald-900">Ich bestätige die Richtigkeit der oben gemachten Angaben.</span>
                    </label>
                  </div>
                </div>
              </FormSection>

            </div>
          </div>

          {/* Right Column: Sticky Sidebar (Desktop) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Navigation / Progress */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hidden lg:block">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Abschnitte</h3>
                <nav className="space-y-1">
                  {[
                    { key: 'stammdaten', label: 'Stammdaten' },
                    { key: 'team', label: 'Team & Zeit' },
                    { key: 'status', label: 'Status' },
                    { key: 'foto', label: 'Fotos' },
                    { key: 'tech', label: 'Technik' },
                    { key: 'bemerkungen', label: 'Bemerkungen' },
                    { key: 'unterschrift', label: 'Unterschrift' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      disabled={!activeSections[item.key as SectionKey]}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                        activeSections[item.key as SectionKey] 
                          ? "text-slate-600 hover:bg-slate-50" 
                          : "text-slate-300 cursor-not-allowed opacity-50"
                      )}
                    >
                      <span>{item.label}</span>
                      {activeSections[item.key as SectionKey] && <ChevronRight className="w-4 h-4 text-slate-300" />}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Submit Card */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
                <h3 className="text-lg font-bold mb-2">Abschluss</h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                  Bitte prüfen Sie alle Angaben vor dem Absenden. Ein nachträgliches Ändern ist nur über den Administrator möglich.
                </p>
                <div className="space-y-3">
                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
                  >
                    Einreichen
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="w-full bg-white/10 hover:bg-white/20 text-white/70 text-sm font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Formular löschen
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-4 text-center">
                  Nach dem Absenden wird ein druckbares PDF erzeugt.
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Hilfe benötigt?</h4>
                    <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                      Bei technischen Problemen wenden Sie sich bitte an den IT-Support unter +49 800 123 456.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </form>
      </main>

      {/* Mobile Sticky Submit (Only on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 z-50">
        <button 
          onClick={() => document.querySelector('form')?.requestSubmit()}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
        >
          Einreichen
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
