import React, { useState, useEffect } from 'react';
import { rollQuest, playHapticSound, QuestRollResult } from '../utils/perchanceEngine';

interface GeneratorDetailFantasyProps {
  onBack: () => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSaveRoll: (title: string, text: string, category: string) => void;
}

export const GeneratorDetailFantasy: React.FC<GeneratorDetailFantasyProps> = ({
  onShowToast,
  onSaveRoll
}) => {
  const [tone, setTone] = useState<string>('classic');
  const [complexity, setComplexity] = useState<string>('detailed');
  const [includeComplications, setIncludeComplications] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState<number>(48219);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const [quest, setQuest] = useState<QuestRollResult>({
    npc: 'mysterious hooded rogue',
    npcClass: 'bg-[#7c3aed]/20 text-[#d2bbff]',
    reward: '250 gold pieces',
    rewardClass: 'bg-[#03b5d3]/20 text-[#4cd7f6]',
    questItem: 'an enchanted locket',
    itemClass: 'bg-[#007650]/40 text-[#76ffc2]',
    targetLocation: 'the Iron Vault',
    deadline: 'the full moon',
    complication: 'The city guard has doubled night patrols around the market district.',
    tone: 'classic'
  });

  const [comments, setComments] = useState<Array<{ user: string; text: string; time: string }>>([
    {
      user: '@RollForInitiative',
      text: 'Rolled this right as my party was stalling out in the tavern. The iron vault twist turned into a 4-session heist arc. Golden.',
      time: '2h ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleRoll = () => {
    if (isLocked) {
      playHapticSound('lock');
      onShowToast('Seed locked. Unlock to re-roll.', 'lock');
      return;
    }

    playHapticSound('roll');
    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 300);

    const newQuest = rollQuest(tone, complexity, includeComplications);
    setQuest(newQuest);
    setRollCount((prev) => prev + 1);
  };

  // Keyboard shortcut listener for spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target instanceof HTMLElement && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleRoll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, tone, complexity, includeComplications]);

  const handleCopy = () => {
    const text = `A ${quest.npc} offers you ${quest.reward} to steal ${quest.questItem} from ${quest.targetLocation} before ${quest.deadline}.${includeComplications && quest.complication ? ` Complication: ${quest.complication}` : ''}`;
    navigator.clipboard?.writeText(text);
    playHapticSound('click');
    onShowToast('Prompt copied to clipboard!', 'content_copy');
  };

  const handleSave = () => {
    const text = `A ${quest.npc} offers you ${quest.reward} to steal ${quest.questItem} from ${quest.targetLocation} before ${quest.deadline}.`;
    onSaveRoll('Fantasy Quest & Tavern', text, 'rpg');
    playHapticSound('success');
    onShowToast('Saved roll to your Creative Vault!', 'bookmark_add');
  };

  const handleBookmarkToggle = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    playHapticSound('lock');
    onShowToast(next ? 'Saved generator to bookmarks' : 'Removed generator from bookmarks', 'bookmark');
  };

  const handleResetParams = () => {
    setTone('classic');
    setComplexity('detailed');
    setIncludeComplications(true);
    playHapticSound('click');
    onShowToast('Reset parameters to default', 'restart_alt');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { user: '@adventurer', text: newComment.trim(), time: 'Just now' }
    ]);
    setNewComment('');
    playHapticSound('click');
    onShowToast('Note published to table feedback', 'forum');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-12 pt-1 font-body-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Output & Roll Controls */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {/* Top Generator Meta Card */}
          <div className="bg-[#171f33] border border-[#222a3d] rounded-xl p-4 shadow-md flex flex-col gap-3 relative overflow-hidden">
            {/* Decorative ambient spot */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#7c3aed]/15 blur-2xl pointer-events-none" />

            {/* Title & Creator Info */}
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#7c3aed]/25 text-[#d2bbff] font-label-sm text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                    Perchance Core
                  </span>
                  <span className="text-[#4edea3] font-label-sm text-[11px] font-mono flex items-center gap-0.5 font-bold">
                    <span className="material-symbols-outlined text-[13px] fill-icon">verified</span>
                    Curated
                  </span>
                </div>
                <h2 className="font-headline-lg-mobile text-[22px] text-[#dae2fd] font-extrabold tracking-tight truncate">
                  Fantasy Quest & Tavern Rumors
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-5 h-5 rounded-full bg-[#03b5d3] text-[#00424e] font-label-sm text-[10px] font-bold flex items-center justify-center">
                    DM
                  </div>
                  <span className="text-[#ccc3d8] font-label-md text-[12px] font-mono">@dungeonmaster</span>
                  <span className="text-[#958da1] text-[10px]">•</span>
                  <span className="text-[#958da1] font-label-md text-[12px] font-mono">v2.4</span>
                </div>
              </div>

              <button
                aria-label="Bookmark Generator"
                onClick={handleBookmarkToggle}
                className={`w-10 h-10 rounded-full bg-[#222a3d] flex items-center justify-center transition-transform active:scale-90 flex-shrink-0 ${
                  isBookmarked ? 'text-[#4cd7f6]' : 'text-[#ccc3d8] hover:text-[#dae2fd]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  bookmark
                </span>
              </button>
            </div>

            {/* Community Stats Ribbon */}
            <div className="flex items-center justify-between pt-2 bg-[#060e20] px-3 py-2 rounded-lg border border-[#222a3d]/50 font-mono">
              <div className="flex items-center gap-1.5 text-[#dae2fd]">
                <span className="material-symbols-outlined text-[16px] text-[#d2bbff]">casino</span>
                <span className="font-label-md text-[12px] font-bold">{rollCount.toLocaleString()}</span>
                <span className="text-[#958da1] text-[11px]">rolls</span>
              </div>
              <div className="h-3 w-px bg-[#2d3449]"></div>
              <div className="flex items-center gap-1.5 text-[#dae2fd]">
                <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">bookmark</span>
                <span className="font-label-md text-[12px] font-bold">1.4k</span>
                <span className="text-[#958da1] text-[11px]">saves</span>
              </div>
              <div className="h-3 w-px bg-[#2d3449]"></div>
              <div className="flex items-center gap-1.5 text-[#dae2fd]">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">fork_right</span>
                <span className="font-label-md text-[12px] font-bold">382</span>
                <span className="text-[#958da1] text-[11px]">forks</span>
              </div>
            </div>
          </div>

          {/* Main Live Interactive Canvas */}
          <div
            className={`relative bg-[#222a3d] border border-[#4a4455]/40 rounded-xl p-4 shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between min-h-[220px] ${
              isLocked ? 'ring-1 ring-[#03b5d3]/50' : ''
            }`}
          >
            {/* Ambient Live Glow Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/15 via-transparent to-[#03b5d3]/10 opacity-80 pointer-events-none" />

            {/* Canvas Header Bar */}
            <div className="relative z-10 flex items-center justify-between pb-2 border-b border-[#2d3449]/60">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4edea3]"></span>
                </span>
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#4edea3] font-bold font-mono">
                  Live Output
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    playHapticSound('lock');
                    setIsLocked(!isLocked);
                    onShowToast(isLocked ? 'Unlocked seed randomizer' : 'Seed locked in place', 'lock');
                  }}
                  className={`px-2.5 py-1 rounded-full font-label-sm text-[11px] font-mono flex items-center gap-1 active:scale-95 transition-all ${
                    isLocked
                      ? 'bg-[#03b5d3]/20 text-[#4cd7f6] border border-[#03b5d3]/50'
                      : 'bg-[#171f33] text-[#ccc3d8] hover:text-[#dae2fd]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {isLocked ? 'lock' : 'lock_open'}
                  </span>
                  <span>{isLocked ? 'LOCKED' : 'UNLOCKED'}</span>
                </button>

                <button
                  aria-label="Quick Copy"
                  onClick={handleCopy}
                  className="w-8 h-8 rounded-full bg-[#171f33] flex items-center justify-center text-[#ccc3d8] hover:text-[#dae2fd] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>

            {/* Generated Text Display with dynamic variable tagging */}
            <div className="relative z-10 my-auto py-3">
              <p className="font-body-lg text-[16px] text-[#dae2fd] leading-relaxed font-normal">
                A{' '}
                <span className="bg-[#7c3aed]/25 text-[#d2bbff] font-semibold px-1.5 py-0.5 rounded border border-[#7c3aed]/30">
                  {quest.npc}
                </span>{' '}
                offers you{' '}
                <span className="bg-[#03b5d3]/20 text-[#4cd7f6] font-semibold px-1.5 py-0.5 rounded border border-[#03b5d3]/30">
                  {quest.reward}
                </span>{' '}
                to steal{' '}
                <span className="bg-[#007650]/30 text-[#76ffc2] font-semibold px-1.5 py-0.5 rounded border border-[#007650]/40">
                  {quest.questItem}
                </span>{' '}
                from{' '}
                <span className="bg-[#31394d] text-white font-semibold px-1.5 py-0.5 rounded">
                  {quest.targetLocation}
                </span>{' '}
                before{' '}
                <span className="underline decoration-[#7c3aed]/60 underline-offset-4 font-semibold text-[#dae2fd]">
                  {quest.deadline}
                </span>
                .
              </p>
            </div>

            {/* Complication / Sub-detail Pill */}
            {includeComplications && quest.complication && (
              <div className="relative z-10 mt-1 bg-[#060e20]/80 rounded-lg p-2.5 flex items-start gap-2 border border-[#93000a]/40 shadow-inner">
                <span className="material-symbols-outlined text-[17px] text-[#ffb4ab] flex-shrink-0 mt-0.5">
                  warning
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[10px] font-mono uppercase tracking-wider text-[#ffb4ab] font-bold">
                    Complication
                  </span>
                  <p className="font-body-sm text-[12px] text-[#ccc3d8] leading-tight">
                    {quest.complication}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* PRIMARY ROLL BUTTON */}
          <button
            onClick={handleRoll}
            className="w-full bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#03b5d3] text-white py-3.5 px-6 rounded-xl font-headline-sm text-[16px] font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#7c3aed]/25 active:scale-[0.98] transition-all select-none hover:brightness-110"
          >
            <span
              className={`material-symbols-outlined text-[26px] transition-transform duration-300 ${
                isRolling ? 'rotate-180' : ''
              }`}
            >
              casino
            </span>
            <span className="tracking-wide">ROLL AGAIN</span>
            <span className="ml-auto bg-black/30 text-white/90 text-label-sm text-[10px] font-mono px-2 py-1 rounded">
              SPACE / TAP
            </span>
          </button>

          {/* Micro Action Toolbar */}
          <div className="grid grid-cols-4 gap-2 font-mono">
            <button
              onClick={handleCopy}
              className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-[#171f33] border border-[#222a3d] hover:bg-[#222a3d] active:scale-95 transition-all text-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#d2bbff]">copy_all</span>
              <span className="font-label-sm text-[11px]">Copy</span>
            </button>

            <button
              onClick={handleSave}
              className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-[#171f33] border border-[#222a3d] hover:bg-[#222a3d] active:scale-95 transition-all text-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">bookmark_add</span>
              <span className="font-label-sm text-[11px]">Save Roll</span>
            </button>

            <button
              onClick={() => {
                playHapticSound('click');
                onShowToast('Share link copied to clipboard!', 'share');
              }}
              className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-[#171f33] border border-[#222a3d] hover:bg-[#222a3d] active:scale-95 transition-all text-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#4edea3]">share</span>
              <span className="font-label-sm text-[11px]">Share</span>
            </button>

            <button
              onClick={() => setShowCode(!showCode)}
              className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-[#171f33] border border-[#222a3d] hover:bg-[#222a3d] active:scale-95 transition-all text-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ccc3d8]">code</span>
              <span className="font-label-sm text-[11px]">{showCode ? 'Hide Code' : 'Source'}</span>
            </button>
          </div>

          {/* Visual Mood Inspiration Grid */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-[14px] font-bold text-[#dae2fd]">Atmosphere Visuals</h3>
              <span className="font-label-sm text-[10px] text-[#958da1] uppercase tracking-wider font-mono">
                Procedural Canvas
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="relative rounded-xl overflow-hidden shadow-md h-28 bg-[#222a3d] group border border-[#222a3d]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARrtAiGlOPh-4Nw4akIe5oJ-yooSAQmb5Ex_XC06YNthtNbIyP4EWBLi3ipu_7TVHfHSNEtQETEaoeKnMfhPKbvmSyJewd5VIS5kEt_mixbeW7EK5lsUWl1ot6qsAHaQDPT9M5omeQjLb1pjlTS2O-6OhFh29BI_xSOgHmqy1wHI6HaJOy3PFjRO8ssdrI-uRFj69BR1Zz0pbXpdhd_JC8EYpNWSTp183InaVzB7LjG_ObOBO2XSYq_A"
                  alt="The Whispering Flagon"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/90 via-transparent to-transparent flex items-end p-2">
                  <span className="font-label-sm text-[10px] font-mono text-[#dae2fd] font-bold">
                    The Whispering Flagon
                  </span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-md h-28 bg-[#222a3d] group border border-[#222a3d]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQlbviv2all_M2aMEgF6EJp--FWS_XnGWbX84laG2KV4DNoSYyH4k6uAcz2Giv9_ipZqJsvw0lkO0bX0I_s7_jAJDWPflAwnJr6RZ_9F1Sd4pnYWwrKFEjC5pH9CkKzfMVeVWrIEhOXoD-skpkwaa8unniIKy3Kvfc0e0vk4frZt1m_z2IJ9d6CmSOVqH0BNAU08v1VHRslLD1-91h0TFvds3Y6fgam6s41C6rKKqxpbDszdyh6wdNew"
                  alt="The Iron Vault Core"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/90 via-transparent to-transparent flex items-end p-2">
                  <span className="font-label-sm text-[10px] font-mono text-[#dae2fd] font-bold">
                    The Iron Vault Core
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Parameters, Grammar Lists, Table Feedback */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          {/* Roll Parameters & Options Module */}
          <div className="bg-[#171f33] border border-[#222a3d] rounded-xl p-4 shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#d2bbff]">tune</span>
                <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd]">Roll Parameters</h3>
              </div>
              <button
                onClick={handleResetParams}
                className="text-[#d2bbff] font-label-sm text-[11px] font-mono font-semibold hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Tone Selector Pills */}
            <div className="flex flex-col gap-1.5 font-mono">
              <label className="font-label-md text-[11px] text-[#ccc3d8] font-bold uppercase tracking-wider">
                Atmosphere Tone
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'grimdark', label: 'Grimdark' },
                  { id: 'whimsical', label: 'Whimsical' },
                  { id: 'classic', label: 'Classic High Fantasy' },
                  { id: 'steampunk', label: 'Steampunk Arcana' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTone(t.id);
                      playHapticSound('click');
                      const newQ = rollQuest(t.id, complexity, includeComplications);
                      setQuest(newQ);
                    }}
                    className={`px-2.5 py-1 rounded-full font-label-md text-[11px] transition-all active:scale-95 ${
                      tone === t.id
                        ? 'bg-[#03b5d3]/20 text-[#4cd7f6] font-bold border border-[#03b5d3]/50 shadow-sm'
                        : 'bg-[#222a3d] text-[#ccc3d8] hover:text-[#dae2fd]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity Radio Tabs */}
            <div className="flex flex-col gap-1.5 font-mono">
              <label className="font-label-md text-[11px] text-[#ccc3d8] font-bold uppercase tracking-wider">
                Quest Complexity
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#060e20] p-1 rounded-xl border border-[#222a3d]">
                {[
                  { id: 'simple', label: 'Simple' },
                  { id: 'detailed', label: 'Detailed' },
                  { id: 'epic', label: 'Epic Arc' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setComplexity(c.id);
                      playHapticSound('click');
                      const newQ = rollQuest(tone, c.id, includeComplications);
                      setQuest(newQ);
                    }}
                    className={`py-1.5 px-2 rounded-lg font-label-md text-[11px] text-center transition-all ${
                      complexity === c.id
                        ? 'bg-[#7c3aed] text-[#ede0ff] font-bold shadow-sm'
                        : 'text-[#ccc3d8] hover:text-[#dae2fd]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Complication Toggle Switch */}
            <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/60">
              <div className="flex flex-col">
                <span className="font-body-md text-[13px] text-[#dae2fd] font-semibold">
                  Include Complications
                </span>
                <span className="font-body-sm text-[11px] text-[#958da1]">
                  Adds sudden twists, rival factions, or timers
                </span>
              </div>

              <button
                aria-pressed={includeComplications}
                onClick={() => {
                  playHapticSound('click');
                  setIncludeComplications(!includeComplications);
                }}
                className={`w-12 h-7 rounded-full flex items-center p-0.5 transition-colors ${
                  includeComplications ? 'bg-[#7c3aed]' : 'bg-[#2d3449]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                    includeComplications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Under The Hood Drawer */}
          <div className="bg-[#171f33] border border-[#222a3d] rounded-xl p-4 shadow-md flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[11px] font-mono text-[#ccc3d8] font-bold uppercase tracking-wider">
                Under The Hood
              </span>
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-[#4cd7f6] font-label-md text-[12px] font-mono font-bold flex items-center gap-1"
              >
                <span>{showCode ? 'Hide Lists' : 'Show Lists'}</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform ${
                    showCode ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
            </div>

            {showCode && (
              <div className="bg-[#060e20] rounded-lg p-3 overflow-x-auto text-[11px] font-mono leading-relaxed text-[#ccc3d8] border border-[#222a3d]">
                <span className="text-[#d2bbff] font-bold">output</span>
                <br />
                &nbsp;&nbsp;A [npc.selectOne] offers you [reward] to steal [quest_item] from [location] before [deadline].
                <br />
                <br />
                <span className="text-[#4cd7f6] font-bold">npc</span>
                <br />
                &nbsp;&nbsp;mysterious hooded rogue
                <br />
                &nbsp;&nbsp;disgraced palace alchemist
                <br />
                &nbsp;&nbsp;one-eyed dwarven cartographer
                <br />
                <br />
                <span className="text-[#4edea3] font-bold">complication</span>
                <br />
                &nbsp;&nbsp;The city guard has doubled night patrols.
                <br />
                &nbsp;&nbsp;A rival adventuring party is on the same hunt.
              </div>
            )}

            <p className="font-body-sm text-[12px] text-[#ccc3d8]">
              This procedural generator relies on weighted probability tables and contextual grammar rules to seed D&D side quests, tavern hearsay, and emergent narrative arcs.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#222a3d]/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#222a3d] flex items-center justify-center text-[#d2bbff] font-bold text-label-sm text-[11px]">
                  P
                </div>
                <span className="font-label-md text-[11px] font-mono text-[#dae2fd]">
                  perchance.org/fantasy-tavern-quests
                </span>
              </div>

              <button
                onClick={() => {
                  playHapticSound('success');
                  onShowToast('Forking generator into your workspace...', 'fork_right');
                }}
                className="bg-[#2d3449] hover:bg-[#31394d] text-[#dae2fd] px-3 py-1 rounded-lg font-label-sm text-[11px] font-mono font-bold active:scale-95 transition-transform flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                Fork
              </button>
            </div>
          </div>

          {/* Community Activity & Comments Preview */}
          <div className="bg-[#171f33] border border-[#222a3d] rounded-xl p-4 shadow-md flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#4edea3]">forum</span>
                <h3 className="font-headline-sm text-[14px] font-bold text-[#dae2fd]">Table Feedback</h3>
              </div>
              <span className="bg-[#222a3d] text-[#ccc3d8] px-2 py-0.5 rounded-full font-label-sm text-[10px] font-mono">
                {comments.length + 23} Notes
              </span>
            </div>

            {/* Existing Comments */}
            <div className="flex flex-col gap-2">
              {comments.map((c, i) => (
                <div key={i} className="bg-[#060e20] p-2.5 rounded-lg flex flex-col gap-1 border border-[#222a3d]/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#7c3aed]/20 text-[#d2bbff] flex items-center justify-center font-label-sm text-[10px] font-bold">
                        {c.user[1] || 'U'}
                      </span>
                      <span className="font-label-md text-[11px] font-mono text-[#dae2fd] font-bold">
                        {c.user}
                      </span>
                    </div>
                    <span className="font-label-sm text-[9px] text-[#958da1] font-mono">{c.time}</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-[#ccc3d8]">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-0.5">
              <input
                className="bg-[#060e20] text-[#dae2fd] placeholder:text-[#958da1] text-body-sm text-[12px] px-3 py-1.5 rounded-lg flex-1 border border-[#222a3d] focus:outline-none focus:border-[#7c3aed]"
                placeholder="Share a roll story or list idea..."
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#7c3aed] text-white w-8 h-8 rounded-lg flex items-center justify-center active:scale-90 transition-transform shadow-md shadow-[#7c3aed]/30"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};
