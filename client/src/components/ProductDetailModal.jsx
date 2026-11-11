import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Layers, 
  Feather, 
  Package, 
  MessageCircle, 
  CheckCircle2, 
  Share2,
  UserCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../utils/api';

export default function ProductDetailModal() {
  const { 
    activeProductModal, 
    setActiveProductModal, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setActiveDirectConnection,
    setActiveArtisanModal,
    showToast
  } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [artisanData, setArtisanData] = useState(null);
  const [newReview, setNewReview] = useState({ userName: '', userLocation: '', rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  const product = activeProductModal;

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setQuantity(1);
      // Fetch fresh reviews & artisan details
      api.getReviews(product.id).then(setReviews).catch(console.error);
      if (product.artisanId) {
        api.getArtisanById(product.artisanId).then(setArtisanData).catch(console.error);
      }
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) {
      showToast('Please provide your name and review', 'error');
      return;
    }
    try {
      setSubmittingReview(true);
      const created = await api.postReview({
        productId: product.id,
        userName: newReview.userName,
        userLocation: newReview.userLocation || 'Verified Buyer',
        rating: Number(newReview.rating),
        comment: newReview.comment
      });
      setReviews(prev => [created, ...prev]);
      setNewReview({ userName: '', userLocation: '', rating: 5, comment: '' });
      showToast('Thank you! Your handcrafted review has been posted.');
    } catch (err) {
      console.error(err);
      showToast('Failed to submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#DCCBB5] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header Close Button */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-3.5 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">
              {product.craftType}
            </span>
            <span className="text-xs text-[#8E7E6E]">•</span>
            <span className="text-xs text-[#6B5E52]">{product.state}</span>
          </div>
          <button
            onClick={() => setActiveProductModal(null)}
            className="p-1.5 rounded-full hover:bg-[#EAE0D0] text-[#5A4D41] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Top Section: Images + Key Buy Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image Gallery (5 cols) */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#E8DEC8] shadow-sm relative">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.isGiCertified && (
                  <div className="absolute top-3 left-3 bg-[#1D3557]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E9B44C]" />
                    <span>Certified GI Tag: {product.giTag || 'Authenticated'}</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        selectedImage === idx ? 'border-[#C85A32] shadow-sm scale-105' : 'border-[#E8DEC8] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Buy Box & Overview (6 cols) */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center text-[#E9B44C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#2C241E]">{product.rating}</span>
                  <span className="text-xs text-[#7A6B5B]">({reviews.length || product.reviewsCount} verified craft reviews)</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] leading-tight">
                  {product.title}
                </h2>
              </div>

              {/* Price & Payout Pill */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] space-y-2.5 shadow-2xs">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-[#2C241E]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-[#9B8C7E] line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#4A7C59] bg-[#EBF5EE] px-2 py-0.5 rounded-full">
                    Free Pan-India Delivery
                  </span>
                </div>

                {/* Direct artisan payout percentage */}
                <div className="text-xs font-medium text-[#7A4B29] bg-[#FAF3E8] p-2.5 rounded-xl border border-[#ECDCC9] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C85A32]" />
                    Fair Artisan Share:
                  </span>
                  <strong className="text-[#C85A32] font-bold text-sm">
                    {product.artisanDirectPayout || '₹' + Math.round(product.price * 0.78) + ' directly to artisan'}
                  </strong>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#5A4D41] leading-relaxed">
                {product.description}
              </p>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#DCCBB5] rounded-xl bg-white px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-[#5A4D41] hover:text-[#C85A32] font-bold text-base cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#2C241E]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#5A4D41] hover:text-[#C85A32] font-bold text-base cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      setActiveProductModal(null);
                    }}
                    className="flex-1 bg-[#C85A32] hover:bg-[#B34722] text-white py-3 px-6 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E9B44C]" />
                    <span>Add to Craft Basket</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                      isFavorited
                        ? 'bg-red-50 border-red-200 text-[#C85A32]'
                        : 'bg-white border-[#DCCBB5] text-[#5A4D41] hover:text-[#C85A32]'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#C85A32]' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#7A6B5B] px-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C59]" />
                    100% Handmade & Eco-packaged
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C59]" />
                    Easy 7-day Artisan Return
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Deep Handmade Craft Specifications (Standout Feature!) */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2C241E] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C85A32]" />
              Handmade Craftsmanship & Raw Material Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <span className="text-[#7A6B5B] font-medium block mb-1">Crafting Technique:</span>
                <strong className="text-[#2C241E] font-bold block">{product.craftTechnique}</strong>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <span className="text-[#7A6B5B] font-medium block mb-1">Raw Materials Sourced:</span>
                <strong className="text-[#2C241E] font-bold block">{product.rawMaterials}</strong>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <span className="text-[#7A6B5B] font-medium block mb-1">Time Invested to Craft:</span>
                <strong className="text-[#2C241E] font-bold block flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                  {product.timeToMake}
                </strong>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                <span className="text-[#7A6B5B] font-medium block mb-1">Dimensions & Weight:</span>
                <strong className="text-[#2C241E] font-bold block">{product.dimensions}</strong>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] sm:col-span-2">
                <span className="text-[#7A6B5B] font-medium block mb-1">Artisanal Care Guidelines:</span>
                <p className="text-[#2C241E] leading-relaxed">{product.careInstructions}</p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] sm:col-span-2">
                <span className="text-[#7A6B5B] font-medium block mb-1 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#4A7C59]" />
                  Eco-Friendly Unboxing & Packaging Guarantee (like iTokri):
                </span>
                <p className="text-[#2C241E] leading-relaxed">{product.packagingDetails}</p>
              </div>
            </div>
          </div>

          {/* Master Artisan Card Embedded (Focus on Local Creators!) */}
          <div className="bg-gradient-to-r from-[#FAF3E8] to-[#F5ECE1] rounded-2xl p-5 border border-[#ECDCC9] flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <img
                src={artisanData?.avatar || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80"}
                alt={product.artisanName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#C85A32] shadow-sm shrink-0"
              />
              <div>
                <span className="text-[11px] font-bold text-[#C85A32] uppercase tracking-wider block">
                  Meet the Master Creator
                </span>
                <h4 className="font-serif text-lg font-bold text-[#2C241E]">
                  {product.artisanName}
                </h4>
                <p className="text-xs text-[#7A6B5B] line-clamp-1">
                  {artisanData?.cooperative || product.artisanRegion}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setActiveDirectConnection({
                    id: product.artisanId,
                    name: product.artisanName,
                    region: product.artisanRegion,
                    craftSpecialty: product.craftType
                  });
                }}
                className="bg-[#1D3557] hover:bg-[#14243B] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#E9B44C]" />
                <span>Message Artisan</span>
              </button>

              {artisanData && (
                <button
                  onClick={() => {
                    setActiveArtisanModal(artisanData);
                  }}
                  className="bg-white hover:bg-[#FAF7F2] text-[#2C241E] text-xs font-bold px-4 py-2 rounded-xl border border-[#DCCBB5] transition-colors cursor-pointer"
                >
                  View Profile & Studio
                </button>
              )}
            </div>
          </div>

          {/* Customer Reviews & Testimonials Section */}
          <div className="space-y-6 pt-4 border-t border-[#E8DEC8]">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                Artisanal Reviews ({reviews.length})
              </h3>
            </div>

            {/* List of Reviews */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-4 rounded-xl border border-[#E8DEC8] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#2C241E]">{rev.userName}</span>
                      <span className="text-[11px] text-[#7A6B5B] ml-2">({rev.userLocation})</span>
                    </div>
                    <div className="flex items-center text-[#E9B44C]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#5A4D41] leading-relaxed">{rev.comment}</p>
                  
                  {/* Artisan reply to buyer */}
                  {rev.artisanResponse && (
                    <div className="mt-2 p-2.5 bg-[#FAF7F2] rounded-lg border-l-2 border-[#C85A32] text-xs text-[#7A4B29]">
                      <strong className="block text-[11px] font-bold text-[#C85A32] mb-0.5">
                        Maker's Blessing / Response:
                      </strong>
                      <span>{rev.artisanResponse}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#2C241E]">
                Leave a Verified Handcrafted Review
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  className="bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                  required
                />
                <input
                  type="text"
                  placeholder="Your City/State (e.g. Pune, Maharashtra)"
                  value={newReview.userLocation}
                  onChange={(e) => setNewReview({ ...newReview, userLocation: e.target.value })}
                  className="bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                />
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] font-medium focus:outline-hidden"
                >
                  <option value={5}>★★★★★ 5 Stars - Exceptional</option>
                  <option value={4}>★★★★☆ 4 Stars - Very Good</option>
                  <option value={3}>★★★☆☆ 3 Stars - Average</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Share your appreciation for the artisan's technique, packaging, or texture..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                required
              />
              <button
                type="submit"
                disabled={submittingReview}
                className="bg-[#2C241E] hover:bg-[#C85A32] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                {submittingReview ? 'Posting Review...' : 'Submit Handcrafted Review'}
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
