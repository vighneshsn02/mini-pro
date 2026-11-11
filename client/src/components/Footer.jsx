import React from 'react';
import { ShieldCheck, Heart, Sparkles, MapPin, Feather, Mail, Truck, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { setSelectedRegionFilter, setSelectedCraftFilter, setIsTrackingOpen, setIsAdminPortalOpen } = useShop();

  const handleRegionClick = (state) => {
    setSelectedRegionFilter(state);
    setSelectedCraftFilter('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCraftClick = (craft) => {
    setSelectedCraftFilter(craft);
    setSelectedRegionFilter('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1D3557] text-[#FAF7F2] border-t-4 border-[#C85A32]">
      
      {/* 4 Trust Pillars Bar */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#E9B44C]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">Certified GI Tags</h4>
              <p className="text-xs text-[#C8D3E0] mt-0.5">Authentic Geographical Indication verified origins</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-[#C85A32]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">~80% Direct Maker Payout</h4>
              <p className="text-xs text-[#C8D3E0] mt-0.5">Cutting out middlemen to return fair livelihoods</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-[#4A7C59]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">Zero Plastic Packaging</h4>
              <p className="text-xs text-[#C8D3E0] mt-0.5">Biodegradable honeycomb wrap & jute muslin</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Feather className="w-5 h-5 text-[#E9B44C]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-white">Handwritten Artisan Note</h4>
              <p className="text-xs text-[#C8D3E0] mt-0.5">Personal blessing and maker signature with every parcel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-serif font-bold text-lg border-2 border-[#E9B44C]">
                क
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                KalaKriti
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-[#E9B44C] text-[#2C241E]">
                हस्तशिल्प
              </span>
            </div>

            <p className="text-xs text-[#C8D3E0] leading-relaxed max-w-sm">
              Inspired by the craft ethos of Jaypore, Okhai, and iTokri. KalaKriti directly connects master artisans and rural craft cooperatives with conscious patrons around the globe.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminPortalOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-[#FAF7F2] text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer border border-white/20"
              >
                Access Artisan Guild & Admin Portal →
              </button>
            </div>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-[#E9B44C] uppercase tracking-wider">
              Craft Regions
            </h5>
            <ul className="space-y-2 text-xs text-[#C8D3E0]">
              <li><button onClick={() => handleRegionClick('Rajasthan')} className="hover:text-white transition-colors cursor-pointer">Rajasthan (Jaipur & Sanganer)</button></li>
              <li><button onClick={() => handleRegionClick('Gujarat')} className="hover:text-white transition-colors cursor-pointer">Gujarat (Kutch & Dhamadka)</button></li>
              <li><button onClick={() => handleRegionClick('Bihar')} className="hover:text-white transition-colors cursor-pointer">Bihar (Mithila / Jitwarpur)</button></li>
              <li><button onClick={() => handleRegionClick('Kashmir')} className="hover:text-white transition-colors cursor-pointer">Kashmir (Srinagar Pashmina)</button></li>
              <li><button onClick={() => handleRegionClick('Chhattisgarh')} className="hover:text-white transition-colors cursor-pointer">Chhattisgarh (Bastar Dhokra)</button></li>
              <li><button onClick={() => handleRegionClick('Karnataka')} className="hover:text-white transition-colors cursor-pointer">Karnataka (Channapatna Toys)</button></li>
            </ul>
          </div>

          {/* Craft Disciplines */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-[#E9B44C] uppercase tracking-wider">
              Living Crafts
            </h5>
            <ul className="space-y-2 text-xs text-[#C8D3E0]">
              <li><button onClick={() => handleCraftClick('Blue Pottery')} className="hover:text-white transition-colors cursor-pointer">Jaipur Blue Pottery</button></li>
              <li><button onClick={() => handleCraftClick('Ajrakh Block Print')} className="hover:text-white transition-colors cursor-pointer">Ajrakh Resist Block Print</button></li>
              <li><button onClick={() => handleCraftClick('Madhubani Painting')} className="hover:text-white transition-colors cursor-pointer">Madhubani Folk Canvas</button></li>
              <li><button onClick={() => handleCraftClick('Pashmina & Sozni')} className="hover:text-white transition-colors cursor-pointer">Changthangi Pashmina Shawls</button></li>
              <li><button onClick={() => handleCraftClick('Bastar Dhokra')} className="hover:text-white transition-colors cursor-pointer">Lost-Wax Dhokra Bell Metal</button></li>
              <li><button onClick={() => handleCraftClick('Channapatna Woodcraft')} className="hover:text-white transition-colors cursor-pointer">Organic Lacquer Woodcraft</button></li>
            </ul>
          </div>

          {/* Customer Care & Orders */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-[#E9B44C] uppercase tracking-wider">
              Customer & Tracking
            </h5>
            <ul className="space-y-2 text-xs text-[#C8D3E0]">
              <li>
                <button onClick={() => setIsTrackingOpen(true)} className="hover:text-white transition-colors cursor-pointer text-[#E9B44C] font-semibold">
                  Track Handcrafted Parcel →
                </button>
              </li>
              <li><a href="#artisans-section" className="hover:text-white transition-colors">Meet the Master Artisans</a></li>
              <li><a href="#craft-map-section" className="hover:text-white transition-colors">Interactive India Craft Map</a></li>
              <li><a href="#stories-section" className="hover:text-white transition-colors">Heritage Craft Journal</a></li>
              <li><span className="text-[#8E9AAF]">Zero Plastic Guarantee</span></li>
              <li><span className="text-[#8E9AAF]">Easy 7-day Artisan Return</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9AAF]">
          <div>
            © {new Date().getFullYear()} KalaKriti Local Artisan Bazaar. Preserving Indian Handicrafts.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#E9B44C]">Made with love for Indian artisans</span>
            <span>•</span>
            <span>Runs locally on your device</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
