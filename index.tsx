import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Terminal as TermIcon, 
  Send, 
  Activity, 
  Cpu, 
  Globe, 
  Zap,
  ChevronRight,
  User,
  Github,
  Linkedin
} from 'lucide-react';

/** 
 * OFFLINE SENTINEL LOGIC 
 * Hardcoded heuristic responses for Waseeq's Profile
 */
const getSentinelResponse = (input: string) => {
  const q = input.toLowerCase();
  if (q.includes('waseeq')) return "SUBJECT_IDENTIFIED: WASEEQ. STATUS: AUTHORIZED. RANK: CYBER_ARCHITECT. SPECIALTY: OFFENSIVE_HARDENING.";
  if (q.includes('skill')) return "SKILL_QUERY: [Python, C++, Assembly, Reverse_Engineering, PenTesting, ZeroTrust]. RELIABILITY: 99.9%.";
  if (q.includes('contact')) return "COMMS_PROTOCOL: Encrypted. EMAIL: waseeq@sec-node.io. LINKEDIN: /in/waseeq-sec.";
  if (q.includes('hello') || q.includes('hi')) return "SENTINEL_GREETING: Connection established. I am the heuristic guardian of Waseeq's digital footprint. Inquire for data.";
  return "ERR_UNKNOWN_PACKET: Command not found. Suggest querying: 'skills', 'about', or 'identity'.";
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let anime: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const chars = "0101010101WASEEQSECRETSECURITYHACKER$#%@&*";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 3, 3, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      anime = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(anime);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />;
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center gap-3">
      <div className="bg-green-500 p-1.5 rounded-sm">
        <Shield size={18} className="text-black" />
      </div>
      <span className="mono font-black text-xl tracking-tighter uppercase">WASEEQ<span className="text-green-500">.SEC</span></span>
    </div>
    <div className="hidden md:flex gap-10 mono text-[10px] tracking-[0.4em] text-white/40 uppercase">
      <a href="#hero" className="hover:text-green-500 transition-colors">Core</a>
      <a href="#skills" className="hover:text-green-500 transition-colors">Arsenal</a>
      <a href="#terminal" className="hover:text-green-500 transition-colors">Terminal</a>
      <a href="#sentinel" className="hover:text-green-500 transition-colors">Sentinel</a>
    </div>
    <button className="mono text-[10px] border border-green-500/40 px-5 py-2 hover:bg-green-500 hover:text-black transition-all">
      CONNECT_TUNNEL
    </button>
  </nav>
);

const Hero = () => (
  <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6">
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mono text-green-500 text-[10px] mb-6 tracking-[0.8em] uppercase">[ ENCRYPTION ACTIVE ]</div>
      <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none glitch mb-8" data-text="WASEEQ">
        WASEEQ
      </h1>
      <p className="max-w-xl mx-auto mono text-sm md:text-base text-white/50 leading-relaxed border-l border-green-500 pl-6 text-left">
        High-Tier Ethical Hacker & Security Architect. Specialist in offensive hardening and defensive posture strategies. 
        <span className="block mt-4 text-green-500 font-bold uppercase tracking-widest text-[10px]">Level 5 Clearance Authorized.</span>
      </p>
    </motion.div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30">
      <div className="w-[1px] h-20 bg-gradient-to-b from-green-500 to-transparent"></div>
    </div>
  </section>
);

