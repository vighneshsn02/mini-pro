import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    platform: 'KalaKriti Local Artisan Marketplace API', 
    timestamp: new Date().toISOString() 
  });
});

// ==================== PRODUCTS ====================
app.get('/api/products', (req, res) => {
  try {
    const products = db.getProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const reviews = db.getReviews(req.params.id);
    res.json({ ...product, reviews });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const newProduct = db.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

// ==================== ARTISANS ====================
app.get('/api/artisans', (req, res) => {
  try {
    const artisans = db.getArtisans(req.query);
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artisans', details: err.message });
  }
});

app.get('/api/artisans/:id', (req, res) => {
  try {
    const artisan = db.getArtisanById(req.params.id);
    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }
    const products = db.getProducts({ artisanId: req.params.id });
    res.json({ ...artisan, products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artisan', details: err.message });
  }
});

// ==================== STORIES / HERITAGE JOURNAL ====================
app.get('/api/stories', (req, res) => {
  try {
    const stories = db.getStories();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories', details: err.message });
  }
});

app.get('/api/stories/:slug', (req, res) => {
  try {
    const story = db.getStoryBySlug(req.params.slug);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch story', details: err.message });
  }
});

// ==================== ORDERS & CHECKOUT ====================
app.get('/api/orders', (req, res) => {
  try {
    const orders = db.getOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order', details: err.message });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const order = db.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const order = db.updateOrderStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status', details: err.message });
  }
});

// ==================== DIRECT ARTISAN MESSAGES ====================
app.get('/api/messages', (req, res) => {
  try {
    const messages = db.getMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
  }
});

app.post('/api/messages', (req, res) => {
  try {
    const message = db.createMessage(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
});

app.post('/api/messages/:id/reply', (req, res) => {
  try {
    const { reply } = req.body;
    const msg = db.replyToMessage(req.params.id, reply);
    if (!msg) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reply to message', details: err.message });
  }
});

// ==================== WORKSHOPS ====================
app.get('/api/workshops', (req, res) => {
  try {
    const workshops = db.getWorkshops();
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workshops', details: err.message });
  }
});

app.post('/api/workshops/:id/book', (req, res) => {
  try {
    const booking = db.bookWorkshop(req.params.id, req.body);
    if (!booking) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to book workshop', details: err.message });
  }
});

// ==================== REVIEWS ====================
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = db.getReviews(req.query.productId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews', details: err.message });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const review = db.addReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post review', details: err.message });
  }
});

// ==================== ANALYTICS & IMPACT ====================
app.get('/api/analytics', (req, res) => {
  try {
    const orders = db.getOrders();
    const products = db.getProducts();
    const artisans = db.getArtisans();
    const messages = db.getMessages();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalArtisanPayout = Math.round(totalRevenue * 0.79);
    const totalTips = orders.reduce((sum, o) => sum + (o.artisanTip || 0), 0);
    const totalFamiliesSupported = artisans.reduce((sum, a) => sum + (a.impact?.familiesSupported || 0), 0);
    const totalWomenTrained = artisans.reduce((sum, a) => sum + (a.impact?.womenTrained || 0), 0);

    res.json({
      totalOrders,
      totalRevenue,
      totalArtisanPayout,
      totalTips,
      totalFamiliesSupported,
      totalWomenTrained,
      totalArtisans: artisans.length,
      totalProducts: products.length,
      pendingMessages: messages.filter(m => m.status === 'Pending').length,
      recentOrders: orders.slice(0, 5)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics', details: err.message });
  }
});

// ==================== SERVE FRONTEND IN PRODUCTION ====================
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✨ KalaKriti Artisan API Server running at http://localhost:${PORT}`);
});
