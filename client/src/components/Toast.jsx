import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  const isInfo = toast.type === 'info';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3 max-w-sm pointer-events-auto ${
        isError 
          ? 'bg-red-900 text-white border-red-700' 
          : isInfo 
            ? 'bg-[#1D3557] text-white border-[#2A4D7E]' 
            : 'bg-[#2C241E] text-white border-[#C85A32]'
      }`}>
        {isError ? (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-[#E9B44C] shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-[#E9B44C] shrink-0" />
        )}
        <p className="text-xs font-semibold leading-snug">{toast.message}</p>
      </div>
    </div>
  );
}
