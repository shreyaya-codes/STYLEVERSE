import React from 'react';
import { PixieReaction } from '../types';

interface PixieSpriteProps {
  reaction?: PixieReaction;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  showSparkles?: boolean;
}

// Pixel Fox Logo (From Image 1)
export const StyleverseFoxLogo: React.FC<{ size?: number; className?: string; withText?: boolean }> = ({
  size = 56,
  className = '',
  withText = false,
}) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div 
        className="relative bg-[#ffffff] rounded-2xl p-1 pixel-border pixel-box-shadow-sm flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* Beanie / Hat (Lilac Purple) */}
          <rect x="18" y="10" width="28" height="6" fill="#180065" />
          <rect x="20" y="12" width="24" height="12" fill="#b39ddb" />
          {/* Beanie ribbing */}
          <rect x="16" y="20" width="32" height="6" fill="#9575cd" />
          <rect x="16" y="26" width="32" height="2" fill="#180065" />
          
          {/* Cat/Fox Ears */}
          <rect x="16" y="8" width="8" height="8" fill="#9575cd" />
          <rect x="18" y="10" width="4" height="4" fill="#ffd9e2" />
          <rect x="40" y="8" width="8" height="8" fill="#9575cd" />
          <rect x="42" y="10" width="4" height="4" fill="#ffd9e2" />

          {/* White Fur Face */}
          <rect x="18" y="26" width="28" height="18" fill="#ffffff" />
          <rect x="14" y="32" width="4" height="8" fill="#ffffff" />
          <rect x="46" y="32" width="4" height="8" fill="#ffffff" />

          {/* Cheeks (Blush) */}
          <rect x="20" y="36" width="4" height="2" fill="#ffb0c9" />
          <rect x="40" y="36" width="4" height="2" fill="#ffb0c9" />

          {/* Eyes */}
          <rect x="24" y="32" width="4" height="4" fill="#180065" />
          <rect x="24" y="32" width="2" height="2" fill="#ffffff" />
          <rect x="36" y="32" width="4" height="4" fill="#180065" />
          <rect x="36" y="32" width="2" height="2" fill="#ffffff" />

          {/* Cute Nose & Mouth */}
          <rect x="30" y="36" width="4" height="2" fill="#180065" />
          <rect x="29" y="38" width="2" height="2" fill="#180065" />
          <rect x="33" y="38" width="2" height="2" fill="#180065" />

          {/* Mint Scarf */}
          <rect x="16" y="44" width="32" height="8" fill="#a4f0e9" />
          <rect x="16" y="44" width="32" height="2" fill="#136964" />
          <rect x="32" y="48" width="8" height="12" fill="#89d4cd" />
          <rect x="32" y="60" width="8" height="2" fill="#136964" />

          {/* Body & Tail */}
          <rect x="20" y="52" width="24" height="8" fill="#d1c4e9" />
          <rect x="44" y="44" width="8" height="14" fill="#d1c4e9" />
          <rect x="48" y="40" width="6" height="6" fill="#ffffff" />
        </svg>
      </div>

      {withText && (
        <span className="font-pixel text-[13px] tracking-wider text-[#180065] mt-1 font-bold">
          STYLEVERSE
        </span>
      )}
    </div>
  );
};

