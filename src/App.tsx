import React, { useState, useEffect } from 'react';
import { ScreenId, ScreenTabs } from './components/ScreenTabs';
import { ExploreView } from './components/ExploreView';
import { CategoriesView } from './components/CategoriesView';
import { MyRollsView } from './components/MyRollsView';
import { CommunityView } from './components/CommunityView';
import { GeneratorDetailFantasy } from './components/GeneratorDetailFantasy';
import { GeneratorDetailArchetype } from './components/GeneratorDetailArchetype';
import { GeneratorDetailSpace } from './components/GeneratorDetailSpace';
import { CreateGeneratorModal } from './components/CreateGeneratorModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { DetailGeneratorId } from './types/generator';
import { playHapticSound } from './utils/perchanceEngine';
import { PERCHANCE_LOGO } from './data/mockData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('feline-jung');
  const [aspectMode, setAspectMode] = useState<'16:9' | 'responsive'>('16:9');
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Modals & Toasts
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  const showToast = (msg: string, icon: string = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  const handleSelectScreen = (screen: ScreenId) => {
    if (!isSoundMuted) playHapticSound('click');
    setActiveScreen(screen);
    const contentArea = document.getElementById('viewport-16-9-content');
    if (contentArea) {
      contentArea.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenGenerator = (detailId: DetailGeneratorId) => {
    if (!isSoundMuted) playHapticSound('click');
    setActiveScreen(detailId);
    showToast(`Loaded ${detailId === 'feline-jung' ? 'Archetype IDE' : detailId === 'fantasy-tavern' ? 'Fantasy Tavern' : 'Space CRT'}`, 'explore');
    const contentArea = document.getElementById('viewport-16-9-content');
    if (contentArea) {
      contentArea.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveRoll = (title: string, _text: string, _category: string) => {
    showToast(`"${title}" saved to Creative Vault!`, 'bookmark');
  };

  const handleSaveToGems = (title: string, _sample: string) => {
    showToast(`"${title}" added to My Gems!`, 'verified');
  };

  // Global key listener for tab switching & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in inputs/textareas
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === '1') handleSelectScreen('feline-jung');
      if (e.key === '2') handleSelectScreen('fantasy-tavern');
      if (e.key === '3') handleSelectScreen('deep-space');
      if (e.key === '4') handleSelectScreen('explore');
      if (e.key === '5') handleSelectScreen('categories');
      if (e.key === '6') handleSelectScreen('my-rolls');
      if (e.key === '7') handleSelectScreen('community');
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSoundMuted]);

  return (
    <div className="min-h-screen w-full bg-[#060e20] text-[#dae2fd] flex flex-col items-center justify-center p-1 sm:p-3 md:p-5 select-none relative overflow-x-hidden font-body-md">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#03b5d3]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Top Outer Studio Control Bar */}
      <header className="w-full max-w-7xl flex items-center justify-between py-2 px-3 sm:px-4 mb-1 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              alt="Perchance mark"
              src={PERCHANCE_LOGO}
              className="w-6 h-6 object-contain"
            />
            <span className="font-extrabold text-[15px] tracking-tight text-[#dae2fd] font-headline-sm">
              perchance<span className="text-[#4cd7f6]">.studio</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#131b2e] border border-[#222a3d] text-[11px] font-mono text-[#4cd7f6]">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            <span className="font-bold">16:9 CONTAINER</span>
            <span className="text-[#958da1]">| 1080p Widescreen</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[12px]">
          {/* Aspect Ratio Toggle */}
          <button
            onClick={() => {
              if (!isSoundMuted) playHapticSound('click');
              const next = aspectMode === '16:9' ? 'responsive' : '16:9';
              setAspectMode(next);
              showToast(next === '16:9' ? 'Constrained to 16:9 aspect container' : 'Expanded responsive view', 'aspect_ratio');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
              aspectMode === '16:9'
                ? 'bg-[#03b5d3]/20 border-[#03b5d3]/60 text-[#4cd7f6]'
                : 'bg-[#131b2e] border-[#222a3d] text-[#ccc3d8] hover:text-white'
            }`}
            title="Toggle 16:9 container constraint"
          >
            <span className="material-symbols-outlined text-[15px]">aspect_ratio</span>
            <span className="hidden md:inline">{aspectMode === '16:9' ? '16:9 Locked' : 'Auto Height'}</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => {
              setIsSoundMuted(!isSoundMuted);
              showToast(isSoundMuted ? 'Haptic sound unmuted' : 'Sound muted', isSoundMuted ? 'volume_up' : 'volume_off');
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#131b2e] border border-[#222a3d] text-[#ccc3d8] hover:text-[#4cd7f6] transition-all"
            title={isSoundMuted ? 'Enable Sound' : 'Mute Sound'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSoundMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* Quick Search */}
          <button
            onClick={() => {
              if (!isSoundMuted) playHapticSound('click');
              setIsSearchOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#131b2e] border border-[#222a3d] text-[#ccc3d8] hover:text-white hover:border-[#03b5d3]/40 transition-all text-[11px]"
          >
            <span className="material-symbols-outlined text-[14px]">search</span>
            <span>Search</span>
            <span className="text-[10px] text-[#958da1] bg-[#060e20] px-1 rounded">/</span>
          </button>

          {/* + Create Studio Modal */}
          <button
            onClick={() => {
              if (!isSoundMuted) playHapticSound('click');
              setIsCreateOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-[#03b5d3] to-[#7c3aed] text-white font-bold text-[11px] hover:opacity-90 transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>+ Create</span>
          </button>
        </div>
      </header>

      {/* 16:9 Constrained Showcase Container */}
      <div
        className={`w-full max-w-7xl relative bg-[#0b1326] border border-[#222a3d] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden ring-1 ring-[#03b5d3]/20 z-10 ${
          aspectMode === '16:9'
            ? 'aspect-[16/9] min-h-[580px] max-h-[92vh]'
            : 'h-[92vh]'
        }`}
      >
        {/* Container Top Frame: Studio Window Header & Screen Tabs */}
        <div className="bg-[#0e162b] border-b border-[#222a3d] flex flex-col flex-shrink-0 z-30">
          {/* Top Bezel Bar with Traffic Light Dots & Status */}
          <div className="px-3 py-1.5 flex items-center justify-between border-b border-[#1b2337] bg-[#091122]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
              </div>
              <span className="text-[11px] font-mono text-[#958da1] pl-2 border-l border-[#222a3d]">
                Perchance Studio Workspace
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-[#ccc3d8]">
              <span className="hidden sm:inline bg-[#131b2e] px-2 py-0.5 rounded border border-[#222a3d]">
                Ratio: 16:9 (1.78:1)
              </span>
              <span className="bg-[#007650]/30 text-[#76ffc2] px-2 py-0.5 rounded font-bold border border-[#007650]/40">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Screen Tabs Bar */}
          <ScreenTabs
            activeScreen={activeScreen}
            onSelectScreen={handleSelectScreen}
          />
        </div>

        {/* Viewport Content Area (Scrolls inside 16:9 container) */}
        <div
          id="viewport-16-9-content"
          className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth focus:outline-none"
          tabIndex={0}
        >
          {activeScreen === 'feline-jung' && (
            <GeneratorDetailArchetype
              onBack={() => handleSelectScreen('explore')}
              onShowToast={showToast}
              onSaveRoll={handleSaveRoll}
            />
          )}

          {activeScreen === 'fantasy-tavern' && (
            <GeneratorDetailFantasy
              onBack={() => handleSelectScreen('explore')}
              onShowToast={showToast}
              onSaveRoll={handleSaveRoll}
            />
          )}

          {activeScreen === 'deep-space' && (
            <GeneratorDetailSpace
              onBack={() => handleSelectScreen('explore')}
              onShowToast={showToast}
              onSaveRoll={handleSaveRoll}
            />
          )}

          {activeScreen === 'explore' && (
            <ExploreView
              onOpenGenerator={handleOpenGenerator}
              onShowToast={showToast}
              onSaveRoll={handleSaveRoll}
            />
          )}

          {activeScreen === 'categories' && (
            <CategoriesView
              onOpenGenerator={handleOpenGenerator}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'my-rolls' && (
            <MyRollsView
              onOpenGenerator={handleOpenGenerator}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'community' && (
            <CommunityView
              onOpenGenerator={handleOpenGenerator}
              onShowToast={showToast}
            />
          )}
        </div>

        {/* Bottom Status Telemetry Dock inside the 16:9 container */}
        <footer className="bg-[#060e20] border-t border-[#222a3d] px-3 sm:px-5 py-2 flex items-center justify-between text-[11px] font-mono text-[#958da1] flex-shrink-0 z-30">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#4edea3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
              <span>SYNTAX ENGINE NOMINAL</span>
            </span>
            <span className="hidden md:inline text-[#222a3d]">|</span>
            <span className="hidden md:inline text-[#ccc3d8]">
              Current View: <strong className="text-[#dae2fd]">{activeScreen}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[#958da1]">
              Shortcuts: <kbd className="px-1 py-0.5 rounded bg-[#131b2e] text-[#ccc3d8] border border-[#222a3d] text-[10px]">1-7</kbd> switch tabs
            </span>
            <div className="flex items-center gap-1 text-[#4cd7f6] bg-[#131b2e] px-2 py-0.5 rounded border border-[#03b5d3]/30">
              <span className="material-symbols-outlined text-[12px]">crop_16_9</span>
              <span className="font-bold">16:9 FIXED</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <CreateGeneratorModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onShowToast={showToast}
        onSaveToGems={handleSaveToGems}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectGenerator={handleOpenGenerator}
      />

      {/* Floating Micro-Toast Feedback */}
      <Toast message={toastMessage} icon={toastIcon} />
    </div>
  );
}
