import React from 'react';
import { X, Clock, MapPin, Feather, Sparkles, BookOpen } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function StoryModal() {
  const { activeStoryModal, setActiveStoryModal, setSelectedCraftFilter } = useShop();

  const story = activeStoryModal;
  if (!story) return null;

  const handleExploreCraft = () => {
    setActiveStoryModal(null);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#DCCBB5] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-3.5 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C85A32]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A4B29]">
              Heritage Craft Journal
            </span>
          </div>
          <button
            onClick={() => setActiveStoryModal(null)}
            className="p-1.5 rounded-full hover:bg-[#EAE0D0] text-[#5A4D41] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Cover */}
        <div className="aspect-16/9 w-full bg-[#1D3557] overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-[#7A6B5B]">
              <span className="font-bold text-[#C85A32] uppercase">{story.region}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.readTime}
              </span>
              <span>•</span>
              <span>{story.publishDate}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] leading-tight">
              {story.title}
            </h2>

            <div className="text-xs font-medium text-[#7A4B29] pt-1 flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Written by {story.author}</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border-l-4 border-[#C85A32] border border-[#E8DEC8] italic text-sm text-[#2C241E] leading-relaxed">
            "{story.excerpt}"
          </div>

          <div className="prose prose-stone text-sm sm:text-base text-[#5A4D41] leading-relaxed space-y-4">
            <p>{story.content}</p>
          </div>

          <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between">
            <span className="text-xs text-[#7A6B5B]">
              Explore authentic pieces preserving this craft
            </span>
            <button
              onClick={handleExploreCraft}
              className="bg-[#C85A32] hover:bg-[#B34722] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
            >
              Shop Handcrafted Pieces
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
