import React from 'react';
import { TabType } from '../types/generator';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'categories', label: 'Categories', icon: 'grid_view' },
    { id: 'my-rolls', label: 'My Rolls', icon: 'casino' },
    { id: 'community', label: 'Community', icon: 'forum' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#0b1326]/90 backdrop-blur-xl border-t border-[#222a3d]/60 shadow-[0_-2px_12px_rgba(0,0,0,0.35)]">
      <div className="max-w-md mx-auto md:max-w-xl flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#4cd7f6] font-bold'
                  : 'text-[#ccc3d8] hover:text-[#dae2fd]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[23px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                style={isActive && item.id === 'my-rolls' ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-[11px] font-mono mt-0.5 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
