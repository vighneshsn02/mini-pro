import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles, Feather } from 'lucide-react';
import { api } from '../utils/api';
import { useShop } from '../context/ShopContext';

export default function StoriesSection() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setActiveStoryModal } = useShop();

  useEffect(() => {
    api.getStories()
      .then(data => {
        setStories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stories:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="stories-section" className="py-16 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D0] text-xs font-bold text-[#7A4B29] mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>The Heritage Craft Journal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
            Chronicles of Craft & Ancient Alchemies
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#6B5E52]">
            Read behind-the-scenes stories written in collaboration with master artisans, unraveling the sacred traditions and natural dyeing secrets of India.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map(story => (
            <div
              key={story.id}
              onClick={() => setActiveStoryModal(story)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#C85A32] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#7A6B5B]">
                    <span className="font-bold text-[#C85A32] uppercase">{story.region}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {story.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#2C241E] group-hover:text-[#C85A32] transition-colors leading-snug line-clamp-2">
                    {story.title}
                  </h3>

                  <p className="text-xs text-[#6B5E52] line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#FAF7F2] flex items-center justify-between text-xs font-bold text-[#C85A32]">
                <span className="text-[11px] text-[#7A6B5B] font-medium">By {story.author.split('&')[0]}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
