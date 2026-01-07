import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Terminal, 
  Lock, 
  Cpu, 
  Zap, 
  Globe, 
  Database, 
  Search, 
  Code,
  Activity,
  ChevronRight,
  Send,
  User,
  Bot,
  Terminal as TerminalIcon
} from 'lucide-react';

// --- MOCK AI ENGINE (100% Offline / Standalone) ---
const simulateAIResponse = (input: string) => {
  const query = input.toLowerCase();
  const responses = [
    { keywords: ['who', 'waseeq', 'about'], response: "WASEEQ is a Senior Cyber Security Architect specializing in offensive security operations, penetration testing, and zero-day vulnerability research. Current status: ENCRYPTED & UNTRACEABLE." },
    { keywords: ['skill', 'arsenal', 'tech', 'tool', 'language'], response: "Primary Arsenal: Python, C++, Assembly, Bash, Go. Specialist in: Metasploit, Burp Suite, Wireshark, Ghidra, and Nmap. Infrastructure hardening is my specialty." },
    { keywords: ['hack', 'ethical', 'penetration', 'red team'], response: "I conduct comprehensive vulnerability assessments, red-team simulations, and active exploitation to identify security flaws before malicious actors do." },
    { keywords: ['contact', 'email', 'social', 'reach'], response: "Communications are restricted to secure channels. E-mail: waseeq@secure-node.io (PGP Encrypted). LinkedIn: /in/waseeq-sec. GitHub: @waseeq-hacks." },
    { keywords: ['security', 'help', 'protect', 'advice'], response: "Advice: Implement zero-trust architecture, enforce MFA across all nodes, and rotate cryptographic keys every 30 days. Defense is a process, not a product." },
    { keywords: ['hi', 'hello', 'hey', 'sentinel'], response: "Connection established. Sentinel AI v4.2 active. I am Waseeq's digital proxy. Standing by for instructions." },
    { keywords: ['vulnerability', 'cve', 'exploit'], response: "I specialize in discovering buffer overflows, logic flaws, and misconfigurations in high-availability systems. Security through obscurity is no security at all." }
  ];

  const match = responses.find(r => r.keywords.some(k => query.includes(k)));
  return match ? match.response : "QUERY_NOT_RECOGNIZED. My heuristic engine can provide data on Waseeq's skills, security philosophy, or contact protocols. Please rephrase.";
};

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const characters = "01010101010101010101010101ABCDEFHIJKLMNPQRSTUVWXYZ$#%@&*";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
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
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0" />;
};

const Header = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 bg-black/40 backdrop-blur-md border-b border-white/5">
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={(e) => scrollToSection(e, 'about')}
      >
        <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          <Shield className="text-black w-5 h-5" />
        </div>
        <span className="mono text-xl font-bold tracking-tighter">WASEEQ.<span className="text-green-500">ROOT</span></span>
      </div>
      <div className="hidden md:flex gap-8 mono text-[10px] uppercase tracking-[0.2em] text-white/60">
        <button onClick={(e) => scrollToSection(e, 'about')} className="hover:text-green-500 transition-colors">About</button>
        <button onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-green-500 transition-colors">Arsenal</button>
        <button onClick={(e) => scrollToSection(e, 'terminal')} className="hover:text-green-500 transition-colors">Terminal</button>
        <button onClick={(e) => scrollToSection(e, 'ai')} className="hover:text-green-500 transition-colors">Sentinel AI</button>
      </div>
      <button 
        onClick={(e) => scrollToSection(e, 'ai')}
        className="mono text-[10px] border border-green-500/50 px-4 py-2 hover:bg-green-500 hover:text-black transition-all uppercase tracking-widest"
      >
        ESTABLISH CONNECTION
      </button>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="about" className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <motion.div style={{ y: y1 }} className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mono text-green-500 text-xs mb-4 tracking-[0.5em] uppercase"
        >
          [ ACCESS GRANTED : SECURITY LEVEL 5 ]
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-9xl font-black italic tracking-tighter glitch mb-6"
          data-text="WASEEQ"
        >
          WASEEQ
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mono text-sm md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed border-l-2 border-green-500 pl-6 text-left md:text-center"
        >
          Cyber Security Architect & Senior Ethical Hacker. <br/>
          <span className="text-green-400 font-bold">Neutralizing threats. Hardening environments. Redefining digital sovereignty.</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-green-500 to-transparent"></div>
        <span className="mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll to decode</span>
      </div>
    </section>
  );
};

