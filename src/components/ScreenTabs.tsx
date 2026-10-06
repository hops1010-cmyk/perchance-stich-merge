import React from 'react';
import { playHapticSound } from '../utils/perchanceEngine';

export type ScreenId =
  | 'feline-jung'
  | 'fantasy-tavern'
  | 'deep-space'
  | 'explore'
  | 'categories'
  | 'my-rolls'
  | 'community';

interface ScreenTabsProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

export const ScreenTabs: React.FC<ScreenTabsProps> = ({
  activeScreen,
  onSelectScreen
}) => {
  const tabs: {
    id: ScreenId;
    label: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      id: 'feline-jung',
      label: 'Archetype IDE',
      icon: 'terminal',
      badge: 'AST v4.2',
      badgeColor: 'bg-[#7c3aed]/30 text-[#d2bbff]'
    },
    {
      id: 'fantasy-tavern',
      label: 'Fantasy Quest',
      icon: 'swords',
      badge: 'Curated',
      badgeColor: 'bg-[#007650]/40 text-[#76ffc2]'
    },
    {
      id: 'deep-space',
      label: 'Space CRT',
      icon: 'radar',
      badge: '60Hz Live',
      badgeColor: 'bg-[#03b5d3]/30 text-[#4cd7f6]'
    },
    {
      id: 'explore',
      label: 'Explore Hub',
      icon: 'explore'
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: 'grid_view'
    },
    {
      id: 'my-rolls',
      label: 'My Rolls',
      icon: 'casino',
      badge: '55',
      badgeColor: 'bg-[#222a3d] text-[#ccc3d8]'
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'forum'
    }
  ];

  return (
    <div className="w-full bg-[#060e20]/90 border-b border-[#222a3d] px-3 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar font-mono z-30 flex-shrink-0">
      <div className="flex items-center gap-1.5 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playHapticSound('click');
                onSelectScreen(tab.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 active:scale-95 whitespace-nowrap ${
                isActive
                  ? 'bg-[#171f33] text-[#4cd7f6] border border-[#03b5d3]/50 shadow-md shadow-[#03b5d3]/10'
                  : 'text-[#ccc3d8] hover:text-[#dae2fd] hover:bg-[#131b2e] border border-transparent'
              }`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={isActive && (tab.id === 'my-rolls' || tab.id === 'fantasy-tavern') ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full font-mono ${tab.badgeColor || 'bg-[#222a3d] text-[#ccc3d8]'}`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
