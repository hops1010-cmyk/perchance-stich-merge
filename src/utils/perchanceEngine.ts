// Procedural Generation Engine & Audio Synthesis Helpers

export interface QuestRollResult {
  npc: string;
  npcClass: string;
  reward: string;
  rewardClass: string;
  questItem: string;
  itemClass: string;
  targetLocation: string;
  deadline: string;
  complication: string;
  tone: string;
}

export interface ArchetypeRollResult {
  name: string;
  layer: string;
  act: string;
  aspect: string;
  prob: string;
  stitchToken: string;
  tokenVar: string;
  surfaceDepth: string;
  glowIntensity: string;
  badge: string;
  badgeClass: string;
  fullResolution: string;
  entropy: string;
  imgPrompt: string;
  imageUrl: string;
}

export interface SpaceTelemetryResult {
  seed: string;
  entropy: string;
  apogee: string;
  perigee: string;
  inclin: string;
  velocity: string;
  fuelPct: number;
  deltaV: number;
  pitch: string;
  roll: string;
  yaw: string;
  eventTag: string;
  eventText: string;
  timestamp: string;
}

// Procedural audio synthesizer using Web Audio API for tactile clicks
export function playHapticSound(type: 'roll' | 'click' | 'lock' | 'success' = 'click') {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'roll') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'lock') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch {
    // Ignore audio errors on unmuted autoplay restrictions
  }
}

// Quest Tables
export const QUEST_POOLS: Record<string, {
  npcs: string[];
  rewards: string[];
  items: string[];
  locations: string[];
  deadlines: string[];
  complications: string[];
}> = {
  classic: {
    npcs: [
      'a mysterious hooded rogue',
      'a disgraced royal alchemist',
      'a one-eyed dwarven cartographer',
      'an elven spell-weaver in exile',
      'a cheerful tavern halfling bard'
    ],
    rewards: [
      '250 gold pieces',
      'an ancient astral compass',
      '350 platinum shards',
      'a ring of feather falling',
      '500 enchanted fire-opals'
    ],
    items: [
      'an enchanted locket',
      'a vial of bottled thunderstorm',
      'a shattered celestial lens',
      'a cursed obsidian mirror',
      'a singing clockwork skull'
    ],
    locations: [
      'the Iron Vault',
      'the Sunken Crypts',
      'the Weeping Spire',
      'the Under-Docks',
      'the Whispering Catacombs'
    ],
    deadlines: [
      'the full moon',
      'the blood eclipse',
      'the winter solstice',
      'the midnight tide',
      'dawn tomorrow'
    ],
    complications: [
      'The city guard has doubled night patrols around the market district.',
      'An inquisitor of the Dawn Church is already tailing the target.',
      'A rival adventuring party is after the exact same bounty.',
      'The map leading there burns to ash if touched by direct moonlight.',
      'The artifact begins vibrating whenever hostile magic is near.'
    ]
  },
  grimdark: {
    npcs: [
      'a plague-masked bone collector',
      'a blind penitent knight',
      'a twitching grave-robber with black blood',
      'an excommunicated inquisitor'
    ],
    rewards: [
      'a purse of blackened blood-coins',
      'a syringe of distilled adrenaline',
      'a cursed talisman of pain transfer',
      'amnesty from the Iron Pyre'
    ],
    items: [
      'the severed tongue of a martyr',
      'a jar of sentient ash',
      'an unholy iron covenant nail',
      'a lantern burning cold purple flame'
    ],
    locations: [
      'the Plague Trenches',
      'the Gibbet Woods',
      'the Black Basilica',
      'the Weeping Quarry'
    ],
    deadlines: [
      'the bell toll of the 13th hour',
      'the gangrene reaches the heart',
      'the crimson moon ascends',
      'the pyres are lit at dusk'
    ],
    complications: [
      'Anyone who touches the item experiences severe psychic agony.',
      'The target is heavily guarded by chained zealots.',
      'A relentless revenant tracks the relic by scent.',
      'Carrying the object slowly poisons the surrounding air.'
    ]
  },
  whimsical: {
    npcs: [
      'a talking badger in an oversized velvet coat',
      'a clumsy apprentice fairy confectioner',
      'a sentient teapot with aristocratic manners',
      'a goblin balloonist who only speaks in rhymes'
    ],
    rewards: [
      'a basket of levitating sugar plums',
      'a pouch of giggle-powder',
      'a whistle that summons curious frogs',
      'a ribbon that ties up bad luck'
    ],
    items: [
      'the Queen Bee’s diamond thimble',
      'a jar of preserved autumn giggles',
      'a dandelion clock that tells yesterday’s time',
      'a brass spoon that stirs tea by itself'
    ],
    locations: [
      'the Upside-Down Teahouse',
      'the Marshmallow Bog',
      'the Singing Meadow',
      'the Clockwork Bird Sanctuary'
    ],
    deadlines: [
      'the tea goes stone cold',
      'the rainbow fades into twilight',
      'the fairy parade concludes',
      'the kittens finish their afternoon nap'
    ],
    complications: [
      'The item sneezes loudly whenever you try to be stealthy.',
      'A band of friendly squirrels refuses to stop throwing acorns.',
      'The local baker suspects you are trying to steal his secret recipe.',
      'Every step you take sounds like a squeaky toy.'
    ]
  },
  steampunk: {
    npcs: [
      'a brass-limbed clockwork surgeon',
      'a soot-covered zeppelin grease-monkey',
      'a renegade galvanic engineer',
      'a monocled detective with an analytic slide-rule'
    ],
    rewards: [
      'a canister of liquid aetherium',
      'a pressurized steam revolver',
      'a patent deed to an automated loom',
      'an encrypted punch-card ledger'
    ],
    items: [
      'the prototype perpetual gyro-stabilizer',
      'a miniature Tesla arc battery',
      'a copper cylinder of classified blueprints',
      'a barometer that measures psychic pressure'
    ],
    locations: [
      'the Smog Cloud Hangar 4',
      'the Cogwheel Under-City',
      'the High Aether Tramway',
      'the Steam Foundry Boiler Core'
    ],
    deadlines: [
      'the pressure valves blow at high noon',
      'the last Sky-Carriage departs',
      'the boilers cool below threshold',
      'the automated curfew sirens shriek'
    ],
    complications: [
      'Steam pipe fractures in the sector limit visibility to 3 paces.',
      'Automated guard turrets scan for unauthorized biometric tags.',
      'The item leaks volatile static sparks if tilted past 45 degrees.',
      'A rival syndicate has hacked the mag-rail switch tracks.'
    ]
  }
};

