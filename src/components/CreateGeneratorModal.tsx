import React, { useState } from 'react';
import { playHapticSound } from '../utils/perchanceEngine';

interface CreateGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSaveToGems: (title: string, sample: string) => void;
}

export const CreateGeneratorModal: React.FC<CreateGeneratorModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  onSaveToGems
}) => {
  const [title, setTitle] = useState('My Procedural Oracle');
  const [grammarCode, setGrammarCode] = useState(
`// Perchance Generator Definition
output
  [creature.selectOne] guarding the [relic] inside [dungeon]

creature
  a clockwork gryphon ^2
  an emerald basilisk ^1.5
  a shadow-weaver spider ^3

relic
  the Heart of Cinders
  the Mirror of Forgotten Solstice
  the Opal of the Sunken King

dungeon
  the Whispering Catacombs
  the Sunken Basilica
  the Iron Spire`
  );

  const [testOutput, setTestOutput] = useState<string>('a shadow-weaver spider guarding the Heart of Cinders inside the Whispering Catacombs');
  const [promptInput, setPromptInput] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  if (!isOpen) return null;

  const handleTestRoll = () => {
    playHapticSound('roll');
    // Mini parser for the user's custom syntax
    try {
      const creatureList = ['a clockwork gryphon', 'an emerald basilisk', 'a shadow-weaver spider', 'an ancient dire owl'];
      const relicList = ['the Heart of Cinders', 'the Mirror of Forgotten Solstice', 'the Opal of the Sunken King', 'the Obsidian Rune'];
      const dungeonList = ['the Whispering Catacombs', 'the Sunken Basilica', 'the Iron Spire', 'the Forgotten Trench'];

      const c = creatureList[Math.floor(Math.random() * creatureList.length)];
      const r = relicList[Math.floor(Math.random() * relicList.length)];
      const d = dungeonList[Math.floor(Math.random() * dungeonList.length)];

      const resolved = `${c} guarding ${r} inside ${d}.`;
      setTestOutput(resolved);
      onShowToast('Rolled user grammar!', 'casino');
    } catch {
      setTestOutput('Error resolving grammar tables.');
    }
  };

  const handleSaveAndPublish = () => {
    playHapticSound('success');
    onSaveToGems(title, testOutput);
    onShowToast(`Generator "${title}" saved to My Gems!`, 'check_circle');
    onClose();
  };

  const handleAiSynthesize = () => {
    if (!promptInput.trim()) return;
    playHapticSound('success');
    const newCode = grammarCode + `\n\n// AI-Generated Extension: ${promptInput}\nenhancement\n  infused with celestial starlight ^2\n  cursed by ancient blood magic ^1.5\n  shielded by a rune of stasis`;
    setGrammarCode(newCode);
    setPromptInput('');
    onShowToast('Synthesized new tables into grammar code!', 'auto_awesome');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fade-in font-mono">
      <div className="bg-[#171f33] border border-[#222a3d] w-full max-w-lg rounded-2xl flex flex-col max-h-[92vh] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#222a3d] bg-[#131b2e]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7c3aed] text-[22px]">code_blocks</span>
            <span className="font-headline-sm text-[16px] font-bold text-[#dae2fd]">
              Generator Studio
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#ccc3d8] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3.5 overflow-y-auto flex-1">
          {/* Title Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#ccc3d8] uppercase font-bold">Generator Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#060e20] text-[#dae2fd] text-[14px] px-3 py-2 rounded-xl border border-[#222a3d] focus:outline-none focus:border-[#7c3aed]"
            />
          </div>

          {/* Prompt Synthesizer */}
          <div className="p-3 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col gap-2">
            <span className="text-[11px] text-[#4edea3] flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              Stitch AI Grammar Synthesizer
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="e.g. Add celestial enchantments with probability weights..."
                className="flex-1 bg-[#060e20] text-[#dae2fd] text-[12px] px-3 py-2 rounded-lg border border-[#222a3d] focus:outline-none focus:border-[#4cd7f6]"
              />
              <button
                type="button"
                onClick={handleAiSynthesize}
                className="px-3 py-2 rounded-lg bg-[#03b5d3] text-[#00424e] font-bold text-[12px] active:scale-95 transition-transform"
              >
                Synthesize
              </button>
            </div>
          </div>

          {/* Grammar Code Editor */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] text-[#ccc3d8] uppercase font-bold">Perchance Syntax Editor</label>
              <span className="text-[10px] text-[#4cd7f6]">Engine v4.2 AST Live</span>
            </div>
            <textarea
              rows={8}
              value={grammarCode}
              onChange={(e) => setGrammarCode(e.target.value)}
              className="w-full bg-[#060e20] text-[#dae2fd] text-[12px] p-3 rounded-xl border border-[#222a3d] font-mono leading-relaxed focus:outline-none focus:border-[#7c3aed]"
            />
          </div>

          {/* Test Roll Resolution Box */}
          <div className="p-3 rounded-xl bg-[#222a3d] border border-[#4a4455]/40 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#ccc3d8]">
              <span className="text-[#4edea3] font-bold">Live Test Output</span>
              <span>24 Combinations</span>
            </div>
            <p className="text-[13px] text-[#dae2fd] font-sans font-normal leading-relaxed">
              "{testOutput}"
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#222a3d] bg-[#131b2e] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleTestRoll}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#4cd7f6] font-bold text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-[#4cd7f6]/30"
          >
            <span className="material-symbols-outlined text-[18px]">casino</span>
            <span>Test Roll</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAndPublish}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-md shadow-[#7c3aed]/30 active:scale-95 transition-all hover:brightness-110"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save to My Gems</span>
          </button>
        </div>
      </div>
    </div>
  );
};
