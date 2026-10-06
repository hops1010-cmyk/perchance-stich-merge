import React, { useState, useEffect } from 'react';
import { rollSpaceTelemetry, playHapticSound, SpaceTelemetryResult } from '../utils/perchanceEngine';

interface GeneratorDetailSpaceProps {
  onBack: () => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSaveRoll: (title: string, text: string, category: string) => void;
}

export const GeneratorDetailSpace: React.FC<GeneratorDetailSpaceProps> = ({
  onShowToast,
  onSaveRoll
}) => {
  const [hudMode, setHudMode] = useState<'RADAR' | 'ORBIT' | 'WIREFRAME' | 'SPECTRUM'>('RADAR');
  const [isSpinning, setIsSpinning] = useState(false);
  const [metSeconds, setMetSeconds] = useState(12);
  const [isAborted, setIsAborted] = useState(false);
  const [phosphorOpacity, setPhosphorOpacity] = useState('0.85');

  const [telemetry, setTelemetry] = useState<SpaceTelemetryResult>({
    seed: '#PX-88420-A',
    entropy: '0.99842 bit/s',
    apogee: '42,890 km',
    perigee: '340 km',
    inclin: '28.50°',
    velocity: '7.78 km/s',
    fuelPct: 87.4,
    deltaV: 3420,
    pitch: '+01.2°',
    roll: '-00.4°',
    yaw: '+18.9°',
    eventTag: '[TRAJECTORY STOCHASTIC EVENT]',
    eventText: 'Solar particle radiation flux (^1.82 MeV) interacting with magnetosphere vector at Lagrange Point L2. Minor ion drift detected within nominal 2σ envelope.',
    timestamp: 'T+142:08:33.91'
  });

  const [logs, setLogs] = useState<string[]>([
    '[04:12:01] > PARSER_INIT: Perchance Grammar root compiled into AST (nodes: 1,492).',
    '[04:12:04] > VECTOR_GEN: Trajectory node mapped to Kepler [a=42890km, e=0.74, i=28.5°].',
    '[04:12:08] > STITCH_SYNC: Token binding verified across color-space & CRT surfaces.',
    '[04:12:09] > STATUS: Ready for orbital maneuver burn parameter ingestion.'
  ]);

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setMetSeconds((prev) => (prev + 1) % 60);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExecuteBurn = () => {
    playHapticSound('roll');
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 300);

    const prevNum = parseInt(telemetry.seed.replace(/[^0-9]/g, '')) || 88420;
    const next = rollSpaceTelemetry(prevNum);
    setTelemetry(next);

    const timeStr = `[04:12:${String(Math.floor(Math.random() * 50) + 10).padStart(2, '0')}]`;
    setLogs((prev) => [
      ...prev,
      `${timeStr} > EXEC_BURN: Applied seed ${next.seed} → AST regenerated without collision.`
    ]);

    onShowToast(`Burn executed! New seed ${next.seed}`, 'rocket_launch');
  };

  const handleCalibrateHUD = () => {
    playHapticSound('click');
    setPhosphorOpacity((0.8 + Math.random() * 0.18).toFixed(2));
    onShowToast('Calibrated CRT phosphor beam gain', 'filter_tilt_shift');
  };

  const handleEmergencyAbort = () => {
    playHapticSound('lock');
    setIsAborted(true);
    onShowToast('Emergency criteria checked: Nominal 3σ tolerance restored', 'warning');
    setTimeout(() => setIsAborted(false), 3000);
  };

  const handleSetMode = (mode: 'RADAR' | 'ORBIT' | 'WIREFRAME' | 'SPECTRUM') => {
    playHapticSound('click');
    setHudMode(mode);
    setLogs((prev) => [
      ...prev,
      `[MODE] > VECTOR HUD visual pipeline shifted to: ${mode}`
    ]);
    onShowToast(`Scope Mode: ${mode}`, 'radar');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-5 pb-12 pt-1 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Scope & Status */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          {/* Status Bar: Mission Control System Telemetry */}
          <section className="bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl shadow-md flex flex-col gap-2.5 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#03b5d3]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span className="text-[10px] text-[#4edea3] tracking-widest uppercase font-bold">
                  SYS STATUS: NOMINAL
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#222a3d] px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[14px]">sensors</span>
                <span className="text-[10px] text-[#4cd7f6] tracking-widest">
                  DSN GOLDSTONE // 8.4 GHz
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-[#ccc3d8] uppercase tracking-wider">
                Mission Control // Deep Space Vector Telemetry
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-[18px] font-bold text-[#4cd7f6] tracking-tight">
                  MET +142:08:34:{String(metSeconds).padStart(2, '0')}
                </span>
                <span className="text-[11px] text-[#ccc3d8]">UTC 2025-05-18 04:12:09</span>
              </div>
            </div>

            {/* Perchance Seed & Engine Metrics */}
            <div className="grid grid-cols-3 gap-1 pt-1 bg-[#060e20]/80 p-2 rounded-lg border border-[#222a3d]/60">
              <div className="flex flex-col">
                <span className="text-[9px] text-[#958da1]">ENGINE SEED</span>
                <span className="text-[12px] text-[#d2bbff] font-bold tracking-wide">
                  {telemetry.seed}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#958da1]">ENTROPY Σ</span>
                <span className="text-[12px] text-[#4edea3] font-bold">
                  {telemetry.entropy}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#958da1]">VECTOR RAY</span>
                <span className="text-[12px] text-[#acedff] font-bold">ONLINE (60Hz)</span>
              </div>
            </div>
          </section>

          {/* Vector Scope & CRT Orbital HUD */}
          <section className="bg-[#060e20] border border-[#222a3d] rounded-xl p-3 shadow-xl flex flex-col gap-2.5 relative overflow-hidden">
            {/* Vector Scope CRT Overlay Header */}
            <div className="flex items-center justify-between px-1 z-10">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">radar</span>
                <span className="text-[12px] text-[#4edea3] tracking-wider font-bold">
                  CRT-SCOPE // OSC-04
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#222a3d]/80 px-2 py-0.5 rounded-full border border-[#4a4455]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping"></span>
                <span className="text-[10px] text-[#dae2fd]">TRK: FELINE-IX PROBE</span>
              </div>
            </div>

            {/* Interactive Glowing Phosphor SVG Screen */}
            <div className="relative w-full aspect-square bg-[#0b1326] rounded-lg overflow-hidden flex items-center justify-center border border-[#171f33]">
              {/* CRT scanline illusion */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#03b5d3]/5 via-transparent to-[#007650]/10 pointer-events-none" />

              <svg
                className="w-full h-full text-[#4edea3] filter drop-shadow-[0_0_6px_rgba(78,222,163,0.7)] select-none"
                viewBox="0 0 360 360"
              >
                <defs>
                  <radialGradient id="phosphorGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.14" />
                    <stop offset="80%" stopColor="#007650" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#060e20" stopOpacity="0.6" />
                  </radialGradient>
                </defs>

                {/* Polar Radar Range Rings */}
                <circle cx="180" cy="180" r="160" fill="url(#phosphorGlow)" opacity="0.4" stroke="#4edea3" strokeWidth="0.75" strokeDasharray="2 3" />
                <circle cx="180" cy="180" r="120" fill="none" opacity="0.45" stroke="#4edea3" strokeWidth="0.5" />
                <circle cx="180" cy="180" r="80" fill="none" opacity="0.6" stroke="#4cd7f6" strokeWidth="0.6" strokeDasharray="4 2" />
                <circle cx="180" cy="180" r="40" fill="none" opacity="0.5" stroke="#4edea3" strokeWidth="0.5" />
                <circle cx="180" cy="180" r="6" fill="#4cd7f6" opacity="0.8" />

                {/* Coordinate Crosshairs */}
                <line x1="20" y1="180" x2="340" y2="180" stroke="#4edea3" strokeWidth="0.75" opacity="0.35" />
                <line x1="180" y1="20" x2="180" y2="340" stroke="#4edea3" strokeWidth="0.75" opacity="0.35" />
                <line x1="70" y1="70" x2="290" y2="290" stroke="#4cd7f6" strokeWidth="0.3" strokeDasharray="1 4" opacity="0.3" />
                <line x1="70" y1="290" x2="290" y2="70" stroke="#4cd7f6" strokeWidth="0.3" strokeDasharray="1 4" opacity="0.3" />

                {/* Azimuth Labels */}
                <text x="184" y="28" fill="#4edea3" fontSize="8" opacity="0.75" fontFamily="Space Grotesk">000° N</text>
                <text x="325" y="176" fill="#4edea3" fontSize="8" opacity="0.75" fontFamily="Space Grotesk">090°</text>
                <text x="184" y="335" fill="#4edea3" fontSize="8" opacity="0.75" fontFamily="Space Grotesk">180° S</text>
                <text x="24" y="176" fill="#4edea3" fontSize="8" opacity="0.75" fontFamily="Space Grotesk">270°</text>

                {/* Keplerian Elliptical Orbital Vector */}
                <ellipse cx="160" cy="170" rx="110" ry="65" fill="none" stroke="#4cd7f6" strokeWidth="1.25" strokeDasharray="160 15 20 8" transform="rotate(-28 160 170)" />

                {/* Projected Re-entry / Burn Arc */}
                <path d="M 90,260 Q 150,210 245,130" fill="none" stroke="#d2bbff" strokeWidth="1" strokeDasharray="3 3" opacity="0.85" />

                {/* Rotating Sweep Ray */}
                <line x1="180" y1="180" x2="290" y2="70" stroke="#6ffbbe" strokeWidth="1.5" opacity="0.75">
                  <animateTransform attributeName="transform" type="rotate" from="0 180 180" to="360 180 180" dur="4s" repeatCount="indefinite" />
                </line>

                {/* Probe Vector Target Marker Reticle */}
                <g transform="translate(230, 115)">
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#4edea3" strokeWidth="1" opacity="0.8" />
                  <path d="M -8,-14 L -14,-14 L -14,-8" fill="none" stroke="#4edea3" strokeWidth="1.5" />
                  <path d="M 8,-14 L 14,-14 L 14,-8" fill="none" stroke="#4edea3" strokeWidth="1.5" />
                  <path d="M -8,14 L -14,14 L -14,8" fill="none" stroke="#4edea3" strokeWidth="1.5" />
                  <path d="M 8,14 L 14,14 L 14,8" fill="none" stroke="#4edea3" strokeWidth="1.5" />
                  <polygon points="0,-4 3,3 -3,3" fill="#6ffbbe" />
                  <text x="18" y="-4" fill="#6ffbbe" fontSize="9" fontWeight="700" fontFamily="Space Grotesk">OBJ: FELINE-IX</text>
                  <text x="18" y="7" fill="#4cd7f6" fontSize="7.5" fontFamily="Space Grotesk">TGT LOCK [99.7%]</text>
                </g>

                {/* Wireframe Micro-Subcraft Projection */}
                <g transform="translate(45, 290) scale(0.65)" opacity="0.85">
                  <polygon points="0,0 20,-15 40,0 30,25 10,25" fill="none" stroke="#d2bbff" strokeWidth="1" />
                  <line x1="20" y1="-15" x2="20" y2="25" stroke="#d2bbff" strokeWidth="0.75" />
                  <line x1="-15" y1="8" x2="0" y2="8" stroke="#4cd7f6" strokeWidth="1.2" />
                  <line x1="40" y1="8" x2="55" y2="8" stroke="#4cd7f6" strokeWidth="1.2" />
                  <circle cx="20" cy="5" r="4" fill="none" stroke="#6ffbbe" strokeWidth="0.8" />
                  <text x="-12" y="38" fill="#d2bbff" fontSize="9" fontFamily="Space Grotesk">3D VECTOR WIRED</text>
                </g>
              </svg>

              {/* Scope Overlay Chip */}
              <div className="absolute bottom-2 right-2 bg-[#222a3d]/90 px-2 py-1 rounded text-right border border-[#4a4455]/40">
                <span className="text-[9px] text-[#ccc3d8] block">HUD GAIN</span>
                <span className="text-[11px] text-[#4edea3] font-bold">+18.4 dB</span>
              </div>
            </div>

            {/* Vector Readout Telemetry Banner */}
            <div className="grid grid-cols-4 gap-1 bg-[#171f33] p-2 rounded-lg text-center border border-[#222a3d]">
              <div className="flex flex-col">
                <span className="text-[9px] text-[#958da1]">APOGEE</span>
                <span className="text-[12px] text-[#4cd7f6] font-bold">{telemetry.apogee}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#958da1]">PERIGEE</span>
                <span className="text-[12px] text-[#4cd7f6] font-bold">{telemetry.perigee}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#958da1]">INCLIN.</span>
                <span className="text-[12px] text-[#dae2fd] font-bold">{telemetry.inclin}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#958da1]">VELOCITY</span>
                <span className="text-[12px] text-[#4edea3] font-bold">{telemetry.velocity}</span>
              </div>
            </div>

            {/* HUD Mode Switching Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {(['RADAR', 'ORBIT', 'WIREFRAME', 'SPECTRUM'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleSetMode(mode)}
                  className={`h-8 px-3 rounded-full text-[11px] font-bold transition-all ${
                    hudMode === mode
                      ? 'bg-[#03b5d3] text-[#00424e] shadow-sm'
                      : 'bg-[#222a3d] text-[#ccc3d8] hover:text-[#dae2fd]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Gauges, Event Stream, Tactical Controls & Logs */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          {/* NASA Flight Director Telemetry Gauges */}
          <section className="grid grid-cols-2 gap-2.5">
            {/* Propulsion Card */}
            <div className="bg-[#171f33] border border-[#222a3d] p-3 rounded-xl flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#ccc3d8] uppercase">Propellant LOX/RP-1</span>
                <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">local_gas_station</span>
              </div>
              <div className="my-1.5">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[16px] text-[#dae2fd] font-bold">{telemetry.fuelPct}%</span>
                  <span className="text-[10px] text-[#4edea3]">PRESSURIZED</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#060e20] overflow-hidden border border-[#222a3d]">
                  <div
                    className="h-full bg-[#4cd7f6] transition-all duration-500"
                    style={{ width: `${telemetry.fuelPct}%` }}
                  />
                </div>
              </div>
              <span className="text-[9px] text-[#958da1]">FLOW: 14.2 kg/s // CRYO NOMINAL</span>
            </div>

            {/* Cryo Delta-V Card */}
            <div className="bg-[#171f33] border border-[#222a3d] p-3 rounded-xl flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#ccc3d8] uppercase">Remaining ΔV</span>
                <span className="material-symbols-outlined text-[#d2bbff] text-[16px]">speed</span>
              </div>
              <div className="my-1.5">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[16px] text-[#d2bbff] font-bold">
                    {telemetry.deltaV.toLocaleString()} m/s
                  </span>
                  <span className="text-[10px] text-[#ccc3d8]">REQ: 1,890</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#060e20] overflow-hidden border border-[#222a3d]">
                  <div className="h-full bg-[#7c3aed] transition-all duration-500" style={{ width: '76%' }} />
                </div>
              </div>
              <span className="text-[9px] text-[#958da1]">MARGIN +1,530 m/s (180%)</span>
            </div>

            {/* ACS Attitude Orientation Card */}
            <div className="bg-[#171f33] border border-[#222a3d] p-3 rounded-xl flex flex-col shadow-md">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-[#ccc3d8] uppercase">Attitude (ACS)</span>
                <span className="material-symbols-outlined text-[#4edea3] text-[16px]">screen_rotation_alt</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="bg-[#131b2e] p-1 rounded border border-[#222a3d]/50">
                  <span className="text-[9px] text-[#958da1] block">PITCH</span>
                  <span className="text-[11px] text-[#dae2fd] font-bold">{telemetry.pitch}</span>
                </div>
                <div className="bg-[#131b2e] p-1 rounded border border-[#222a3d]/50">
                  <span className="text-[9px] text-[#958da1] block">ROLL</span>
                  <span className="text-[11px] text-[#dae2fd] font-bold">{telemetry.roll}</span>
                </div>
                <div className="bg-[#131b2e] p-1 rounded border border-[#222a3d]/50">
                  <span className="text-[9px] text-[#958da1] block">YAW</span>
                  <span className="text-[11px] text-[#dae2fd] font-bold">{telemetry.yaw}</span>
                </div>
              </div>
            </div>

            {/* Signal Latency Card */}
            <div className="bg-[#171f33] border border-[#222a3d] p-3 rounded-xl flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#ccc3d8] uppercase">Signal Latency</span>
                <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">wifi_tethering</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-[16px] text-[#4cd7f6] font-bold">1.284 sec</span>
                <span className="text-[10px] text-[#4edea3]">LOCK: 100%</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#958da1]">
                <span>UPLINK: 256 kbps</span>
                <span>•</span>
                <span>BER &lt; 10⁻⁸</span>
              </div>
            </div>
          </section>

          {/* Procedural Telemetry Live Feed */}
          <section className="bg-[#131b2e] border border-[#222a3d] rounded-xl p-3.5 flex flex-col gap-2 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#d2bbff] text-[18px]">auto_fix_high</span>
                <span className="text-[14px] font-bold text-[#dae2fd]">Perchance Procedural Stream</span>
              </div>
              <span className="bg-[#7c3aed]/20 text-[#d2bbff] text-[10px] px-2 py-0.5 rounded-full font-bold">
                GRAMMAR V4.1
              </span>
            </div>

            <div
              className={`bg-[#060e20] p-3 rounded-lg border-l-4 transition-all ${
                isAborted ? 'border-[#ffb4ab]' : 'border-[#7c3aed]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[11px] font-bold uppercase ${
                    isAborted ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
                  }`}
                >
                  {isAborted ? '[ABORT CRITERIA CHECK: FALSE ALARM]' : telemetry.eventTag}
                </span>
                <span className="text-[10px] text-[#958da1]">{telemetry.timestamp}</span>
              </div>
              <p className="text-[13px] text-[#dae2fd] leading-relaxed">
                {isAborted
                  ? 'Abort vector queried. System engines operating safely inside 3-sigma tolerance. Nominal burn resume authorized.'
                  : telemetry.eventText}
              </p>
            </div>
          </section>

          {/* Tactical Commands */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] text-[#ccc3d8] uppercase tracking-widest font-bold">
                AEROSPACE TACTICAL COMMANDS
              </span>
              <span className="text-[10px] text-[#958da1]">AUTH: LEVEL-4 FLIGHT DIR</span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleExecuteBurn}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#732ee4] text-[#ede0ff] font-label-lg text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:brightness-110"
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                    isSpinning ? 'rotate-180' : ''
                  }`}
                >
                  casino
                </span>
                <span>EXECUTE BURN (REROLL SEED)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCalibrateHUD}
                  className="py-2.5 px-3 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#4cd7f6] text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-[#4a4455]/30"
                >
                  <span className="material-symbols-outlined text-[17px]">filter_tilt_shift</span>
                  <span>CALIBRATE HUD</span>
                </button>

                <button
                  onClick={handleEmergencyAbort}
                  className="py-2.5 px-3 rounded-xl bg-[#93000a]/30 hover:bg-[#93000a]/50 text-[#ffb4ab] text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-[#ffb4ab]/30"
                >
                  <span className="material-symbols-outlined text-[17px]">warning</span>
                  <span>EMERGENCY ABORT</span>
                </button>
              </div>
            </div>
          </section>

          {/* Stitch Design System Binding Panel */}
          <section className="bg-[#171f33] border border-[#222a3d] p-3 rounded-xl shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#ccc3d8] uppercase font-bold">
                Stitch Token Dynamic Bindings
              </span>
              <span className="text-[10px] text-[#4cd7f6]">RUNTIME SYNC</span>
            </div>

            <div className="space-y-1.5 mt-0.5 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#958da1]">Vector Phosphor Opacity</span>
                <span className="text-[#4edea3]">var(--phosphor-alpha: {phosphorOpacity})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#958da1]">Kinetic Accent Token</span>
                <span className="text-[#d2bbff]">var(--color-primary: #d2bbff)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#958da1]">Surface Tier Ref</span>
                <span className="text-[#dae2fd]">surface-container-lowest</span>
              </div>
            </div>
          </section>

          {/* Mission Log & AST Stream */}
          <section className="bg-[#060e20] border border-[#222a3d] p-3 rounded-xl flex flex-col gap-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-[#222a3d] pb-1">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#958da1] text-[16px]">terminal</span>
                <span className="text-[10px] text-[#958da1] uppercase">PROCEDURAL AST PARSER STREAM</span>
              </div>
              <span className="text-[10px] text-[#4edea3]">TTY: LIVE</span>
            </div>

            <div className="flex flex-col gap-1 text-[11px] leading-tight text-[#ccc3d8] max-h-32 overflow-y-auto pt-1">
              {logs.map((log, i) => (
                <div key={i}>
                  <span className="text-[#4cd7f6]">&gt;</span> {log}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

};