export function rollQuest(tone: string = 'classic', complexity: string = 'detailed', includeComplications: boolean = true): QuestRollResult {
  const pool = QUEST_POOLS[tone] || QUEST_POOLS.classic;
  const rand = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  let reward = rand(pool.rewards);
  if (complexity === 'simple') {
    reward = '100 gold pieces';
  } else if (complexity === 'epic') {
    reward = `1,500 platinum pieces and ${rand(pool.rewards)}`;
  }

  return {
    npc: rand(pool.npcs),
    npcClass: 'bg-primary/20 text-primary-fixed',
    reward,
    rewardClass: 'bg-secondary/20 text-secondary',
    questItem: rand(pool.items),
    itemClass: 'bg-tertiary/20 text-tertiary',
    targetLocation: rand(pool.locations),
    deadline: rand(pool.deadlines),
    complication: includeComplications ? rand(pool.complications) : '',
    tone
  };
}

// Archetype Data and Generator
export const ARCHETYPE_TABLE = [
  {
    name: "The Shadow Kitten",
    weight: 3.0,
    prob: "42.8%",
    layer: "the dream veil",
    act: "unravel the complex knots of inner playful innocence",
    aspect: "Repressed Instinct & Insight",
    token: "$color.primary",
    tokenVar: "var(--color-primary: #7c3aed)",
    surfaceDepth: "--surface-container-high",
    glowIntensity: "kinetic-spark (0.85)",
    badge: "Shadow Archetype",
    badgeClass: "bg-primary-container text-on-primary-container",
    imgPrompt: "Mystical obsidian kitten with luminous purple energy paws walking on reflective water in dream realm, concept art",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATrBc97KKYKoz2TOsfuGHygp8943ZZkCToo1Kmv-jOGuTY51Ejtopw8EJIWd5AEtsZ3R1Jn21oUXytrr4ETlQC99phx7r1b7jXWE59_QzOc83bDT4SgGbvagGEzJOuFxCZJPr9m7VsNErdecZ_YU8mg1c2EsLp4Iozi6SCl5M04Nltotp93U16-4iomYKvkB23kIyTRnQy68nXCr28C1AAUJ-CuqZAKDC3nsoaeN3pWJpLKUlldTXkkg"
  },
  {
    name: "The Mandala Sphynx",
    weight: 1.5,
    prob: "21.4%",
    layer: "collective unconscious",
    act: "integrate the cosmic whiskers of supreme stillness",
    aspect: "The Unified Self & Equilibrium",
    token: "$color.tertiary",
    tokenVar: "var(--color-tertiary: #4edea3)",
    surfaceDepth: "--surface-container-highest",
    glowIntensity: "sacred-halo (0.92)",
    badge: "Self Archetype",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    imgPrompt: "Regal hairless Sphynx cat with glowing cyan mandala halo hovering over ancient sacred geometries, digital fantasy painting",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQlbviv2all_M2aMEgF6EJp--FWS_XnGWbX84laG2KV4DNoSYyH4k6uAcz2Giv9_ipZqJsvw0lkO0bX0I_s7_jAJDWPflAwnJr6RZ_9F1Sd4pnYWwrKFEjC5pH9CkKzfMVeVWrIEhOXoD-skpkwaa8unniIKy3Kvfc0e0vk4frZt1m_z2IJ9d6CmSOVqH0BNAU08v1VHRslLD1-91h0TFvds3Y6fgam6s41C6rKKqxpbDszdyh6wdNew"
  },
  {
    name: "The Trickster Calico",
    weight: 2.0,
    prob: "28.5%",
    layer: "personal unconscious",
    act: "disrupt the fragile yarn ego with wild laughter",
    aspect: "Playful Ego Disruption & Chaos",
    token: "$color.secondary",
    tokenVar: "var(--color-secondary: #4cd7f6)",
    surfaceDepth: "--surface-container",
    glowIntensity: "flux-prank (0.78)",
    badge: "Trickster Archetype",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    imgPrompt: "Mischievous calico cat playing with tangled neon threads of fate, sparkling particles in dark cosmic attic, surreal artwork",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGOU_M_dYLvX6P8kwXwhB7uc0KWCh6elY5rmyFxGshvIFu0Bufa_X8CuQK1q-Cl15Db6IH0Q6oOkT4pCntx237ECgHGtzQYR-Axz5ctP-TwaSwk72E6334oKyjv0RmYqOZQKCaSAlRTXgOw-F8RydWJZ1VpJ52yxELQN8RMerhALqvwZaJcGP5pa0lbyCXAEKewNF28IlUQv4tq6f7o6dnUI4TRlyxwHPUnsrcNMTliXYvTVhOdm7GWQ"
  },
  {
    name: "The Senex Tomcat",
    weight: 2.0,
    prob: "7.3%",
    layer: "ancestral lineage",
    act: "gaze into the ancestral mirror of timeless archetypes",
    aspect: "Ancestral Wisdom & Still Archetype",
    token: "$color.primary-fixed-dim",
    tokenVar: "var(--color-primary-fixed-dim: #d2bbff)",
    surfaceDepth: "--surface-container-low",
    glowIntensity: "deep-reverence (0.64)",
    badge: "Senex Archetype",
    badgeClass: "bg-surface-container-highest text-on-surface",
    imgPrompt: "Wise venerable old tabby cat with deep golden ancient eyes sitting peacefully on dusty celestial tomes, cinematic lighting",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARrtAiGlOPh-4Nw4akIe5oJ-yooSAQmb5Ex_XC06YNthtNbIyP4EWBLi3ipu_7TVHfHSNEtQETEaoeKnMfhPKbvmSyJewd5VIS5kEt_mixbeW7EK5lsUWl1ot6qsAHaQDPT9M5omeQjLb1pjlTS2O-6OhFh29BI_xSOgHmqy1wHI6HaJOy3PFjRO8ssdrI-uRFj69BR1Zz0pbXpdhd_JC8EYpNWSTp183InaVzB7LjG_ObOBO2XSYq_A"
  }
];

