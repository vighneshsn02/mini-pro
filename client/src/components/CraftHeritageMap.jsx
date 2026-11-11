import React, { useState } from 'react';
import { MapPin, Sparkles, Award, ArrowRight, MessageCircle, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const REGIONS = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    state: 'Rajasthan',
    city: 'Jaipur & Sanganer',
    crafts: 'Jaipur Blue Pottery, Sanganeri Block Print, Dabu Mud-Resist',
    artisanName: 'Master Rameshwar Prajapati',
    giTag: 'GI-02-RAJ-POTTERY',
    accentColor: '#C85A32',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    description: 'Renowned for Egyptian paste pottery using quartz stone and glass instead of clay, hand-painted with pure natural cobalt oxides.',
    lineage: '500+ Years Heritage'
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    state: 'Gujarat',
    city: 'Kutch & Dhamadka',
    crafts: 'Ajrakh 16-Stage Natural Block Print, Rogan Oil Art',
    artisanName: 'Khatri Abdul Rahim',
    giTag: 'GI-114-GUJ-AJRAKH',
    accentColor: '#1D3557',
    image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=600&q=80',
    description: 'Ancient Indus Valley resist printing using wild fermented desert indigo, madder roots, and hand-carved teak wood blocks.',
    lineage: '400+ Years Tradition'
  },
  {
    id: 'bihar',
    name: 'Bihar',
    state: 'Bihar',
    city: 'Madhubani & Jitwarpur',
    crafts: 'Mithila Folk Painting, Kachni & Bharni Line Work',
    artisanName: 'Devi Artisan Collective (Shobha Devi)',
    giTag: 'GI-105-BIH-MITHILA',
    accentColor: '#D49B28',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    description: 'Women-led folk art painted with sharpened bamboo sticks and organic pigments from turmeric, aparajita flowers, and lamp soot.',
    lineage: 'Epic Mithila Lineage'
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    state: 'Kashmir',
    city: 'Old Srinagar City',
    crafts: 'Ladakhi Pashmina Cashmere & Sozni Silk Needlework',
    artisanName: 'Mohammad Rafiq Mir',
    giTag: 'GI-46-J&K-PASHMINA',
    accentColor: '#8D3B72',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
    description: 'Gossamer-fine Changthangi mountain goat underfleece spun on wooden charkhas and embroidered with single-strand silk thread.',
    lineage: 'Sultanate Era Weaves'
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    state: 'Chhattisgarh',
    city: 'Kondagaon, Bastar',
    crafts: '4,000-Year Lost-Wax Dhokra Bell Metal Metallurgy',
    artisanName: 'Budhram Baghel',
    giTag: 'GI-83-CG-DHOKRA',
    accentColor: '#A85724',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80',
    description: 'Ancestral Cire Perdue casting using wild honeycomb beeswax threads and pit furnaces; every single brass figurine is non-repeatable.',
    lineage: 'Indus Valley (2500 BCE)'
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    state: 'Karnataka',
    city: 'Channapatna (Toy Town)',
    crafts: 'Organic Vegetable Lacquer Hand-Turned Woodcraft',
    artisanName: 'Govinda Swamy',
    giTag: 'GI-23-KAR-TOYS',
    accentColor: '#4A7C59',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    description: 'Non-toxic, kid-safe wooden wonders turned on wood lathes and colored with natural turmeric and kattha vegetable lacquer.',
    lineage: '200+ Years Heritage'
  }
];

export default function CraftHeritageMap() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const { setSelectedRegionFilter, setSelectedCraftFilter, setActiveDirectConnection } = useShop();

  const handleFilterRegion = (region) => {
    setSelectedRegionFilter(region.state);
    setSelectedCraftFilter('All');
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="craft-map-section" className="py-16 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D0] text-xs font-bold text-[#7A4B29] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Interactive Regional Heritage Map</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
            Journey Across India's Legendary Craft Hubs
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#6B5E52]">
            Click any craft region below to discover its ancient making technique, geographical indication (GI) credentials, and local artisan guilds.
          </p>
        </div>

        {/* Region Selector Chips / Map Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1D3557] text-white shadow-md scale-105'
                    : 'bg-white text-[#5A4D41] hover:bg-[#F0E6D6] border border-[#DCCBB5]'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E9B44C]' : 'text-[#C85A32]'}`} />
                <span>{region.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#E9B44C]" />}
              </button>
            );
          })}
        </div>

        {/* Selected Region Detailed Spotlight Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#DCCBB5] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Photo & Region Tag */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={selectedRegion.image}
                alt={selectedRegion.crafts}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                <span className="text-xs uppercase tracking-widest text-[#E9B44C] font-bold">
                  {selectedRegion.city}
                </span>
                <h3 className="font-serif text-2xl font-bold">{selectedRegion.name}</h3>
              </div>
            </div>

            {/* Content & Craft Provenance */}
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-[#EFE7D8] text-[#7A4B29]">
                      {selectedRegion.city}
                    </span>
                    <span className="text-xs font-semibold text-[#5A4D41] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                      {selectedRegion.lineage}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A7C59] bg-[#E8F3EB] px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>GI Tag: {selectedRegion.giTag}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E]">
                  {selectedRegion.crafts}
                </h3>

                <p className="text-sm sm:text-base text-[#615244] leading-relaxed">
                  {selectedRegion.description}
                </p>

                {/* Master Artisan Attribution */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-bold text-sm">
                      {selectedRegion.artisanName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#7A6B5B] uppercase tracking-wider">
                        Master Representative
                      </div>
                      <div className="text-sm font-bold text-[#2C241E]">
                        {selectedRegion.artisanName}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveDirectConnection({ name: selectedRegion.artisanName, region: selectedRegion.city, craftSpecialty: selectedRegion.crafts })}
                    className="text-xs font-bold text-[#C85A32] hover:text-[#A2401D] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send Note</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E8DEC8]">
                <button
                  onClick={() => handleFilterRegion(selectedRegion)}
                  className="bg-[#C85A32] hover:bg-[#B34722] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explore {selectedRegion.name} Heirlooms</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleFilterRegion({ state: 'All' })}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#5A4D41] hover:bg-[#EFE7D8] transition-colors cursor-pointer"
                >
                  Reset Region Filter
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