// Pixie Circular Badge (From Image 13)
export const PixieBadge: React.FC<{ size?: number; className?: string; showName?: boolean }> = ({
  size = 52,
  className = '',
  showName = false,
}) => {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative rounded-full pixel-border pixel-box-shadow-sm bg-[#ffebee] p-0.5 flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* Outer circle background */}
          <rect x="0" y="0" width="64" height="64" fill="#fff9db" />
          
          {/* Sparkles background */}
          <rect x="10" y="14" width="2" height="6" fill="#a4f0e9" />
          <rect x="8" y="16" width="6" height="2" fill="#a4f0e9" />
          <rect x="52" y="18" width="2" height="6" fill="#a4f0e9" />
          <rect x="50" y="20" width="6" height="2" fill="#a4f0e9" />
          <rect x="8" y="32" width="4" height="4" fill="#ffd54f" />
          <rect x="52" y="32" width="4" height="4" fill="#ffd54f" />

          {/* Lavender Hair (Back) */}
          <rect x="14" y="16" width="36" height="34" fill="#b39ddb" />
          <rect x="10" y="26" width="44" height="24" fill="#b39ddb" />

          {/* Skin (Head & Neck) */}
          <rect x="20" y="22" width="24" height="22" fill="#ffd8be" />
          <rect x="28" y="44" width="8" height="6" fill="#f8bbd0" />

          {/* Lavender Hair (Front Bangs) */}
          <rect x="18" y="12" width="28" height="14" fill="#9575cd" />
          <rect x="16" y="20" width="6" height="12" fill="#9575cd" />
          <rect x="42" y="20" width="6" height="12" fill="#9575cd" />
          <rect x="26" y="22" width="6" height="6" fill="#9575cd" />
          <rect x="34" y="24" width="4" height="4" fill="#9575cd" />

          {/* Eyes (Sparkling anime blue/purple) */}
          <rect x="22" y="28" width="6" height="8" fill="#180065" />
          <rect x="22" y="30" width="4" height="4" fill="#64b5f6" />
          <rect x="23" y="29" width="2" height="2" fill="#ffffff" />
          
          <rect x="36" y="28" width="6" height="8" fill="#180065" />
          <rect x="36" y="30" width="4" height="4" fill="#64b5f6" />
          <rect x="37" y="29" width="2" height="2" fill="#ffffff" />

          {/* Cheeks Blush & Nose */}
          <rect x="22" y="38" width="4" height="2" fill="#ff80ab" />
          <rect x="38" y="38" width="4" height="2" fill="#ff80ab" />
          <rect x="31" y="36" width="2" height="2" fill="#f48fb1" />

          {/* Sweet Smile */}
          <rect x="29" y="40" width="6" height="2" fill="#d81b60" />
          <rect x="30" y="42" width="4" height="1" fill="#d81b60" />

          {/* Mint Top Collar */}
          <rect x="22" y="48" width="20" height="12" fill="#a4f0e9" />
          <rect x="28" y="46" width="8" height="4" fill="#ffd8be" />
        </svg>
      </div>

      {showName && (
        <div className="mt-1 bg-white pixel-border-2 rounded-lg px-2 py-0.5">
          <span className="font-heading font-extrabold text-[12px] tracking-wide text-[#9575cd]">
            PIXIE
          </span>
        </div>
      )}
    </div>
  );
};

