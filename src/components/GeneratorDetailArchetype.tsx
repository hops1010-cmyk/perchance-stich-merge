import React, { useState } from 'react';
import { rollArchetype, playHapticSound, ArchetypeRollResult } from '../utils/perchanceEngine';

interface GeneratorDetailArchetypeProps {
  onBack: () => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSaveRoll: (title: string, text: string, category: string) => void;
}

export const GeneratorDetailArchetype: React.FC<GeneratorDetailArchetypeProps> = ({
  onShowToast,
  onSaveRoll
}) => {
  const [activeStudioTab, setActiveStudioTab] = useState<'syntax' | 'tokens' | 'preview'>('syntax');
  const [isSpinning, setIsSpinning] = useState(false);
  const [promptInput, setPromptInput] = useState('Add an Anima kitten sub-table with high dream affinity');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  // Dynamic code lines allowing quick inserts
  const [codeLines, setCodeLines] = useState<string[]>([
    '// Feline Jungian Procedural Engine Definition',
    'output',
    '  A [feline_archetype.selectOne] prowls through the [psychic_layer] seeking to [individuation_act]',
    '',
    'feline_archetype',
    '  The Shadow Kitten ^3',
    '    aspect = repressed instinct, midnight prowler',
    '    stitch_token = $color.primary',
    '  The Mandala Sphynx ^1.5',
    '    aspect = the unified Self, cosmic gaze',
    '    stitch_token = $color.tertiary',
    '  The Trickster Calico ^2',
    '    aspect = playful ego-disruption, yarn chaos',
    '  The Senex Tomcat ^2',
    '    aspect = ancestral wisdom, still archetype',
    '',
    'psychic_layer',
    '  personal unconscious | the dream veil | collective unconscious',
    '',
    'individuation_act',
    '  unravel the complex knots of [inner_child]',
    '  integrate the shadow whisker',
    '  gaze into the mirror of the Persona'
  ]);

  const [archetype, setArchetype] = useState<ArchetypeRollResult>({
    name: "The Shadow Kitten",
    layer: "the dream veil",
    act: "unravel the complex knots of inner playful innocence",
    aspect: "Repressed Instinct & Insight",
    prob: "42.8%",
    stitchToken: "$color.primary",
    tokenVar: "var(--color-primary: #7c3aed)",
    surfaceDepth: "--surface-container-high",
    glowIntensity: "kinetic-spark (0.85)",
    badge: "Shadow Archetype",
    badgeClass: "bg-[#7c3aed] text-[#ede0ff]",
    fullResolution: '"The Shadow Kitten prowls through the the dream veil seeking to unravel the complex knots of inner playful innocence."',
    entropy: "0.84",
    imgPrompt: "Mystical obsidian kitten with luminous purple energy paws walking on reflective water in dream realm, concept art",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATrBc97KKYKoz2TOsfuGHygp8943ZZkCToo1Kmv-jOGuTY51Ejtopw8EJIWd5AEtsZ3R1Jn21oUXytrr4ETlQC99phx7r1b7jXWE59_QzOc83bDT4SgGbvagGEzJOuFxCZJPr9m7VsNErdecZ_YU8mg1c2EsLp4Iozi6SCl5M04Nltotp93U16-4iomYKvkB23kIyTRnQy68nXCr28C1AAUJ-CuqZAKDC3nsoaeN3pWJpLKUlldTXkkg"
  });

  const handleTestRoll = () => {
    playHapticSound('roll');
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 350);

    const result = rollArchetype();
    setArchetype(result);
    onShowToast(`Rolled ${result.name}! Entropy: ${result.entropy}`, 'casino');
  };

  const handleInsertSnippet = (snippet: string) => {
    playHapticSound('click');
    setCodeLines((prev) => [...prev, `  ${snippet}`]);
    onShowToast(`Appended grammar snippet: ${snippet}`, 'add_code');
  };

  const handleCopyGrammar = () => {
    playHapticSound('click');
    navigator.clipboard?.writeText(codeLines.join('\n'));
    onShowToast('Grammar code copied to clipboard!', 'content_copy');
  };

  const handleSynthesizePrompt = () => {
    if (!promptInput.trim()) return;
    playHapticSound('success');
    setCodeLines((prev) => [
      ...prev,
      '',
      'anima_kitten ^1.8',
      '  aspect = lunar intuition, dream weaver',
      '  stitch_token = $color.secondary'
    ]);
    setAiFeedback(`Synthesized: Added [anima_kitten] sub-tree based on "${promptInput}"`);
    onShowToast('Grammar tree expanded by Stitch AI!', 'auto_awesome');
  };

  const handleAiAction = (action: 'balance' | 'extract' | 'export') => {
    playHapticSound('click');
    if (action === 'balance') {
      onShowToast('Grammar weights normalized to 100% distribution.', 'balance');
    } else if (action === 'extract') {
      onShowToast('12 design tokens mapped into theme bindings.', 'token');
    } else {
      onSaveRoll('feline_jung.perchance', archetype.fullResolution, 'writing');
      onShowToast('Compiled archetypal grammar bundle (.perchance) exported!', 'download');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-12 pt-1 font-body-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Code AST IDE & Execution */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {/* Top Meta Badges & Quick Flow Strip */}
          <div className="flex flex-col gap-2.5 bg-[#060e20] p-3 rounded-xl border border-[#222a3d]">
            <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar font-mono">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#222a3d] text-[#4cd7f6] text-[10px] tracking-wider uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                  Engine v4.2
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#7c3aed]/20 text-[#d2bbff] text-[10px] tracking-wider uppercase font-semibold">
                  <span className="material-symbols-outlined text-[12px] text-[#d2bbff]">auto_fix</span>
                  Stitch Tokens Active
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#ccc3d8] text-[10px] flex-shrink-0">
                <span className="material-symbols-outlined text-[14px] text-[#4edea3]">check_circle</span>
                <span>AST Validated</span>
              </div>
            </div>

            {/* Segmented Studio Mode Tabs */}
            <div className="grid grid-cols-3 p-1 rounded-xl bg-[#222a3d] text-center font-mono">
              {(['syntax', 'tokens', 'preview'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveStudioTab(tab);
                    playHapticSound('click');
                  }}
                  className={`py-1.5 rounded-lg text-[12px] font-semibold transition-all flex items-center justify-center gap-1 ${
                    activeStudioTab === tab
                      ? 'bg-[#7c3aed] text-[#ede0ff] shadow-md'
                      : 'text-[#ccc3d8] hover:text-[#dae2fd]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {tab === 'syntax' ? 'terminal' : tab === 'tokens' ? 'palette' : 'dataset'}
                  </span>
                  <span className="capitalize">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Archetypal Seed Generator (Code & Grammar Mobile IDE) */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#7c3aed]"></div>
                <span className="font-label-md text-[11px] uppercase tracking-wider text-[#ccc3d8]">
                  Archetypal Seed Generator
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#2d3449] text-[#4cd7f6]">
                feline_jung.perchance
              </span>
            </div>

            {/* Mobile IDE Shell Card */}
            <div className="flex flex-col rounded-xl bg-[#060e20] border border-[#222a3d] overflow-hidden shadow-xl">
              {/* Editor Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#222a3d] border-b border-[#2d3449]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#03b5d3]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                  <span className="ml-2 font-label-sm text-[11px] font-mono text-[#ccc3d8]">
                    Grammar AST: Depth Archetypes
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    aria-label="Format Code"
                    onClick={() => {
                      playHapticSound('click');
                      onShowToast('Formatted grammar AST indentation', 'code_blocks');
                    }}
                    className="w-7 h-7 rounded-lg bg-[#171f33] flex items-center justify-center text-[#ccc3d8] hover:text-[#dae2fd] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">code_blocks</span>
                  </button>
                  <button
                    aria-label="Copy Perchance Grammar"
                    onClick={handleCopyGrammar}
                    className="w-7 h-7 rounded-lg bg-[#171f33] flex items-center justify-center text-[#ccc3d8] hover:text-[#dae2fd] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">content_copy</span>
                  </button>
                </div>
              </div>

              {/* Syntax Highlighted Code Viewer */}
              <div className="p-3 font-mono text-[12px] overflow-x-auto leading-relaxed bg-[#131b2e] select-text max-h-56">
                {codeLines.map((line, idx) => {
                  if (line.startsWith('//')) {
                    return (
                      <div key={idx} className="text-[#958da1] opacity-60">
                        {line}
                      </div>
                    );
                  }
                  if (line.startsWith('output') || line.startsWith('feline_archetype') || line.startsWith('psychic_layer') || line.startsWith('individuation_act')) {
                    return (
                      <div key={idx} className="text-[#4cd7f6] font-bold mt-1.5">
                        {line}
                      </div>
                    );
                  }
                  if (line.includes('^')) {
                    return (
                      <div key={idx} className="pl-3 text-[#d2bbff] font-semibold">
                        {line}
                      </div>
                    );
                  }
                  if (line.includes('$color.')) {
                    return (
                      <div key={idx} className="pl-6 text-[#ccc3d8] text-[11px]">
                        {line}
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="pl-3 text-[#dae2fd]">
                      {line}
                    </div>
                  );
                })}
              </div>

              {/* Interactive Grammar Helper Bar */}
              <div className="px-3 py-2 bg-[#171f33] flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono">
                <span className="text-[10px] uppercase text-[#958da1] flex-shrink-0">Quick Insert:</span>
                <button
                  onClick={() => handleInsertSnippet('+ list_variant')}
                  className="px-2 py-1 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#4cd7f6] text-[11px] transition-transform active:scale-95 flex-shrink-0"
                >
                  + Add List
                </button>
                <button
                  onClick={() => handleInsertSnippet('^2.5')}
                  className="px-2 py-1 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#4edea3] text-[11px] transition-transform active:scale-95 flex-shrink-0"
                >
                  ^ Weight
                </button>
                <button
                  onClick={() => handleInsertSnippet('{dream_depth}')}
                  className="px-2 py-1 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#d2bbff] text-[11px] transition-transform active:scale-95 flex-shrink-0"
                >
                  {'{Variable}'}
                </button>
                <button
                  onClick={() => handleInsertSnippet('$color.primary')}
                  className="px-2 py-1 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#acedff] text-[11px] transition-transform active:scale-95 flex-shrink-0"
                >
                  $ Token
                </button>
              </div>

              {/* Test Roll Interactive Engine Trigger */}
              <div className="p-3 bg-[#131b2e] flex flex-col gap-2">
                <button
                  onClick={handleTestRoll}
                  className="w-full py-3 px-4 rounded-xl bg-[#7c3aed] text-white font-headline-sm text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#7c3aed]/25 active:scale-98 transition-all relative overflow-hidden group hover:brightness-110"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform duration-500 ${
                      isSpinning ? 'rotate-180' : ''
                    }`}
                  >
                    casino
                  </span>
                  <span>Test Roll Syntax</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-[#ede0ff]">
                    24 combinations
                  </span>
                </button>

                {/* Dynamic Output Shimmer Pill */}
                <div className="p-3 rounded-xl bg-[#2d3449] border border-[#4a4455]/40 flex flex-col gap-1 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#ccc3d8]">
                    <span className="flex items-center gap-1 text-[#4edea3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                      Generated Resolution
                    </span>
                    <span className="text-[#ccc3d8]/80">Entropy: {archetype.entropy}</span>
                  </div>
                  <p className="font-body-md text-[14px] text-[#dae2fd] leading-relaxed">
                    "The <strong className="text-[#d2bbff]">{archetype.name}</strong> prowls through the{' '}
                    <strong className="text-[#4cd7f6]">{archetype.layer}</strong> seeking to{' '}
                    <strong className="text-[#4edea3]">{archetype.act}</strong>."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Live Production Export & Runtime Telemetry */}
          <section className="flex flex-col gap-2 pt-1 font-mono">
            <div className="p-3 rounded-xl bg-[#060e20] border border-[#222a3d] flex flex-col gap-3 shadow-md">
              <div className="flex items-center justify-between text-[11px] text-[#ccc3d8] px-1">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                  Parsed in 4ms
                </span>
                <span>0 Syntax Errors</span>
                <span className="text-[#4cd7f6]">12 Active Tokens</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    playHapticSound('success');
                    onShowToast('Synced AST graph to Stitch visual canvas!', 'auto_awesome');
                  }}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#03b5d3] text-white font-label-lg text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  <span>Sync Stitch</span>
                </button>

                <button
                  onClick={() => {
                    playHapticSound('success');
                    onShowToast('Forking instance to perchance.org generator feed...', 'fork_right');
                  }}
                  className="py-3 px-3 rounded-xl bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-label-lg text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all border border-[#4a4455]/40"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">fork_right</span>
                  <span>Fork Perchance</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Stitch Token Mapper & AI Synthesizer */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          {/* Section 2: Stitch Design System Dynamic Binding */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#4cd7f6]"></div>
                <span className="font-label-md text-[11px] uppercase tracking-wider text-[#ccc3d8]">
                  Stitch Design System Binding
                </span>
              </div>
              <span className="text-[11px] text-[#4cd7f6] flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-[13px]">sync_alt</span>
                Probabilistic → Token
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Token Matrix Card */}
              <div className="p-3 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col gap-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-[13px] font-mono text-[#dae2fd] font-bold">
                    Runtime Token Mapper
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#222a3d] text-[#4edea3]">
                    Live Link: active
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#222a3d]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#7c3aed]"></span>
                      <span className="text-[#dae2fd]">archetype.token_color</span>
                    </div>
                    <span className="material-symbols-outlined text-[13px] text-[#958da1]">arrow_forward</span>
                    <span className="text-[#d2bbff]">{archetype.tokenVar}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#222a3d]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#2d3449]"></span>
                      <span className="text-[#dae2fd]">archetype.surface_depth</span>
                    </div>
                    <span className="material-symbols-outlined text-[13px] text-[#958da1]">arrow_forward</span>
                    <span className="text-[#4cd7f6]">{archetype.surfaceDepth}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#222a3d]">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[13px] text-[#4edea3]">flare</span>
                      <span className="text-[#dae2fd]">archetype.glow_intensity</span>
                    </div>
                    <span className="material-symbols-outlined text-[13px] text-[#958da1]">arrow_forward</span>
                    <span className="text-[#4edea3]">{archetype.glowIntensity}</span>
                  </div>
                </div>
              </div>

              {/* Realtime Archetype Component Preview */}
              <div className="p-4 rounded-xl bg-[#222a3d] border border-[#4a4455]/40 flex flex-col gap-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[19px] text-[#d2bbff]">pets</span>
                    <span className="font-headline-sm text-[16px] font-bold text-[#dae2fd]">
                      {archetype.name}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold ${archetype.badgeClass}`}>
                    {archetype.badge}
                  </span>
                </div>

                {/* Dynamic Feline Visual Placeholder */}
                <div className="w-full h-36 rounded-lg overflow-hidden relative shadow-inner border border-[#2d3449]">
                  <img
                    className="w-full h-full object-cover"
                    src={archetype.imageUrl}
                    alt={archetype.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-[#dae2fd]">
                    <span className="bg-[#060e20]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      {archetype.aspect}
                    </span>
                    <span className="bg-[#060e20]/80 px-2 py-0.5 rounded text-[#4cd7f6] backdrop-blur-sm">
                      Prob: {archetype.prob}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-body-sm text-[12px] text-[#ccc3d8]">
                    Live component binding dynamically re-skins based on Perchance weights.
                  </span>
                  <button
                    onClick={() => {
                      playHapticSound('click');
                      onShowToast('Inspecting Stitch token overrides for archetype', 'tune');
                    }}
                    className="w-8 h-8 rounded-full bg-[#171f33] flex items-center justify-center text-[#d2bbff] hover:bg-[#31394d] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Stitch AI Syntax Assistant */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#4edea3]"></div>
                <span className="font-label-md text-[11px] uppercase tracking-wider text-[#ccc3d8]">
                  Stitch AI Syntax Assistant
                </span>
              </div>
              <span className="text-[11px] text-[#4edea3] flex items-center gap-0.5 font-mono">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                Prompt-to-Grammar
              </span>
            </div>

            {/* Synthesizer Shell */}
            <div className="p-3 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col gap-2.5 shadow-md">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-mono text-[#ccc3d8] uppercase">
                  Prompt-to-Perchance Synthesizer
                </label>
                <div className="flex items-center gap-2 bg-[#2d3449] rounded-xl px-3 py-2 border border-[#4a4455]/40">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">psychology</span>
                  <input
                    className="bg-transparent text-[#dae2fd] font-body-md text-[13px] focus:outline-none w-full placeholder:text-[#958da1]"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="Describe procedural grammar to synthesize..."
                  />
                  <button
                    onClick={handleSynthesizePrompt}
                    className="w-8 h-8 rounded-lg bg-[#03b5d3] text-[#00424e] flex items-center justify-center flex-shrink-0 shadow-md active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>

              {/* Quick AI Action Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 font-mono">
                <button
                  onClick={() => handleAiAction('balance')}
                  className="px-3 py-1.5 rounded-full bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-[11px] flex items-center gap-1 transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">balance</span>
                  Auto-Balance Weights
                </button>
                <button
                  onClick={() => handleAiAction('extract')}
                  className="px-3 py-1.5 rounded-full bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-[11px] flex items-center gap-1 transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#d2bbff]">token</span>
                  Extract Design Tokens
                </button>
                <button
                  onClick={() => handleAiAction('export')}
                  className="px-3 py-1.5 rounded-full bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-[11px] flex items-center gap-1 transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#4edea3]">download</span>
                  Export .perchance
                </button>
              </div>

              {aiFeedback && (
                <div className="text-[11px] font-mono p-2 rounded-lg bg-[#222a3d] text-[#4edea3] flex items-center gap-1.5 border border-[#4edea3]/30">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>{aiFeedback}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

};
