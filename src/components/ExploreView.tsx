import React, { useState } from 'react';
import { DetailGeneratorId, GeneratorItem } from '../types/generator';
import { EXPLORE_GENERATORS } from '../data/mockData';
import { rollArchetype, playHapticSound } from '../utils/perchanceEngine';

interface ExploreViewProps {
  onOpenGenerator: (detailId: DetailGeneratorId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSaveRoll: (title: string, text: string, category: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onOpenGenerator,
  onShowToast,
  onSaveRoll
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Spotlight Live State
  const [spotlightRole, setSpotlightRole] = useState('Shadow Stalker');
  const [spotlightSubtag, setSpotlightSubtag] = useState('Integrate Void');
  const [spotlightText, setSpotlightText] = useState(
    '"Nyx, Velvet-Eared Shadow Stalker — Manifests repressed kitten impulses, prowling in midnight shadows and toppling psychic urns. Inner Quest: Integrate the midnight void."'
  );
  const [isSpotlightBookmarked, setIsSpotlightBookmarked] = useState(false);
  const [spotlightRollCount, setSpotlightRollCount] = useState(142000);
  const [isSpinning, setIsSpinning] = useState(false);

  // Trending cards sample state
  const [trendingOutputs, setTrendingOutputs] = useState<Record<string, string>>({
    'senex-elder': '“An ancient silver Maine Coon dozing beneath the Bodhi tree. Whispers cryptic cosmic truths through a slow purr.”',
    'trickster-calico': '“A tortoiseshell kitten who unravels the yarn of reality and escapes into the subconscious pantry.”',
    'anima-dream': '“A glowing ethereal Siamese pacing across lunar rooftops, guiding lost dreams back to the Self.”',
    'mandala-sphynx': '“A hairless celestial sphinx sitting at the exact center of your psychic labyrinth.”',
    'fantasy-tavern': '“A mysterious hooded rogue offers you 250 gold pieces to steal an enchanted locket from the Iron Vault before the full moon.”',
    'deep-space': '“TRK: FELINE-IX PROBE. Solar particle radiation flux (^1.82 MeV) interacting with magnetosphere vector at Lagrange Point L2.”'
  });

  const filterChips = [
    { id: 'all', label: '🐾 All Felines', icon: 'pets' },
    { id: 'shadow', label: 'Shadow & Id' },
    { id: 'wise', label: 'The Wise Elder' },
    { id: 'trickster', label: 'Trickster Kittens' },
    { id: 'anima', label: 'Anima Paws' },
    { id: 'rpg', label: 'Tabletop RPG' }
  ];

  const handleSpotlightRoll = () => {
    playHapticSound('roll');
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 350);

    const arch = rollArchetype();
    setSpotlightRole(arch.name);
    setSpotlightSubtag(arch.layer);
    setSpotlightText(arch.fullResolution);
    setSpotlightRollCount((prev) => prev + 1);
    onShowToast(`Rolled ${arch.name}!`, 'casino');
  };

  const handleCopySpotlight = () => {
    navigator.clipboard?.writeText(spotlightText);
    playHapticSound('click');
    onShowToast('Spotlight quote copied to clipboard!', 'content_copy');
  };

  const handleBookmarkSpotlight = () => {
    const next = !isSpotlightBookmarked;
    setIsSpotlightBookmarked(next);
    playHapticSound('lock');
    if (next) {
      onSaveRoll('The Shadow Kitten', spotlightText, 'writing');
      onShowToast('Saved Archetype to your Creative Vault!', 'bookmark');
    } else {
      onShowToast('Removed from favorites', 'bookmark_border');
    }
  };

  const handleQuickRollTrending = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('roll');
    const randomSnippets: Record<string, string[]> = {
      'senex-elder': [
        '“An ancient silver Maine Coon dozing beneath the Bodhi tree. Whispers cryptic cosmic truths through a slow purr.”',
        '“Venerable Tomcat guardian of the forgotten attic archives, blinking slowly in contemplative silence.”',
        '“A battle-scarred tomcat reciting the ancient songs of mouse-hunting ancestors under starlight.”'
      ],
      'trickster-calico': [
        '“A tortoiseshell kitten who unravels the yarn of reality and escapes into the subconscious pantry.”',
        '“A spotted calico phantom knocking quantum tea mugs off the mantle of causality with a flick of her tail.”',
        '“Dancing with tangled neon shoelaces across the floor of the ego’s drawing room.”'
      ],
      'anima-dream': [
        '“A glowing ethereal Siamese pacing across lunar rooftops, guiding lost dreams back to the Self.”',
        '“Luminous sapphire paws crossing misty bridges between daytime logic and nocturnal intuition.”',
        '“A silver-whispered muse manifesting as a calico spirit in a pool of moonlight.”'
      ],
      'mandala-sphynx': [
        '“A hairless celestial sphinx sitting at the exact center of your psychic labyrinth.”',
        '“Gazing into crystalline sacred geometries with eyes reflecting galaxies within galaxies.”',
        '“A radiant bronze sphynx purring at the vibrational frequency of universal equilibrium.”'
      ],
      'fantasy-tavern': [
        '“A disgraced royal alchemist offers 350 platinum shards to steal a vial of bottled thunderstorm from the Sunken Crypts.”',
        '“A blind tiefling cartographer offers an astral compass for a shattered celestial lens from the Weeping Spire.”',
        '“A mysterious hooded rogue offers 250 gold pieces to infiltrate the Iron Vault before the full moon.”'
      ],
      'deep-space': [
        '“TRK: FELINE-IX PROBE. Gravitational perturbation detected near Jovian resonance harmonic. Vector corrected.”',
        '“Whipple shield recorded 0.084 mJ deflection impact on starboard vector spar. Hull integrity 100%.”',
        '“LOX manifold heat exchanger venting excess boil-off. Core temperature stabilized at -194.2°C.”'
      ]
    };

    const options = randomSnippets[id] || [
      '“Procedural generation seed resolved fresh stochastic variant.”'
    ];
    const picked = options[Math.floor(Math.random() * options.length)];
    setTrendingOutputs((prev) => ({ ...prev, [id]: picked }));
    onShowToast('Quick rolled fresh output!', 'casino');
  };

