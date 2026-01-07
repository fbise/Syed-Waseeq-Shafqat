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
  Bot
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01010101010101010101010101ABCDEFHIJKLMNPQRSTUVWXYZ";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

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
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none" />;
};

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 bg-transparent backdrop-blur-sm border-b border-white/5">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => scrollToSection('about')}
      >
        <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center animate-pulse">
          <Shield className="text-black w-5 h-5" />
        </div>
        <span className="mono text-xl font-bold tracking-tighter">WASEEQ.<span className="text-green-500">ROOT</span></span>
      </div>
      <div className="hidden md:flex gap-8 mono text-xs uppercase tracking-widest text-white/60">
        <button onClick={() => scrollToSection('about')} className="hover:text-green-500 transition-colors focus:outline-none">About</button>
        <button onClick={() => scrollToSection('skills')} className="hover:text-green-500 transition-colors focus:outline-none">Arsenal</button>
        <button onClick={() => scrollToSection('terminal')} className="hover:text-green-500 transition-colors focus:outline-none">Terminal</button>
        <button onClick={() => scrollToSection('ai')} className="hover:text-green-500 transition-colors focus:outline-none">Sentinel AI</button>
      </div>
      <button 
        onClick={() => scrollToSection('ai')}
        className="mono text-xs border border-green-500/50 px-4 py-2 hover:bg-green-500 hover:text-black transition-all"
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
      <motion.div style={{ y: y1 }} className="z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mono text-green-500 text-sm mb-4 tracking-[0.3em]"
        >
          [ SECURITY CLEARANCE: LEVEL 5 ]
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
          className="mono text-lg md:text-2xl text-white/70 max-w-2xl mx-auto px-6 leading-relaxed"
        >
          Cyber Security Architect & Ethical Hacker. <br/>
          <span className="text-green-400">Securing the digital frontier, one vulnerability at a time.</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-gradient-to-b from-green-500 to-transparent"></div>
        <span className="mono text-[10px] tracking-widest text-white/30 uppercase">Scroll to decode</span>
      </div>
    </section>
  );
};

const SkillCard = ({ icon: Icon, title, desc, level }: { icon: any, title: string, desc: string, level: number }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#0a0a0a] border border-white/10 p-6 glow-border relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-green-500 w-6 h-6" />
      <h3 className="mono font-bold text-lg uppercase tracking-wider">{title}</h3>
    </div>
    <p className="text-sm text-white/50 mb-6 leading-relaxed">{desc}</p>
    <div className="space-y-2">
      <div className="flex justify-between mono text-[10px] text-white/40">
        <span>STRENGTH</span>
        <span>{level}%</span>
      </div>
      <div className="h-1 bg-white/5 w-full">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-green-500"
        />
      </div>
    </div>
  </motion.div>
);

const Arsenal = () => (
  <section id="skills" className="py-24 px-6 md:px-20 relative bg-black/50">
    <div className="mb-16">
      <span className="mono text-green-500 text-xs mb-2 block">// CAPABILITIES</span>
      <h2 className="text-4xl md:text-5xl font-black italic uppercase italic tracking-tighter">My Arsenal</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkillCard level={98} icon={Lock} title="Penetration Testing" desc="Comprehensive vulnerability assessments and active exploitation of networks and web applications." />
      <SkillCard level={95} icon={Cpu} title="Binary Analysis" desc="Reverse engineering malware and analyzing core architecture to identify zero-day vulnerabilities." />
      <SkillCard level={92} icon={Globe} title="Network Security" desc="Hardening infrastructure, firewall configuration, and intrusion detection system deployment." />
      <SkillCard level={88} icon={Database} title="Cloud Forensics" desc="Investigating data breaches and securing multi-cloud environments (AWS, Azure, GCP)." />
      <SkillCard level={94} icon={Activity} title="Incident Response" desc="Rapid mitigation of active threats and post-compromise cleanup and recovery strategies." />
      <SkillCard level={90} icon={Code} title="Secure DevOps" desc="Integrating automated security testing and secret management into CI/CD pipelines." />
    </div>
  </section>
);

