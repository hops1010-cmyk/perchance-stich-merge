import React, { useState } from 'react';
import { DetailGeneratorId, SavedRollItem } from '../types/generator';
import { playHapticSound } from '../utils/perchanceEngine';

interface MyRollsViewProps {
  onOpenGenerator: (detailId: DetailGeneratorId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const MyRollsView: React.FC<MyRollsViewProps> = ({
  onOpenGenerator,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'history' | 'created'>('saved');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [savedItems, setSavedItems] = useState<SavedRollItem[]>([
    {
      id: '1',
      generatorId: 'cyberpunk',
      generatorTitle: 'Cyberpunk NPC & Quest',
      content: '"Vex", Augmented Netrunner fixing cyber-limbs in the Lower Basin. Wants a cracked biochip from Arasaka drone crash.',
      seed: '#seed-9421',
      timestamp: 'Rolled 2h ago',
      category: 'rpg'
    },
    {
      id: '2',
      generatorId: 'tavern',
      generatorTitle: 'Fantasy Tavern & Rumor Table',
      content: 'The Weeping Golem Inn: Serving smoked toadstool cider. The bartender whispers that the city bells rang 13 times at midnight.',
      seed: '#seed-1082',
      timestamp: 'Yesterday',
      category: 'rpg'
    },
    {
      id: '3',
      generatorId: 'anime',
      generatorTitle: 'AI Anime Style Randomizer',
      content: '90s Retro Cel-shaded Mecha Pilot, volumetric neon rain, hyper-detailed mechanical joints, dynamic high angle shot.',
      seed: '#seed-6632',
      timestamp: '3 days ago',
      category: 'prompts'
    }
  ]);

  const [historyItems, setHistoryItems] = useState([
    {
      id: 'h1',
      title: 'Loot Drop Generator',
      content: 'Cursed Obsidian Blade of the Void (+4 Piercing, causes hallucinations on crit).',
      time: '10 mins ago'
    },
    {
      id: 'h2',
      title: 'Sci-Fi Planet Descriptor',
      content: 'Kepler-984e: Gas giant encased in crystalline atmospheric rings that refract purple lightning storms.',
      time: '45 mins ago'
    },
    {
      id: 'h3',
      title: 'Tavern Drink Randomizer',
      content: 'Banshee’s Wail: Distilled moon-fermented juniper with crushed frost-pearls. Echoes softly when swirled.',
      time: '2 hours ago'
    }
  ]);

  const [pinnedSnippet, setPinnedSnippet] = useState(
    '"A blind cartographer in the corner offers a faded velvet pouch in exchange for escort to the sunken basalt obelisk under Lake Sunder."'
  );
  const [pinnedCopyCount, setPinnedCopyCount] = useState(4);

  const dynamicPools: Record<string, string[]> = {
    '1': [
      '"Kael", ex-military chrome surgeon running an illegal trauma ward in sector 4. Demands an untracked encrypted neural jack.',
      '"Echo-7", synthetic courier hiding from corporation mercenaries. Holds a memory shard containing classified bio-specs.',
      '"Rook", cyber-arm wrestler turned smuggler. Looking for a crew to hijack an automated mag-lev convoy.'
    ],
    '2': [
      'The Gilded Wyvern: Warm spiced rum & roasted chestnuts. A hooded stranger searches for someone who can translate an abyssal tome.',
      'The Rusty Anchor: Salty mead & fish stew. A dwarven sailor insists sea serpents took his enchanted compass.',
      'The Hallowed Hearth: Herbal tea and honey bread. The hearth fire turns emerald when the local magistrate passes.'
    ],
    '3': [
      'Cyber-samurai in rain-soaked Neo-Tokyo, holographic cherry blossoms, dramatic rim lighting, vibrant purple and cyan contrast.',
      'Celestial sorceress casting solar flare runes, soft pastel anime style, delicate ink lines, glowing cosmic particles.',
      'Mecha mechanic resting in hangar bay, sunset golden hour rays through shattered glass, retro aesthetic.'
    ]
  };

  const handleQuickRoll = (id: string, title: string) => {
    playHapticSound('roll');
    const pool = dynamicPools[id] || ['Generated new procedural variation.'];
    const newContent = pool[Math.floor(Math.random() * pool.length)];

    setSavedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: newContent } : item))
    );
    onShowToast(`Rolled fresh ${title}!`, 'casino');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    playHapticSound('click');
    onShowToast('Copied roll result to clipboard!', 'content_copy');
  };

  const handleCopyPinned = () => {
    navigator.clipboard?.writeText(pinnedSnippet);
    playHapticSound('click');
    setPinnedCopyCount((prev) => prev + 1);
    onShowToast('Pinned output copied to clipboard!', 'content_copy');
  };

  const handleExportMarkdown = () => {
    playHapticSound('success');
    const mdContent = `# Perchance Creative Vault Backup\nExported: ${new Date().toISOString()}\n\n` +
      savedItems.map((i) => `### ${i.generatorTitle} (${i.seed})\n${i.content}\n`).join('\n');
    navigator.clipboard?.writeText(mdContent);
    onShowToast('Exported 55 rolls as Markdown to clipboard!', 'download');
  };

  const handleExportJson = () => {
    playHapticSound('success');
    const jsonStr = JSON.stringify(savedItems, null, 2);
    navigator.clipboard?.writeText(jsonStr);
    onShowToast('Backup JSON copied to clipboard!', 'code');
  };

  const filteredSaved = savedItems.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'rpg') return item.category === 'rpg';
    if (selectedFilter === 'writing') return item.category === 'writing';
    if (selectedFilter === 'prompts') return item.category === 'prompts';
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-12 pt-1 font-body-md">
      {/* Header Stat Capsule & Playful Greeting */}
      <div className="relative overflow-hidden rounded-xl bg-[#222a3d] border border-[#4a4455]/40 p-4 shadow-md">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#7c3aed]/20 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="font-label-sm text-[10px] text-[#4edea3] uppercase tracking-wider font-mono font-semibold">
                Vault Active
              </span>
            </div>
            <h2 className="font-headline-md text-[19px] font-bold text-[#dae2fd] mt-0.5">
              Your Creative Vault
            </h2>
            <p className="font-body-sm text-[12px] text-[#ccc3d8] font-mono">
              55 procedural gems & recent rolls
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#171f33] border border-[#222a3d] flex items-center justify-center text-[#d2bbff] shadow-sm">
            <span className="material-symbols-outlined text-[28px]">casino</span>
          </div>
        </div>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="w-full p-1 rounded-xl bg-[#060e20] border border-[#222a3d] flex items-center gap-1 shadow-inner">
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2 px-1 rounded-lg font-label-md text-[12px] font-mono flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'saved'
              ? 'bg-[#171f33] text-[#4cd7f6] font-bold shadow-sm'
              : 'text-[#ccc3d8] hover:text-[#dae2fd]'
          }`}
        >
          <span>Saved</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#03b5d3]/20 text-[#4cd7f6] text-[10px]">
            {savedItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-1 rounded-lg font-label-md text-[12px] font-mono flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'history'
              ? 'bg-[#171f33] text-[#4cd7f6] font-bold shadow-sm'
              : 'text-[#ccc3d8] hover:text-[#dae2fd]'
          }`}
        >
          <span>History</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#222a3d] text-[#ccc3d8] text-[10px]">
            {historyItems.length + 35}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('created')}
          className={`flex-1 py-2 px-1 rounded-lg font-label-md text-[12px] font-mono flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'created'
              ? 'bg-[#171f33] text-[#4cd7f6] font-bold shadow-sm'
              : 'text-[#ccc3d8] hover:text-[#dae2fd]'
          }`}
        >
          <span>My Gems</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#222a3d] text-[#ccc3d8] text-[10px]">
            3
          </span>
        </button>
      </div>

      {/* SAVED VIEW */}
      {activeTab === 'saved' && (
        <div className="flex flex-col w-full gap-3">
          {/* Category Filter Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: `All (${savedItems.length})` },
              { id: 'rpg', label: 'RPGs' },
              { id: 'writing', label: 'Writing Tools' },
              { id: 'prompts', label: 'Character Prompts' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`shrink-0 px-3 h-8 rounded-full font-label-md text-[12px] font-mono transition-all ${
                  selectedFilter === f.id
                    ? 'bg-[#03b5d3] text-[#00424e] font-bold shadow-sm'
                    : 'bg-[#171f33] text-[#ccc3d8] hover:text-[#dae2fd]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            {/* Card 1 */}
            <div className="relative overflow-hidden rounded-xl bg-[#171f33] border border-[#222a3d] p-4 shadow-md flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#222a3d] overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbb2N3mLZdQebsNyuptgiJuOX0Nlphmp4pHYwS1Tyzh2gRcBMZjAdMB5xI_NC5POTRAWeZHECn5Iu93l4NmQjfLmfCtIPxUq0WniL4YqZiyU4ctWWhiaJyEE4ejFK2rDMH2_MZwp_tXCuQPRrwcpp5HVnPmXvNDjA4BtHCJVQYToz3goMk-47dKq8Wf39N7jXAx5pp2XX7vMNNu22uJiUyN8-xq_PvL5al-L3R1naxiJ8Neo-Z-D9MdQ"
                      alt="Cyberpunk"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd] truncate">
                      Cyberpunk NPC & Quest
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#ccc3d8] font-label-sm text-[11px] font-mono">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>Rolled 2h ago</span>
                      <span>•</span>
                      <span className="text-[#4cd7f6]">RPG</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onShowToast('Favorited generator', 'bookmark')}
                  className="w-9 h-9 rounded-full bg-[#222a3d] flex items-center justify-center text-[#d2bbff] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px] fill-icon">bookmark</span>
                </button>
              </div>

              <div className="w-full p-3 rounded-lg bg-[#060e20] text-[#ccc3d8] font-body-sm text-[13px] border border-[#222a3d]/50">
                <div className="flex items-center justify-between text-[#ccc3d8] font-label-sm text-[10px] font-mono mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#d2bbff]">Current Preview</span>
                  <span className="text-[10px] opacity-70">#seed-9421</span>
                </div>
                <p className="text-[#dae2fd] leading-relaxed line-clamp-2">
                  {savedItems.find((s) => s.id === '1')?.content}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => handleQuickRoll('1', 'Cyberpunk NPC')}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#732ee4] text-[#ede0ff] font-label-lg text-[13px] font-mono font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">casino</span>
                  <span>Quick Roll</span>
                </button>
                <button
                  onClick={() => handleCopy(savedItems.find((s) => s.id === '1')?.content || '')}
                  className="w-11 h-11 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] flex items-center justify-center active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">content_copy</span>
                </button>
                <button
                  onClick={() => onOpenGenerator('fantasy-tavern')}
                  className="w-11 h-11 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] flex items-center justify-center active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">tune</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden rounded-xl bg-[#171f33] border border-[#222a3d] p-4 shadow-md flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#222a3d] overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEHfyVqRWf7uJgF9vWql9eW_sZiWvm5rkdo5G1KZtkfOvWwsPvwrIjlSR3mK2T5amrx11HDbxHIcRkTwNBvcFp6AaNGRHQ6CxNABFwi41HBLdobh4608sEEQ47oL5TDWNAOxbGzS2b5-XF-VGbrzj5uP6kR60A6hVoSLYX7WoYUgNer46LvtgLdJu0cMRC2rG89zZyuAPU6SoHw4oRO9mV14cKWCXxYK5jQ5ZHPsztWS41HkNobf_XwQ"
                      alt="Tavern"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd] truncate">
                      Fantasy Tavern & Rumor Table
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#ccc3d8] font-label-sm text-[11px] font-mono">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>Yesterday</span>
                      <span>•</span>
                      <span className="text-[#4cd7f6]">RPGs</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onShowToast('Favorited generator', 'bookmark')}
                  className="w-9 h-9 rounded-full bg-[#222a3d] flex items-center justify-center text-[#d2bbff] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px] fill-icon">bookmark</span>
                </button>
              </div>

              <div className="w-full p-3 rounded-lg bg-[#060e20] text-[#ccc3d8] font-body-sm text-[13px] border border-[#222a3d]/50">
                <div className="flex items-center justify-between text-[#ccc3d8] font-label-sm text-[10px] font-mono mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#d2bbff]">Current Preview</span>
                  <span className="text-[10px] opacity-70">#seed-1082</span>
                </div>
                <p className="text-[#dae2fd] leading-relaxed line-clamp-2">
                  {savedItems.find((s) => s.id === '2')?.content}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => handleQuickRoll('2', 'Fantasy Tavern')}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#732ee4] text-[#ede0ff] font-label-lg text-[13px] font-mono font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">casino</span>
                  <span>Quick Roll</span>
                </button>
                <button
                  onClick={() => handleCopy(savedItems.find((s) => s.id === '2')?.content || '')}
                  className="w-11 h-11 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] flex items-center justify-center active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">content_copy</span>
                </button>
                <button
                  onClick={() => onOpenGenerator('fantasy-tavern')}
                  className="w-11 h-11 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] flex items-center justify-center active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">tune</span>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden rounded-xl bg-[#171f33] border border-[#222a3d] p-4 shadow-md flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-[#222a3d] overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIJ8zDqat_JEz_vHDnxRbCCHlmOIL2SXmbZ2HpfVVIGQQhZDrYVVu5jswfxCKabVxhxeXpKijfAvA3bq37i-i9ldCpFPtv_9UNOxDrdWZLzhT3QpIA0kIDOKQ4dPmb3XIEsvB0TrYxslO6xKnfIzYSx28YmVbnAKIcQxMlPbXS7XRnz9NMcsFhl09uUQkqGYKO8JNjvgAMP-WePRUWUe3TzIxLtNviCUOiWGknVg0y-1tG5d3PJz81DA"
                      alt="Anime"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd] truncate">
                      AI Anime Style Randomizer
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#ccc3d8] font-label-sm text-[11px] font-mono">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>3 days ago</span>
                      <span>•</span>
                      <span className="text-[#4cd7f6]">Prompts</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onShowToast('Favorited generator', 'bookmark')}
                  className="w-9 h-9 rounded-full bg-[#222a3d] flex items-center justify-center text-[#d2bbff] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px] fill-icon">bookmark</span>
                </button>
              </div>

              <div className="w-full p-3 rounded-lg bg-[#060e20] text-[#ccc3d8] font-body-sm text-[13px] border border-[#222a3d]/50">
                <div className="flex items-center justify-between text-[#ccc3d8] font-label-sm text-[10px] font-mono mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#d2bbff]">Current Preview</span>
                  <span className="text-[10px] opacity-70">#seed-6632</span>
                </div>
                <p className="text-[#dae2fd] leading-relaxed line-clamp-2">
                  {savedItems.find((s) => s.id === '3')?.content}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => handleQuickRoll('3', 'Anime Prompt')}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#732ee4] text-[#ede0ff] font-label-lg text-[13px] font-mono font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">casino</span>
                  <span>Quick Roll</span>
                </button>
                <button
                  onClick={() => handleCopy(savedItems.find((s) => s.id === '3')?.content || '')}
                  className="w-11 h-11 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] flex items-center justify-center active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">content_copy</span>
                </button>
                <button
                  onClick={() => onOpenGenerator('feline-jung')}
                  className="w-11 h-11 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] flex items-center justify-center active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[19px]">tune</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="flex flex-col w-full gap-2.5">
          <div className="flex items-center justify-between py-1">
            <span className="font-label-sm text-[11px] uppercase text-[#ccc3d8] font-mono tracking-wider">
              Logged Output Stream
            </span>
            <button
              onClick={() => {
                setHistoryItems([]);
                onShowToast('Cleared history feed', 'delete_sweep');
              }}
              className="text-[#4edea3] font-label-sm text-[11px] font-mono hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span> Clear All
            </button>
          </div>

          {historyItems.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col gap-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between text-[#ccc3d8] font-label-sm text-[11px] font-mono">
                <span className="text-[#d2bbff] font-bold">{item.title}</span>
                <span>{item.time}</span>
              </div>
              <p className="font-body-sm text-[13px] text-[#dae2fd]">{item.content}</p>
              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  onClick={() => handleCopy(item.content)}
                  className="px-2 py-1 rounded bg-[#222a3d] text-[#dae2fd] font-label-sm text-[11px] font-mono flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MY GEMS TAB */}
      {activeTab === 'created' && (
        <div className="flex flex-col w-full gap-2.5">
          <div className="p-3.5 rounded-xl bg-[#171f33] border border-[#222a3d] flex items-center justify-between shadow-sm">
            <div className="flex flex-col min-w-0">
              <h4 className="font-headline-sm text-[14px] font-bold text-[#dae2fd]">Grimdark Weather Matrix</h4>
              <span className="font-label-sm text-[11px] text-[#ccc3d8] font-mono">Published • 1.2k total plays</span>
            </div>
            <span className="px-2 py-1 rounded-full bg-[#007650] text-[#76ffc2] font-label-sm text-[10px] font-mono font-bold">
              Live
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#171f33] border border-[#222a3d] flex items-center justify-between shadow-sm">
            <div className="flex flex-col min-w-0">
              <h4 className="font-headline-sm text-[14px] font-bold text-[#dae2fd]">Lovecraftian Artifact Crafter</h4>
              <span className="font-label-sm text-[11px] text-[#ccc3d8] font-mono">Draft • Updated yesterday</span>
            </div>
            <span className="px-2 py-1 rounded-full bg-[#222a3d] text-[#ccc3d8] font-label-sm text-[10px] font-mono">
              Draft
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#171f33] border border-[#222a3d] flex items-center justify-between shadow-sm">
            <div className="flex flex-col min-w-0">
              <h4 className="font-headline-sm text-[14px] font-bold text-[#dae2fd]">Feline Depth Archetypes</h4>
              <span className="font-label-sm text-[11px] text-[#ccc3d8] font-mono">Local IDE • Synced with Stitch</span>
            </div>
            <button
              onClick={() => onOpenGenerator('feline-jung')}
              className="px-2.5 py-1 rounded-lg bg-[#7c3aed] text-[#ede0ff] font-label-sm text-[11px] font-mono font-bold"
            >
              Open IDE
            </button>
          </div>
        </div>
      )}

      {/* Pinned Snippet Drawer Section */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">push_pin</span>
            <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd]">Pinned Output Snippet</h3>
          </div>
          <span className="font-label-sm text-[10px] text-[#4cd7f6] uppercase font-mono font-semibold">
            Ready to Paste
          </span>
        </div>

        {/* Pinned Card Display */}
        <div className="relative overflow-hidden rounded-xl bg-[#222a3d] border border-[#4a4455]/40 p-4 shadow-md flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#d2bbff]">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              </div>
              <span className="font-label-md text-[13px] text-[#dae2fd] font-bold font-mono">
                Tavern Quest Seed #492
              </span>
            </div>
            <span className="font-label-sm text-[11px] text-[#ccc3d8] font-mono">Pinned at 14:32</span>
          </div>

          <div className="p-3 rounded-lg bg-[#060e20] text-[#dae2fd] font-body-sm text-[13px] leading-relaxed border border-[#222a3d]/50">
            <p>{pinnedSnippet}</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-[#ccc3d8] font-label-sm text-[11px] font-mono">
              <span className="material-symbols-outlined text-[15px] text-[#4edea3]">check</span>
              <span>Copied {pinnedCopyCount} times</span>
            </div>
            <button
              onClick={handleCopyPinned}
              className="h-9 px-3 rounded-lg bg-[#03b5d3] hover:bg-[#4cd7f6] text-[#00424e] font-label-md text-[12px] font-mono font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>Copy to Clipboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export & Cloud Sync Utility Banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#222a3d] via-[#171f33] to-[#222a3d] border border-[#4a4455]/30 p-4 shadow-md flex flex-col gap-2.5 mt-2">
        <div className="flex items-start gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 text-[#d2bbff] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-headline-sm text-[14px] font-bold text-[#dae2fd]">Sync & Portable Backups</h4>
            <p className="font-body-sm text-[12px] text-[#ccc3d8] mt-0.5 leading-snug">
              Sync your saved rolls across devices or export entire roll history as JSON/Markdown for your notes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleExportMarkdown}
            className="flex-1 h-9 rounded-lg bg-[#060e20] hover:bg-[#171f33] text-[#dae2fd] font-label-md text-[12px] font-mono flex items-center justify-center gap-1 border border-[#222a3d] shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export .MD</span>
          </button>
          <button
            onClick={handleExportJson}
            className="flex-1 h-9 rounded-lg bg-[#060e20] hover:bg-[#171f33] text-[#dae2fd] font-label-md text-[12px] font-mono flex items-center justify-center gap-1 border border-[#222a3d] shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>JSON Export</span>
          </button>
          <button
            aria-label="Trigger Sync"
            onClick={() => {
              playHapticSound('success');
              onShowToast('Cloud Sync successful: 55 items mirrored', 'sync');
            }}
            className="w-9 h-9 rounded-lg bg-[#7c3aed] text-[#ede0ff] flex items-center justify-center active:scale-95 transition-all shadow-md shadow-[#7c3aed]/30"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
          </button>
        </div>
      </div>
    </div>
  );
};