// Pixie Character Sheet Expressions (From Image 8)
export const PixieExpression: React.FC<{
  reaction: PixieReaction;
  size?: number;
  className?: string;
  showLabel?: boolean;
}> = ({ reaction = 'HAPPY', size = 120, className = '', showLabel = false }) => {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div 
        className="relative bg-[#fffdfa] rounded-2xl pixel-border pixel-box-shadow p-2 flex items-center justify-center overflow-hidden transition-all duration-300"
        style={{ width: size, height: size }}
      >
        {/* Floating background sparkles */}
        <div className="absolute top-2 right-2 text-xs animate-pulse text-[#ffd54f]">✨</div>
        {reaction === 'THINKING' && (
          <div className="absolute top-1 right-2 bg-white pixel-border-2 rounded-full px-1 text-[11px] font-bold text-[#180065] animate-bounce">
            ?
          </div>
        )}
        {reaction === 'SHOCKED' && (
          <div className="absolute top-1 right-2 text-[#d81b60] font-black text-sm animate-ping">
            !!
          </div>
        )}
        {reaction === 'FASHIONABLY_JUDGING' && (
          <div className="absolute top-1 right-2 text-xs">💅</div>
        )}

        <svg
          viewBox="0 0 64 64"
          className="w-full h-full"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* Lavender Hair Backing */}
          <rect x="12" y="10" width="40" height="40" fill="#b39ddb" />
          <rect x="8" y="20" width="48" height="30" fill="#b39ddb" />

          {/* Skin Head */}
          <rect x="18" y="18" width="28" height="26" fill="#ffd8be" />

          {/* Hair Front Bangs */}
          <rect x="14" y="8" width="36" height="16" fill="#9575cd" />
          <rect x="10" y="18" width="8" height="16" fill="#9575cd" />
          <rect x="46" y="18" width="8" height="16" fill="#9575cd" />
          <rect x="24" y="20" width="6" height="6" fill="#9575cd" />
          <rect x="34" y="20" width="6" height="6" fill="#9575cd" />

          {/* Choker Collar & Mint Top */}
          <rect x="28" y="44" width="8" height="6" fill="#a4f0e9" />
          <rect x="16" y="50" width="32" height="14" fill="#a4f0e9" />
          <rect x="22" y="52" width="20" height="10" fill="#b39ddb" />

          {/* === DYNAMIC FACIAL EXPRESSIONS === */}

          {/* 1. HAPPY: Smiling Eyes & Sparkles */}
          {reaction === 'HAPPY' && (
            <>
              {/* Closed Crescent Smiling Eyes */}
              <path d="M 22 28 Q 25 24 28 28" stroke="#180065" strokeWidth="2.5" fill="none" />
              <path d="M 36 28 Q 39 24 42 28" stroke="#180065" strokeWidth="2.5" fill="none" />
              {/* Bright Smile with Teeth */}
              <rect x="26" y="36" width="12" height="5" fill="#180065" rx="1" />
              <rect x="28" y="37" width="8" height="2" fill="#ffffff" />
              {/* Blush */}
              <rect x="20" y="34" width="5" height="3" fill="#ff80ab" />
              <rect x="39" y="34" width="5" height="3" fill="#ff80ab" />
            </>
          )}

          {/* 2. THINKING: Hand on Chin & Thoughtful Look */}
          {reaction === 'THINKING' && (
            <>
              {/* Eyes looking up/sideways */}
              <rect x="23" y="26" width="6" height="6" fill="#180065" />
              <rect x="25" y="27" width="3" height="3" fill="#64b5f6" />
              <rect x="37" y="26" width="6" height="6" fill="#180065" />
              <rect x="39" y="27" width="3" height="3" fill="#64b5f6" />
              {/* Curious Eyebrows */}
              <rect x="22" y="23" width="6" height="2" fill="#6a1b9a" />
              <rect x="37" y="22" width="7" height="2" fill="#6a1b9a" />
              {/* Cute Pout Mouth */}
              <rect x="29" y="38" width="6" height="2" fill="#d81b60" />
              {/* Hand touching chin */}
              <rect x="32" y="40" width="8" height="8" fill="#ffd8be" />
              <rect x="34" y="38" width="4" height="4" fill="#f8bbd0" />
            </>
          )}

          {/* 3. SHOCKED: Wide Eyes, Open Mouth, Hands on Cheeks */}
          {reaction === 'SHOCKED' && (
            <>
              {/* Giant Wide Eyes */}
              <rect x="21" y="24" width="8" height="10" fill="#ffffff" />
              <rect x="23" y="26" width="4" height="6" fill="#180065" />
              <rect x="24" y="27" width="2" height="2" fill="#ffffff" />

              <rect x="35" y="24" width="8" height="10" fill="#ffffff" />
              <rect x="37" y="26" width="4" height="6" fill="#180065" />
              <rect x="38" y="27" width="2" height="2" fill="#ffffff" />

              {/* Raised high eyebrows */}
              <rect x="21" y="20" width="8" height="2" fill="#6a1b9a" />
              <rect x="35" y="20" width="8" height="2" fill="#6a1b9a" />

              {/* Open Gasp Mouth */}
              <rect x="29" y="38" width="6" height="8" fill="#180065" rx="2" />
              <rect x="30" y="42" width="4" height="3" fill="#ff4081" />

              {/* Hands over mouth/cheeks */}
              <rect x="26" y="40" width="12" height="8" fill="#ffd8be" />
              <rect x="28" y="42" width="8" height="4" fill="#f8bbd0" />
            </>
          )}

          {/* 4. FASHIONABLY JUDGING: Smirk & Raised Eyebrow */}
          {reaction === 'FASHIONABLY_JUDGING' && (
            <>
              {/* High Raised Arch Eyebrow */}
              <rect x="21" y="24" width="7" height="2" fill="#6a1b9a" />
              <rect x="36" y="21" width="8" height="2" fill="#6a1b9a" />

              {/* Side-eye confident squint */}
              <rect x="22" y="28" width="7" height="4" fill="#180065" />
              <rect x="23" y="29" width="3" height="2" fill="#64b5f6" />

              <rect x="36" y="27" width="7" height="5" fill="#180065" />
              <rect x="37" y="28" width="3" height="3" fill="#64b5f6" />

              {/* Sassy Smirk Mouth */}
              <path d="M 28 39 Q 34 38 38 36" stroke="#d81b60" strokeWidth="2.5" fill="none" />

              {/* High Fashion Blush */}
              <rect x="20" y="33" width="5" height="2" fill="#ff80ab" />
              <rect x="39" y="33" width="5" height="2" fill="#ff80ab" />
            </>
          )}
        </svg>
      </div>

      {showLabel && (
        <span className="font-pixel text-[10px] text-[#180065] mt-2 font-bold tracking-wider uppercase">
          {reaction === 'FASHIONABLY_JUDGING' ? 'FASHION JUDGING' : reaction}
        </span>
      )}
    </div>
  );
};

