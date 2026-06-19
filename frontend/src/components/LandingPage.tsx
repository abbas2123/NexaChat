
import { motion } from "framer-motion";
import {
  Video,
  Phone,
  Info,
  Paperclip,
  Send,
  Copy,
  ShieldCheck,
} from "lucide-react";
import BackgroundShader from "./BackgroundShader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const WelcomeScreen = () => {
  const navigate = useNavigate();
  useEffect(()=>{
        const token = localStorage.getItem("token");
  
        if (token) {
          navigate('/chat');
        }
      },[navigate])
  return (
    <div className="min-h-screen bg-[#0D150E] text-[#E1E3DF] font-geist selection:bg-primary/30 overflow-hidden relative">
      {/* Background Layer: Dynamic Shader (Reuse BackgroundShader.tsx) */}

      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <BackgroundShader />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center min-h-screen pt-20 pb-12">
        {/* Left Column: Hero Content */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#333B33]/50 border border-[#8B9389]/20">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />

            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C1C9BE]">
              Build 2.0 is Live
            </span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Welcome to <span className="text-[#25D366]">NexaChat</span>
          </h1>

          <p className="text-lg text-[#C1C9BE] leading-relaxed max-w-lg">
            The modern messaging platform for developers and teams. Secure,
            fast, and beautiful. Collaborate with code-first features in a
            workspace designed for productivity.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              className="px-8 py-4 bg-[#25D366] hover:bg-[#25D366]/90 text-[#0D150E] font-bold rounded-lg transition-all transform active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="px-8 py-4 bg-[#333B33] hover:bg-[#333B33]/80 text-[#E1E3DF] font-bold rounded-lg border border-[#8B9389]/20 transition-all transform active:scale-95"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>

          <div className="flex gap-12 pt-12 border-t border-[#333B33]">
            <div>
              <div className="text-3xl font-bold">12k+</div>

              <div className="text-xs uppercase tracking-widest text-[#8B9389] mt-1">
                Devs Joined
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold">99.9%</div>

              <div className="text-xs uppercase tracking-widest text-[#8B9389] mt-1">
                Uptime
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Chat Preview Card */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative "
        >
          {/* Decorative Glow */}

          <div className="absolute -inset-4 bg-[#25D366] blur-[80px] opacity-10 rounded-full" />

          <div className="relative bg-[#0D150E]/80 backdrop-blur-xl border border-[#333B33] rounded-2xl shadow-2xl overflow-visible min-h-[500px] flex flex-col">
            {/* Window Header */}

            <div className="px-6 py-4 border-b border-[#333B33] flex justify-between items-center bg-[#151E16]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />

                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />

                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              <div className="flex gap-6 text-[#8B9389]">
                <Video
                  size={18}
                  className="hover:text-[#25D366] cursor-pointer"
                />

                <Phone
                  size={18}
                  className="hover:text-[#25D366] cursor-pointer"
                />

                <Info
                  size={18}
                  className="hover:text-[#25D366] cursor-pointer"
                />
              </div>
            </div>

            {/* Message Feed */}

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              <div className="flex gap-4 items-start">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80"
                  alt="Avatar"
                  className="w-10 h-10 rounded-lg border border-[#333B33]"
                />

                <div className="bg-[#333B33] p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-sm">
                    Did you check the new API endpoint? The response time is
                    insane.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start justify-end">
                <div className="space-y-2 max-w-[85%]">
                  <div className="bg-[#25D366] text-[#0D150E] p-4 rounded-2xl rounded-tr-none font-medium text-sm">
                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#0D150E]/10">
                      <span className="text-[10px] font-mono font-bold">
                        main.py
                      </span>

                      <Copy size={12} />
                    </div>

                    <pre className="font-mono text-[11px] leading-relaxed overflow-x-auto">
                      {`async def fetch_nexa():\n  response = await nexa.query(\n    "SELECT * FROM core",\n    stream=True\n  )\n  return response`}
                    </pre>
                  </div>

                  <div className="text-[10px] text-right font-bold text-[#25D366] tracking-tighter uppercase">
                    Me
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#25D366]/20 to-[#333B33] border border-[#25D366]/30 flex items-center justify-center">
                  <span className="text-[#25D366] text-xs">⚡</span>
                </div>

                <div className="bg-[#333B33] p-3 rounded-2xl rounded-tl-none">
                  <p className="text-sm">Ship it! 🚀</p>
                </div>
              </div>
            </div>

            {/* Input Area */}

            <div className="p-6 pt-2">
              <div className="relative flex items-center gap-3 bg-[#081009] border border-[#333B33] rounded-xl px-4 py-3 group focus-within:border-[#25D366]/50 transition-colors">
                <Paperclip
                  size={18}
                  className="text-[#8B9389] hover:text-[#25D366] cursor-pointer"
                />

                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[#E1E3DF] placeholder-[#8B9389]"
                />

                <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center text-[#0D150E] cursor-pointer hover:scale-105 transition-transform">
                  <Send size={14} fill="currentColor" />
                </div>

                {/* Floating Badge */}

                <div className="absolute -bottom-12 -left-16 rotate-[-8deg] flex items-center gap-2 bg-[#333B33]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-[#8B9389]/20 text-[10px] font-mono text-[#C1C9BE] shadow-lg">
                  <span className="text-[#25D366]">⚡</span>
                  12ms LATENCY
                </div>
              </div>
            </div>
          </div>

          {/* Floating Security Badge */}

          <div className="absolute -top-6 -right-6 bg-[#0D150E]/90 border border-[#25D366]/30 px-4 py-2 rounded-xl backdrop-blur-xl rotate-6 shadow-xl hidden lg:flex items-center gap-3">
            <ShieldCheck size={16} className="text-[#25D366]" />

            <span className="text-[10px] font-bold tracking-widest text-[#E1E3DF] uppercase whitespace-nowrap">
              E2E Encrypted
            </span>
          </div>
        </motion.div>
      </main>

      {/* Footer Decoration */}

      <footer className="absolute bottom-8 left-0 w-full text-center pointer-events-none opacity-40">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#8B9389]">
          Designed for the next generation of engineering teams
        </p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
