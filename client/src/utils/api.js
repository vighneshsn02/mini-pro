const API_BASE = '/api';

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '' && val !== 'All') {
        query.append(key, val);
      }
    });
    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async createProduct(productData) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  },

  // Artisans
  async getArtisans(params = {}) {
    const query = new URLSearchParams(params);
    const res = await fetch(`${API_BASE}/artisans?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch artisans');
    return res.json();
  },

  async getArtisanById(id) {
    const res = await fetch(`${API_BASE}/artisans/${id}`);
    if (!res.ok) throw new Error('Failed to fetch artisan details');
    return res.json();
  },

  // Stories
  async getStories() {
    const res = await fetch(`${API_BASE}/stories`);
    if (!res.ok) throw new Error('Failed to fetch stories');
    return res.json();
  },

  // Orders
  async getOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  async getOrderById(id) {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    if (!res.ok) throw new Error('Failed to fetch order');
    return res.json();
  },

  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  },

  async updateOrderStatus(id, status) {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return res.json();
  },

  // Direct Artisan Messages
  async getMessages() {
    const res = await fetch(`${API_BASE}/messages`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },

  async sendMessage(msgData) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msgData),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },

  async replyMessage(id, reply) {
    const res = await fetch(`${API_BASE}/messages/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    });
    if (!res.ok) throw new Error('Failed to send reply');
    return res.json();
  },

  // Workshops
  async getWorkshops() {
    const res = await fetch(`${API_BASE}/workshops`);
    if (!res.ok) throw new Error('Failed to fetch workshops');
    return res.json();
  },

  async bookWorkshop(id, bookingInfo) {
    const res = await fetch(`${API_BASE}/workshops/${id}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingInfo),
    });
    if (!res.ok) throw new Error('Failed to book workshop');
    return res.json();
  },

  // Reviews
  async getReviews(productId) {
    const res = await fetch(`${API_BASE}/reviews?productId=${productId || ''}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async postReview(reviewData) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error('Failed to post review');
    return res.json();
  },

  // Analytics
  async getAnalytics() {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  }
};