const SkillCard = ({ icon: Icon, title, desc, level }: { icon: any, title: string, desc: string, level: number }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#0a0a0a] border border-white/5 p-8 glow-border relative overflow-hidden group hover:border-green-500/50 transition-all duration-500"
  >
    <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={120} />
    </div>
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:bg-green-500/10 transition-colors">
        <Icon className="text-green-500 w-6 h-6" />
      </div>
      <h3 className="mono font-bold text-lg uppercase tracking-widest">{title}</h3>
    </div>
    <p className="text-sm text-white/50 mb-8 leading-relaxed font-light">{desc}</p>
    <div className="space-y-3">
      <div className="flex justify-between mono text-[10px] text-white/40 uppercase tracking-widest">
        <span>Efficiency</span>
        <span className="text-green-500">{level}%</span>
      </div>
      <div className="h-[2px] bg-white/5 w-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-green-500 shadow-[0_0_10px_#00ff41]"
        />
      </div>
    </div>
  </motion.div>
);

const Arsenal = () => (
  <section id="skills" className="py-32 px-6 md:px-20 relative bg-[#050505] z-10">
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-[2px] w-12 bg-green-500"></div>
        <span className="mono text-green-500 text-[10px] tracking-[0.4em] uppercase font-bold">Capabilities</span>
      </div>
      <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">The Arsenal</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <SkillCard level={98} icon={Lock} title="Red Teaming" desc="Full-spectrum adversary simulation, social engineering, and coordinated penetration testing on enterprise networks." />
      <SkillCard level={94} icon={Cpu} title="Binary Analysis" desc="Reverse engineering malicious payloads and firmware analysis to identify hardware-level zero-day vulnerabilities." />
      <SkillCard level={96} icon={Globe} title="Cloud Sec" desc="Hardening distributed cloud architectures and securing containerized microservices in AWS/Azure/GCP." />
      <SkillCard level={90} icon={Database} title="Forensics" desc="Post-breach investigations, digital footprint tracing, and malicious activity reconstruction for incident response." />
      <SkillCard level={95} icon={Activity} title="App Security" desc="Securing the SDLC with automated static and dynamic analysis (SAST/DAST) and thorough code audits." />
      <SkillCard level={92} icon={Code} title="Automation" desc="Developing custom exploits and defensive scripts in Python, Go, and C++ to streamline security workflows." />
    </div>
  </section>
);

