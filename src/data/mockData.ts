import { GeneratorItem, Curator, CommunityFork, SavedRollItem } from '../types/generator';

export const PERCHANCE_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1Vp6b6_J65rElIKY3L0N3wSZQwhrPSlzb9Hlq6xYHAECSO08v4iXP6WzW133AlU7WM9J90Mqcb-3_cC-cB8nHRSLU9L093CQc2lnKMSRXU7VX9IP-GyZuXZMzorEhvmTwtyoMbLlTbe94wSNnO2oe-2YYHI2kKqlr1_7KoFuqds_f_Dba55UrbCuS8zBhhtKfAgvsqEmgCU82QxfRTXeuGnxfRMgZedcvBNzdhNdeunNS9TtZbn5AUoF2SD';

export const CURATED_CATEGORIES = [
  {
    id: 'character',
    title: 'Character Creation',
    rolls: '8,420 rolls',
    icon: 'theater_comedy',
    colorClass: 'bg-primary-container text-on-primary-container',
    accentGlow: 'bg-primary-container/20'
  },
  {
    id: 'writing',
    title: 'Writing & Story',
    rolls: '12,150 rolls',
    icon: 'auto_stories',
    colorClass: 'bg-secondary-container text-on-secondary-container',
    accentGlow: 'bg-secondary-container/20'
  },
  {
    id: 'rpg',
    title: 'Tabletop RPG',
    rolls: '9,800 rolls',
    icon: 'casino',
    colorClass: 'bg-tertiary-container text-on-tertiary-container',
    accentGlow: 'bg-tertiary-container/20'
  },
  {
    id: 'names',
    title: 'Name Forgers',
    rolls: '6,200 rolls',
    icon: 'sell',
    colorClass: 'bg-surface-container-highest text-secondary',
    accentGlow: 'bg-surface-container-highest/50'
  },
  {
    id: 'prompts',
    title: 'AI Art Prompts',
    rolls: '14,300 rolls',
    icon: 'auto_awesome',
    colorClass: 'bg-primary-container text-on-primary-container',
    accentGlow: 'bg-primary-container/20'
  },
  {
    id: 'worldbuilding',
    title: 'Worldbuilding',
    rolls: '4,900 rolls',
    icon: 'public',
    colorClass: 'bg-secondary-container text-on-secondary-container',
    accentGlow: 'bg-secondary-container/20'
  },
  {
    id: 'games',
    title: 'Games & Fun',
    rolls: '7,100 rolls',
    icon: 'sports_esports',
    colorClass: 'bg-tertiary-container text-on-tertiary-container',
    accentGlow: 'bg-tertiary-container/20'
  },
  {
    id: 'utility',
    title: 'Utility & Code',
    rolls: '3,400 rolls',
    icon: 'terminal',
    colorClass: 'bg-surface-container-highest text-tertiary',
    accentGlow: 'bg-surface-container-highest/50'
  }
];

