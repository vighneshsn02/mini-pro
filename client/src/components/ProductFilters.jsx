import React from 'react';
import { Filter, SlidersHorizontal, ShieldCheck, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductFilters({
  activeCategory,
  setActiveCategory,
  activeCraft,
  setActiveCraft,
  activeState,
  setActiveState,
  giOnly,
  setGiOnly,
  sortBy,
  setSortBy,
  totalResults
}) {
  const { selectedRegionFilter, setSelectedRegionFilter } = useShop();

  const categories = [
    'All',
    'Home & Living',
    'Apparel & Textiles',
    'Folk Art & Wall Decor',
    'Accessories & Toys',
    'Kitchen & Dining'
  ];

  const craftTypes = [
    'All',
    'Blue Pottery',
    'Ajrakh Block Print',
    'Madhubani Painting',
    'Pashmina & Sozni',
    'Bastar Dhokra',
    'Channapatna Woodcraft'
  ];

  const states = [
    'All',
    'Rajasthan',
    'Gujarat',
    'Bihar',
    'Kashmir',
    'Chhattisgarh',
    'Karnataka'
  ];

  const hasActiveFilters = 
    activeCategory !== 'All' || 
    activeCraft !== 'All' || 
    activeState !== 'All' || 
    selectedRegionFilter !== 'All' ||
    giOnly;

  const handleReset = () => {
    setActiveCategory('All');
    setActiveCraft('All');
    setActiveState('All');
    setSelectedRegionFilter('All');
    setGiOnly(false);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E8DEC8] shadow-sm mb-8 space-y-5">
      {/* Top Bar: Title & Active Filters / Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0E6D6] pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#C85A32]" />
          <h3 className="font-serif text-lg font-bold text-[#2C241E]">
            Artisanal Filters
          </h3>
          <span className="text-xs bg-[#FAF7F2] text-[#7A6B5B] px-2.5 py-0.5 rounded-full border border-[#E8DEC8]">
            {totalResults} Handmade {totalResults === 1 ? 'Piece' : 'Pieces'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-[#C85A32] hover:text-[#A2401D] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#7A6B5B] font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7F2] border border-[#DCCBB5] rounded-lg px-2.5 py-1.5 text-xs text-[#2C241E] font-medium focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="newest">Recently Crafted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B5B] block mb-2">
          Craft Department
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C85A32] text-white shadow-xs font-semibold'
                  : 'bg-[#FAF7F2] text-[#5A4D41] hover:bg-[#EFE7D8] border border-[#E8DEC8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Craft Technique Pills */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B5B] block mb-2">
          Indigenous Craft Tradition
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {craftTypes.map((craft) => (
            <button
              key={craft}
              onClick={() => setActiveCraft(craft)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCraft === craft
                  ? 'bg-[#1D3557] text-white shadow-xs font-semibold'
                  : 'bg-[#FAF7F2] text-[#5A4D41] hover:bg-[#EFE7D8] border border-[#E8DEC8]'
              }`}
            >
              {craft}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Filter Row: Region & GI Tag Certified Toggle */}
      <div className="pt-2 border-t border-[#F0E6D6] flex flex-wrap items-center justify-between gap-4">
        {/* State/Region filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-[#7A6B5B]">Origin State:</span>
          <div className="flex flex-wrap gap-1.5">
            {states.map((st) => (
              <button
                key={st}
                onClick={() => {
                  setActiveState(st);
                  setSelectedRegionFilter(st);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  (activeState === st || selectedRegionFilter === st)
                    ? 'bg-[#EAE0D0] text-[#7A4B29] font-bold border border-[#D5C4AC]'
                    : 'text-[#6B5E52] hover:text-[#2C241E] hover:bg-[#FAF7F2]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* GI Tag certified toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#2C241E] bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#E8DEC8] hover:border-[#C85A32] transition-colors">
          <input
            type="checkbox"
            checked={giOnly}
            onChange={(e) => setGiOnly(e.target.checked)}
            className="w-4 h-4 text-[#C85A32] rounded-sm focus:ring-[#C85A32] accent-[#C85A32]"
          />
          <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C59]" />
          <span>Show Only GI-Tag Certified</span>
        </label>
      </div>
    </div>
  );
}
