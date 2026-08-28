import React, { useState } from 'react';
import { Sparkles, LogIn, UserPlus } from 'lucide-react';
import { StyleverseFoxLogo, PixieExpression } from './PixieSprite';

interface AuthViewProps {
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string) => Promise<void>;
}

export const AuthView: React.FC<AuthViewProps> = ({
  loading,
  error,
  isConfigured,
  onSignIn,
  onSignUp,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password || loading || !isConfigured) return;
    if (mode === 'signin') {
      await onSignIn(email.trim(), password);
    } else {
      await onSignUp(email.trim(), password);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] bg-pixel-dots flex items-center justify-center p-4 selection:bg-[#d3bcfc] selection:text-[#180065]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 md:p-8 flex flex-col justify-between gap-6 overflow-hidden relative">
          <div className="flex items-center gap-3">
            <StyleverseFoxLogo size={54} />
            <div>
              <h1 className="font-pixel text-xl text-[#180065] tracking-wider">STYLEVERSE</h1>
              <p className="font-mono-pixel text-[11px] text-[#68548d] font-bold">
                DIGITAL CLOSET & AI STYLIST
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffd9e2] rounded-full pixel-border-2 text-xs font-mono-pixel font-bold text-[#6c2040] self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4081]" />
              <span>YOUR CLOSET NOW SAVES</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-[#180065] leading-tight">
              Step back into your style universe.
            </h2>
            <p className="text-sm md:text-base text-[#49454f] max-w-md leading-relaxed">
              Sign in to sync your wardrobe, saved looks, quests, SP, and Pixie progress across sessions.
            </p>
          </div>

          <div className="flex justify-center lg:justify-start">
            <PixieExpression reaction="HAPPY" size={150} showLabel />
          </div>
        </div>

        <div className="bg-white rounded-3xl pixel-border pixel-box-shadow-lg p-6 md:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-mono-pixel text-xs text-[#68548d] font-bold">
                {mode === 'signin' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#180065]">
                {mode === 'signin' ? 'Sign in' : 'Sign up'}
              </h2>
            </div>
            <div className="flex bg-[#f6f1ff] rounded-2xl pixel-border-2 p-1">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`px-3 py-1.5 rounded-xl font-mono-pixel text-xs font-bold ${
                  mode === 'signin' ? 'bg-[#b39ddb] text-[#180065]' : 'text-[#68548d]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`px-3 py-1.5 rounded-xl font-mono-pixel text-xs font-bold ${
                  mode === 'signup' ? 'bg-[#a4f0e9] text-[#00201e]' : 'text-[#68548d]'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {!isConfigured && (
            <div className="bg-[#fff9db] pixel-border-2 rounded-2xl p-3 text-xs text-[#6c2040] font-mono-pixel font-bold">
              Supabase env vars are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.
            </div>
          )}

          {error && (
            <div className="bg-[#ffd9e2] pixel-border-2 rounded-2xl p-3 text-xs text-[#6c2040] font-mono-pixel font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 bg-[#fcf8ff] rounded-2xl pixel-input font-body text-sm text-[#180065] placeholder:text-[#7a7580] focus:outline-none focus:bg-white"
                placeholder="bestie@styleverse.app"
                required
              />
            </div>

            <div>
              <label className="block font-mono-pixel text-xs font-bold text-[#180065] mb-1">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 bg-[#fcf8ff] rounded-2xl pixel-input font-body text-sm text-[#180065] placeholder:text-[#7a7580] focus:outline-none focus:bg-white"
                placeholder="At least 6 characters"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isConfigured}
              className="w-full py-3 bg-[#180065] text-white pixel-border rounded-xl pixel-box-shadow font-mono-pixel font-bold text-xs hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60 transition-all flex items-center justify-center gap-2"
            >
              {mode === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              <span>{loading ? 'Loading...' : mode === 'signin' ? 'Enter Styleverse' : 'Create Styleverse Account'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
