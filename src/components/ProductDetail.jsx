import React from 'react';
import { 
  ArrowLeft, Download, ExternalLink, Calendar, 
  ShieldCheck, AlertTriangle, FileText, ArrowRight,
  CheckCircle2, Globe, User
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Published':
        return { icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
      case 'Submitted':
        return { icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      default:
        return { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-[680px] h-full bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 animate-in slide-in-from-right flex flex-col">
        <div className="sticky top-0 bg-white z-20 px-8 py-5 border-b border-slate-100 flex justify-between items-center shadow-sm">
          <div
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
            onClick={onClose}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Product Listing</span>
          </div>
          <button className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-sm">
            Edit Product
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex gap-6 items-start">
            <div className="w-24 h-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm relative group">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xs">
                  IMG
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                  {product.category}
                </span>
                <span className="text-slate-300">•</span>
                <StatusBadge status={product.status} />
              </div>
            </div>
          </div>

          <div className="bg-[#FFF8E6] border border-[#F5E6C8] rounded-lg p-5 flex items-start gap-4 shadow-sm">
            <div className="text-amber-500 mt-0.5 shrink-0">
              <AlertTriangle size={20} strokeWidth={2} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-amber-900">
                Producer Declared Information
              </p>
              <p className="text-sm text-amber-900/80 leading-relaxed">
                This page presents information declared directly by the producer.
                It is <span className="font-semibold">not</span> certification or verification by Hedamo.
              </p>
            </div>
          </div>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Disclosure Summary
              </h3>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                <Download size={16} />
              </button>
            </div>

            <div className="p-6 grid gap-y-4">
              <div className="grid grid-cols-[140px_1fr] items-center">
                <span className="text-sm text-slate-500 font-medium">Declared by:</span>
                <span className="text-sm text-slate-900 font-semibold flex items-center gap-2">
                  {product.producer}
                  <ShieldCheck size={14} className="text-slate-400" />
                </span>
              </div>

              <div className="grid grid-cols-[140px_1fr] items-center">
                <span className="text-sm text-slate-500 font-medium">Declared on:</span>
                <span className="text-sm text-slate-900">{product.declaredDate}</span>
              </div>

              <div className="grid grid-cols-[140px_1fr] items-center pt-2">
                <span className="text-sm text-slate-500 font-medium">Evidence:</span>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group w-fit"
                >
                  {product.evidenceCount} documents attached
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8 px-1">
              <h3 className="text-lg font-bold text-slate-900">Version History</h3>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {product.versions.length} Revisions
              </span>
            </div>

            <div className="relative ml-2 space-y-10">
              <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-slate-200" />

              {product.versions.map((ver, idx) => {
                const StatusIcon = getStatusConfig(ver.status).icon;
                const config = getStatusConfig(ver.status);

                return (
                  <div key={idx} className="relative pl-10 group">
                    <div
                      className={`absolute left-0 top-1.5 w-[16px] h-[16px] rounded-full border-2 z-10 box-content transition-all duration-300
                        ${
                          idx === 0
                            ? 'bg-blue-600 border-white shadow-[0_0_0_4px_rgba(37,99,235,0.1)] scale-110'
                            : 'bg-white border-slate-300 group-hover:border-slate-400'
                        }`}
                    />

                    <div className="bg-white rounded-xl border border-slate-200 p-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800 text-sm">
                            {ver.version.startsWith('v')
                              ? `Version ${ver.version.substring(1)}`
                              : ver.version}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">
                              Current
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                          <Calendar size={12} /> {ver.date}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center flex-wrap gap-3 mb-4">
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold shadow-sm ${config.bg} ${config.color} ${config.border}`}
                          >
                            <StatusIcon size={14} />
                            {ver.status}
                          </div>

                          {ver.status === 'Published' && (
                            <>
                              <ArrowRight size={14} className="text-slate-300" />
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-xs font-medium opacity-75">
                                <CheckCircle2 size={14} /> Submitted
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
                          <div className="mt-0.5 p-1 bg-white rounded border border-slate-200 text-slate-400">
                            <FileText size={12} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-slate-700 font-medium leading-none">
                              {ver.note || 'Metadata updated by producer'}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <span>
                                Action ID: #{Math.random().toString(36).substr(2, 6).toUpperCase()}
                              </span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <User size={10} /> {product.producer}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
