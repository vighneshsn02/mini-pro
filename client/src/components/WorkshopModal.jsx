import React, { useState } from 'react';
import { X, Video, Calendar, Clock, Users, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../utils/api';

export default function WorkshopModal() {
  const { activeWorkshopModal, setActiveWorkshopModal, showToast } = useShop();

  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const workshop = activeWorkshopModal;
  if (!workshop) return null;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email) {
      showToast('Please enter your name and email', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.bookWorkshop(workshop.id || 'wk-1', bookingData);
      setConfirmedBooking(res);
      showToast('Masterclass booked successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to book workshop', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-lg w-full border border-[#DCCBB5] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#1D3557] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Video className="w-5 h-5 text-[#E9B44C]" />
            <div>
              <h3 className="font-serif text-lg font-bold">Artisan Live Masterclass</h3>
              <p className="text-xs text-[#E8DEC8]">{workshop.craft || 'Indigenous Craft'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveWorkshopModal(null);
              setConfirmedBooking(null);
            }}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {confirmedBooking ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#EBF5EE] text-[#4A7C59] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#2C241E]">
                Booking Confirmed!
              </h4>
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#7A6B5B]">Booking ID:</span>
                  <strong className="text-[#C85A32]">{confirmedBooking.bookingId}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6B5B]">Masterclass:</span>
                  <strong className="text-[#2C241E]">{workshop.title}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6B5B]">Instructor:</span>
                  <strong className="text-[#2C241E]">{workshop.artisanName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6B5B]">Date & Time:</span>
                  <strong className="text-[#2C241E]">{workshop.date || 'Saturday, 4:00 PM IST'}</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F0E6D6]">
                  <span className="text-[#7A6B5B]">Participant:</span>
                  <strong className="text-[#2C241E]">{bookingData.name} ({bookingData.email})</strong>
                </div>
              </div>
              <p className="text-xs text-[#615244] leading-relaxed">
                Zoom invitation link and DIY craft material checklist have been dispatched to your email!
              </p>
              <button
                onClick={() => {
                  setActiveWorkshopModal(null);
                  setConfirmedBooking(null);
                }}
                className="bg-[#C85A32] hover:bg-[#B34722] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-sm transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              
              <div>
                <h4 className="font-serif text-xl font-bold text-[#2C241E]">
                  {workshop.title || 'Hands-On Heritage Craft Workshop'}
                </h4>
                <p className="text-xs text-[#7A4B29] font-medium mt-1">
                  Guided by Master Craftsman {workshop.artisanName}
                </p>
              </div>

              {/* Schedule Info Box */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#2C241E]">
                  <Calendar className="w-4 h-4 text-[#C85A32]" />
                  <span><strong>Schedule:</strong> {workshop.date || 'Upcoming Weekend Batch'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2C241E]">
                  <Clock className="w-4 h-4 text-[#C85A32]" />
                  <span><strong>Duration:</strong> 90 Minutes (Live Interactive Demonstration & Q&A)</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#F0E6D6]">
                  <span className="text-[#7A6B5B]">Registration Fee:</span>
                  <span className="font-serif text-lg font-bold text-[#C85A32]">
                    ₹{workshop.fee || 499}
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#2C241E] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C241E] mb-1">Email for Meeting Passcode *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C241E] mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1D3557] hover:bg-[#14243B] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-[#E9B44C]" />
                  <span>{submitting ? 'Confirming Seat...' : `Book Live Seat (₹${workshop.fee || 499})`}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
