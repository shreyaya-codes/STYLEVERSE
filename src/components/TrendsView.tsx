import React from 'react';
import { TrendingUp, Sparkles, Heart, Zap } from 'lucide-react';

export const TrendsView: React.FC = () => {
  const trends = [
    {
      title: 'Cyber-Pastel Streetwear',
      badge: 'TOP #1 TREND',
      description: 'Chunky platforms layered with cropped puffer jackets and lavender anime graphics.',
      adoptionRate: 88,
      color: '#d3bcfc',
    },
    {
      title: 'Retro Pixel Preppy',
      badge: 'RISING FAST',
      description: 'Mint pleated tennis skirts, vintage sweater vests, and game-boy styled badges.',
      adoptionRate: 74,
      color: '#a4f0e9',
    },
    {
      title: 'Kawaii Techwear',
      badge: 'HOT COMMUNITY',
      description: 'Oversized tactical cargo pants accented by pink Mary Janes and heart choker chains.',
      adoptionRate: 65,
      color: '#ffd9e2',
    },
    {
      title: 'Cozy Cloud Loungewear',
      badge: 'WEEKEND STAPLE',
      description: 'Plush cloud hoodies, knit cat beanies, and oversized fleece cardigans.',
      adoptionRate: 82,
      color: '#ffd54f',
    },
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto p-4 md:p-8 w-full flex flex-col gap-6">
      <div>
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#180065]">
          STYLEVERSE TREND RADAR
        </h1>
        <p className="text-sm md:text-base text-[#49454f]">
          Real-time aesthetic analytics and trending style formulas curated by Pixie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trends.map((trend, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl pixel-border pixel-box-shadow p-6 flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono-pixel font-bold pixel-border-2"
                style={{ backgroundColor: trend.color, color: '#180065' }}
              >
                {trend.badge}
              </span>
              <span className="font-mono-pixel text-xs text-[#136964] font-bold">
                {trend.adoptionRate}% Affinity
              </span>
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-xl text-[#180065]">
                {trend.title}
              </h3>
              <p className="text-sm text-[#49454f] mt-1">
                {trend.description}
              </p>
            </div>

            {/* Popularity bar */}
            <div className="w-full h-3 bg-[#f0ebff] rounded-full pixel-border-2 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-[#180065]"
                style={{ width: `${trend.adoptionRate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
