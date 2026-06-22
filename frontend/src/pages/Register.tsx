import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useNavigate, Navigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/alert";

const RegisterScreen = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Simple password strength calculation
  const strength =
    password.length === 0
      ? 0
      : password.length < 6
        ? 1
        : password.length < 10
          ? 2
          : 3;
  const strengthColors = [
    "bg-[#333B33]",
    "bg-red-500",
    "bg-yellow-500",
    "bg-[#25D366]",
  ];
  const strengthLabels = ["", "WEAK", "MEDIUM", "STRONG"];

  const navigate = useNavigate();
  const handleRegister = async () => {
    console.log("BUTTON CLICKED");
    if (!name.trim()) {
      alert("Name is required");

      return;
    }

    if (!email.trim()) {
      alert("Email is required");

      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");

      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");

      return;
    }
    try {
      const response = await registerUser({
        name,
        email,
        password,
        confirmPassword,
      });
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.user.id);
        showSuccess("Account created successfully!");

        setTimeout(() => {
          navigate("/chat", { replace: true });
        }, 1500);
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Registration failed");
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/chat");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-[#0D150E] flex flex-col items-center justify-center p-6 font-geist selection:bg-primary/30">
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center">
            <span className="text-[#0D150E] font-bold text-xl">
              <img
                src="/image.png"
                alt="NexaChat Logo"
                className="w-24 h-24 object-contain"
              />
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#E1E3DF]">
            NexaChat
          </h1>
        </div>
        <p className="text-[#8B9389] text-sm max-w-[280px] mx-auto leading-relaxed">
          Join the next generation of engineering communication.
        </p>
      </motion.div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#151E16] border border-[#333B33] rounded-2xl p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#E1E3DF]">
            Create your account
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/20">
            <ShieldCheck size={12} className="text-[#25D366]" />
            <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-wider">
              Secure & Encrypted
            </span>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#8B9389]">
              Full Name
            </label>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333B33] group-focus-within:text-[#25D366] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl py-3.5 pl-12 pr-4 text-[#E1E3DF] outline-none focus:border-[#25D366]/50 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#8B9389]">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333B33] group-focus-within:text-[#25D366] transition-colors"
                size={18}
              />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="engineer@nexachat.io"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl py-3.5 pl-12 pr-4 text-[#E1E3DF] outline-none focus:border-[#25D366]/50 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#8B9389]">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333B33] group-focus-within:text-[#25D366] transition-colors"
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl py-3.5 pl-12 pr-4 text-[#E1E3DF] outline-none focus:border-[#25D366]/50 transition-all"
              />
            </div>

            {/* Password Strength Meter */}
            <div className="pt-2 flex flex-col items-end gap-1">
              <div className="flex w-full gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : "bg-[#333B33]"}`}
                  />
                ))}
              </div>
              <span
                className={`text-[9px] font-bold tracking-tighter ${strength > 0 ? "text-[#C1C9BE]" : "text-transparent"}`}
              >
                STRENGTH:{" "}
                <span className={strength === 3 ? "text-[#25D366]" : ""}>
                  {strengthLabels[strength]}
                </span>
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#8B9389]">
              Confirm Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333B33] group-focus-within:text-[#25D366] transition-colors"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl py-3.5 pl-12 pr-4 text-[#E1E3DF] outline-none focus:border-[#25D366]/50 transition-all"
              />
            </div>
          </div>

          <button
            className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-[#0D150E] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-4"
            onClick={handleRegister}
          >
            Create Account
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#333B33]"></div>
          </div>
          <span className="relative px-4 bg-[#151E16] text-[10px] font-bold uppercase tracking-widest text-[#8B9389]">
            Or continue with
          </span>
        </div>

        <div className="flex justify-center">
          <button className="w-64 flex items-center justify-center gap-3 bg-[#0D150E] hover:bg-[#333B33]/20 border border-[#333B33] rounded-xl py-3 text-sm font-medium transition-all group">
            <FcGoogle size={18} />
            <span className="text-[#E1E3DF]">Continue with Google</span>
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-[#8B9389]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#25D366] font-bold hover:underline"
          >
            Log in
          </Link>
        </p>
      </motion.div>

      <footer className="mt-8 text-[10px] font-mono text-[#333B33] font-bold uppercase tracking-widest">
        Encrypted at rest
      </footer>
    </div>
  );
};

export default RegisterScreen;