const TerminalEmulator = () => {
  const [history, setHistory] = useState<string[]>(["Connection established...", "Welcome, guest. Type 'help' for commands."]);
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
    const newHistory = [...history, `guest@waseeq:~$ ${input}`];

    switch(cmd) {
      case 'help':
        newHistory.push("Available commands: about, skills, clear, whoami, contact, social");
        break;
      case 'about':
        newHistory.push("WASEEQ: Senior Security Consultant specializing in offensive security operations.");
        break;
      case 'skills':
        newHistory.push("Languages: Python, C++, Go, Assembly, Bash");
        newHistory.push("Tools: Metasploit, Burp Suite, Wireshark, Ghidra, Nmap");
        break;
      case 'whoami':
        newHistory.push("You are a curious observer interacting with one of the most secure nodes on the network.");
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case 'social':
        newHistory.push("LinkedIn: /in/waseeq-sec");
        newHistory.push("GitHub: @waseeq-hacks");
        break;
      case 'contact':
        newHistory.push("E-MAIL: waseeq@secure-node.io (PGP Encrypted Only)");
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <section id="terminal" className="py-24 px-6 md:px-20 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#1a1a1a] p-3 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="mono text-[10px] text-white/30 font-bold uppercase tracking-widest">
              Bash - waseeq@node-01
            </div>
            <div className="w-4"></div>
          </div>
          <div 
            ref={scrollRef}
            className="p-6 h-[400px] overflow-y-auto mono text-sm text-green-400 leading-relaxed scrollbar-hide"
          >
            {history.map((line, i) => (
              <div key={i} className="mb-1">{line}</div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
              <span className="text-white/40">guest@waseeq:~$</span>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                autoFocus
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

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are Sentinel AI, a cyber security assistant for the ethical hacker WASEEQ. You answer in a concise, professional, and slightly futuristic/technical tone. You know WASEEQ is a master of penetration testing, network security, and cryptography. Use markdown for formatting code snippets or technical lists. Be helpful but cautious about sharing sensitive data.",
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Connection timeout." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "ERROR: Signal lost. Check your API link." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="py-24 px-6 md:px-20 relative overflow-hidden bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="mono text-green-500 text-xs mb-2 block">// ADAPTIVE DEFENSE</span>
          <h2 className="text-5xl font-black italic tracking-tighter mb-6 uppercase">Sentinel AI</h2>
          <p className="text-white/60 mb-8 leading-relaxed max-w-lg">
            Meet Waseeq's custom-trained AI assistant. Ask about cyber security trends, common vulnerabilities, or details about Waseeq's professional background.
          </p>
          <div className="flex gap-4">
             <div className="p-4 border border-white/5 bg-white/5 glow-border">
                <Shield className="text-green-500 mb-2" />
                <div className="mono text-[10px] text-white/40 uppercase">Encrypted</div>
                <div className="mono font-bold text-sm">256-BIT AES</div>
             </div>
             <div className="p-4 border border-white/5 bg-white/5 glow-border">
                <Cpu className="text-blue-500 mb-2" />
                <div className="mono text-[10px] text-white/40 uppercase">Model</div>
                <div className="mono font-bold text-sm">GEMINI-3 PRO</div>
             </div>
          </div>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[500px] shadow-2xl relative">
          <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-black/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="mono text-xs font-bold uppercase tracking-widest text-white/50">SENTINEL_INTERFACE_V2</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
            {messages.length === 0 && (
              <div className="text-center mt-10">
                <Bot className="w-12 h-12 text-green-500/20 mx-auto mb-4" />
                <p className="mono text-xs text-white/30 italic">"Standing by for queries..."</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                  {msg.role === 'user' ? <User size={16} className="text-blue-500" /> : <Bot size={16} className="text-green-500" />}
                </div>
                <div className={`p-4 rounded-lg max-w-[80%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Bot size={16} className="text-green-500" />
                </div>
                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChat} className="p-4 border-t border-white/5 bg-black">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query the database..."
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors mono"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-green-500 hover:bg-green-500 hover:text-black rounded-md transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-white/5 text-center bg-black">
    <div className="mb-10 flex justify-center gap-6">
      <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all">
        <Globe size={18} />
      </a>
      <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:text-black transition-all">
        <Cpu size={18} />
      </a>
      <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-black transition-all">
        <Activity size={18} />
      </a>
    </div>
    <div className="mono text-[10px] text-white/30 tracking-[0.4em] uppercase">
      © {new Date().getFullYear()} WASEEQ.SEC - DIGITAL SOVEREIGNTY SECURED
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="relative">
      <MatrixBackground />
      <Header />
      <main>
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
