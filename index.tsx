import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Cpu, 
  Globe, 
  Database, 
  Code,
  Activity,
  Send,
  User,
  Bot,
  Terminal as TerminalIcon
} from 'lucide-react';

// --- OFFLINE HEURISTIC ENGINE ---
const simulateAIResponse = (input: string) => {
  const query = input.toLowerCase();
  const responses = [
    { keywords: ['who', 'waseeq', 'about', 'identity'], response: "WASEEQ is a high-level Cyber Security Architect. Specialist in penetration testing and hardening mission-critical infrastructure. Status: [AUTHORIZED_PERSONNEL]." },
    { keywords: ['skill', 'tech', 'tool', 'stack'], response: "Core Arsenal: C++, Python, Assembly, Go. Expertise: Red-Teaming, Malware Analysis, Reverse Engineering, and Zero-Trust implementation." },
    { keywords: ['contact', 'hire', 'email', 'social'], response: "Communications encrypted. E-mail: waseeq@secure-node.io | GitHub: @waseeq-hacks | LinkedIn: /in/waseeq-sec." },
    { keywords: ['help', 'advice', 'security'], response: "Observation: 92% of breaches occur via social engineering. Advice: Multi-factor authentication is the bare minimum. Physical tokens (U2F) are recommended." },
    { keywords: ['status', 'system', 'hello'], response: "Sentinel Interface v4.0 established. Heuristic engine 100% operational. How can I assist with your security audit today?" }
  ];

  const match = responses.find(r => r.keywords.some(k => query.includes(k)));
  return match ? match.response : "QUERY_UNRECOGNIZED. Suggest querying: 'skills', 'about waseeq', or 'security protocols'.";
};

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const characters = "0101010101010101ABCDEFHIJKLMNOPQRSTUVWXYZ$#%@&*";
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-20 pointer-events-none z-0" />;
};

const Header = () => {
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => scrollTo(e, 'about')}>
        <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
          <Shield className="text-black w-5 h-5" />
        </div>
        <span className="mono text-xl font-bold tracking-tighter uppercase">WASEEQ.<span className="text-green-500">SEC</span></span>
      </div>
      <div className="hidden md:flex gap-8 mono text-[10px] uppercase tracking-[0.3em] text-white/50">
        <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="hover:text-green-500">Bio</a>
        <a href="#skills" onClick={(e) => scrollTo(e, 'skills')} className="hover:text-green-500">Arsenal</a>
        <a href="#terminal" onClick={(e) => scrollTo(e, 'terminal')} className="hover:text-green-500">Terminal</a>
        <a href="#ai" onClick={(e) => scrollTo(e, 'ai')} className="hover:text-green-500">AI Proxy</a>
      </div>
      <button onClick={(e) => scrollTo(e, 'ai')} className="mono text-[10px] border border-green-500/30 px-4 py-2 hover:bg-green-500 hover:text-black transition-all">
        CONNECT_NODE
      </button>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section id="about" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="z-10 text-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono text-green-500 text-[10px] mb-4 tracking-[0.8em] uppercase">
          [ ACCESS GRANTED ]
        </motion.div>
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter glitch mb-6 leading-none" data-text="WASEEQ">
          WASEEQ
        </h1>
        <p className="mono text-sm md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed border-l-2 border-green-500 pl-6 text-left">
          Advancing Cyber Resilience & Offensive Security Strategy. 
          <span className="block text-green-500 font-bold mt-2 uppercase tracking-widest text-xs">Architecting the future of privacy.</span>
        </p>
      </motion.div>
      <div className="absolute bottom-10 animate-bounce flex flex-col items-center">
        <div className="w-[1px] h-16 bg-gradient-to-b from-green-500 to-transparent"></div>
      </div>
    </section>
  );
};