// Pixie Full Body Walk / Pose Sprite (Image 8 Full Body)
export const PixieFullBody: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 280,
  className = '',
  animated = true,
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Floating sparkles around character */}
      <div className="absolute -top-3 -left-2 text-base text-[#ffd54f] animate-bounce">✨</div>
      <div className="absolute top-1/4 -right-3 text-lg text-[#d3bcfc] animate-pulse">✦</div>
      <div className="absolute bottom-12 -left-4 text-sm text-[#a4f0e9] animate-bounce">✨</div>

      <div
        className={`w-full relative flex items-center justify-center ${animated ? 'hover:scale-105 transition-transform duration-300' : ''}`}
        style={{ maxWidth: size, height: size * 1.3 }}
      >
        <svg
          viewBox="0 0 100 130"
          className="w-full h-full drop-shadow-md"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* Shadow beneath feet */}
          <ellipse cx="50" cy="122" rx="26" ry="6" fill="#dcd5ff" />

          {/* Hair back */}
          <rect x="34" y="16" width="32" height="26" fill="#b39ddb" />
          <rect x="28" y="24" width="44" height="20" fill="#b39ddb" />

          {/* Skin Base (Legs, arms, face) */}
          <rect x="40" y="20" width="20" height="20" fill="#ffd8be" />
          <rect x="46" y="38" width="8" height="6" fill="#ffd8be" />

          {/* Hair Front Bob Cut */}
          <rect x="32" y="10" width="36" height="14" fill="#9575cd" />
          <rect x="26" y="18" width="10" height="18" fill="#9575cd" />
          <rect x="64" y="18" width="10" height="18" fill="#9575cd" />
          <rect x="40" y="22" width="6" height="4" fill="#9575cd" />
          <rect x="52" y="22" width="6" height="4" fill="#9575cd" />

          {/* Eyes & Smile */}
          <rect x="38" y="26" width="6" height="6" fill="#180065" />
          <rect x="39" y="27" width="2" height="2" fill="#64b5f6" />
          <rect x="54" y="26" width="6" height="6" fill="#180065" />
          <rect x="55" y="27" width="2" height="2" fill="#64b5f6" />
          <rect x="46" y="34" width="6" height="2" fill="#d81b60" />
          <rect x="36" y="32" width="4" height="2" fill="#ff80ab" />
          <rect x="58" y="32" width="4" height="2" fill="#ff80ab" />

          {/* Choker */}
          <rect x="46" y="40" width="8" height="2" fill="#a4f0e9" />

          {/* Mint/Lilac Cropped Streetwear Jacket & Top */}
          <rect x="38" y="42" width="24" height="14" fill="#a4f0e9" />
          <rect x="44" y="44" width="12" height="10" fill="#b39ddb" />
          <rect x="46" y="50" width="8" height="4" fill="#ffd8be" />

          {/* Sleeves (Chunky puffy pose) */}
          <rect x="24" y="44" width="14" height="10" fill="#a4f0e9" />
          <rect x="20" y="52" width="8" height="12" fill="#ffd8be" />
          <rect x="62" y="40" width="16" height="10" fill="#a4f0e9" />
          <rect x="74" y="44" width="10" height="8" fill="#ffd8be" />

          {/* Mint Pastel High-Waisted Shorts with Lilac Accents */}
          <rect x="36" y="56" width="28" height="14" fill="#a4f0e9" />
          <rect x="38" y="56" width="24" height="3" fill="#89d4cd" />
          <rect x="36" y="60" width="5" height="10" fill="#d3bcfc" />
          <rect x="59" y="60" width="5" height="10" fill="#d3bcfc" />

          {/* Legs (Skin tone) */}
          <rect x="40" y="70" width="8" height="20" fill="#ffd8be" />
          <rect x="52" y="70" width="8" height="20" fill="#ffd8be" />

          {/* Chunky Mint & Lilac Leg Warmers / Platform Boots */}
          <rect x="38" y="86" width="12" height="22" fill="#a4f0e9" />
          <rect x="38" y="86" width="12" height="4" fill="#d3bcfc" />
          <rect x="50" y="88" width="12" height="20" fill="#a4f0e9" />
          <rect x="50" y="88" width="12" height="4" fill="#d3bcfc" />

          {/* Platform Sneaker Soles (Chunky Lavender) */}
          <rect x="36" y="108" width="16" height="10" fill="#9575cd" />
          <rect x="36" y="114" width="16" height="4" fill="#ffffff" />
          <rect x="48" y="108" width="16" height="10" fill="#9575cd" />
          <rect x="48" y="114" width="16" height="4" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
};
