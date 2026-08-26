import React, { useState } from 'react';
import { 
  initialUserProfile, 
  initialClosetItems, 
  initialClosetStats, 
  initialQuests, 
  gachaPool 
} from './data/mockData';
import { 
  ClothingItem, 
  UserProfile, 
  ClosetStats, 
  Quest, 
  ShopItem, 
  SavedOutfit 
} from './types';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { ClosetView } from './components/ClosetView';
import { AIStylistView } from './components/AIStylistView';
import { StyleMeView } from './components/StyleMeView';
import { TryOnView } from './components/TryOnView';
import { ShopView } from './components/ShopView';
import { QuestsView } from './components/QuestsView';
import { TrendsView } from './components/TrendsView';
import { HomeView } from './components/HomeView';
import { AddItemModal } from './components/AddItemModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('closet');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [closetItems, setClosetItems] = useState<ClothingItem[]>(initialClosetItems);
  const [closetStats, setClosetStats] = useState<ClosetStats>(initialClosetStats);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 3500);
  };

  const handleAddSp = (amount: number) => {
    setUserProfile((prev) => ({
      ...prev,
      sp: prev.sp + amount,
    }));
    showToast(`+${amount} SP earned! ✨`);
  };

  const handleAddBestieXp = (amount: number) => {
    setUserProfile((prev) => {
      const newXp = prev.bestieXp + amount;
      if (newXp >= prev.bestieMaxXp) {
        showToast(`🎉 Bestie Level UP! Reached Level ${prev.bestieLevel + 1}!`);
        return {
          ...prev,
          bestieLevel: prev.bestieLevel + 1,
          bestieXp: newXp - prev.bestieMaxXp,
          bestieMaxXp: Math.floor(prev.bestieMaxXp * 1.3),
        };
      }
      return {
        ...prev,
        bestieXp: newXp,
      };
    });
  };

  const handleAddItem = (newItem: ClothingItem) => {
    setClosetItems((prev) => [newItem, ...prev]);
    setClosetStats((prev) => ({
      ...prev,
      totalItems: prev.totalItems + 1,
    }));
    handleAddSp(25);
    showToast(`Added "${newItem.name}" to wardrobe!`);
  };

  const handleWearItem = (item: ClothingItem) => {
    setClosetItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, wearCount: i.wearCount + 1, daysSinceLastWorn: 0 }
          : i
      )
    );
    handleAddSp(10);
  };

  const handleRepairItem = (item: ClothingItem) => {
    setClosetItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, condition: 100 } : i))
    );
    showToast(`Repaired ${item.name} to 100% condition!`);
  };

  const handleToggleFavorite = (item: ClothingItem) => {
    setClosetItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, isFavorite: !i.isFavorite } : i
      )
    );
  };

  const handleClaimQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          handleAddSp(q.rewardSp);
          handleAddBestieXp(q.rewardBestieXp);
          return { ...q, claimed: true };
        }
        return q;
      })
    );
  };

  const handleBuyShopItem = (item: ShopItem) => {
    if (userProfile.sp < item.priceSp) {
      alert('Not enough SP!');
      return;
    }

    setUserProfile((prev) => ({ ...prev, sp: prev.sp - item.priceSp }));

    const newItem: ClothingItem = {
      id: `shop_${Date.now()}`,
      name: item.name,
      category: item.category,
      rarity: item.rarity,
      vibe: item.vibe,
      wearCount: 0,
      condition: 100,
      imageType: item.imageType,
      color: item.color,
      tags: [item.vibe, item.category],
      daysSinceLastWorn: 0,
      isFavorite: true,
      acquiredDate: new Date().toISOString().split('T')[0],
      resaleValue: item.priceSp * 2,
    };

    setClosetItems((prev) => [newItem, ...prev]);
    showToast(`Purchased ${item.name}! Added to closet.`);
  };

  const handleGachaPull = (cost: number): ClothingItem | null => {
    setUserProfile((prev) => ({ ...prev, sp: prev.sp - cost }));
    const randomGacha = gachaPool[Math.floor(Math.random() * gachaPool.length)];

    const newItem: ClothingItem = {
      id: `gacha_${Date.now()}`,
      name: randomGacha.name,
      category: randomGacha.category,
      rarity: randomGacha.rarity,
      vibe: randomGacha.vibe,
      wearCount: 0,
      condition: 100,
      imageType: randomGacha.imageType,
      color: randomGacha.color,
      tags: [randomGacha.vibe, 'Gacha Drop'],
      daysSinceLastWorn: 0,
      isFavorite: true,
      acquiredDate: new Date().toISOString().split('T')[0],
      resaleValue: randomGacha.priceSp * 2,
    };

    setClosetItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const handleSaveOutfit = (outfit: { name: string; itemIds: string[]; occasion: string; score: number }) => {
    const newOutfit: SavedOutfit = {
      id: `outfit_${Date.now()}`,
      name: outfit.name,
      occasion: outfit.occasion,
      itemIds: outfit.itemIds,
      score: outfit.score,
      vibe: 'Pastel Streetwear',
      createdAt: new Date().toISOString(),
      wornCount: 1,
    };
    setSavedOutfits((prev) => [newOutfit, ...prev]);
    handleAddSp(50);
    showToast(`Outfit "${outfit.name}" saved to Lookbook! (+50 SP)`);
  };

  const handleWearOutfit = (itemIds: string[]) => {
    setClosetItems((prev) =>
      prev.map((item) =>
        itemIds.includes(item.id)
          ? { ...item, wearCount: item.wearCount + 1, daysSinceLastWorn: 0 }
          : item
      )
    );
    showToast('Look equipped for today! +50 SP');
  };

  // Filtered closet items based on top-bar search query
  const searchedClosetItems = closetItems.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.vibe.toLowerCase().includes(q) ||
      item.rarity.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#fffdfa] flex flex-col selection:bg-[#d3bcfc] selection:text-[#180065]">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#180065] text-white px-5 py-3 rounded-2xl pixel-border pixel-box-shadow font-mono-pixel text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Navbar (From Image 2 & 9) */}
      <Navbar
        userProfile={userProfile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNotifications={() => setCurrentTab('quests')}
        onLogoClick={() => setCurrentTab('home')}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        {/* Navigation Sidebar (From Image 2 & 9) */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          userProfile={userProfile}
          closetCount={closetItems.length}
          onOpenWardrobeModal={() => setIsAddItemModalOpen(true)}
          onOpenAvatarCustomizer={() => setCurrentTab('try_on')}
        />

        {/* Dynamic Screen Content */}
        <main className="flex-1 flex overflow-y-auto">
          {currentTab === 'home' && (
            <HomeView
              userProfile={userProfile}
              closetItems={closetItems}
              closetStats={closetStats}
              onNavigate={(tab) => setCurrentTab(tab)}
              onClaimDailyBonus={() => handleAddSp(100)}
            />
          )}

          {currentTab === 'closet' && (
            <ClosetView
              items={searchedClosetItems}
              closetStats={closetStats}
              onSelectItem={() => {}}
              onAddItem={() => setIsAddItemModalOpen(true)}
              onWearItem={handleWearItem}
              onRepairItem={handleRepairItem}
              onToggleFavorite={handleToggleFavorite}
              onLaunchUnwornRescue={() => setCurrentTab('style_me')}
            />
          )}

          {currentTab === 'ai_stylist' && (
            <AIStylistView
              userProfile={userProfile}
              closetItems={closetItems}
              onAddSp={handleAddSp}
              onAddBestieXp={handleAddBestieXp}
              onWearOutfitItems={handleWearOutfit}
            />
          )}

          {currentTab === 'style_me' && (
            <StyleMeView
              closetItems={closetItems}
              userProfile={userProfile}
              onSaveOutfit={handleSaveOutfit}
              onWearOutfit={handleWearOutfit}
            />
          )}

          {currentTab === 'try_on' && (
            <TryOnView
              userProfile={userProfile}
              closetItems={closetItems}
              onUpdateAvatar={(newAvatar) => {
                setUserProfile((prev) => ({ ...prev, avatar: newAvatar }));
                showToast('Avatar style updated!');
              }}
            />
          )}

          {currentTab === 'shop' && (
            <ShopView
              userProfile={userProfile}
              shopItems={gachaPool}
              onBuyItem={handleBuyShopItem}
              onGachaPull={handleGachaPull}
            />
          )}

          {currentTab === 'quests' && (
            <QuestsView
              userProfile={userProfile}
              quests={quests}
              onClaimQuest={handleClaimQuest}
            />
          )}

          {currentTab === 'trends' && <TrendsView />}
        </main>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
}
