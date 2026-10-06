import React, { useState } from 'react';
import { CURATED_CATEGORIES, FEATURED_CURATORS, COMMUNITY_FORKS } from '../data/mockData';
import { DetailGeneratorId } from '../types/generator';
import { playHapticSound } from '../utils/perchanceEngine';

interface CategoriesViewProps {
  onOpenGenerator: (detailId: DetailGeneratorId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onOpenGenerator,
  onShowToast
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [highlightedCatId, setHighlightedCatId] = useState<string | null>(null);
  const [followedCurators, setFollowedCurators] = useState<Record<string, boolean>>({});
  const [forkLikes, setForkLikes] = useState<Record<string, number>>({
    'fork-1': 142,
    'fork-2': 89,
    'fork-3': 315
  });

  const handleRandomCategory = () => {
    playHapticSound('roll');
    const randomCat = CURATED_CATEGORIES[Math.floor(Math.random() * CURATED_CATEGORIES.length)];
    setHighlightedCatId(randomCat.id);
    onShowToast(`Random Pick: ${randomCat.title}!`, 'casino');

    setTimeout(() => {
      setHighlightedCatId(null);
    }, 1400);
  };

  const handleToggleFollow = (handle: string) => {
    playHapticSound('click');
    setFollowedCurators((prev) => {
      const next = !prev[handle];
      onShowToast(next ? `Following ${handle}` : `Unfollowed ${handle}`, 'person_check');
      return { ...prev, [handle]: next };
    });
  };

  const handleLikeFork = (id: string) => {
    playHapticSound('click');
    setForkLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    onShowToast('Upvoted community remix!', 'favorite');
  };

  const filteredCategories = CURATED_CATEGORIES.filter((cat) =>
    cat.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    cat.id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-12 pt-1 font-body-md">
      {/* Search & Quick Discovery Header */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span className="font-label-sm text-[11px] text-[#4cd7f6] font-mono uppercase tracking-widest font-semibold">
              Procedural Vault
            </span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#222a3d] text-[#ccc3d8] font-label-sm text-[11px] font-mono border border-[#4a4455]/30">
            <span className="material-symbols-outlined text-[14px] text-[#4edea3]">bolt</span>
            <span>66.3k Generators</span>
          </div>
        </div>

        <h2 className="font-headline-lg-mobile text-[24px] text-[#dae2fd] font-extrabold tracking-tight">
          Browse Categories
        </h2>

        {/* Search Input Form */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#ccc3d8]">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </div>
          <input
            className="w-full h-12 pl-11 pr-12 bg-[#171f33] rounded-xl text-[#dae2fd] font-body-md text-[14px] placeholder:text-[#958da1] border border-[#222a3d] focus:outline-none focus:bg-[#222a3d] focus:border-[#7c3aed] transition-all shadow-sm"
            placeholder="Filter by theme, game, tag..."
            type="search"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
          <button
            aria-label="Random Category Roll"
            onClick={handleRandomCategory}
            type="button"
            className="absolute inset-y-1.5 right-1.5 w-9 h-9 rounded-lg bg-[#7c3aed] text-[#ede0ff] flex items-center justify-center hover:opacity-95 active:scale-90 transition-all shadow-md shadow-[#7c3aed]/30"
          >
            <span className="material-symbols-outlined text-[18px]">casino</span>
          </button>
        </div>
      </section>

      {/* Curated Visual Collections Grid */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-[16px] font-bold text-[#dae2fd]">Curated Categories</h3>
          <span className="font-label-sm text-[10px] text-[#03b5d3] bg-[#171f33] border border-[#222a3d] px-2 py-0.5 rounded-full font-mono font-bold">
            8 CORE HUBS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5" id="categoryGrid">
          {filteredCategories.map((cat) => {
            const isHighlighted = highlightedCatId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  playHapticSound('click');
                  if (cat.id === 'rpg') onOpenGenerator('fantasy-tavern');
                  else if (cat.id === 'writing') onOpenGenerator('feline-jung');
                  else if (cat.id === 'utility') onOpenGenerator('deep-space');
                  else onShowToast(`Opened ${cat.title} Hub`, 'grid_view');
                }}
                className={`group relative flex flex-col justify-between p-3.5 rounded-xl border transition-all duration-200 active:scale-[0.98] overflow-hidden shadow-sm cursor-pointer ${
                  isHighlighted
                    ? 'bg-[#7c3aed] text-[#ede0ff] border-white ring-2 ring-[#d2bbff]'
                    : 'bg-[#171f33] border-[#222a3d] hover:bg-[#222a3d] text-[#dae2fd]'
                }`}
              >
                <div className={`absolute -right-3 -top-3 w-16 h-16 ${cat.accentGlow} rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform`} />

                <div className="flex items-start justify-between w-full mb-3 relative z-10">
                  <div className={`w-10 h-10 rounded-lg ${cat.colorClass} flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform`}>
                    <span className="material-symbols-outlined text-[22px] fill-icon">
                      {cat.icon}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#958da1] text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_outward
                  </span>
                </div>

                <div className="relative z-10">
                  <h4 className="font-headline-sm text-[14px] text-inherit leading-tight font-bold">
                    {cat.title}
                  </h4>
                  <p className="font-label-sm text-[11px] text-[#ccc3d8] font-mono mt-1">
                    {cat.rolls}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Community Curators */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-[#d2bbff] text-[20px] fill-icon">
              verified
            </span>
            <h3 className="font-headline-sm text-[16px] font-bold text-[#dae2fd]">Featured Curators</h3>
          </div>
          <button
            onClick={() => onShowToast('Showing Top 50 Creators leaderboard')}
            className="font-label-sm text-[12px] text-[#4cd7f6] font-mono hover:underline"
          >
            View Top 50
          </button>
        </div>

        {/* Curators Horizontal Scrolling Rail */}
        <div className="flex space-x-3 overflow-x-auto pb-2 pt-1 -mx-4 px-4 scroll-smooth no-scrollbar">
          {FEATURED_CURATORS.map((curator) => {
            const isFollowed = !!followedCurators[curator.handle];
            return (
              <div
                key={curator.handle}
                className="flex-shrink-0 w-36 p-3 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col items-center text-center space-y-2 relative shadow-sm"
              >
                <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#7c3aed] to-[#4cd7f6]">
                  <img
                    alt={curator.name}
                    className="w-full h-full object-cover rounded-full"
                    src={curator.avatarUrl}
                  />
                  {curator.verified && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#4edea3] rounded-full flex items-center justify-center text-[10px] text-[#003824] shadow-sm font-bold">
                      ✓
                    </span>
                  )}
                </div>

                <div className="w-full min-w-0">
                  <p className="font-headline-sm text-[13px] font-bold text-[#dae2fd] truncate">
                    {curator.name}
                  </p>
                  <p className="font-label-sm text-[10px] text-[#ccc3d8] font-mono">
                    {curator.followers}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleFollow(curator.handle)}
                  className={`w-full py-1.5 rounded-lg font-label-sm text-[11px] font-mono font-bold transition-all active:scale-95 ${
                    isFollowed
                      ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40'
                      : 'bg-[#222a3d] text-[#4cd7f6] hover:bg-[#4cd7f6] hover:text-[#003640]'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open-Source Activity: Recent Community Forks & Remixes */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">fork_right</span>
            <h3 className="font-headline-sm text-[16px] font-bold text-[#dae2fd]">Recent Community Forks</h3>
          </div>
          <span className="font-label-sm text-[11px] font-mono text-[#4edea3] flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span> Live feed
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {COMMUNITY_FORKS.map((fork) => (
            <div
              key={fork.id}
              className="p-3.5 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col space-y-2 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-[#7c3aed]/25 text-[#d2bbff] font-label-sm text-[10px] font-mono font-bold uppercase">
                    Forked
                  </span>
                  <h4 className="font-headline-sm text-[14px] font-bold text-[#dae2fd] truncate">
                    {fork.title}
                  </h4>
                </div>
                <span className="font-label-sm text-[10px] text-[#ccc3d8] font-mono flex-shrink-0">
                  {fork.timeAgo}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#060e20] border border-[#222a3d]/60 text-[#ccc3d8] font-body-sm text-[12px] italic">
                {fork.preview}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-1.5 text-[#ccc3d8] font-label-sm text-[11px] font-mono">
                  <span className="material-symbols-outlined text-[15px] text-[#958da1]">account_tree</span>
                  <span>
                    remixed from <strong className="text-[#dae2fd] font-semibold">{fork.remixedFrom}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2.5 text-[#ccc3d8] font-label-sm text-[11px] font-mono">
                  <button
                    onClick={() => handleLikeFork(fork.id)}
                    className="flex items-center gap-1 text-[#ccc3d8] hover:text-[#ffb4ab] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">favorite</span>
                    <span>{forkLikes[fork.id]}</span>
                  </button>
                  <button
                    onClick={() => {
                      playHapticSound('roll');
                      onOpenGenerator('fantasy-tavern');
                    }}
                    className="px-2.5 py-1 rounded bg-[#03b5d3] text-[#00424e] font-label-sm text-[11px] font-mono font-bold hover:opacity-90 active:scale-95 transition-all shadow-sm"
                  >
                    Try Roll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
