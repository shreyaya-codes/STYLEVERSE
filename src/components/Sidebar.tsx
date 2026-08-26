import React from 'react';
import { Home, Shirt, Sparkles, User, ShoppingBag, TrendingUp, Bot, Compass, Plus } from 'lucide-react';
import { UserProfile } from '../types';

export type NavTab = 'home' | 'closet' | 'style_me' | 'try_on' | 'shop' | 'trends' | 'ai_stylist' | 'quests';

interface SidebarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  userProfile: UserProfile;
  closetCount: number;
  onOpenWardrobeModal: () => void;
  onOpenAvatarCustomizer?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  userProfile,
  closetCount,
  onOpenWardrobeModal,
  onOpenAvatarCustomizer,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'closet', label: 'Closet', icon: <Shirt className="w-5 h-5" />, badge: closetCount },
    { id: 'style_me', label: 'Style Me', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'try_on', label: 'Try-On', icon: <User className="w-5 h-5" /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'ai_stylist', label: 'AI Stylist', icon: <Bot className="w-5 h-5" />, badge: 'Pixie' },
    { id: 'quests', label: 'Quests', icon: <Compass className="w-5 h-5" />, badge: '!' },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#fcf8ff] md:border-r-[3px] border-[#180065] p-4 flex flex-col justify-between select-none shrink-0">
      {/* Top Section: User Profile Card & Navigation List */}
      <div className="flex flex-col gap-5">
        {/* User Profile Mini-Card (From Image 2 & 9) */}
        <div 
          onClick={onOpenAvatarCustomizer}
          className="bg-[#ffffff] rounded-2xl pixel-border pixel-box-shadow-sm p-3.5 flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all group"
          title="Click to view & customize Style Profile"
        >
          {/* Pixel Avatar Picture Frame */}
          <div className="w-12 h-12 rounded-xl bg-[#e5deff] pixel-border-2 flex items-center justify-center overflow-hidden shrink-0 group-hover:rotate-3 transition-transform">
            <svg viewBox="0 0 32 32" className="w-full h-full" style={{ shapeRendering: 'crispEdges' }}>
              <rect width="32" height="32" fill="#fff9db" />
              {/* Hair */}
              <rect x="8" y="6" width="16" height="10" fill="#9575cd" />
              <rect x="6" y="10" width="4" height="12" fill="#9575cd" />
              <rect x="22" y="10" width="4" height="12" fill="#9575cd" />
              {/* Skin */}
              <rect x="10" y="10" width="12" height="12" fill="#ffd8be" />
              <rect x="12" y="14" width="2" height="2" fill="#180065" />
              <rect x="18" y="14" width="2" height="2" fill="#180065" />
              <rect x="14" y="18" width="4" height="1" fill="#d81b60" />
              {/* Glasses */}
              <rect x="10" y="12" width="5" height="4" fill="none" stroke="#180065" strokeWidth="1" />
              <rect x="17" y="12" width="5" height="4" fill="none" stroke="#180065" strokeWidth="1" />
              <rect x="15" y="13" width="2" height="1" fill="#180065" />
              {/* Clothes */}
              <rect x="8" y="22" width="16" height="10" fill="#a4f0e9" />
              <rect x="12" y="24" width="8" height="6" fill="#b39ddb" />
            </svg>
          </div>

          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-base text-[#180065] truncate leading-tight">
                Level {userProfile.level}
              </span>
            </div>
            <span className="font-mono-pixel text-[11px] text-[#68548d] font-bold truncate">
              {userProfile.title}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading font-bold text-sm transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#b39ddb] text-[#180065] pixel-border-2 pixel-box-shadow-sm font-extrabold'
                    : 'text-[#49454f] hover:text-[#180065] hover:bg-[#f0ebff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#180065]' : 'text-[#68548d]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-[11px] font-mono-pixel font-bold ${
                      isActive
                        ? 'bg-white text-[#180065] pixel-border-2'
                        : item.badge === '!'
                        ? 'bg-[#ffd9e2] text-[#6c2040]'
                        : item.badge === 'Pixie'
                        ? 'bg-[#a4f0e9] text-[#136964]'
                        : 'bg-[#ebe5ff] text-[#68548d]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Button: "Open Wardrobe" (From Image 2 & 9) */}
      <div className="pt-4 border-t-2 border-[#f0ebff] hidden md:block">
        <button
          onClick={onOpenWardrobeModal}
          className="w-full py-3 px-4 bg-[#a4f0e9] pixel-border rounded-xl pixel-box-shadow-mint font-mono-pixel font-bold text-sm text-[#00201e] hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Open Wardrobe</span>
        </button>
      </div>
    </aside>
  );
};
