import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, MessageCircle, CheckCircle2, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../utils/api';

export default function DirectConnectionModal() {
  const { activeDirectConnection, setActiveDirectConnection, showToast } = useShop();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    subject: '',
    inquiryType: 'Custom Commission',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recentMessages, setRecentMessages] = useState([]);

  const artisan = activeDirectConnection;

  useEffect(() => {
    if (artisan) {
      setSubmitted(false);
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry regarding ${artisan.craftSpecialty || 'Handcrafted Art'}`
      }));
      // Fetch recent messages
      api.getMessages()
        .then(msgs => {
          const filtered = msgs.filter(m => !artisan.id || m.artisanId === artisan.id || m.artisanName === artisan.name);
          setRecentMessages(filtered.slice(0, 3));
        })
        .catch(console.error);
    }
  }, [artisan]);

  if (!artisan) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await api.sendMessage({
        artisanId: artisan.id || 'general',
        artisanName: artisan.name,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        subject: formData.subject,
        inquiryType: formData.inquiryType,
        message: formData.message
      });
      setSubmitted(true);
      showToast('Your message has been delivered to the artisan!');
    } catch (err) {
      console.error(err);
      showToast('Failed to send message to artisan', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-[#DCCBB5] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#1D3557] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 text-[#E9B44C]" />
            <div>
              <h3 className="font-serif text-lg font-bold">Direct Maker Connection</h3>
              <p className="text-xs text-[#E8DEC8]">Connecting with {artisan.name}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveDirectConnection(null)}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#EBF5EE] text-[#4A7C59] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#2C241E]">
                Note Sent to {artisan.name}!
              </h4>
              <p className="text-sm text-[#615244] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out directly. The artisan guild in {artisan.region || 'the craft hub'} has been notified. They typically respond to custom commissions and inquiries within 24 to 48 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setActiveDirectConnection(null)}
                  className="bg-[#C85A32] hover:bg-[#B34722] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-sm transition-colors cursor-pointer"
                >
                  Return to Bazaar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="bg-[#FAF3E8] p-3.5 rounded-xl border border-[#ECDCC9] text-xs text-[#7A4B29] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>
                  You are communicating directly with {artisan.name} ({artisan.craftSpecialty || 'Master Artisan'}).
                </span>
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-bold text-[#2C241E] mb-1">
                  Inquiry Nature
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] font-medium focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
                >
                  <option value="Custom Commission">Custom Commission (Bespoke Handcrafted Piece)</option>
                  <option value="Custom Sizing / Dimensions">Custom Sizing / Material Modification</option>
                  <option value="Bulk Wedding / Corporate Gifting">Bulk Craft Gifting</option>
                  <option value="Artisan Appreciation & Blessing">Appreciation & Thank-You Note</option>
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2C241E] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Iyer"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C241E] mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-[#2C241E] mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#2C241E] mb-1">Your Note or Request Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your design specifications, intended colors, or a heartfelt message to the maker..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2.5 text-xs text-[#2C241E] focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#7A6B5B] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#4A7C59]" />
                  Average artisan response time: ~24 hrs
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#C85A32] hover:bg-[#B34722] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Delivering...' : 'Send to Artisan'}</span>
                </button>
              </div>

            </form>
          )}

          {/* Previous Q&A / Customer Notes */}
          {recentMessages.length > 0 && (
            <div className="pt-4 border-t border-[#E8DEC8] space-y-3">
              <h5 className="font-serif text-xs font-bold text-[#2C241E] uppercase tracking-wider">
                Recent Guild Q&A with {artisan.name}
              </h5>
              <div className="space-y-2">
                {recentMessages.map(m => (
                  <div key={m.id} className="bg-white p-3 rounded-xl border border-[#E8DEC8] text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#2C241E]">
                      <span>{m.customerName}: "{m.subject}"</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status === 'Replied' ? 'bg-[#EBF5EE] text-[#4A7C59]' : 'bg-[#FAF3E8] text-[#D49B28]'}`}>
                        {m.status}
                      </span>
                    </div>
                    {m.artisanReply && (
                      <p className="text-[#7A4B29] bg-[#FAF7F2] p-2 rounded-lg border-l-2 border-[#C85A32] text-[11px] mt-1">
                        <strong>Artisan Reply:</strong> {m.artisanReply}
                      </p>
                    )}
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