export const FEATURED_CURATORS: Curator[] = [
  {
    name: 'AstraForge',
    handle: '@AstraForge',
    followers: '14.8k followers',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDze-e4wmo-18EeTBofM01n73i0Sd14cvk5soLXg0moo44Z_EbTIx31DsgZ7YjRzdM4H-TcYNBNvmdCfLHOwah2AQLE9gnNZjcN7LuHSM6i57upSWDKl-V2UaWHz3cx9fr0IQ0CoKW4INsD6vluahBq3S38rbIz8gtbtJxKgS_siRAjSJsoFij3_q-SyQ7a-DULlVp3aoFnQ2NKGYd3nxMiFRrSmvYWX-M1yW9ZyXii3tmbV_ZPG_dxdw',
    verified: true,
    specialty: 'Cyberpunk & Sci-Fi'
  },
  {
    name: 'DungeonRolls',
    handle: '@DungeonRolls',
    followers: '22.4k followers',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-RyJ4Ot3OJ1C2_6aBHDMkxhyFsOu-Sf9HJOI3edGY4d3FuHeBwe0LnlhjoWzgS1_cl3yHBF3NpRyqnSNVSiooiCobp_yWjJag5UyLaRpORZEmGpTWO5y-GHn_rdn8g31wijKTaIeE0O-LheLsyoqQYKdTP8i8nmQDGAfqH5Ge5Zb5j9_-nQGMSDfxwXlCUhbKiCQcZkQyXVVvywNPnvi5PX-egnuK1j15KDUBR9-HXYBGQKwNa-GQ2g',
    specialty: 'D&D 5e Quest Generators'
  },
  {
    name: 'SyntaxWeaver',
    handle: '@SyntaxWeaver',
    followers: '9.1k followers',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGOU_M_dYLvX6P8kwXwhB7uc0KWCh6elY5rmyFxGshvIFu0Bufa_X8CuQK1q-Cl15Db6IH0Q6oOkT4pCntx237ECgHGtzQYR-Axz5ctP-TwaSwk72E6334oKyjv0RmYqOZQKCaSAlRTXgOw-F8RydWJZ1VpJ52yxELQN8RMerhALqvwZaJcGP5pa0lbyCXAEKewNF28IlUQv4tq6f7o6dnUI4TRlyxwHPUnsrcNMTliXYvTVhOdm7GWQ',
    specialty: 'Recursive Grammar ASTs'
  },
  {
    name: 'GrimoireBot',
    handle: '@GrimoireBot',
    followers: '18.2k followers',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCGFagBm7FMTcjUHRjkD3xxudQmpWlWzowAfZKa5PlroL4beZKRHenN77HvPM5QcWplNxAa6r280oTZxjMYynGJU2rRcaxSyZF4si1FqOcjMTpFTrdYLmrtTel9vGw39Vt1Ryj2H_5fzsm3T0MxcPG2Xsd4lZSDYbNImnUjOkpQjCJNVJlVOrHgveGWEHW8L7jtbQfaTPs7zAC8uKZ_UwsBREwqpUaYOYaCY0ocMASVUwDwexssrN_tg',
    specialty: 'Occult & Arcane Generators'
  }
];

export const COMMUNITY_FORKS: CommunityFork[] = [
  {
    id: 'fork-1',
    title: 'Cyberpunk NPC Matrix v3',
    remixedFrom: '@neo_glitch',
    preview: '“Renegade netrunner with cybernetic optic glint, currently hunted by Arasaka logistics division...”',
    timeAgo: '3m ago',
    likes: 142,
    tag: 'Cyberpunk'
  },
  {
    id: 'fork-2',
    title: 'Tavern Rumor Mill & Hooks',
    remixedFrom: '@valk_writer',
    preview: '“The old dwarf claims the clocktower bell rings once when someone tells a lie near the square.”',
    timeAgo: '18m ago',
    likes: 89,
    tag: 'High Fantasy'
  },
  {
    id: 'fork-3',
    title: 'Midjourney Stylizer Prompter',
    remixedFrom: '@pixel_mage',
    preview: '“hyper-detailed isometric biomechanical terrarium, octane render, volumetric mist, --ar 16:9 --v 6.0”',
    timeAgo: '42m ago',
    likes: 315,
    tag: 'AI Art'
  }
];