const SkillCard = ({ icon: Icon, title, desc, level }: any) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-8 glow-border group hover:border-green-500/50 transition-all duration-500">
    <Icon className="text-green-500 mb-6 w-8 h-8 group-hover:scale-110 transition-transform" />
    <h3 className="mono font-bold text-lg uppercase tracking-widest mb-4">{title}</h3>
    <p className="text-sm text-white/40 mb-8 leading-relaxed font-light">{desc}</p>
    <div className="h-[2px] bg-white/5 w-full">
      <motion.div initial={{ width: 0 }} whileInView={{ width: `${level}%` }} transition={{ duration: 1 }} className="h-full bg-green-500" />
    </div>
  </div>
);

const TerminalEmulator = () => {
  const [history, setHistory] = useState(["SYSTEM: BOOTING... OK", "ENCRYPTION: RSA-4096 ACTIVE", "Type 'help' to begin."]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.toLowerCase().trim();
    let res = "";
    if (cmd === "help") res = "CMD: about, skills, contact, clear";
    else if (cmd === "about") res = "IDENT: WASEEQ. SPECIALTY: OFFENSIVE SEC.";
    else if (cmd === "clear") { setHistory([]); setInput(""); return; }
    else res = `ERR: ${cmd} NOT_FOUND`;
    
    setHistory([...history, `root@waseeq:~$ ${input}`, res]);
    setInput("");
  };

  return (
    <section id="terminal" className="py-24 px-6 md:px-20 bg-black">
      <div className="max-w-4xl mx-auto border border-white/10 rounded-lg overflow-hidden">
        <div className="bg-[#111] p-3 border-b border-white/5 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
        <div className="p-8 h-[400px] overflow-y-auto mono text-xs text-green-400 bg-black/50">
          {history.map((l, i) => <div key={i} className="mb-2 opacity-80">{l}</div>)}
          <form onSubmit={handleCommand} className="flex gap-2">
            <span className="opacity-40">waseeq@root:~$</span>
            <input className="bg-transparent border-none outline-none flex-1 text-green-500" value={input} onChange={e => setInput(e.target.value)} autoFocus />
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </section>
  );
};

const SentinelAI = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const uMsg = input;
    setInput("");
    setMessages([...messages, { role: 'user', text: uMsg }]);
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: simulateAIResponse(uMsg) }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="ai" className="py-24 px-6 md:px-20 bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-black italic mb-6">SENTINEL AI</h2>
          <p className="text-white/50 mono text-sm mb-10 leading-relaxed">Local Proxy v4.0. Query the database directly for mission-critical information about Waseeq's background.</p>
          <div className="p-6 border border-green-500/20 bg-green-500/5 flex gap-4">
            <Activity className="text-green-500 shrink-0" />
            <div className="mono text-[10px] uppercase">Heuristic engine state: ACTIVE</div>
          </div>
        </div>
        <div className="bg-black border border-white/10 h-[500px] rounded-xl flex flex-col shadow-2xl">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && <div className="text-center opacity-20 mt-20"><Bot size={40} className="mx-auto" /></div>}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-4 rounded-lg text-xs ${m.role === 'user' ? 'bg-blue-500/10' : 'bg-green-500/10'} max-w-[80%]`}>{m.text}</div>
              </div>
            ))}
            {loading && <div className="text-xs opacity-40 animate-pulse">Analysing packet...</div>}
          </div>
          <form onSubmit={handleChat} className="p-4 border-t border-white/5">
            <div className="relative">
              <input className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-xs mono outline-none" placeholder="Query Node..." value={input} onChange={e => setInput(e.target.value)} />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"><Send size={16} /></button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <div className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black">
    <MatrixBackground />
    <Header />
    <Hero />
    <section id="skills" className="py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      <SkillCard icon={Lock} title="Red Teaming" level={98} desc="Offensive security operations targeting critical digital assets." />
      <SkillCard icon={Cpu} title="Binary Analysis" level={94} desc="Reverse engineering complex firmware and binaries." />
      <SkillCard icon={Globe} title="Cloud Sec" level={96} desc="Hardening distributed microservice architectures." />
    </section>
    <TerminalEmulator />
    <SentinelAI />
    <footer className="py-20 text-center border-t border-white/5">
      <div className="mono text-[10px] opacity-30 uppercase tracking-[0.5em]">© WASEEQ.SEC - ENCRYPTED ARCHIVE</div>
    </footer>
  </div>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
