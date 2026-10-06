import React, { useState } from 'react';
import { EXPLORE_GENERATORS, CURATED_CATEGORIES } from '../data/mockData';
import { DetailGeneratorId } from '../types/generator';
import { playHapticSound } from '../utils/perchanceEngine';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGenerator: (detailId: DetailGeneratorId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectGenerator
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = EXPLORE_GENERATORS.filter((gen) =>
    gen.title.toLowerCase().includes(query.toLowerCase()) ||
    gen.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
    gen.creatorHandle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-16 bg-black/80 backdrop-blur-md animate-fade-in font-mono">
      <div className="bg-[#171f33] border border-[#222a3d] w-full max-w-lg rounded-2xl flex flex-col shadow-2xl overflow-hidden max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-[#222a3d] flex items-center gap-2 bg-[#131b2e]">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">search</span>
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 66k generators, tags, authors..."
            className="w-full bg-transparent text-[#dae2fd] text-[14px] focus:outline-none placeholder:text-[#958da1]"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#ccc3d8] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="p-3 overflow-y-auto flex flex-col gap-2 flex-1">
          {results.length === 0 ? (
            <div className="text-center py-8 text-[#958da1] text-[13px]">
              No generators found matching "{query}"
            </div>
          ) : (
            results.map((gen) => (
              <div
                key={gen.id}
                onClick={() => {
                  playHapticSound('click');
                  if (gen.detailId) onSelectGenerator(gen.detailId);
                  onClose();
                }}
                className="p-3 rounded-xl bg-[#060e20] hover:bg-[#222a3d] border border-[#222a3d] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-[14px] font-bold text-[#dae2fd] group-hover:text-[#4cd7f6] transition-colors truncate">
                    {gen.title}
                  </span>
                  <span className="text-[11px] text-[#ccc3d8]">
                    {gen.creatorHandle} · {(gen.rollsCount / 1000).toFixed(0)}k rolls
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#958da1] group-hover:text-[#4cd7f6] text-[18px]">
                  arrow_forward
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