export const EXPLORE_GENERATORS: GeneratorItem[] = [
  {
    id: 'feline-jung',
    detailId: 'feline-jung',
    title: 'The Shadow Kitten (Depth Archetypes)',
    creator: 'Carl Jung Cat',
    creatorHandle: '@carl_jung_cat',
    rollsCount: 142000,
    savesCount: 12400,
    forksCount: 1820,
    category: 'writing',
    tags: ['Shadow & Id', 'Jungian Psychology', 'Feline Procedural'],
    version: '4.2',
    curated: true,
    sampleOutput: '“Nyx, Velvet-Eared Shadow Stalker — Manifests repressed kitten impulses, prowling in midnight shadows and toppling psychic urns.”',
    rating: 5.0
  },
  {
    id: 'fantasy-tavern',
    detailId: 'fantasy-tavern',
    title: 'Fantasy Quest & Tavern Rumors',
    creator: 'Dungeon Master',
    creatorHandle: '@dungeonmaster',
    rollsCount: 48219,
    savesCount: 1400,
    forksCount: 382,
    category: 'rpg',
    tags: ['Tabletop RPG', 'Quests', 'D&D 5e'],
    version: '2.4',
    curated: true,
    sampleOutput: '“A mysterious hooded rogue offers you 250 gold pieces to steal an enchanted locket from the Iron Vault before the full moon.”',
    rating: 4.9
  },
  {
    id: 'deep-space',
    detailId: 'deep-space',
    title: 'Deep Space CRT Vector Telemetry',
    creator: 'Flight Dir',
    creatorHandle: '@flight_director',
    rollsCount: 64200,
    savesCount: 3200,
    forksCount: 940,
    category: 'sci-fi',
    tags: ['NASA CRT', 'Orbital Mechanics', 'Stochastic Vector'],
    version: '4.1',
    curated: true,
    sampleOutput: '“TRK: FELINE-IX PROBE. Solar particle radiation flux (^1.82 MeV) interacting with magnetosphere vector at Lagrange Point L2.”',
    rating: 5.0
  },
  {
    id: 'senex-elder',
    title: 'The Wise Elder Tomcat (Senex)',
    creator: 'Whisker Oracle',
    creatorHandle: '@whisker_oracle',
    rollsCount: 64100,
    savesCount: 2800,
    forksCount: 512,
    category: 'writing',
    tags: ['Senex / Wisdom', 'Mystic'],
    version: '1.8',
    curated: false,
    sampleOutput: '“An ancient silver Maine Coon dozing beneath the Bodhi tree. Whispers cryptic cosmic truths through a slow purr.”',
    rating: 5.0
  },
  {
    id: 'trickster-calico',
    title: 'Trickster Calico & Chaos Paws',
    creator: 'Loki Purr',
    creatorHandle: '@loki_purr',
    rollsCount: 49300,
    savesCount: 1950,
    forksCount: 340,
    category: 'writing',
    tags: ['Trickster', 'Chaos'],
    version: '2.0',
    curated: false,
    sampleOutput: '“A tortoiseshell kitten who unravels the yarn of reality and escapes into the subconscious pantry.”',
    rating: 4.8
  },
  {
    id: 'anima-dream',
    title: 'Anima / Animus Dream Feline',
    creator: 'Psyche Paws',
    creatorHandle: '@psyche_paws',
    rollsCount: 82000,
    savesCount: 5400,
    forksCount: 1100,
    category: 'prompts',
    tags: ['Anima / Animus', 'Dreams'],
    version: '3.1',
    curated: true,
    sampleOutput: '“A glowing ethereal Siamese pacing across lunar rooftops, guiding lost dreams back to the Self.”',
    rating: 4.9
  },
  {
    id: 'mandala-sphynx',
    title: 'The Self: Mandala Sphynx Oracle',
    creator: 'Individuation Cat',
    creatorHandle: '@individuation_cat',
    rollsCount: 31200,
    savesCount: 1200,
    forksCount: 220,
    category: 'writing',
    tags: ['The Self', 'Mandala'],
    version: '1.5',
    curated: false,
    sampleOutput: '“A hairless celestial sphinx sitting at the exact center of your psychic labyrinth.”',
    rating: 4.7
  }
];

export const INITIAL_SAVED_ITEMS: SavedRollItem[] = [
  {
    id: 'save-1',
    generatorId: 'cyberpunk-npc',
    generatorTitle: 'Cyberpunk NPC & Quest',
    content: '“Vex”, Augmented Netrunner fixing cyber-limbs in the Lower Basin. Wants a cracked biochip from Arasaka drone crash.',
    seed: '#seed-9421',
    timestamp: '2h ago',
    category: 'rpg'
  },
  {
    id: 'save-2',
    generatorId: 'fantasy-tavern',
    generatorTitle: 'Fantasy Tavern & Rumor Table',
    content: 'The Weeping Golem Inn: Serving smoked toadstool cider. The bartender whispers that the city bells rang 13 times at midnight.',
    seed: '#seed-1082',
    timestamp: 'Yesterday',
    category: 'rpg'
  },
  {
    id: 'save-3',
    generatorId: 'anime-randomizer',
    generatorTitle: 'AI Anime Style Randomizer',
    content: '90s Retro Cel-shaded Mecha Pilot, volumetric neon rain, hyper-detailed mechanical joints, dynamic high angle shot.',
    seed: '#seed-6632',
    timestamp: '3 days ago',
    category: 'prompts'
  }
];
