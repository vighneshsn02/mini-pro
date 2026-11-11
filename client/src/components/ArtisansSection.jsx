import React, { useState, useEffect } from 'react';
import { Users, Award, ShieldCheck, HeartHandshake, MessageCircle, Video, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../utils/api';
import { useShop } from '../context/ShopContext';

export default function ArtisansSection() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setActiveArtisanModal, setActiveDirectConnection, setActiveWorkshopModal } = useShop();

  useEffect(() => {
    api.getArtisans()
      .then(data => {
        setArtisans(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching artisans:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="artisans-section" className="py-16 bg-[#F4EFE6] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D0] text-xs font-bold text-[#7A4B29] mb-3">
            <Users className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Artisan Profiles & Rural Cooperatives</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
            Meet the Living Legends of Indian Craft
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#6B5E52]">
            Discover the families preserving centuries of indigenous knowledge. Send them direct custom commission notes or learn from them in live interactive workshops.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-3xl h-96 animate-pulse p-6" />
            ))}
          </div>
        )}

        {/* Artisans Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map(artisan => (
              <div 
                key={artisan.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#DCCBB5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header Banner & Avatar */}
                <div className="relative">
                  <div className="h-28 overflow-hidden bg-[#1D3557]">
                    <img 
                      src={artisan.coverImage || artisan.avatar} 
                      alt={artisan.name} 
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  
                  {/* GI Tag pill */}
                  {artisan.giTagCertified && (
                    <div className="absolute top-3 right-3 bg-white/95 text-[#1D3557] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#4A7C59]" />
                      GI Certified
                    </div>
                  )}

                  {/* Artisan Portrait */}
                  <div className="absolute -bottom-8 left-6">
                    <img 
                      src={artisan.avatar} 
                      alt={artisan.name} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  </div>
                </div>

                {/* Body Content */}
                <div className="pt-10 p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C85A32]">
                        {artisan.craftSpecialty}
                      </span>
                      <span className="text-xs text-[#7A6B5B]">{artisan.state}</span>
                    </div>

                    <h3 
                      onClick={() => setActiveArtisanModal(artisan)}
                      className="font-serif text-xl font-bold text-[#2C241E] hover:text-[#C85A32] transition-colors cursor-pointer"
                    >
                      {artisan.name}
                    </h3>

                    <p className="text-xs text-[#7A4B29] font-medium flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#D49B28] shrink-0" />
                      <span className="line-clamp-1">{artisan.experience}</span>
                    </p>

                    <p className="text-xs text-[#6B5E52] line-clamp-3 leading-relaxed pt-1">
                      "{artisan.storySnippet || artisan.bio}"
                    </p>
                  </div>

                  {/* Impact & Transparency Box (Okhai / iTokri style) */}
                  <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8DEC8] grid grid-cols-2 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#7A6B5B] block">Empowering</span>
                      <strong className="text-[#2C241E] font-bold">{artisan.impact?.familiesSupported || 40}+ Families</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A6B5B] block">Fair Wage Share</span>
                      <strong className="text-[#4A7C59] font-bold">{artisan.impact?.fairWagePercentage || 80}% Direct</strong>
                    </div>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-[#F0E6D6]">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveDirectConnection(artisan)}
                        className="bg-[#FAF7F2] hover:bg-[#EFE7D8] text-[#2C241E] border border-[#DCCBB5] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Send custom commission or message"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>Send Note</span>
                      </button>

                      <button
                        onClick={() => setActiveWorkshopModal({
                          artisanId: artisan.id,
                          artisanName: artisan.name,
                          title: artisan.workshopTitle,
                          fee: artisan.workshopPrice,
                          date: artisan.workshopNextDate,
                          craft: artisan.craftSpecialty
                        })}
                        className="bg-[#1D3557] hover:bg-[#14243B] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5 text-[#E9B44C]" />
                        <span>Masterclass</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setActiveArtisanModal(artisan)}
                      className="w-full text-center text-xs font-bold text-[#C85A32] hover:text-[#A2401D] py-1.5 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Artisan Story & Studio Tour</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
