import React from 'react';
import { Sparkles, MapPin, Users, HeartHandshake, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function HeroSection() {
  const { setSelectedRegionFilter, setSelectedCraftFilter } = useShop();

  const handleExploreClick = () => {
    setSelectedRegionFilter('All');
    setSelectedCraftFilter('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#ECE3D2] border-b border-[#E2D5C1] py-12 md:py-16">
      {/* Decorative Traditional Motif Background Watermarks */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c85a32_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D0] border border-[#D5C4AC] text-xs font-semibold text-[#7A4B29]">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Preserving 4,000 Years of Living Craft Heritage</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C241E] leading-[1.15]">
              Heirlooms Crafted by <span className="text-[#C85A32] italic">Human Hands</span>, Not Machines.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#615244] leading-relaxed max-w-2xl">
              Experience authentic Indian handicrafts directly from national award-winning potters, master block printers, and tribal metallurgists. We cut out predatory middlemen to return up to <strong className="text-[#2C241E]">82% of every rupee</strong> directly to rural artisan families.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg border border-[#E0D3C1] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#C85A32] mb-1" />
                <h4 className="text-xs font-bold text-[#2C241E]">Certified GI Tags</h4>
                <p className="text-[11px] text-[#7A6B5B]">Authentic origin verification</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg border border-[#E0D3C1] shadow-2xs">
                <HeartHandshake className="w-4 h-4 text-[#1D3557] mb-1" />
                <h4 className="text-xs font-bold text-[#2C241E]">Direct Artisan Connection</h4>
                <p className="text-[11px] text-[#7A6B5B]">Custom orders & notes</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-3 rounded-lg border border-[#E0D3C1] shadow-2xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#4A7C59] mb-1" />
                <h4 className="text-xs font-bold text-[#2C241E]">Zero-Plastic Packaging</h4>
                <p className="text-[11px] text-[#7A6B5B]">100% biodegradable & jute</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleExploreClick}
                className="bg-[#C85A32] hover:bg-[#B34722] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore Handcrafted Heirlooms</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#craft-map-section"
                className="bg-white hover:bg-[#FAF7F2] text-[#2C241E] border border-[#CBB8A1] px-5 py-3 rounded-full text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#C85A32]" />
                <span>Interactive Craft Map</span>
              </a>

              <a
                href="#artisans-section"
                className="text-xs font-semibold text-[#5A4D41] hover:text-[#C85A32] flex items-center gap-1.5 px-3 py-2 transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Meet the Masters</span>
              </a>
            </div>
          </div>

          {/* Right Visual Montage Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80"
                  alt="Jaipur Blue Pottery Masterpiece"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent absolute bottom-0 inset-x-0 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#E9B44C] font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Masterpiece of the Week</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold">Royal Peacock Jaipur Blue Pottery Urn</h3>
                  <p className="text-xs text-[#E8DEC8]">Handcrafted by Master Rameshwar Prajapati (5th Gen Potter, Kot Jewar)</p>
                </div>
              </div>

              {/* Floating Artisan Badge Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 rounded-xl shadow-lg border border-[#E2D5C1] max-w-[240px] flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
                  alt="Master Rameshwar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C85A32]"
                />
                <div>
                  <div className="text-[11px] font-bold text-[#C85A32] uppercase tracking-wider">Meet the Maker</div>
                  <div className="text-xs font-bold text-[#2C241E]">Rameshwar Prajapati</div>
                  <div className="text-[10px] text-[#7A6B5B]">38 Years • National Awardee</div>
                </div>
              </div>

              {/* Floating Trust Metric Card */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#1D3557] text-white p-3 rounded-xl shadow-lg text-center min-w-[120px]">
                <div className="text-xl font-bold font-serif text-[#E9B44C]">82%</div>
                <div className="text-[10px] font-medium text-[#FAF7F2] leading-tight">Direct Fair Payout to Artisans</div>
              </div>

            </div>
          </div>

        </div>

        {/* Live Impact Counters Bar */}
        <div className="mt-14 pt-8 border-t border-[#DFD2BF] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-2xl md:text-3xl font-bold text-[#C85A32]">6 Hubs</div>
            <div className="text-xs text-[#7A6B5B] mt-0.5">Rajasthan, Kutch, Bastar, Kashmir, Bihar, Karnataka</div>
          </div>
          <div>
            <div className="font-serif text-2xl md:text-3xl font-bold text-[#2C241E]">420+</div>
            <div className="text-xs text-[#7A6B5B] mt-0.5">Rural & Women Artisans Empowered</div>
          </div>
          <div>
            <div className="font-serif text-2xl md:text-3xl font-bold text-[#1D3557]">100%</div>
            <div className="text-xs text-[#7A6B5B] mt-0.5">Certified GI Tag Authentic Origin</div>
          </div>
          <div>
            <div className="font-serif text-2xl md:text-3xl font-bold text-[#4A7C59]">0 Plastic</div>
            <div className="text-xs text-[#7A6B5B] mt-0.5">Biodegradable Honeycomb & Muslin Packaging</div>
          </div>
        </div>

      </div>
    </section>
  );
}
