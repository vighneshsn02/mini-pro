import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  MapPin, 
  Users, 
  BookOpen, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  SlidersHorizontal,
  Package,
  Award
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { 
    cartCount, 
    cartSubtotal, 
    setIsCartOpen, 
    wishlist, 
    setIsTrackingOpen, 
    setIsAdminPortalOpen,
    searchQuery, 
    setSearchQuery,
    setSelectedCraftFilter,
    setSelectedRegionFilter
  } = useShop();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const craftCategories = [
    { label: 'All Crafts', craft: 'All' },
    { label: 'Blue Pottery', craft: 'Blue Pottery' },
    { label: 'Ajrakh & Textiles', craft: 'Ajrakh Block Print' },
    { label: 'Madhubani Art', craft: 'Madhubani Painting' },
    { label: 'Kashmiri Pashmina', craft: 'Pashmina & Sozni' },
    { label: 'Bastar Dhokra', craft: 'Bastar Dhokra' },
    { label: 'Channapatna Wood', craft: 'Channapatna Woodcraft' },
  ];

  const handleSelectCraft = (craft) => {
    setSelectedCraftFilter(craft);
    setSelectedRegionFilter('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2] shadow-xs border-b border-[#E8DEC8]">
      {/* Top Announcement Bar - Jaypore & iTokri style */}
      <div className="bg-[#1D3557] text-[#FAF7F2] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#E9B44C]" />
              Free Eco-Friendly Shipping across India on all orders
            </span>
            <span className="hidden md:inline-block text-[#8E9AAF]">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-[#E8DEC8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C59]" />
              100% Certified GI-Tagged Indigenous Craft Guarantee
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-[#E9B44C] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Direct Fair-Wage Payout (~80% to Artisans)
            </span>
            <button 
              onClick={() => setIsTrackingOpen(true)}
              className="text-[#FAF7F2] hover:text-[#E9B44C] flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Tagline */}
          <div className="flex items-center gap-3">
            <a href="#" className="group flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#C85A32] text-white flex items-center justify-center shadow-md font-serif text-xl font-bold border-2 border-[#E9B44C] group-hover:scale-105 transition-transform">
                क
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-black tracking-tight text-[#2C241E] group-hover:text-[#C85A32] transition-colors">
                    KalaKriti
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-[#E8DEC8] text-[#7A4B29]">
                    हस्तशिल्प
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6B5B] font-medium hidden sm:block">
                  Direct from Master Artisans of India
                </p>
              </div>
            </a>
          </div>

          {/* Search Bar with instant filter */}
          <div className="flex-1 max-w-lg mx-2 hidden sm:block">
            <div className={`relative transition-all ${isSearchFocused ? 'ring-2 ring-[#C85A32]/40 shadow-sm' : ''}`}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89886]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search Jaipur Blue Pottery, Ajrakh, Pashmina, Woodcraft..."
                className="w-full pl-10 pr-4 py-2 bg-white/90 border border-[#DCCBB5] rounded-full text-sm text-[#2C241E] placeholder-[#A89886] focus:outline-hidden focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#A89886] hover:text-[#2C241E]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin / Artisan Portal Toggle */}
            <button
              onClick={() => setIsAdminPortalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[#C85A32] text-[#C85A32] hover:bg-[#C85A32] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Open Artisan Guild & Store Manager Portal"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Artisan Portal</span>
            </button>

            {/* Wishlist */}
            <a
              href="#products-section"
              className="relative p-2 text-[#5A4D41] hover:text-[#C85A32] rounded-full hover:bg-[#EDE3D2] transition-colors"
              title="Saved Heirlooms"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C85A32] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#C85A32] hover:bg-[#B34722] text-white px-3.5 py-2 rounded-full text-sm font-medium shadow-sm transition-all cursor-pointer group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#E9B44C] text-[#2C241E] text-[10px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                {cartSubtotal > 0 ? `₹${cartSubtotal.toLocaleString()}` : 'Basket'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89886]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search handcrafted crafts or artisans..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#DCCBB5] rounded-full text-xs text-[#2C241E] placeholder-[#A89886] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="mt-3 pt-2.5 border-t border-[#E8DEC8]/80 flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {craftCategories.map((cat) => (
              <button
                key={cat.craft}
                onClick={() => handleSelectCraft(cat.craft)}
                className="px-2.5 py-1 rounded-md text-[#5A4D41] hover:text-[#C85A32] hover:bg-[#EFE7D8] whitespace-nowrap transition-colors cursor-pointer"
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-[#7A6B5B] pl-4 border-l border-[#DCCBB5]">
            <a 
              href="#craft-map-section" 
              className="flex items-center gap-1 hover:text-[#C85A32] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              Regional Craft Map
            </a>
            <a 
              href="#artisans-section" 
              className="flex items-center gap-1 hover:text-[#C85A32] transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#1D3557]" />
              Artisan Guilds
            </a>
            <a 
              href="#stories-section" 
              className="flex items-center gap-1 hover:text-[#C85A32] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D49B28]" />
              Craft Stories
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
