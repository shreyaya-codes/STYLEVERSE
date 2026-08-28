import React from 'react';
import { StyleverseFoxLogo } from './PixieSprite';
import { Search, Bell, Flame, Sparkles, CloudSun, Calendar, Volume2, VolumeX, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  userProfile: UserProfile;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenNotifications?: () => void;
  onLogoClick?: () => void;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  searchQuery,
  setSearchQuery,
  onOpenNotifications,
  onLogoClick,
  onSignOut,
}) => {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <header className="w-full bg-[#ffffff] border-b-[3px] border-[#180065] px-4 md:px-8 py-3 sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Brand Logo & Name */}
      <div 
        onClick={onLogoClick}
        className="flex items-center gap-3 cursor-pointer select-none group"
      >
        <StyleverseFoxLogo size={42} />
        <div className="flex flex-col">
          <span className="font-pixel text-lg md:text-xl font-bold tracking-wider text-[#180065] group-hover:text-[#68548d] transition-colors">
            STYLEVERSE
          </span>
          <span className="hidden sm:inline-block font-mono-pixel text-[10px] text-[#7a7580] -mt-1">
            DIGITAL CLOSET & AI STYLIST
          </span>
        </div>
      </div>

      {/* Center Search Bar (Inset Retro Look) */}
      <div className="flex-1 max-w-md hidden md:flex items-center relative">
        <Search className="w-4 h-4 text-[#7a7580] absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items, vibes, aesthetics, colors..."
          className="w-full pl-9 pr-4 py-2 bg-[#fcf8ff] rounded-xl pixel-input font-mono-pixel text-xs md:text-sm text-[#180065] placeholder:text-[#7a7580] focus:outline-none focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 text-xs text-[#7a7580] hover:text-[#180065] font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Right Action & Stats Badges */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Weather & Calendar Pills (From Image 9 top bar) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f6f1ff] pixel-border-2 rounded-xl text-xs font-mono-pixel text-[#180065]">
          <CloudSun className="w-3.5 h-3.5 text-[#136964]" />
          <span>21°C</span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f6f1ff] pixel-border-2 rounded-xl text-xs font-mono-pixel text-[#180065]">
          <Calendar className="w-3.5 h-3.5 text-[#68548d]" />
          <span>Aug 26</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 bg-white pixel-border-2 rounded-xl pixel-box-shadow-sm hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          title="Notifications & Quest Alerts"
        >
          <Bell className="w-4 h-4 text-[#180065]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff4081] rounded-full border-2 border-white animate-pulse" />
        </button>

        {/* 2,450 SP (Style Points) Mint Badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#a4f0e9] pixel-border-2 rounded-xl pixel-box-shadow-mint text-xs md:text-sm font-mono-pixel font-bold text-[#00201e] select-none hover:-translate-y-0.5 transition-transform"
          title="Style Points (SP) - Earn by styling outfits and chatting with Pixie"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#136964]" />
          <span>{userProfile.sp.toLocaleString()} SP</span>
        </div>

        {/* 7 Day Streak Pink Badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ffd9e2] pixel-border-2 rounded-xl pixel-box-shadow-pink text-xs md:text-sm font-mono-pixel font-bold text-[#3e001e] select-none hover:-translate-y-0.5 transition-transform"
          title="Daily Styling Streak! Keep it going for bonus SP."
        >
          <Flame className="w-3.5 h-3.5 text-[#ff4081] fill-[#ff4081]" />
          <span>{userProfile.streakDays} Day Streak</span>
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 text-[#7a7580] hover:text-[#180065] rounded-lg hidden sm:block"
          title={soundEnabled ? "Mute retro sounds" : "Enable retro sounds"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {onSignOut && (
          <button
            onClick={onSignOut}
            className="p-2 bg-white pixel-border-2 rounded-xl pixel-box-shadow-sm hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            title="Sign out"
          >
            <LogOut className="w-4 h-4 text-[#180065]" />
          </button>
        )}
      </div>
    </header>
  );
};