const Arsenal = () => {
  const skills = [
    { icon: Lock, title: "PenTesting", desc: "Advanced exploit dev & red team operations.", lvl: 98 },
    { icon: Cpu, title: "Malware Lab", desc: "Reverse engineering & behavioral analysis.", lvl: 92 },
    { icon: Globe, title: "NetSec", desc: "Hardening globally distributed networks.", lvl: 95 },
  ];

  return (
    <section id="skills" className="py-32 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      {skills.map((s, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="bg-[#080808] border border-white/5 p-10 relative group overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
          <s.icon className="text-green-500 mb-8 w-10 h-10" />
          <h3 className="mono font-bold text-xl uppercase tracking-widest mb-4">{s.title}</h3>
          <p className="text-sm text-white/40 mb-10 leading-relaxed">{s.desc}</p>
          <div className="h-[2px] bg-white/5 w-full">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${s.lvl}%` }}
              className="h-full bg-green-500 shadow-[0_0_10px_#00ff41]"
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};

const Terminal = () => {
  const [history, setHistory] = useState([
    "INITIALIZING WASEEQ_SHELL v4.0.2...",
    "SECURE CONNECTION ESTABLISHED.",
    "TYPE 'help' FOR COMMAND LIST."
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCmd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.toLowerCase().trim();
    let res = "";
    if (cmd === 'help') res = "AVAILABLE: about, skills, clear, status";
    else if (cmd === 'about') res = "IDENT: WASEEQ. ARCHITECT OF SECURE NODES.";
    else if (cmd === 'status') res = "SYSTEM: NOMINAL. THREAT_LEVEL: LOW.";
    else if (cmd === 'clear') { setHistory([]); setInput(""); return; }
    else res = `ERR: ${cmd} NOT RECOGNIZED.`;

    setHistory([...history, `user@waseeq:~$ ${input}`, res]);
    setInput("");
  };

  return (
    <section id="terminal" className="py-24 px-8 bg-black/50">
      <div className="max-w-5xl mx-auto bg-[#050505] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-[#111] px-4 py-2 border-b border-white/5 flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <div className="p-8 h-[400px] overflow-y-auto mono text-xs text-green-500/80 scrollbar-hide">
          {history.map((h, i) => <div key={i} className="mb-2">{h}</div>)}
          <form onSubmit={handleCmd} className="flex gap-2">
            <span className="text-green-500/30">waseeq@root:~$</span>
            <input 
              autoFocus
              className="bg-transparent border-none outline-none flex-1 text-green-500"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </form>
          <div ref={scrollRef} />
        </div>
      </div>
    </section>
  );
};

const SentinelAI = () => {
  const [chats, setChats] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const msg = input;
    setInput("");
    setChats(c => [...c, { role: 'user', text: msg }]);
    setIsTyping(true);
    setTimeout(() => {
      setChats(c => [...c, { role: 'bot', text: getSentinelResponse(msg) }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="sentinel" className="py-32 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-6xl font-black italic mb-6 uppercase tracking-tighter">Sentinel_AI</h2>
          <p className="text-white/40 mono text-sm mb-12 leading-relaxed">Local heuristic engine. Use this terminal to query Waseeq's secure records. All traffic is logged and encrypted.</p>
          <div className="flex gap-8 opacity-40">
            <Activity className="text-green-500" />
            <span className="mono text-[10px] uppercase self-center">Kernel_Uptime: 432:12:08</span>
          </div>
        </div>
        <div className="bg-[#050505] border border-white/10 rounded-2xl h-[550px] flex flex-col overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent opacity-20" />
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {chats.length === 0 && <div className="h-full flex items-center justify-center opacity-10 flex-col"><TermIcon size={60} /><div className="mt-4 mono">HEURISTIC_STANDBY</div></div>}
            {chats.map((c, i) => (
              <motion.div 
                initial={{ opacity: 0, x: c.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className={`flex gap-4 ${c.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-sm ${c.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                  {c.role === 'user' ? <User size={14} /> : <Zap size={14} />}
                </div>
                <div className={`p-5 rounded-xl text-xs mono leading-relaxed ${c.role === 'user' ? 'bg-blue-500/10' : 'bg-green-500/10'} max-w-[80%]`}>
                  {c.text}
                </div>
              </motion.div>
            ))}
            {isTyping && <div className="text-[10px] mono text-green-500/40 animate-pulse">SENTINEL_PROCESSING_PACKET...</div>}
          </div>
          <form onSubmit={sendChat} className="p-6 border-t border-white/5 bg-black/50">
            <div className="relative">
              <input 
                className="w-full bg-[#111] border border-white/10 rounded-lg px-5 py-4 text-xs mono outline-none focus:border-green-500/50 transition-all"
                placeholder="Query Waseeq's archives..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 hover:scale-110 transition-transform"><Send size={18} /></button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen relative selection:bg-green-500 selection:text-black">
      <MatrixRain />
      <Navbar />
      <Hero />
      <Arsenal />
      <Terminal />
      <SentinelAI />
      <footer className="py-24 text-center border-t border-white/5 bg-black">
        <div className="flex justify-center gap-8 mb-10 opacity-30">
          <Github className="hover:text-green-500 cursor-pointer" />
          <Linkedin className="hover:text-green-500 cursor-pointer" />
        </div>
        <div className="mono text-[10px] opacity-20 uppercase tracking-[0.6em]">WASEEQ © CYBER_SECURITY_SOLUTIONS . ALL_RIGHTS_RESERVED</div>
      </footer>
    </div>
  );
};

// --- SAFE MOUNTING ---
const mountRoot = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  } else {
    console.error("Critical Failure: Root node not found.");
  }
};

// Wait for DOM content to be fully ready before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountRoot);
} else {
  mountRoot();
}