  const filteredGenerators = EXPLORE_GENERATORS.filter((gen) => {
    const matchesSearch =
      gen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gen.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      gen.sampleOutput.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedTag === 'all') return true;
    if (selectedTag === 'shadow') return gen.tags.some((t) => t.toLowerCase().includes('shadow'));
    if (selectedTag === 'wise') return gen.tags.some((t) => t.toLowerCase().includes('senex') || t.toLowerCase().includes('wise'));
    if (selectedTag === 'trickster') return gen.tags.some((t) => t.toLowerCase().includes('trickster'));
    if (selectedTag === 'anima') return gen.tags.some((t) => t.toLowerCase().includes('anima'));
    if (selectedTag === 'rpg') return gen.category === 'rpg';
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-12 pt-1 font-body-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Search, Spotlight & Demos */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          {/* Search & Filter Area */}
          <section className="flex flex-col gap-2 pt-1">
            <div className="relative flex items-center w-full shadow-lg rounded-xl bg-[#222a3d]/90 border border-[#4a4455]/40">
              <span className="material-symbols-outlined absolute left-3.5 text-[#ccc3d8] text-[22px] pointer-events-none">
                search
              </span>
              <input
                className="w-full h-12 pl-11 pr-24 bg-transparent text-[#dae2fd] placeholder:text-[#958da1] font-body-md text-[14px] rounded-xl focus:outline-none focus:bg-[#2d3449] transition-colors"
                placeholder="Search feline archetypes, shadow kittens, mythic rolls..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  aria-label="Voice input"
                  onClick={() => onShowToast('Voice search listening...', 'mic')}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#ccc3d8] hover:text-[#4cd7f6] hover:bg-[#171f33] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
                <button
                  aria-label="Toggle Filters"
                  onClick={() => onShowToast('Filters adjusted', 'tune')}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#060e20] text-[#4cd7f6] hover:bg-[#4cd7f6] hover:text-[#003640] transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
              {filterChips.map((chip) => {
                const isActive = selectedTag === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => {
                      setSelectedTag(chip.id);
                      playHapticSound('click');
                    }}
                    className={`flex items-center h-8 px-3 rounded-full font-label-md text-[12px] shrink-0 font-mono transition-transform active:scale-95 ${
                      isActive
                        ? 'bg-[#03b5d3] text-[#00424e] font-bold shadow-md shadow-[#03b5d3]/20'
                        : 'bg-[#222a3d] text-[#ccc3d8] hover:text-[#dae2fd]'
                    }`}
                  >
                    {chip.icon && <span className="material-symbols-outlined text-[15px] mr-1">{chip.icon}</span>}
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Community Live Metrics Ticker */}
          <section className="flex items-center justify-between p-3 rounded-xl bg-[#060e20] border border-[#222a3d]/50 shadow-inner text-[#ccc3d8] overflow-hidden">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-2 w-2 rounded-full bg-[#4edea3] animate-pulse shrink-0"></span>
              <p className="font-label-sm text-[11px] font-mono truncate tracking-normal">
                <strong className="text-[#dae2fd] font-bold">48,200</strong> Archetype Generators ·{' '}
                <strong className="text-[#4cd7f6] font-bold">980k</strong> Purr Rolls Today ·{' '}
                <span className="text-[#4edea3]">100% Free & Open</span>
              </p>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#4edea3] shrink-0 ml-2">code</span>
          </section>

          {/* Daily Random Spotlight */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">hotel_class</span>
                <h2 className="font-headline-sm text-[16px] font-bold text-[#dae2fd]">Daily Spotlight</h2>
              </div>
              <span className="font-label-sm text-[10px] uppercase px-2 py-0.5 rounded-full bg-[#7c3aed]/30 text-[#d2bbff] font-mono font-semibold">
                Featured
              </span>
            </div>

            {/* Hero Card */}
            <div className="relative flex flex-col p-4 rounded-xl bg-[#222a3d] border border-[#4a4455]/30 shadow-xl overflow-hidden gap-3.5">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#7c3aed]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Creator & Metadata */}
              <div className="flex items-center justify-between relative z-10">
                <button
                  onClick={() => onOpenGenerator('feline-jung')}
                  className="flex items-center gap-2.5 min-w-0 text-left group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#2d3449] flex items-center justify-center shrink-0 group-hover:ring-2 group-hover:ring-[#d2bbff] transition-all">
                    <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">smart_toy</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd] truncate group-hover:text-[#d2bbff] transition-colors">
                      The Shadow Kitten & Subconscious Prowler
                    </h3>
                    <span className="font-label-sm text-[11px] text-[#ccc3d8] font-mono">
                      by @carl_jung_cat · {spotlightRollCount.toLocaleString()} rolls
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    aria-label="Bookmark"
                    onClick={handleBookmarkSpotlight}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isSpotlightBookmarked
                        ? 'text-[#4cd7f6] bg-[#03b5d3]/20'
                        : 'text-[#ccc3d8] hover:text-[#dae2fd] hover:bg-[#2d3449]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={isSpotlightBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      bookmark
                    </span>
                  </button>
                  <button
                    aria-label="Copy result"
                    onClick={handleCopySpotlight}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#ccc3d8] hover:text-[#dae2fd] hover:bg-[#2d3449] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>
                </div>
              </div>

              {/* Live Generated Box */}
              <div
                onClick={() => onOpenGenerator('feline-jung')}
                className="relative flex flex-col p-3.5 rounded-lg bg-[#060e20] border border-[#222a3d] shadow-sm gap-2 cursor-pointer hover:border-[#7c3aed]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[10px] text-[#4cd7f6] uppercase tracking-widest flex items-center gap-1 font-mono font-bold">
                    <span className="material-symbols-outlined text-[14px]">casino</span> Live Output
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-label-sm text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#7c3aed]/30 text-[#d2bbff] font-semibold">
                      {spotlightRole}
                    </span>
                    <span className="font-label-sm text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#03b5d3]/20 text-[#4cd7f6] font-semibold">
                      {spotlightSubtag}
                    </span>
                  </div>
                </div>
                <p className="font-body-md text-[14px] text-[#dae2fd] leading-relaxed transition-opacity duration-150">
                  {spotlightText}
                </p>
              </div>

              {/* Hero Roll Action Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpotlightRoll}
                  className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#732ee4] text-[#ede0ff] font-label-lg text-[14px] font-bold shadow-lg shadow-[#7c3aed]/25 hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                      isSpinning ? 'rotate-180' : ''
                    }`}
                  >
                    casino
                  </span>
                  <span>🐾 Roll Archetype</span>
                </button>

                <button
                  onClick={() => onOpenGenerator('feline-jung')}
                  className="h-11 px-3.5 rounded-xl bg-[#2d3449] hover:bg-[#31394d] text-[#dae2fd] font-label-md text-[12px] font-mono flex items-center gap-1 transition-all"
                >
                  <span>Inspect IDE</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* Featured Quick Demos Banner */}
          <section className="grid grid-cols-2 gap-2.5">
            <div
              onClick={() => onOpenGenerator('fantasy-tavern')}
              className="p-3 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col justify-between cursor-pointer hover:border-[#d2bbff]/50 transition-all shadow-md active:scale-98"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[10px] text-[#76ffc2] font-mono uppercase">Interactive Core</span>
                <span className="material-symbols-outlined text-[18px] text-[#d2bbff]">swords</span>
              </div>
              <div className="mt-2">
                <h4 className="font-headline-sm text-[14px] font-bold text-[#dae2fd] leading-snug">
                  Fantasy Quest & Tavern
                </h4>
                <p className="font-label-sm text-[11px] text-[#ccc3d8] font-mono mt-0.5">48k rolls · D&D generator</p>
              </div>
            </div>

            <div
              onClick={() => onOpenGenerator('deep-space')}
              className="p-3 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col justify-between cursor-pointer hover:border-[#4cd7f6]/50 transition-all shadow-md active:scale-98"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[10px] text-[#4cd7f6] font-mono uppercase">CRT Vector HUD</span>
                <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">radar</span>
              </div>
              <div className="mt-2">
                <h4 className="font-headline-sm text-[14px] font-bold text-[#dae2fd] leading-snug">
                  Deep Space Telemetry
                </h4>
                <p className="font-label-sm text-[11px] text-[#ccc3d8] font-mono mt-0.5">64k rolls · NASA scope</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Trending Now List */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#d2bbff] text-[20px]">trending_up</span>
                <h2 className="font-headline-sm text-[16px] font-bold text-[#dae2fd]">Trending Now</h2>
              </div>
              <button
                onClick={() => onShowToast('Showing all 48k generators', 'view_list')}
                className="font-label-md text-[12px] text-[#4cd7f6] font-mono hover:underline flex items-center gap-0.5"
              >
                View all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Generator Cards Stack */}
            <div className="flex flex-col gap-2.5">
              {filteredGenerators.map((gen) => {
                const hasDetail = !!gen.detailId;
                return (
                  <article
                    key={gen.id}
                    onClick={() => {
                      if (gen.detailId) onOpenGenerator(gen.detailId);
                      else onShowToast(`Opened ${gen.title}`);
                    }}
                    className="flex flex-col p-3.5 rounded-xl bg-[#171f33] border border-[#222a3d] gap-2.5 shadow-md hover:border-[#4a4455] transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#222a3d] text-[#4edea3]">
                            {gen.tags[0] || 'Generator'}
                          </span>
                          {gen.rating && (
                            <span className="flex items-center font-label-sm text-[11px] font-mono text-[#6ffbbe] gap-0.5">
                              <span className="material-symbols-outlined text-[13px] fill-icon">star</span>
                              {gen.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd] mt-1 truncate">
                          {gen.title}
                        </h3>
                        <p className="font-body-sm text-[12px] text-[#ccc3d8] font-mono truncate">
                          Created by {gen.creatorHandle} · {(gen.rollsCount / 1000).toFixed(0)}k rolls
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-lg bg-[#2d3449] flex items-center justify-center shrink-0 text-[#4cd7f6]">
                        <span className="material-symbols-outlined text-[20px]">
                          {hasDetail ? 'play_arrow' : 'auto_awesome'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#060e20] text-[#ccc3d8] font-body-sm text-[13px] italic flex items-center justify-between gap-2 border border-[#222a3d]/50">
                      <span className="line-clamp-2">
                        {trendingOutputs[gen.id] || gen.sampleOutput}
                      </span>
                      <button
                        onClick={(e) => handleQuickRollTrending(gen.id, e)}
                        className="shrink-0 px-2.5 py-1 rounded-lg bg-[#03b5d3] text-[#00424e] font-label-sm text-[11px] font-mono font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[14px]">shuffle</span>
                        Roll
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

};
