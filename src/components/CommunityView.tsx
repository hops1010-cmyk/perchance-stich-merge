import React, { useState } from 'react';
import { playHapticSound } from '../utils/perchanceEngine';
import { DetailGeneratorId } from '../types/generator';

interface CommunityViewProps {
  onOpenGenerator: (detailId: DetailGeneratorId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  onOpenGenerator,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'trending_forks' | 'leaderboard'>('discussions');

  const [posts, setPosts] = useState([
    {
      id: '1',
      author: '@JungianPaws',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDze-e4wmo-18EeTBofM01n73i0Sd14cvk5soLXg0moo44Z_EbTIx31DsgZ7YjRzdM4H-TcYNBNvmdCfLHOwah2AQLE9gnNZjcN7LuHSM6i57upSWDKl-V2UaWHz3cx9fr0IQ0CoKW4INsD6vluahBq3S38rbIz8gtbtJxKgS_siRAjSJsoFij3_q-SyQ7a-DULlVp3aoFnQ2NKGYd3nxMiFRrSmvYWX-M1yW9ZyXii3tmbV_ZPG_dxdw',
      title: 'How to structure hierarchical weights with dynamic Stitch token bindings',
      content: 'Pro tip for feline archetype grammars: use ^1.5 for subtle ego shifts and bind $color.primary directly into CSS variables so your preview components dynamically re-skin in real-time!',
      likes: 128,
      comments: 34,
      time: '1 hour ago',
      tags: ['Stitch', 'Perchance Grammar']
    },
    {
      id: '2',
      author: '@DungeonArchitect',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-RyJ4Ot3OJ1C2_6aBHDMkxhyFsOu-Sf9HJOI3edGY4d3FuHeBwe0LnlhjoWzgS1_cl3yHBF3NpRyqnSNVSiooiCobp_yWjJag5UyLaRpORZEmGpTWO5y-GHn_rdn8g31wijKTaIeE0O-LheLsyoqQYKdTP8i8nmQDGAfqH5Ge5Zb5j9_-nQGMSDfxwXlCUhbKiCQcZkQyXVVvywNPnvi5PX-egnuK1j15KDUBR9-HXYBGQKwNa-GQ2g',
      title: 'Tavern Rumor Table v2.4 released with 120+ complications',
      content: 'Added stochastic timers, church inquisitors, and moonlight triggers. Forked by 382 creators this weekend. Feedback welcome!',
      likes: 215,
      comments: 52,
      time: '3 hours ago',
      tags: ['D&D 5e', 'Tavern Rumors']
    }
  ]);

  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    playHapticSound('success');
    setPosts((prev) => [
      {
        id: Date.now().toString(),
        author: '@HopsCreator',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGOU_M_dYLvX6P8kwXwhB7uc0KWCh6elY5rmyFxGshvIFu0Bufa_X8CuQK1q-Cl15Db6IH0Q6oOkT4pCntx237ECgHGtzQYR-Axz5ctP-TwaSwk72E6334oKyjv0RmYqOZQKCaSAlRTXgOw-F8RydWJZ1VpJ52yxELQN8RMerhALqvwZaJcGP5pa0lbyCXAEKewNF28IlUQv4tq6f7o6dnUI4TRlyxwHPUnsrcNMTliXYvTVhOdm7GWQ',
        title: 'Community Note',
        content: newPostText.trim(),
        likes: 1,
        comments: 0,
        time: 'Just now',
        tags: ['Discussion']
      },
      ...prev
    ]);
    setNewPostText('');
    onShowToast('Posted to Community Feed!', 'forum');
  };

  const handleLikePost = (id: string) => {
    playHapticSound('click');
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
    onShowToast('Liked post', 'favorite');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-12 pt-1 font-body-md">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="font-headline-lg-mobile text-[22px] font-extrabold text-[#dae2fd]">
            Community Hub
          </h2>
          <p className="font-body-sm text-[12px] text-[#ccc3d8] font-mono">
            Discussions, grammar advice, and live fork activity
          </p>
        </div>
        <span className="font-label-sm text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#03b5d3]/20 text-[#4cd7f6] border border-[#03b5d3]/40 font-bold">
          48.2k Active Builders
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 p-1 rounded-xl bg-[#060e20] border border-[#222a3d] font-mono text-[12px]">
        {[
          { id: 'discussions', label: 'Discussions' },
          { id: 'trending_forks', label: 'Top Forks' },
          { id: 'leaderboard', label: 'Creators' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id as any);
              playHapticSound('click');
            }}
            className={`py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === t.id
                ? 'bg-[#171f33] text-[#4cd7f6] shadow-sm'
                : 'text-[#ccc3d8] hover:text-[#dae2fd]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Post Input Form */}
      <form
        onSubmit={handleCreatePost}
        className="p-3.5 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col gap-2.5 shadow-md"
      >
        <span className="font-label-md text-[11px] font-mono uppercase text-[#ccc3d8]">
          Share Generator Insight or Grammar Tip
        </span>
        <textarea
          rows={2}
          className="w-full bg-[#060e20] text-[#dae2fd] text-[13px] rounded-lg p-2.5 border border-[#222a3d] focus:outline-none focus:border-[#7c3aed] placeholder:text-[#958da1]"
          placeholder="What are you building with Perchance today? Ask a question or share a list..."
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <div className="flex justify-between items-center pt-1">
          <span className="text-[11px] font-mono text-[#958da1]">Markdown & Perchance AST syntax supported</span>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-[#7c3aed] text-[#ede0ff] font-label-md text-[12px] font-mono font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            Post
          </button>
        </div>
      </form>

      {/* Feed */}
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-4 rounded-xl bg-[#171f33] border border-[#222a3d] flex flex-col gap-2.5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="font-label-md text-[13px] font-mono font-bold text-[#dae2fd]">
                  {post.author}
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-[#958da1] font-mono">{post.time}</span>
            </div>

            <h3 className="font-headline-sm text-[15px] font-bold text-[#dae2fd]">{post.title}</h3>
            <p className="font-body-sm text-[13px] text-[#ccc3d8] leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-1.5 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#222a3d] text-[#4cd7f6] font-mono text-[10px]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#222a3d]/60 font-mono text-[11px] text-[#ccc3d8]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center gap-1 hover:text-[#ffb4ab] transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">favorite</span>
                  <span>{post.likes}</span>
                </button>
                <button
                  onClick={() => onShowToast('Showing comment thread', 'chat_bubble')}
                  className="flex items-center gap-1 hover:text-[#4cd7f6] transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">chat_bubble</span>
                  <span>{post.comments}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playHapticSound('click');
                  onOpenGenerator('feline-jung');
                }}
                className="text-[#d2bbff] hover:underline flex items-center gap-0.5"
              >
                <span>View Generator</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
