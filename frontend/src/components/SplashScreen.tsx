import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal } from "lucide-react";
import logo from '../assets/image.png'

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Secure Workspace...");

  useEffect(() => {
    const sequence = [
      { progress: 20, status: "Authenticating Peer Protocol..." },
      { progress: 45, status: "Syncing distributed node logs..." },
      { progress: 75, status: "Verifying end-to-end encryption..." },
      { progress: 100, status: "Workspace Ready." },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < sequence.length) {
        setProgress(sequence[currentStep].progress);
        setStatus(sequence[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#25D366]/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#25D366] blur-[50px] opacity-20" />

          <div className="relative w-32 h-32 rounded-3xl bg-[#111] border border-[#25D366]/20 flex items-center justify-center shadow-2xl">
            <img
              src={logo}
              alt="NexaChat Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">NexaChat</h1>

        <p className="text-[#8B9389] uppercase tracking-[0.3em] text-xs mb-12">
          Connecting The Next Generation
        </p>

        {/* Progress */}
        <div className="w-72">
          <div className="flex justify-between text-[10px] font-mono text-[#25D366] mb-2">
            <span>{status}</span>
            <span>v2.4.0</span>
          </div>

          <div className="h-1 w-full bg-[#2A2F2A] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-[#25D366]"
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-5 text-[#8B9389]">
            <Terminal size={12} className="text-[#25D366]" />

            <span className="text-[10px] font-mono italic">
              Running node_auth_v2...
            </span>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-8 flex items-center gap-4 text-[10px] text-[#8B9389] uppercase tracking-wider">
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} className="text-[#25D366]" />

          <span>End-to-End Encrypted</span>
        </div>

        <div className="w-px h-3 bg-[#333]" />

        <span>Quantum-Safe Protocol</span>
      </div>
    </div>
  );
};

export default SplashScreen;
