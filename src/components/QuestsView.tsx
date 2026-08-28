import React from 'react';
import { Quest, UserProfile } from '../types';
import { CheckCircle2, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestsViewProps {
  userProfile: UserProfile;
  quests: Quest[];
  onClaimQuest: (questId: string) => void;
}

export const QuestsView: React.FC<QuestsViewProps> = ({
  userProfile,
  quests,
  onClaimQuest,
}) => {
  const handleClaim = (q: Quest) => {
    onClaimQuest(q.id);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a4f0e9', '#ffd54f', '#d3bcfc'],
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 md:p-8 w-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#180065]">
          STYLE QUESTS & MILESTONES
        </h1>
        <p className="text-sm md:text-base text-[#49454f]">
          Complete daily wardrobe challenges, rescue forgotten clothes, and level up your Style Master rank.
        </p>
      </div>

      {/* Level Banner */}
      <div className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#ffd9e2] pixel-border-2 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-[#ff4081]" />
          </div>
          <div>
            <span className="font-mono-pixel text-xs text-[#68548d] font-bold">CURRENT RANK</span>
            <h3 className="font-heading font-black text-2xl text-[#180065]">
              Level {userProfile.level} • {userProfile.title}
            </h3>
            <span className="text-xs text-[#49454f]">Next Title: Level 18 "Runway Visionary"</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#ffd9e2] rounded-xl pixel-border-2 font-mono-pixel text-xs font-bold text-[#6c2040] flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#ff4081] fill-[#ff4081]" />
            <span>{userProfile.streakDays} Day Streak!</span>
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map((quest) => {
          const isReadyToClaim = quest.completed && !quest.claimed;

          return (
            <div
              key={quest.id}
              className={`bg-white rounded-2xl pixel-border p-5 flex flex-col justify-between gap-4 ${
                quest.claimed ? 'opacity-70 bg-[#faf7ff]' : 'pixel-box-shadow'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-pixel font-bold bg-[#f0ebff] text-[#68548d]">
                      {quest.type.toUpperCase()}
                    </span>
                    <h4 className="font-heading font-bold text-base text-[#180065]">
                      {quest.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#49454f] mt-1">
                    {quest.description}
                  </p>
                </div>
              </div>

              {/* Reward & Action */}
              <div className="flex items-center justify-between pt-2 border-t-2 border-[#f0ebff]">
                <div className="flex items-center gap-3 text-xs font-mono-pixel">
                  <span className="font-bold text-[#136964]">
                    +{quest.rewardSp} SP
                  </span>
                  <span className="font-bold text-[#68548d]">
                    +{quest.rewardBestieXp} XP
                  </span>
                </div>

                {quest.claimed ? (
                  <span className="px-3 py-1 bg-[#f0ebff] rounded-lg text-xs font-mono-pixel font-bold text-[#7a7580] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#136964]" />
                    Claimed
                  </span>
                ) : isReadyToClaim ? (
                  <button
                    onClick={() => handleClaim(quest)}
                    className="px-4 py-1.5 bg-[#a4f0e9] text-[#00201e] pixel-border-2 rounded-xl text-xs font-mono-pixel font-bold hover:bg-[#89d4cd] transition-colors"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <span className="px-3 py-1 bg-[#fcf8ff] pixel-border-2 rounded-lg text-xs font-mono-pixel font-bold text-[#7a7580]">
                    In Progress ({quest.progress}/{quest.target})
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