export function rollArchetype(): ArchetypeRollResult {
  const totalWeight = ARCHETYPE_TABLE.reduce((sum, item) => sum + item.weight, 0);
  let randomVal = Math.random() * totalWeight;
  let chosen = ARCHETYPE_TABLE[0];

  for (const item of ARCHETYPE_TABLE) {
    if (randomVal < item.weight) {
      chosen = item;
      break;
    }
    randomVal -= item.weight;
  }

  const entropy = (0.65 + Math.random() * 0.3).toFixed(2);
  const fullResolution = `"The ${chosen.name} prowls through the ${chosen.layer} seeking to ${chosen.act}."`;

  return {
    name: chosen.name,
    layer: chosen.layer,
    act: chosen.act,
    aspect: chosen.aspect,
    prob: chosen.prob,
    stitchToken: chosen.token,
    tokenVar: chosen.tokenVar,
    surfaceDepth: chosen.surfaceDepth,
    glowIntensity: chosen.glowIntensity,
    badge: chosen.badge,
    badgeClass: chosen.badgeClass,
    fullResolution,
    entropy,
    imgPrompt: chosen.imgPrompt,
    imageUrl: chosen.imageUrl
  };
}

// Space Flight Telemetry Generator
export const SPACE_ANOMALIES = [
  {
    tag: "[ORBITAL TRAJECTORY DIVERGENCE]",
    text: "Gravitational perturbation detected near Jovian resonance harmonic. Apogee drifted by +12.4 km; vector auto-correction active."
  },
  {
    tag: "[SOLAR WIND FLUX SPIKE]",
    text: "Solar particle radiation flux (^1.82 MeV) interacting with magnetosphere vector at Lagrange Point L2. Minor ion drift detected within nominal 2σ envelope."
  },
  {
    tag: "[MICRO-METEORITE RETICLE HIT]",
    text: "Whipple shield telemetry recorded 0.084 mJ deflection impact on starboard vector spar. Hull integrity 100%."
  },
  {
    tag: "[CRYOGENIC EQUILIBRIUM EVENT]",
    text: "LOX manifold heat exchanger venting excess boil-off. Cryogenic core temperature stabilized at -194.2°C."
  },
  {
    tag: "[QUANTUM ENTROPY REROUTE]",
    text: "Perchance seed recalculated stochastic pseudo-random trajectory arc with entropy deviation σ < 0.0014 bit/s."
  }
];

