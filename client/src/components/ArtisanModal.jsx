import React, { useState, useEffect } from 'react';
import { X, Award, ShieldCheck, MapPin, MessageCircle, Video, ShoppingBag, Sparkles, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../utils/api';

export default function ArtisanModal() {
  const { 
    activeArtisanModal, 
    setActiveArtisanModal, 
    setActiveDirectConnection, 
    setActiveWorkshopModal,
    setActiveProductModal,
    addToCart
  } = useShop();

  const [products, setProducts] = useState([]);
  const artisan = activeArtisanModal;

  useEffect(() => {
    if (artisan?.id) {
      api.getProducts({ artisanId: artisan.id })
        .then(setProducts)
        .catch(console.error);
    }
  }, [artisan]);

  if (!artisan) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#DCCBB5] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-3.5 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">
              Artisan Profile & Living Heritage
            </span>
          </div>
          <button
            onClick={() => setActiveArtisanModal(null)}
            className="p-1.5 rounded-full hover:bg-[#EAE0D0] text-[#5A4D41] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Cover & Portrait */}
        <div className="relative">
          <div className="h-44 sm:h-56 bg-[#1D3557] overflow-hidden">
            <img 
              src={artisan.coverImage || "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80"}
              alt="Artisan Studio"
              className="w-full h-full object-cover opacity-85"
            />
          </div>

          <div className="max-w-4xl mx-auto px-6 sm:px-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-14 gap-4">
              <div className="flex items-end gap-4">
                <img 
                  src={artisan.avatar} 
                  alt={artisan.name} 
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-xl bg-white"
                />
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                      {artisan.craftSpecialty}
                    </span>
                    {artisan.giTagCertified && (
                      <span className="text-[10px] font-bold bg-[#1D3557] text-[#E9B44C] px-2 py-0.5 rounded-full">
                        GI Tagged
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E]">
                    {artisan.name}
                  </h2>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 mb-2">
                <button
                  onClick={() => {
                    setActiveDirectConnection(artisan);
                  }}
                  className="bg-[#C85A32] hover:bg-[#B34722] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Direct Note</span>
                </button>
                <button
                  onClick={() => {
                    setActiveWorkshopModal({
                      artisanId: artisan.id,
                      artisanName: artisan.name,
                      title: artisan.workshopTitle,
                      fee: artisan.workshopPrice,
                      date: artisan.workshopNextDate,
                      craft: artisan.craftSpecialty
                    });
                  }}
                  className="bg-[#1D3557] hover:bg-[#14243B] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Video className="w-4 h-4 text-[#E9B44C]" />
                  <span>Book Workshop</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#E8DEC8]">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#C85A32] shrink-0" />
              <div>
                <span className="text-[10px] text-[#7A6B5B] uppercase font-bold block">Region & Guild</span>
                <span className="text-xs font-bold text-[#2C241E]">{artisan.region}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#D49B28] shrink-0" />
              <div>
                <span className="text-[10px] text-[#7A6B5B] uppercase font-bold block">Recognition</span>
                <span className="text-xs font-bold text-[#2C241E]">{artisan.award || artisan.experience}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#4A7C59] shrink-0" />
              <div>
                <span className="text-[10px] text-[#7A6B5B] uppercase font-bold block">GI Certificate</span>
                <span className="text-xs font-bold text-[#2C241E]">{artisan.giTagNumber || 'Registered Authenticity'}</span>
              </div>
            </div>
          </div>

          {/* Maker's Quote */}
          {artisan.quote && (
            <div className="p-5 bg-gradient-to-r from-[#FAF3E8] to-[#F5ECE1] rounded-2xl border-l-4 border-[#C85A32] shadow-2xs">
              <p className="font-serif text-base sm:text-lg italic text-[#2C241E] leading-relaxed">
                "{artisan.quote}"
              </p>
              <div className="mt-2 text-xs font-bold text-[#7A4B29]">— {artisan.name}</div>
            </div>
          )}

          {/* Detailed Biography */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#2C241E]">
              The Story of Heritage & Craft
            </h3>
            <p className="text-sm text-[#5A4D41] leading-relaxed">
              {artisan.bio}
            </p>
          </div>

          {/* Community Impact Meter (like Okhai) */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] space-y-4">
            <h4 className="font-serif text-base font-bold text-[#2C241E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C85A32]" />
              Community & Rural Self-Help Cooperative Impact
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <div className="font-serif text-2xl font-bold text-[#C85A32]">{artisan.impact?.familiesSupported || 40}</div>
                <div className="text-[11px] text-[#7A6B5B]">Families Sustained</div>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <div className="font-serif text-2xl font-bold text-[#1D3557]">{artisan.impact?.womenTrained || 30}</div>
                <div className="text-[11px] text-[#7A6B5B]">Women Trained</div>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <div className="font-serif text-2xl font-bold text-[#4A7C59]">{artisan.impact?.fairWagePercentage || 80}%</div>
                <div className="text-[11px] text-[#7A6B5B]">Fair Wage Payout</div>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <div className="font-serif text-2xl font-bold text-[#D49B28]">100%</div>
                <div className="text-[11px] text-[#7A6B5B]">Plastic-Free Packaging</div>
              </div>
            </div>
          </div>

          {/* Studio Photos */}
          {artisan.studioImages && artisan.studioImages.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#2C241E]">
                Behind the Scenes in {artisan.region} Studio
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {artisan.studioImages.map((img, idx) => (
                  <div key={idx} className="aspect-4/3 rounded-xl overflow-hidden border border-[#E8DEC8] shadow-2xs">
                    <img src={img} alt="Studio work" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Handcrafted by This Artisan */}
          {products.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#E8DEC8]">
              <h4 className="font-serif text-xl font-bold text-[#2C241E]">
                Handcrafted Pieces by {artisan.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setActiveArtisanModal(null);
                      setActiveProductModal(p);
                    }}
                    className="bg-white p-3 rounded-2xl border border-[#E8DEC8] hover:border-[#C85A32] shadow-2xs hover:shadow-md transition-all cursor-pointer flex gap-3 items-center"
                  >
                    <img 
                      src={p.images?.[0]} 
                      alt={p.title} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-xs font-bold text-[#2C241E] line-clamp-1">{p.title}</h5>
                      <span className="font-serif text-sm font-bold text-[#C85A32] block">₹{p.price.toLocaleString()}</span>
                      <span className="text-[10px] text-[#4A7C59]">View Details →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
