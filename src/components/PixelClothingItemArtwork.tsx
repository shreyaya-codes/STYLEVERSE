import React from 'react';
import { ClothingItem } from '../types';

interface ClothingArtworkProps {
  imageType: ClothingItem['imageType'];
  color?: string;
  size?: number;
  className?: string;
}

export const PixelClothingArtwork: React.FC<ClothingArtworkProps> = ({
  imageType,
  color = '#d3bcfc',
  size = 90,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* 1. OVERSIZED TEE (From Image 2) */}
        {imageType === 'oversized_tee' && (
          <g>
            {/* Base T-shirt Outline & Body */}
            <rect x="14" y="16" width="36" height="34" fill={color || '#d3bcfc'} />
            {/* Sleeves */}
            <rect x="6" y="16" width="12" height="18" fill={color || '#d3bcfc'} />
            <rect x="46" y="16" width="12" height="18" fill={color || '#d3bcfc'} />
            {/* Collar */}
            <rect x="24" y="14" width="16" height="6" fill="#fff" />
            <rect x="26" y="14" width="12" height="4" fill="#fcf8ff" />
            {/* Pastel Graphic Print Box */}
            <rect x="22" y="24" width="20" height="18" fill="#ffd9e2" rx="2" />
            <rect x="25" y="27" width="14" height="10" fill="#a4f0e9" />
            {/* Graphic Icon (Retro Controller / Sparkle) */}
            <rect x="28" y="30" width="8" height="4" fill="#68548d" />
            <rect x="31" y="28" width="2" height="8" fill="#68548d" />
            <rect x="29" y="31" width="2" height="2" fill="#ffd54f" />
            <rect x="33" y="31" width="2" height="2" fill="#ff4081" />
            {/* Bottom Hem & Stitching */}
            <rect x="14" y="48" width="36" height="2" fill="#9575cd" />
            <rect x="6" y="32" width="12" height="2" fill="#9575cd" />
            <rect x="46" y="32" width="12" height="2" fill="#9575cd" />
          </g>
        )}

        {/* 2. PLATFORM SNEAKERS (From Image 2) */}
        {imageType === 'platform_sneakers' && (
          <g>
            {/* Sneaker 1 (Left / Foreground) */}
            {/* Pink & Mint Upper */}
            <path d="M 8 36 L 22 24 L 38 28 L 44 38 L 44 42 L 8 42 Z" fill="#ffd9e2" />
            <rect x="18" y="26" width="14" height="6" fill="#a4f0e9" />
            <rect x="16" y="32" width="18" height="4" fill="#fff" />
            {/* Shoelace details */}
            <rect x="22" y="28" width="8" height="2" fill="#68548d" />
            <rect x="20" y="32" width="8" height="2" fill="#68548d" />
            {/* Chunky Striped Platform Sole */}
            <rect x="6" y="42" width="40" height="6" fill="#ffffff" />
            <rect x="6" y="46" width="40" height="4" fill="#ffb0c9" />
            <rect x="6" y="50" width="40" height="6" fill="#ffd54f" />
            <rect x="6" y="54" width="40" height="3" fill="#180065" />

            {/* Sneaker 2 (Right / Offset background) */}
            <path d="M 24 22 L 36 12 L 52 16 L 58 24 L 58 28 L 24 28 Z" fill="#ffd9e2" />
            <rect x="22" y="28" width="38" height="5" fill="#ffffff" />
            <rect x="22" y="32" width="38" height="4" fill="#a4f0e9" />
          </g>
        )}

        {/* 3. PUFFER JACKET */}
        {imageType === 'puffer_jacket' && (
          <g>
            {/* Main Puffer Quilt Blocks */}
            <rect x="12" y="16" width="40" height="32" fill={color || '#b39ddb'} rx="4" />
            {/* Puffer Segments */}
            <rect x="12" y="24" width="40" height="2" fill="#180065" />
            <rect x="12" y="34" width="40" height="2" fill="#180065" />
            <rect x="12" y="44" width="40" height="2" fill="#180065" />
            {/* Zipper */}
            <rect x="30" y="14" width="4" height="34" fill="#ffd54f" />
            {/* Collar */}
            <rect x="18" y="10" width="28" height="8" fill="#9575cd" rx="2" />
            {/* Sleeves (Chunky Puffy) */}
            <rect x="4" y="18" width="10" height="24" fill={color || '#b39ddb'} rx="3" />
            <rect x="50" y="18" width="10" height="24" fill={color || '#b39ddb'} rx="3" />
            <rect x="4" y="26" width="10" height="2" fill="#180065" />
            <rect x="50" y="26" width="10" height="2" fill="#180065" />
          </g>
        )}

        {/* 4. TENNIS SKIRT */}
        {imageType === 'tennis_skirt' && (
          <g>
            {/* High Waistband */}
            <rect x="18" y="16" width="28" height="6" fill="#136964" />
            <rect x="18" y="17" width="28" height="4" fill="#a4f0e9" />
            {/* Pleated Skirt Body (Flared) */}
            <polygon points="18,22 46,22 56,48 8,48" fill={color || '#a4f0e9'} />
            {/* Pleat Fold Lines */}
            <line x1="22" y1="22" x2="16" y2="48" stroke="#136964" strokeWidth="2" />
            <line x1="28" y1="22" x2="26" y2="48" stroke="#136964" strokeWidth="2" />
            <line x1="34" y1="22" x2="36" y2="48" stroke="#136964" strokeWidth="2" />
            <line x1="40" y1="22" x2="46" y2="48" stroke="#136964" strokeWidth="2" />
            {/* White Ribbon Hem */}
            <rect x="9" y="45" width="46" height="3" fill="#ffffff" />
          </g>
        )}

        {/* 5. CAT BEANIE */}
        {imageType === 'cat_beanie' && (
          <g>
            {/* Ears */}
            <polygon points="14,12 24,12 14,24" fill="#d1c4e9" />
            <polygon points="16,14 22,14 16,20" fill="#ffb0c9" />
            <polygon points="50,12 40,12 50,24" fill="#d1c4e9" />
            <polygon points="48,14 42,14 48,20" fill="#ffb0c9" />
            {/* Beanie Dome */}
            <rect x="14" y="20" width="36" height="24" fill={color || '#d1c4e9'} rx="6" />
            {/* Ribbed Folded Brim */}
            <rect x="10" y="38" width="44" height="10" fill="#b39ddb" rx="2" />
            {/* Pixel Cat Whiskers embroidery */}
            <rect x="28" y="28" width="8" height="4" fill="#180065" />
            <line x1="22" y1="29" x2="26" y2="28" stroke="#180065" strokeWidth="2" />
            <line x1="22" y1="32" x2="26" y2="33" stroke="#180065" strokeWidth="2" />
            <line x1="42" y1="28" x2="38" y2="29" stroke="#180065" strokeWidth="2" />
            <line x1="42" y1="33" x2="38" y2="32" stroke="#180065" strokeWidth="2" />
          </g>
        )}

        {/* 6. CARGO PANTS */}
        {imageType === 'cargo_pants' && (
          <g>
            {/* Waistband & Belt Loops */}
            <rect x="18" y="12" width="28" height="6" fill="#180065" />
            <rect x="20" y="13" width="24" height="4" fill="#a4f0e9" />
            {/* Left Leg */}
            <rect x="16" y="18" width="14" height="34" fill={color || '#89d4cd'} />
            {/* Right Leg */}
            <rect x="34" y="18" width="14" height="34" fill={color || '#89d4cd'} />
            {/* Cargo Flap Pockets */}
            <rect x="12" y="28" width="8" height="12" fill="#136964" rx="2" />
            <rect x="12" y="28" width="8" height="3" fill="#a4f0e9" />
            <rect x="44" y="28" width="8" height="12" fill="#136964" rx="2" />
            <rect x="44" y="28" width="8" height="3" fill="#a4f0e9" />
            {/* Straps / Buckles */}
            <line x1="18" y1="30" x2="26" y2="44" stroke="#180065" strokeWidth="2" />
            <line x1="46" y1="30" x2="38" y2="44" stroke="#180065" strokeWidth="2" />
          </g>
        )}

        {/* 7. MARY JANES */}
        {imageType === 'mary_janes' && (
          <g>
            {/* Left Shoe */}
            <rect x="8" y="32" width="22" height="14" fill={color || '#ffb0c9'} rx="6" />
            <rect x="16" y="26" width="4" height="12" fill="#d81b60" />
            <rect x="15" y="30" width="6" height="4" fill="#ffd54f" />
            <rect x="8" y="44" width="22" height="8" fill="#180065" rx="2" />
            {/* Right Shoe */}
            <rect x="34" y="32" width="22" height="14" fill={color || '#ffb0c9'} rx="6" />
            <rect x="42" y="26" width="4" height="12" fill="#d81b60" />
            <rect x="41" y="30" width="6" height="4" fill="#ffd54f" />
            <rect x="34" y="44" width="22" height="8" fill="#180065" rx="2" />
          </g>
        )}

        {/* 8. KNIT CARDIGAN */}
        {imageType === 'knit_cardigan' && (
          <g>
            {/* Main Body */}
            <rect x="14" y="14" width="36" height="36" fill={color || '#ebe5ff'} rx="4" />
            {/* Sleeves */}
            <rect x="6" y="16" width="10" height="32" fill={color || '#ebe5ff'} rx="2" />
            <rect x="48" y="16" width="10" height="32" fill={color || '#ebe5ff'} rx="2" />
            {/* V-neck Opening */}
            <polygon points="32,36 24,14 40,14" fill="#fcf8ff" />
            {/* Big Pastel Buttons */}
            <circle cx="32" cy="28" r="2.5" fill="#ffd54f" />
            <circle cx="32" cy="38" r="2.5" fill="#ffd54f" />
            <circle cx="32" cy="46" r="2.5" fill="#ffd54f" />
            {/* Knit Texture lines */}
            <line x1="20" y1="20" x2="20" y2="48" stroke="#dcd5ff" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="44" y1="20" x2="44" y2="48" stroke="#dcd5ff" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
        )}

        {/* 9. HEART CHOKER */}
        {imageType === 'heart_choker' && (
          <g>
            {/* Leather / Velvet Band */}
            <rect x="10" y="24" width="44" height="8" fill="#180065" rx="2" />
            <rect x="10" y="26" width="44" height="4" fill="#68548d" />
            {/* Silver / Pink Heart Pendant */}
            <path
              d="M 32 38 L 24 30 A 5 5 0 0 1 32 26 A 5 5 0 0 1 40 30 Z"
              fill="#ed89ab"
              stroke="#180065"
              strokeWidth="2"
            />
            <circle cx="32" cy="27" r="2" fill="#ffffff" />
          </g>
        )}

        {/* 10. CLOUD HOODIE */}
        {imageType === 'cloud_hoodie' && (
          <g>
            {/* Hood */}
            <rect x="18" y="8" width="28" height="14" fill="#9575cd" rx="6" />
            {/* Main Body */}
            <rect x="12" y="18" width="40" height="34" fill={color || '#d3bcfc'} rx="5" />
            {/* Kangaroo Pocket */}
            <rect x="20" y="36" width="24" height="12" fill="#b39ddb" rx="3" />
            {/* Sleeves */}
            <rect x="4" y="20" width="10" height="28" fill={color || '#d3bcfc'} rx="4" />
            <rect x="50" y="20" width="10" height="28" fill={color || '#d3bcfc'} rx="4" />
            {/* Cloud Graphic */}
            <ellipse cx="32" cy="27" rx="8" ry="4" fill="#ffffff" />
            <ellipse cx="27" cy="26" rx="5" ry="4" fill="#ffffff" />
            <ellipse cx="37" cy="26" rx="5" ry="4" fill="#ffffff" />
            {/* Drawstrings */}
            <line x1="28" y1="18" x2="26" y2="30" stroke="#ffffff" strokeWidth="2" />
            <line x1="36" y1="18" x2="38" y2="30" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {/* 11. CROP TOP */}
        {imageType === 'crop_top' && (
          <g>
            {/* Shoulder Straps */}
            <rect x="22" y="14" width="4" height="10" fill={color || '#a4f0e9'} />
            <rect x="38" y="14" width="4" height="10" fill={color || '#a4f0e9'} />
            {/* Tank Body */}
            <rect x="18" y="24" width="28" height="18" fill={color || '#a4f0e9'} rx="2" />
            <rect x="18" y="38" width="28" height="3" fill="#136964" />
            <line x1="24" y1="24" x2="24" y2="38" stroke="#136964" strokeWidth="1" />
            <line x1="32" y1="24" x2="32" y2="38" stroke="#136964" strokeWidth="1" />
            <line x1="40" y1="24" x2="40" y2="38" stroke="#136964" strokeWidth="1" />
          </g>
        )}

        {/* 12. SUNGLASSES */}
        {imageType === 'sunglasses' && (
          <g>
            {/* Bridge */}
            <rect x="28" y="26" width="8" height="3" fill="#180065" />
            {/* Left Frame & Tinted Lens */}
            <rect x="10" y="22" width="20" height="16" fill="#180065" rx="3" />
            <rect x="12" y="24" width="16" height="12" fill="#a4f0e9" rx="2" />
            <line x1="14" y1="26" x2="24" y2="34" stroke="#ffffff" strokeWidth="2" />
            {/* Right Frame & Tinted Lens */}
            <rect x="34" y="22" width="20" height="16" fill="#180065" rx="3" />
            <rect x="36" y="24" width="16" height="12" fill="#a4f0e9" rx="2" />
            <line x1="38" y1="26" x2="48" y2="34" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
};
