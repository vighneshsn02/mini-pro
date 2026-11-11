import React, { useState, useEffect } from 'react';
import { 
  X, 
  BarChart3, 
  Package, 
  MessageSquare, 
  PlusCircle, 
  CheckCircle2, 
  Truck, 
  DollarSign, 
  Users, 
  Clock, 
  Send,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../utils/api';

export default function ArtisanAdminPortal() {
  const { isAdminPortalOpen, setIsAdminPortalOpen, showToast } = useShop();

  const [activeTab, setActiveTab] = useState('analytics'); // analytics | orders | messages | addProduct
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [replyTextMap, setReplyTextMap] = useState({});
  const [loading, setLoading] = useState(true);

  // New product form state
  const [newProd, setNewProd] = useState({
    title: '',
    price: '',
    originalPrice: '',
    craftType: 'Blue Pottery',
    category: 'Home & Living',
    state: 'Rajasthan',
    artisanName: 'Master Rameshwar Prajapati',
    craftTechnique: 'Natural mineral glaze hand painting',
    rawMaterials: 'Ground quartz stone, glass cullet, Multani Mitti',
    timeToMake: '7 Days',
    dimensions: 'Height: 8 inches | Diameter: 5 inches',
    careInstructions: 'Wipe with soft damp cloth',
    packagingDetails: 'Plastic-free recycled honeycomb wrap',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    isGiCertified: true,
    description: ''
  });
  const [submittingProduct, setSubmittingProduct] = useState(false);

  useEffect(() => {
    if (isAdminPortalOpen) {
      loadPortalData();
    }
  }, [isAdminPortalOpen]);

  const loadPortalData = async () => {
    setLoading(true);
    try {
      const [anData, ordData, msgData] = await Promise.all([
        api.getAnalytics(),
        api.getOrders(),
        api.getMessages()
      ]);
      setAnalytics(anData);
      setOrders(ordData);
      setMessages(msgData);
    } catch (err) {
      console.error(err);
      showToast('Failed to load portal data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      showToast(`Order ${orderId} updated to "${newStatus}"!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update status', 'error');
    }
  };

  const handleSendReply = async (msgId) => {
    const reply = replyTextMap[msgId];
    if (!reply) return;
    try {
      const updated = await api.replyMessage(msgId, reply);
      setMessages(prev => prev.map(m => m.id === msgId ? updated : m));
      setReplyTextMap(prev => ({ ...prev, [msgId]: '' }));
      showToast('Artisan response delivered to customer!');
    } catch (err) {
      console.error(err);
      showToast('Failed to reply', 'error');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProd.title || !newProd.price) {
      showToast('Please provide a title and price', 'error');
      return;
    }

    try {
      setSubmittingProduct(true);
      await api.createProduct({
        ...newProd,
        price: Number(newProd.price),
        originalPrice: Number(newProd.originalPrice || newProd.price),
        images: [newProd.image],
        artisanDirectPayout: `₹${Math.round(Number(newProd.price) * 0.78)} directly to maker`
      });
      showToast(`"${newProd.title}" listed successfully into the craft bazaar!`);
      // Reset form
      setNewProd({
        title: '',
        price: '',
        originalPrice: '',
        craftType: 'Blue Pottery',
        category: 'Home & Living',
        state: 'Rajasthan',
        artisanName: 'Master Rameshwar Prajapati',
        craftTechnique: 'Natural mineral glaze hand painting',
        rawMaterials: 'Ground quartz stone, glass cullet, Multani Mitti',
        timeToMake: '7 Days',
        dimensions: 'Height: 8 inches | Diameter: 5 inches',
        careInstructions: 'Wipe with soft damp cloth',
        packagingDetails: 'Plastic-free recycled honeycomb wrap',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
        stock: 10,
        isGiCertified: true,
        description: ''
      });
      loadPortalData();
    } catch (err) {
      console.error(err);
      showToast('Failed to create product', 'error');
    } finally {
      setSubmittingProduct(false);
    }
  };

  if (!isAdminPortalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#DCCBB5] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#1D3557] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#E9B44C]" />
            <div>
              <h3 className="font-serif text-lg font-bold">Artisan Guild & Portal Manager</h3>
              <p className="text-xs text-[#E8DEC8]">Live local backend dashboard & fair-trade analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadPortalData}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#E8DEC8] hover:text-white transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAdminPortalOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white px-6 py-2.5 border-b border-[#E8DEC8] flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'text-[#5A4D41] hover:bg-[#FAF7F2]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Fair-Trade Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'text-[#5A4D41] hover:bg-[#FAF7F2]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'text-[#5A4D41] hover:bg-[#FAF7F2]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Buyer Inquiries ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addProduct')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'addProduct'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'text-[#5A4D41] hover:bg-[#FAF7F2]'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>List New Handcrafted Product</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {loading && (
            <div className="text-center py-12 text-xs text-[#7A6B5B]">
              Loading portal database...
            </div>
          )}

          {/* TAB 1: ANALYTICS & IMPACT */}
          {!loading && activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-xl font-bold text-[#2C241E]">
                  Artisan Collective Impact & Revenue Overview
                </h4>
                <p className="text-xs text-[#7A6B5B] mt-1">
                  Transparent metrics verifying the direct economic return to rural craft creators.
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] shadow-2xs">
                  <span className="text-[10px] text-[#7A6B5B] uppercase font-bold block">Total Store Revenue</span>
                  <div className="font-serif text-2xl font-bold text-[#2C241E] mt-1">
                    ₹{analytics.totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#4A7C59] font-medium">Across {analytics.totalOrders} Orders</span>
                </div>

                <div className="bg-[#FAF3E8] p-4 rounded-2xl border border-[#ECDCC9] shadow-2xs">
                  <span className="text-[10px] text-[#7A4B29] uppercase font-bold block">Artisans Direct Share</span>
                  <div className="font-serif text-2xl font-bold text-[#C85A32] mt-1">
                    ₹{analytics.totalArtisanPayout.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#C85A32] font-bold">~79% Direct Livelihood Payout</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] shadow-2xs">
                  <span className="text-[10px] text-[#7A6B5B] uppercase font-bold block">Customer Tips to Makers</span>
                  <div className="font-serif text-2xl font-bold text-[#1D3557] mt-1">
                    ₹{analytics.totalTips.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-[#1D3557] font-medium">100% Retained by Artisans</span>
                </div>

                <div className="bg-[#EBF5EE] p-4 rounded-2xl border border-[#D1E7D7] shadow-2xs">
                  <span className="text-[10px] text-[#2D5A27] uppercase font-bold block">Rural Families Sustained</span>
                  <div className="font-serif text-2xl font-bold text-[#4A7C59] mt-1">
                    {analytics.totalFamiliesSupported}+
                  </div>
                  <span className="text-[10px] text-[#4A7C59] font-medium">{analytics.totalWomenTrained} Women Craftsfolk</span>
                </div>
              </div>

              {/* Recent Orders in Analytics */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-3">
                <h5 className="font-serif text-sm font-bold text-[#2C241E]">
                  Recent Craft Dispatches
                </h5>
                <div className="space-y-2">
                  {orders.slice(0, 3).map(o => (
                    <div key={o.id} className="flex justify-between items-center text-xs p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
                      <div>
                        <strong className="text-[#2C241E]">{o.id}</strong> — {o.customer?.name} ({o.customer?.city})
                        <span className="text-[11px] text-[#7A6B5B] block">{o.items?.length} handcrafted items</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif font-bold text-[#C85A32] block">₹{o.total?.toLocaleString()}</span>
                        <span className="text-[10px] bg-[#EBF5EE] text-[#4A7C59] px-2 py-0.5 rounded-full font-bold">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {!loading && activeTab === 'orders' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-bold text-[#2C241E]">
                  Manage & Dispatch Artisan Orders
                </h4>
                <p className="text-xs text-[#7A6B5B] mt-1">
                  Update packaging and courier tracking status in real time for buyers.
                </p>
              </div>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0E6D6] pb-3">
                      <div>
                        <span className="font-bold text-[#2C241E] text-sm">{order.id}</span>
                        <span className="text-[#7A6B5B] ml-2">Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>

                      {/* Status Update Controller */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#7A6B5B] font-medium">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-2.5 py-1 font-bold text-xs text-[#C85A32] focus:outline-hidden"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Handcrafting & Packing">Handcrafting & Packing</option>
                          <option value="Dispatched">Dispatched via Courier</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#7A6B5B] block">Buyer Details:</span>
                        <strong className="text-[#2C241E]">{order.customer?.name}</strong> ({order.customer?.email}, {order.customer?.phone})
                      </div>
                      <div>
                        <span className="text-[#7A6B5B] block">Delivery Address:</span>
                        <span className="text-[#2C241E]">{order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="pt-2 border-t border-[#F0E6D6] space-y-1">
                      {order.items?.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span>{it.title} × {it.quantity} (By {it.artisanName})</span>
                          <strong className="text-[#2C241E]">₹{(it.price * it.quantity).toLocaleString()}</strong>
                        </div>
                      ))}
                    </div>

                    {/* Handwritten note requested */}
                    {order.noteMessage && (
                      <div className="p-2.5 bg-[#FAF3E8] rounded-xl border border-[#ECDCC9] text-xs text-[#7A4B29]">
                        <strong>Handwritten Gift Note:</strong> "{order.noteMessage}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BUYER INQUIRIES & CUSTOM COMMISSIONS */}
          {!loading && activeTab === 'messages' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-bold text-[#2C241E]">
                  Customer Inquiries & Direct Commissions
                </h4>
                <p className="text-xs text-[#7A6B5B] mt-1">
                  Artisans can reply directly to custom size requests, gift notes, and bespoke orders.
                </p>
              </div>

              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-[#2C241E]">{msg.customerName}</span>
                        <span className="text-[11px] text-[#7A6B5B] ml-2">({msg.customerEmail})</span>
                        <span className="text-[10px] bg-[#EFE7D8] text-[#7A4B29] px-2 py-0.5 rounded-sm font-bold ml-2">
                          {msg.inquiryType}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        msg.status === 'Replied' ? 'bg-[#EBF5EE] text-[#4A7C59]' : 'bg-[#FAF3E8] text-[#C85A32]'
                      }`}>
                        {msg.status}
                      </span>
                    </div>

                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] text-xs text-[#5A4D41]">
                      <strong className="block text-[#2C241E] mb-1">Subject: {msg.subject}</strong>
                      <p>{msg.message}</p>
                    </div>

                    {/* Existing Reply if already replied */}
                    {msg.artisanReply && (
                      <div className="p-3 bg-[#EBF5EE] rounded-xl border border-[#D1E7D7] text-xs text-[#2D5A27]">
                        <strong className="block font-bold mb-1">Your Artisan Guild Reply:</strong>
                        <p>{msg.artisanReply}</p>
                      </div>
                    )}

                    {/* Reply input */}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Write artisan reply to customer..."
                        value={replyTextMap[msg.id] || ''}
                        onChange={(e) => setReplyTextMap({ ...replyTextMap, [msg.id]: e.target.value })}
                        className="flex-1 bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-hidden"
                      />
                      <button
                        onClick={() => handleSendReply(msg.id)}
                        className="bg-[#1D3557] hover:bg-[#14243B] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-[#E9B44C]" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ADD NEW ARTISAN PRODUCT */}
          {!loading && activeTab === 'addProduct' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-bold text-[#2C241E]">
                  List a New Handcrafted Product
                </h4>
                <p className="text-xs text-[#7A6B5B] mt-1">
                  Add an authentic artisanal piece with full craft specs, raw materials, and direct payout.
                </p>
              </div>

              <form onSubmit={handleCreateProduct} className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hand-Painted Madhubani Peacock Wall Plate"
                      value={newProd.title}
                      onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Craft Department *</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] font-medium focus:outline-hidden"
                    >
                      <option value="Home & Living">Home & Living</option>
                      <option value="Apparel & Textiles">Apparel & Textiles</option>
                      <option value="Folk Art & Wall Decor">Folk Art & Wall Decor</option>
                      <option value="Accessories & Toys">Accessories & Toys</option>
                      <option value="Kitchen & Dining">Kitchen & Dining</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Retail Price (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1850"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 2400"
                      value={newProd.originalPrice}
                      onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Craft Tradition *</label>
                    <select
                      value={newProd.craftType}
                      onChange={(e) => setNewProd({ ...newProd, craftType: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] font-medium focus:outline-hidden"
                    >
                      <option value="Blue Pottery">Blue Pottery</option>
                      <option value="Ajrakh Block Print">Ajrakh Block Print</option>
                      <option value="Madhubani Painting">Madhubani Painting</option>
                      <option value="Pashmina & Sozni">Pashmina & Sozni</option>
                      <option value="Bastar Dhokra">Bastar Dhokra</option>
                      <option value="Channapatna Woodcraft">Channapatna Woodcraft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Region / State *</label>
                    <select
                      value={newProd.state}
                      onChange={(e) => setNewProd({ ...newProd, state: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] font-medium focus:outline-hidden"
                    >
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Kashmir">Kashmir</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Master Artisan Attribution *</label>
                    <input
                      type="text"
                      required
                      value={newProd.artisanName}
                      onChange={(e) => setNewProd({ ...newProd, artisanName: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Product Image URL</label>
                    <input
                      type="url"
                      value={newProd.image}
                      onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Craft Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F0E6D6]">
                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Craft Technique Details</label>
                    <input
                      type="text"
                      value={newProd.craftTechnique}
                      onChange={(e) => setNewProd({ ...newProd, craftTechnique: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Raw Materials Sourced</label>
                    <input
                      type="text"
                      value={newProd.rawMaterials}
                      onChange={(e) => setNewProd({ ...newProd, rawMaterials: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Time to Craft</label>
                    <input
                      type="text"
                      value={newProd.timeToMake}
                      onChange={(e) => setNewProd({ ...newProd, timeToMake: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2C241E] mb-1">Dimensions & Weight</label>
                    <input
                      type="text"
                      value={newProd.dimensions}
                      onChange={(e) => setNewProd({ ...newProd, dimensions: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2C241E] mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the craft lineage, colors, and significance..."
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#2C241E]">
                    <input
                      type="checkbox"
                      checked={newProd.isGiCertified}
                      onChange={(e) => setNewProd({ ...newProd, isGiCertified: e.target.checked })}
                      className="w-4 h-4 text-[#C85A32] accent-[#C85A32]"
                    />
                    <ShieldCheck className="w-4 h-4 text-[#4A7C59]" />
                    <span>Certified GI Tag Indigenous Craft</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submittingProduct}
                    className="bg-[#C85A32] hover:bg-[#B34722] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{submittingProduct ? 'Listing...' : 'List in Craft Bazaar'}</span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
