import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// Helper to safely read JSON
function readJson(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
}

// Helper to safely write JSON
function writeJson(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

export const db = {
  // PRODUCTS
  getProducts(filters = {}) {
    let products = readJson('products.json');
    const { category, craftType, state, search, minPrice, maxPrice, isGiCertified, sort, artisanId } = filters;

    if (artisanId) {
      products = products.filter(p => p.artisanId === artisanId);
    }
    if (category && category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (craftType && craftType !== 'All') {
      products = products.filter(p => p.craftType.toLowerCase() === craftType.toLowerCase());
    }
    if (state && state !== 'All') {
      products = products.filter(p => p.state.toLowerCase() === state.toLowerCase());
    }
    if (isGiCertified === true || isGiCertified === 'true') {
      products = products.filter(p => p.isGiCertified);
    }
    if (minPrice) {
      products = products.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= Number(maxPrice));
    }
    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.craftType.toLowerCase().includes(q) ||
        p.artisanName.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'newest') {
      products.reverse();
    }

    return products;
  },

  getProductById(id) {
    const products = readJson('products.json');
    return products.find(p => p.id === id);
  },

  createProduct(productData) {
    const products = readJson('products.json');
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...productData,
      rating: 5.0,
      reviewsCount: 0,
      stock: Number(productData.stock || 10),
      price: Number(productData.price || 0),
      originalPrice: Number(productData.originalPrice || productData.price || 0),
      isGiCertified: Boolean(productData.isGiCertified),
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : [productData.image || "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"],
      tags: Array.isArray(productData.tags) ? productData.tags : (productData.tags ? productData.tags.split(',').map(s => s.trim()) : [])
    };
    products.unshift(newProduct);
    writeJson('products.json', products);
    return newProduct;
  },

  updateProduct(id, updateData) {
    const products = readJson('products.json');
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updateData };
    writeJson('products.json', products);
    return products[index];
  },

  deleteProduct(id) {
    let products = readJson('products.json');
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length !== initialLength) {
      writeJson('products.json', products);
      return true;
    }
    return false;
  },

  // ARTISANS
  getArtisans(filters = {}) {
    let artisans = readJson('artisans.json');
    if (filters.state && filters.state !== 'All') {
      artisans = artisans.filter(a => a.state.toLowerCase() === filters.state.toLowerCase());
    }
    return artisans;
  },

  getArtisanById(id) {
    const artisans = readJson('artisans.json');
    return artisans.find(a => a.id === id);
  },

  // STORIES
  getStories() {
    return readJson('stories.json');
  },

  getStoryBySlug(slug) {
    const stories = readJson('stories.json');
    return stories.find(s => s.slug === slug || s.id === slug);
  },

  // ORDERS
  getOrders() {
    return readJson('orders.json');
  },

  getOrderById(id) {
    const orders = readJson('orders.json');
    return orders.find(o => o.id === id);
  },

  createOrder(orderData) {
    const orders = readJson('orders.json');
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'Order Placed',
      trackingSteps: [
        { title: 'Order Confirmed & Artisan Guild Notified', date: 'Just now', completed: true },
        { title: 'Handcrafted Packaging with Recycled Materials', date: 'Pending', completed: false },
        { title: 'Dispatched with Carbon-Neutral Logistics', date: 'Pending', completed: false },
        { title: 'Delivered to Doorstep', date: 'Pending', completed: false }
      ],
      ...orderData
    };
    orders.unshift(newOrder);
    writeJson('orders.json', orders);
    return newOrder;
  },

  updateOrderStatus(id, status) {
    const orders = readJson('orders.json');
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    order.status = status;
    // update tracking steps based on status
    if (status === 'Handcrafting & Packing') {
      order.trackingSteps[1].completed = true;
      order.trackingSteps[1].date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (status === 'Dispatched') {
      order.trackingSteps[1].completed = true;
      order.trackingSteps[2].completed = true;
      order.trackingSteps[2].date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (status === 'Delivered') {
      order.trackingSteps.forEach(s => s.completed = true);
      order.trackingSteps[3].date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    writeJson('orders.json', orders);
    return order;
  },

  // DIRECT ARTISAN MESSAGES
  getMessages() {
    return readJson('messages.json');
  },

  createMessage(msgData) {
    const messages = readJson('messages.json');
    const newMsg = {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      artisanReply: null,
      repliedAt: null,
      ...msgData
    };
    messages.unshift(newMsg);
    writeJson('messages.json', messages);
    return newMsg;
  },

  replyToMessage(id, replyText) {
    const messages = readJson('messages.json');
    const msg = messages.find(m => m.id === id);
    if (!msg) return null;
    msg.artisanReply = replyText;
    msg.repliedAt = new Date().toISOString();
    msg.status = 'Replied';
    writeJson('messages.json', messages);
    return msg;
  },

  // WORKSHOPS
  getWorkshops() {
    return readJson('workshops.json');
  },

  bookWorkshop(id, bookingInfo) {
    const workshops = readJson('workshops.json');
    const workshop = workshops.find(w => w.id === id);
    if (!workshop) return null;
    workshop.bookedSeats = (workshop.bookedSeats || 0) + 1;
    writeJson('workshops.json', workshops);
    return {
      bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      workshop,
      customer: bookingInfo,
      bookedAt: new Date().toISOString()
    };
  },

  // REVIEWS
  getReviews(productId) {
    const reviews = readJson('reviews.json');
    if (productId) {
      return reviews.filter(r => r.productId === productId);
    }
    return reviews;
  },

  addReview(reviewData) {
    const reviews = readJson('reviews.json');
    const newReview = {
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      verified: true,
      ...reviewData
    };
    reviews.unshift(newReview);
    writeJson('reviews.json', reviews);

    // Also update product rating and reviewsCount
    if (reviewData.productId) {
      const products = readJson('products.json');
      const product = products.find(p => p.id === reviewData.productId);
      if (product) {
        const prodReviews = reviews.filter(r => r.productId === reviewData.productId);
        const avg = prodReviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / prodReviews.length;
        product.rating = Number(avg.toFixed(1));
        product.reviewsCount = prodReviews.length;
        writeJson('products.json', products);
      }
    }

    return newReview;
  }
};
