import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { loginUser, googleLoginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { showSuccess, showError } from "../utils/alert";
import { useGoogleLogin } from "@react-oauth/google";

const AuthScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await googleLoginUser(tokenResponse.access_token);

        localStorage.setItem("token", response.token);

        showSuccess("Google Login Successful!");

        navigate("/chat");
      } catch (error: any) {
        console.log(error?.response?.data?.message);
        showError("Google Login Failed");
      }
    },

    onError: () => {
      showError("Google Login Failed");
    },
  });

  const handleLogin = async () => {
    console.log("login butten clicked");
    try {
      const response = await loginUser({
        email,
        password,
      });
      console.log(response);
      if (response.success) {
        localStorage.setItem("token", response.token);

        showSuccess("Login successful!");

        setTimeout(() => {
          navigate("/chat", { replace: true });
        }, 1500);
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Login failed");
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
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold tracking-tight text-[#25D366] mb-2">
          NexaChat
        </h1>
        <p className="text-[#8B9389] text-sm uppercase tracking-[0.2em] font-medium">
          Precision-engineered communication.
        </p>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-[#151E16] border border-[#333B33] rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#25D366] blur-sm opacity-20" />

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#E1E3DF] mb-2">
            Welcome back
          </h2>
          <p className="text-[#C1C9BE] text-sm">
            Enter your credentials to access your workspace.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#25D366]">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9389] group-focus-within:text-[#25D366] transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="dev@nexachat.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl py-4 pl-12 pr-4 text-[#E1E3DF] placeholder-[#333B33] outline-none focus:border-[#25D366]/50 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#25D366]">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-medium text-[#25D366] hover:underline transition-all"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9389] group-focus-within:text-[#25D366] transition-colors"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl py-4 pl-12 pr-4 text-[#E1E3DF] placeholder-[#333B33] outline-none focus:border-[#25D366]/50 transition-all"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-[#0D150E] font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.2)]"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#333B33]"></div>
          </div>
          <span className="relative px-4 bg-[#151E16] text-[10px] font-bold uppercase tracking-widest text-[#8B9389]">
            Or continue with
          </span>
        </div>

        {/* OAuth Buttons */}
        <div className="flex justify-center">
          <button
            className="w-64 flex items-center justify-center gap-3 bg-[#0D150E] hover:bg-[#333B33]/20 border border-[#333B33] rounded-xl py-3 text-sm font-medium transition-all group"
            onClick={() => googleLogin()}
          >
            <FcGoogle size={18} />
            <span className="text-[#E1E3DF]">Continue with Google</span>
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-[#8B9389]">
          New to NexaChat?{" "}
          <Link
            to="/register"
            className="text-[#25D366] font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>

      {/* Footer Details */}
      <footer className="mt-12 w-full max-w-md flex justify-between items-center text-[10px] font-mono text-[#8B9389] font-bold uppercase tracking-widest">
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#E1E3DF]">
            Status
          </a>
          <a href="#" className="hover:text-[#E1E3DF]">
            Docs
          </a>
        </div>
        <div>V2.4.0-STABLE</div>
      </footer>
    </div>
  );
};

export default AuthScreen;