const TerminalEmulator = () => {
  const [history, setHistory] = useState<string[]>(["SYSTEM: [V4.2.1] INITIALIZING...", "ENCRYPTION: AES-256 ACTIVE", "Welcome, WASEEQ. Terminal ready.", "Type 'help' for available directives."]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, `waseeq@root:~$ ${input}`];

    switch(cmd) {
      case 'help':
        newHistory.push("DIRECTIVES: about, skills, clear, whoami, contact, tools, echo [text]");
        break;
      case 'about':
        newHistory.push("IDENT: WASEEQ. ROLE: SECURITY ARCHITECT. STATUS: ACTIVE.");
        break;
      case 'skills':
        newHistory.push("CORE: REVERSE ENGINEERING, EXPLOIT DEV, RED TEAMING, CLOUD HARDENING.");
        break;
      case 'whoami':
        newHistory.push("You are an authorized entity accessing node: waseeq.root.cluster.01");
        break;
      case 'tools':
        newHistory.push("OS: KALI LINUX, QUBES. TOOLS: METASPLOIT, BURP SUITE, GHIDRA, WIRESHARK, NMAP.");
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case 'contact':
        newHistory.push("E-MAIL: waseeq@secure-node.io (PGP READY)");
        break;
      default:
        if (cmd.startsWith('echo ')) {
          newHistory.push(cmd.substring(5));
        } else {
          newHistory.push(`ERR: Directive '${cmd}' not found. Type 'help'.`);
        }
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <section id="terminal" className="py-32 px-6 md:px-20 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#050505] border border-white/10 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)]">
          <div className="bg-[#111] p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50"></div>
            </div>
            <div className="mono text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">
              Console - Bash (Secure Port 22)
            </div>
            <TerminalIcon size={12} className="text-white/20" />
          </div>
          <div 
            ref={scrollRef}
            className="p-8 h-[450px] overflow-y-auto mono text-sm text-green-500 leading-relaxed scrollbar-hide bg-[#050505]"
          >
            {history.map((line, i) => (
              <div key={i} className="mb-2 flex gap-3">
                {line.startsWith('waseeq@root') ? null : <span className="opacity-40">{">"}</span>}
                <span className={line.includes('ERR:') ? 'text-red-500' : ''}>{line}</span>
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
              <span className="text-white/40">waseeq@root:~$</span>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                autoComplete="off"
                spellCheck="false"
                className="bg-transparent border-none outline-none flex-1 text-green-400 caret-green-500"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const SentinelAI = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Simulate thinking delay for cinematic effect
    setTimeout(() => {
      const botResponse = simulateAIResponse(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <section id="ai" className="py-32 px-6 md:px-20 relative overflow-hidden bg-gradient-to-b from-black to-[#050505]">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-12 bg-green-500"></div>
            <span className="mono text-green-500 text-[10px] tracking-[0.4em] uppercase font-bold">Neural Core</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-8 uppercase">Sentinel AI</h2>
          <p className="text-white/50 mb-10 leading-relaxed max-w-lg text-lg font-light">
            An encapsulated Heuristic Response Engine trained on Waseeq's professional security protocols. 
            Ask about recent breaches, defense strategies, or career highlights.
          </p>
          <div className="grid grid-cols-2 gap-6">
             <div className="p-6 border border-white/5 bg-white/5 glow-border group hover:bg-green-500/5 transition-colors">
                <Shield className="text-green-500 mb-3 group-hover:scale-110 transition-transform" />
                <div className="mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Tunnel</div>
                <div className="mono font-bold text-sm">ENCRYPTED</div>
             </div>
             <div className="p-6 border border-white/5 bg-white/5 glow-border group hover:bg-blue-500/5 transition-colors">
                <Cpu className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                <div className="mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Architecture</div>
                <div className="mono font-bold text-sm">NEURAL_V4</div>
             </div>
          </div>
        </div>

        <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[550px] shadow-2xl relative border-t-green-500/30">
          <div className="p-5 border-b border-white/5 flex items-center justify-between bg-black/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 text-xs">Sentinel Interface V.4</span>
            </div>
            <Activity size={14} className="text-green-500 opacity-50" />
          </div>
          
          <div ref={chatRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {messages.length === 0 && (
              <div className="text-center mt-20 opacity-20">
                <Bot className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <p className="mono text-xs uppercase tracking-[0.3em]">"Awaiting authorized input..."</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/10 ${msg.role === 'user' ? 'bg-blue-500/10' : 'bg-green-500/10'}`}>
                  {msg.role === 'user' ? <User size={18} className="text-blue-500" /> : <Bot size={18} className="text-green-500" />}
                </div>
                <div className={`p-5 rounded-2xl max-w-[85%] text-sm leading-relaxed border ${msg.role === 'user' ? 'bg-blue-500/5 border-blue-500/20 text-blue-100 rounded-tr-none' : 'bg-green-500/5 border-green-500/20 text-green-50 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Bot size={18} className="text-green-500" />
                </div>
                <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20 rounded-tl-none">
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChat} className="p-6 border-t border-white/5 bg-black/80">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query the database..."
                autoComplete="off"
                className="w-full bg-[#111] border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-green-500 transition-all mono pr-12 group-hover:border-white/20"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-green-500 hover:text-white transition-all disabled:opacity-20"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 border-t border-white/5 text-center bg-[#050505] relative z-10">
      <div className="mb-12 flex justify-center gap-8">
        {[Globe, Cpu, Activity, Database].map((Icon, i) => (
          <a key={i} href="#" onClick={(e) => e.preventDefault()} className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all rounded-lg hover:scale-110">
            <Icon size={20} />
          </a>
        ))}
      </div>
      <div className="mono text-[10px] text-white/20 tracking-[0.5em] uppercase cursor-pointer hover:text-green-500 transition-colors" onClick={scrollToTop}>
        © {new Date().getFullYear()} WASEEQ.SEC - ENCRYPTED ARCHIVE ACCESSED
      </div>
      <div className="mt-4 mono text-[8px] text-white/10 uppercase tracking-widest">
        Digital Sovereignty Guaranteed via Private Key 0x8A2...
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="relative bg-[#050505] text-white min-h-screen selection:bg-green-500 selection:text-black">
      <MatrixBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Arsenal />
        <TerminalEmulator />
        <SentinelAI />
      </main>
      <Footer />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
