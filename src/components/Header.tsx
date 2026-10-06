import React from 'react';
import { TabType, DetailGeneratorId } from '../types/generator';
import { PERCHANCE_LOGO } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  selectedGeneratorId?: DetailGeneratorId;
  onNavigateTab: (tab: TabType) => void;
  onOpenCreate: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  selectedGeneratorId,
  onNavigateTab,
  onOpenCreate,
  onOpenSearch
}) => {
  const isDetail = currentTab === 'generator-detail';

  const getTitle = () => {
    if (isDetail) {
      if (selectedGeneratorId === 'feline-jung') return 'feline_jung.perchance';
      if (selectedGeneratorId === 'deep-space') return 'Space Telemetry CRT';
      return 'Generator Detail';
    }
    switch (currentTab) {
      case 'explore': return 'Explore';
      case 'categories': return 'Categories';
      case 'my-rolls': return 'My Rolls';
      case 'community': return 'Community';
      default: return 'Explore';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-[#0b1326]/85 backdrop-blur-xl border-b border-[#222a3d]/50 shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
      <div className="max-w-md mx-auto md:max-w-4xl h-16 px-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {isDetail ? (
            <button
              aria-label="Go Back"
              onClick={() => onNavigateTab('explore')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#dae2fd] hover:text-[#d2bbff] hover:bg-[#171f33] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigateTab('explore')}
              className="flex items-center gap-2 text-left focus:outline-none"
            >
              <img
                alt="Perchance Brand Mark"
                className="h-7 w-auto object-contain flex-shrink-0"
                src={PERCHANCE_LOGO}
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[17px] font-bold text-[#dae2fd] tracking-tight lowercase select-none">
                  perchance
                </span>
                <span className="font-label-sm text-[10px] text-[#ccc3d8] truncate uppercase tracking-wider select-none font-mono">
                  {getTitle()}
                </span>
              </div>
            </button>
          )}

          {isDetail && (
            <div className="flex items-center gap-2 min-w-0 ml-1">
              <img
                alt="Perchance Brand Mark"
                className="h-6 w-auto object-contain flex-shrink-0 opacity-80"
                src={PERCHANCE_LOGO}
              />
              <h1 className="font-headline-sm text-[15px] font-semibold text-[#dae2fd] truncate">
                {getTitle()}
              </h1>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            aria-label="Search Generators"
            onClick={onOpenSearch}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#ccc3d8] hover:text-[#dae2fd] hover:bg-[#171f33] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            aria-label="Create Generator"
            onClick={onOpenCreate}
            className="h-9 px-3 flex items-center gap-1.5 rounded-full bg-[#7c3aed] text-[#ede0ff] font-label-md text-[13px] font-semibold hover:bg-[#6d28d9] transition-all active:scale-95 shadow-md shadow-[#7c3aed]/20"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="inline font-mono">Create</span>
          </button>

          <div
            className="w-8 h-8 rounded-full bg-[#d2bbff] flex items-center justify-center flex-shrink-0 text-[#3f008e] shadow-sm cursor-pointer hover:ring-2 hover:ring-[#7c3aed]"
            title="User Profile: @creator"
          >
            <span className="material-symbols-outlined text-[18px] font-bold">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