export function rollSpaceTelemetry(prevSeedNum: number = 88420): SpaceTelemetryResult {
  const newSeedNum = prevSeedNum + Math.floor(Math.random() * 85) + 12;
  const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const seed = `#PX-${newSeedNum}-${suffix}`;
  const ev = SPACE_ANOMALIES[Math.floor(Math.random() * SPACE_ANOMALIES.length)];

  const apogee = (42000 + Math.floor(Math.random() * 1400)).toLocaleString() + ' km';
  const perigee = (320 + Math.floor(Math.random() * 40)) + ' km';
  const inclin = (28.4 + Math.random() * 0.3).toFixed(2) + '°';
  const velocity = (7.72 + Math.random() * 0.12).toFixed(2) + ' km/s';
  const fuelPct = +(84 + Math.random() * 5).toFixed(1);
  const deltaV = 3400 + Math.floor(Math.random() * 120);

  const pitch = (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 2.5).toFixed(1).padStart(4, '0') + '°';
  const roll = (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 1.8).toFixed(1).padStart(4, '0') + '°';
  const yaw = '+' + (16 + Math.random() * 5).toFixed(1) + '°';

  const now = new Date();
  const timeStr = `T+142:08:${String(now.getSeconds()).padStart(2, '0')}.${Math.floor(now.getMilliseconds() / 10)}`;

  return {
    seed,
    entropy: (0.998 + Math.random() * 0.0019).toFixed(5) + ' bit/s',
    apogee,
    perigee,
    inclin,
    velocity,
    fuelPct,
    deltaV,
    pitch,
    roll,
    yaw,
    eventTag: ev.tag,
    eventText: ev.text,
    timestamp: timeStr
  };
}
