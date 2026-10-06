import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#171f33] text-[#dae2fd] border border-[#4cd7f6]/40 shadow-2xl backdrop-blur-md animate-fade-in">
      <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">{icon}</span>
      <span className="font-label-md text-[13px] font-mono tracking-tight">{message}</span>
    </div>
  );
};
