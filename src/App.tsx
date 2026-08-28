import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { 
  initialUserProfile, 
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
import { isSupabaseConfigured, supabase } from './lib/supabase';
import { getSession, signIn, signOut, signUp } from './services/authService';
import { ensureProfile, updateProfile } from './services/profileService';
import {
  addClothingItem,
  getWardrobe,
  recordWear,
  repairItem,
  seedMockWardrobeIfEmpty,
  toggleFavorite,
} from './services/wardrobeService';
import { getSavedOutfits, saveOutfit } from './services/outfitService';
import {
  claimQuest,
  getQuests,
  seedQuestsIfEmpty,
  updateQuestProgress as persistQuestProgress,
} from './services/questService';
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
import { AuthView } from './components/AuthView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('closet');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [closetItems, setClosetItems] = useState<ClothingItem[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 3500);
  };

  const closetStats: ClosetStats = useMemo(() => {
    const totalItems = closetItems.length;
    const averageCondition = totalItems
      ? Math.round(closetItems.reduce((sum, item) => sum + item.condition, 0) / totalItems)
      : 0;
    const unworn30dCount = closetItems.filter((item) => item.daysSinceLastWorn > 30).length;
    const colorDiversity = totalItems
      ? Math.round((new Set(closetItems.map((item) => item.color)).size / totalItems) * 100)
      : 0;
    const sustainabilityScore = totalItems
      ? Math.max(0, Math.round(100 - (unworn30dCount / totalItems) * 35 - ((100 - averageCondition) * 0.25)))
      : 0;
    const categoryWearTotals = closetItems.reduce<Record<string, number>>((totals, item) => {
      totals[item.category] = (totals[item.category] || 0) + item.wearCount;
      return totals;
    }, {});
    const mostWornCategory =
      (Object.entries(categoryWearTotals) as [string, number][])
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
    const utilityScore = totalItems
      ? Math.round((closetItems.filter((item) => item.wearCount > 0).length / totalItems) * 100)
      : 0;
    const healthScore = totalItems
      ? Math.round((averageCondition * 0.4) + (sustainabilityScore * 0.35) + (utilityScore * 0.25))
      : 0;

    return {
      healthScore,
      totalItems,
      mostWornCategory,
      unworn30dCount,
      sustainabilityScore,
      colorDiversity,
      averageCondition,
    };
  }, [closetItems]);

  const resetAppState = useCallback(() => {
    setUserId(null);
    setUserProfile(initialUserProfile);
    setClosetItems([]);
    setQuests([]);
    setSavedOutfits([]);
    setCurrentTab('closet');
    setSearchQuery('');
  }, []);

  const loadUserData = useCallback(async (nextUserId: string) => {
    setDataLoading(true);
    try {
      const profile = await ensureProfile(nextUserId);
      const [wardrobe, outfits, loadedQuests] = await Promise.all([
        getWardrobe(nextUserId),
        getSavedOutfits(nextUserId),
        getQuests(nextUserId),
      ]);

      setUserId(nextUserId);
      setUserProfile(profile);
      setClosetItems(wardrobe.length > 0 ? wardrobe : await seedMockWardrobeIfEmpty(nextUserId));
      setSavedOutfits(outfits);
      setQuests(loadedQuests.length > 0 ? loadedQuests : await seedQuestsIfEmpty(nextUserId));
      setAuthError(null);
    } catch (error: any) {
      setAuthError(error.message || 'Could not load Styleverse data.');
      showToast('Could not load Styleverse data.');
    } finally {
      setDataLoading(false);
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (!isSupabaseConfigured) {
        setAuthLoading(false);
        return;
      }

      try {
        const session = await getSession();
        if (!mounted) return;
        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          resetAppState();
          setAuthLoading(false);
        }
      } catch (error: any) {
        if (!mounted) return;
        setAuthError(error.message || 'Authentication failed.');
        setAuthLoading(false);
      }
    };

    initializeAuth();

    if (!isSupabaseConfigured) return () => {
      mounted = false;
    };

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        void loadUserData(session.user.id);
      } else {
        resetAppState();
        setAuthLoading(false);
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [loadUserData, resetAppState]);

  const persistProfile = async (nextProfile: UserProfile) => {
    setUserProfile(nextProfile);
    if (!userId) return nextProfile;
    const saved = await updateProfile(userId, nextProfile);
    setUserProfile(saved);
    return saved;
  };

  const updateQuestProgress = async (questTemplateId: string, progressDelta: number) => {
    if (!userId) return;
    const quest = quests.find((q) => (q.templateId || q.id) === questTemplateId);
    if (!quest || quest.claimed || quest.completed) return;

    try {
      const updated = await persistQuestProgress(userId, quest, progressDelta);
      setQuests((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    } catch (error: any) {
      showToast(error.message || 'Quest progress could not be saved.');
    }
  };

  const handleAddSp = async (amount: number) => {
    await persistProfile({
      ...userProfile,
      sp: Math.max(0, userProfile.sp + amount),
    });
    showToast(`+${amount} SP earned! ✨`);
  };

  const handleAddBestieXp = async (amount: number) => {
    const newXp = userProfile.bestieXp + amount;
    const leveledUp = newXp >= userProfile.bestieMaxXp;
    const nextProfile = leveledUp
      ? {
          ...userProfile,
          bestieLevel: userProfile.bestieLevel + 1,
          bestieXp: newXp - userProfile.bestieMaxXp,
          bestieMaxXp: Math.floor(userProfile.bestieMaxXp * 1.3),
        }
      : {
          ...userProfile,
          bestieXp: newXp,
        };
    await persistProfile(nextProfile);
    if (leveledUp) {
      showToast(`🎉 Bestie Level UP! Reached Level ${nextProfile.bestieLevel}!`);
    }
  };

  const handleAddItem = async (newItem: Omit<ClothingItem, 'id'>, imageFile?: File | null) => {
    if (!userId) return;
    setOperationLoading(true);
    try {
      const created = await addClothingItem(userId, newItem, imageFile);
      setClosetItems((prev) => [created, ...prev]);
      await handleAddSp(25);
      showToast(`Added "${created.name}" to wardrobe!`);
    } catch (error: any) {
      showToast(error.message || 'Could not add clothing item.');
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  const handleWearItem = async (item: ClothingItem) => {
    if (!userId) return;
    try {
      const updated = await recordWear(userId, item);
      setClosetItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
      await handleAddSp(10);
    } catch (error: any) {
      showToast(error.message || 'Could not record wear.');
    }
  };

  const handleRepairItem = async (item: ClothingItem) => {
    if (!userId) return;
    try {
      const updated = await repairItem(userId, item);
      setClosetItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
      if (item.condition < 90) {
        await updateQuestProgress('q4', 1);
      }
      showToast(`Repaired ${item.name} to 100% condition!`);
    } catch (error: any) {
      showToast(error.message || 'Could not repair item.');
    }
  };

  const handleToggleFavorite = async (item: ClothingItem) => {
    if (!userId) return;
    try {
      const updated = await toggleFavorite(userId, item);
      setClosetItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
    } catch (error: any) {
      showToast(error.message || 'Could not update favorite.');
    }
  };

  const handleClaimQuest = async (questId: string) => {
    if (!userId) return;
    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.claimed || !quest.completed) return;

    try {
      const updated = await claimQuest(userId, quest);
      setQuests((prev) => prev.map((q) => (q.id === questId ? updated : q)));
      await handleAddSp(quest.rewardSp);
      await handleAddBestieXp(quest.rewardBestieXp);
    } catch (error: any) {
      showToast(error.message || 'Could not claim quest reward.');
    }
  };

  const handleBuyShopItem = async (item: ShopItem) => {
    if (!userId) return;
    if (userProfile.sp < item.priceSp) {
      showToast('Not enough SP!');
      return;
    }

    const newItem: Omit<ClothingItem, 'id'> = {
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

    try {
      await persistProfile({ ...userProfile, sp: userProfile.sp - item.priceSp });
      const created = await addClothingItem(userId, newItem);
      setClosetItems((prev) => [created, ...prev]);
      showToast(`Purchased ${item.name}! Added to closet.`);
    } catch (error: any) {
      showToast(error.message || 'Could not complete purchase.');
    }
  };

  const handleGachaPull = async (cost: number): Promise<ClothingItem | null> => {
    if (!userId) return null;
    await persistProfile({ ...userProfile, sp: userProfile.sp - cost });
    const randomGacha = gachaPool[Math.floor(Math.random() * gachaPool.length)];

    const newItem: Omit<ClothingItem, 'id'> = {
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

    const created = await addClothingItem(userId, newItem);
    setClosetItems((prev) => [created, ...prev]);
    return created;
  };

  const handleSaveOutfit = async (outfit: { name: string; itemIds: string[]; occasion: string; score: number }) => {
    if (!userId) return;
    const newOutfit = {
      name: outfit.name,
      occasion: outfit.occasion,
      itemIds: outfit.itemIds,
      score: outfit.score,
      vibe: 'Pastel Streetwear',
      createdAt: new Date().toISOString(),
      wornCount: 1,
    };

    try {
      const saved = await saveOutfit(userId, newOutfit);
      setSavedOutfits((prev) => [saved, ...prev]);
      if (outfit.score > 90) {
        await updateQuestProgress('q3', 1);
      }
      showToast(`Outfit "${outfit.name}" saved to Lookbook!`);
    } catch (error: any) {
      showToast(error.message || 'Could not save outfit.');
    }
  };

  const handleWearOutfit = async (itemIds: string[]) => {
    if (!userId) return;
    const rescuedUnwornItem = closetItems.some(
      (item) => itemIds.includes(item.id) && item.daysSinceLastWorn > 30
    );

    try {
      const updatedItems = await Promise.all(
        closetItems
          .filter((item) => itemIds.includes(item.id))
          .map((item) => recordWear(userId, item))
      );
      setClosetItems((prev) =>
        prev.map((item) => updatedItems.find((updated) => updated.id === item.id) || item)
      );
      await handleAddSp(50);
      if (rescuedUnwornItem) {
        await updateQuestProgress('q1', 1);
      }
      showToast('Look equipped for today! +50 SP');
    } catch (error: any) {
      showToast(error.message || 'Could not wear outfit.');
    }
  };

  const handleUpdateAvatar = async (newAvatar: UserProfile['avatar']) => {
    try {
      await persistProfile({ ...userProfile, avatar: newAvatar });
      showToast('Avatar style updated!');
    } catch (error: any) {
      showToast(error.message || 'Could not update avatar.');
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const user = await signIn(email, password);
      if (user) await loadUserData(user.id);
    } catch (error: any) {
      setAuthError(error.message || 'Could not sign in.');
      setAuthLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const user = await signUp(email, password);
      const session = await getSession();
      if (session?.user) {
        await loadUserData(session.user.id);
      } else if (user) {
        setAuthError('Check your email to confirm your account, then sign in.');
        setAuthLoading(false);
      }
    } catch (error: any) {
      setAuthError(error.message || 'Could not sign up.');
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      resetAppState();
    } catch (error: any) {
      showToast(error.message || 'Could not sign out.');
    }
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

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-[#fffdfa] bg-pixel-dots flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col items-center gap-3">
          <span className="font-pixel text-sm text-[#180065]">STYLEVERSE</span>
          <span className="font-mono-pixel text-xs text-[#68548d] font-bold">Loading your closet...</span>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <AuthView
        loading={authLoading}
        error={authError}
        isConfigured={isSupabaseConfigured}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    );
  }

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
        onSignOut={handleSignOut}
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
              savedOutfits={savedOutfits}
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
                void handleUpdateAvatar(newAvatar);
              }}
            />
          )}

          {currentTab === 'shop' && (
            <ShopView
              userProfile={userProfile}
              shopItems={gachaPool}
              onBuyItem={handleBuyShopItem}
              onGachaPull={handleGachaPull}
              onInsufficientSp={showToast}
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
        isSaving={operationLoading}
      />
    </div>
  );
}
