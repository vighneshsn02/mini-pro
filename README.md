# KalaKriti (कलाकृति) — Local Artisan & Indian Handicraft Marketplace

> **Authentic handmade heirlooms shaped by human hands, not machines.**  
> Inspired by the craft ethos, storytelling, and direct impact models of **Jaypore**, **Okhai**, and **iTokri**.

---

## 🌟 Overview & Standout Features

KalaKriti is a **full-stack web application** designed to run seamlessly on your local device. It bridges conscious patrons directly with master artisans, women's cooperatives, and rural self-help groups across India.

### 🎯 Key Highlights Addressing Every Requirement:

| Feature & Advantage | Implementation in KalaKriti |
| :--- | :--- |
| **Local Artisans** *(Focus on local creators)* | Dedicated profiles for master craftspeople (e.g. Master Rameshwar Prajapati, Khatri Abdul Rahim, Devi Artisan Collective, Budhram Baghel, Mohammad Rafiq Mir, Govinda Swamy) highlighting their lineage, studio methods, and community cooperatives. |
| **Product Details** *(Show handmade product information)* | Deep artisanal transparency: exact crafting technique (e.g. 16-stage mud resist printing), raw materials, days taken to craft, dimensions, natural care guidelines, and eco-packaging details. |
| **Artisan Profiles** *(Tell their stories)* | Personal quotes, audio-visual workshop highlights, behind-the-scenes studio photos, awards, and community impact metrics (families sustained, women trained). |
| **Easy Navigation** *(Simple and user-friendly)* | Filter by craft department, indigenous technique, origin state, GI tag certification, price range, and instant live search. Includes a slide-over basket drawer and multi-step checkout. |
| **Local Handicrafts** *(Promote regional products)* | **Interactive Regional Craft Map**: Explore 6 indigenous craft hubs (Rajasthan, Gujarat, Bihar, Kashmir, Chhattisgarh, Karnataka) with one-click filtering. |
| **Direct Connection** *(Help customers discover artisans)* | Send direct custom commission notes, sizing requests, and thank-you notes to artisans. The **Artisan & Admin Portal** lets artisans review and reply to inquiries in real time! |
| **Signature Jaypore / Okhai / iTokri Features** | • **iTokri Signature:** Complimentary surprise gift (Ajrakh bookmark & seed paper) and handwritten gift note with every order.<br>• **Okhai Signature:** Rural women cooperative impact meter & fair wage guarantee.<br>• **Jaypore Signature:** Curated heritage aesthetic, earthy terracotta palette, and longform Craft Journal articles. |

---

## 🛠️ Technology Stack

- **Frontend:**
  - React 19 (Modern Hooks, Context API)
  - Tailwind CSS v4 (Artisanal luxury theme with Playfair Display & Plus Jakarta Sans typography)
  - Lucide Icons (50+ handcrafted icons)
  - Vite 8.3 (Instant HMR and production bundling)
- **Backend:**
  - Node.js & Express (RESTful API architecture)
  - Persistent Local JSON Database (`server/data/`) with transactional file read/write
  - Zero external database installation required (runs 100% out of the box on any Windows/Mac/Linux machine)
- **APIs & State:**
  - Products CRUD with dynamic filtering and sorting
  - Master Artisans directory & impact statistics
  - Orders management with live tracking step updates
  - Direct message communication system between buyers and makers
  - Customer review submission & artisan responses
  - Live virtual craft masterclass bookings

---

## 🚀 How to Run on Your Local Device

### Option 1: One-Click Startup (Easiest)
Simply double-click the included batch file in the root directory:
```bash
start.bat
```
*(Or in PowerShell: `./start.ps1`)*

The server will launch immediately at:
👉 **`http://localhost:5000`**

---

### Option 2: Run via NPM

1. **Start the Production Server** (serves both API + interactive React UI on port 5000):
   ```bash
   npm start
   ```
   Open **`http://localhost:5000`** in your browser.

2. **Run in Development Mode with Hot Reload (Vite)**:
   - In terminal 1 (Backend API):
     ```bash
     cd server
     npm start
     ```
   - In terminal 2 (Frontend Dev Server):
     ```bash
     cd client
     npm run dev
     ```
   Open **`http://localhost:3000`** in your browser.

---

## 🏛️ Interactive Walkthrough

1. **Browse Heirlooms & Regional Crafts**:
   - Filter by craft type (*Jaipur Blue Pottery*, *Ajrakh Block Print*, *Mithila Folk Canvas*, *Kashmiri Pashmina*, *Bastar Dhokra*, *Channapatna Woodcraft*).
   - Use the **Interactive Regional Craft Map** to explore India's craft hubs.

2. **Inspect Deep Handmade Specs**:
   - Click any product to open the **Product Detail Modal**.
   - Check raw materials (e.g. quartz stone, wild indigo, termite clay), crafting time (e.g. 14 days), care instructions, and fair artisan payout.

3. **Connect Directly with Artisans**:
   - Click **"Message Maker"** or **"Send Note"** to request a custom size, bespoke engraving, or anniversary note.
   - Click **"Book Masterclass"** to reserve a seat for a live artisan workshop.

4. **Experience the Handcrafted Checkout**:
   - Add items to the basket drawer.
   - Choose an artisan tip (+₹50, +₹100, +₹250).
   - Add a requested handwritten note.
   - Complete checkout via simulated UPI QR, Card, or Cash on Delivery.
   - Print your official artisan receipt and track your parcel in real-time.

5. **Artisan Guild & Store Manager Portal**:
   - Click **"Artisan Portal"** in the top navigation bar.
   - View live economic impact: Total revenue, ~79% direct maker payout, rural families supported.
   - Update order dispatch stages: *"Handcrafting & Packing"* ➔ *"Dispatched"* ➔ *"Delivered"*.
   - View customer messages and reply directly to buyers.
   - Add new artisanal products into the catalog with custom specs.

---

## 📂 Project Structure

```
new-pro/
├── client/                     # React 19 + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Modular UI components
│   │   │   ├── Navbar.jsx               # Brand, search, quick links, cart trigger
│   │   │   ├── HeroSection.jsx          # Brand manifesto & impact counters
│   │   │   ├── CraftHeritageMap.jsx     # Interactive India Craft Map
│   │   │   ├── ProductFilters.jsx       # Department, state, craft & GI tag filters
│   │   │   ├── ProductCard.jsx          # Card with price, artisan share & tags
│   │   │   ├── ProductGrid.jsx          # Grid connecting search and filters
│   │   │   ├── ProductDetailModal.jsx   # Deep handmade specs, reviews & buy box
│   │   │   ├── ArtisansSection.jsx      # Master artisan profiles & cooperatives
│   │   │   ├── ArtisanModal.jsx         # Full artisan biography & studio photos
│   │   │   ├── DirectConnectionModal.jsx# Direct note & custom commission form
│   │   │   ├── WorkshopModal.jsx        # Live masterclass booking
│   │   │   ├── CartDrawer.jsx           # Slide-over basket with gift & tip
│   │   │   ├── CheckoutModal.jsx        # Multi-step checkout & printable invoice
│   │   │   ├── OrderTrackingModal.jsx   # Live parcel journey stepper
│   │   │   ├── StoriesSection.jsx       # Heritage craft journal
│   │   │   ├── StoryModal.jsx           # Longform editorial reader
│   │   │   ├── ArtisanAdminPortal.jsx   # Order dispatch & message reply portal
│   │   │   ├── Footer.jsx               # Trust badges & regional links
│   │   │   └── Toast.jsx                # Handcrafted feedback alerts
│   │   ├── context/
│   │   │   └── ShopContext.jsx          # Cart, wishlist, modals, toast state
│   │   ├── utils/
│   │   │   └── api.js                   # API client for backend communication
│   │   ├── App.jsx                      # App root component
│   │   ├── index.css                    # Tailwind v4 setup & custom craft theme
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Express REST API Backend
│   ├── data/                   # Persistent JSON Database
│   │   ├── products.json       # 12+ curated artisanal products
│   │   ├── artisans.json       # 6 master artisan profiles across India
│   │   ├── orders.json         # Customer orders & live tracking steps
│   │   ├── messages.json       # Direct buyer-to-artisan communications
│   │   ├── workshops.json      # Live virtual workshops
│   │   ├── stories.json        # Heritage craft chronicles
│   │   └── reviews.json        # Verified customer reviews
│   ├── db.js                   # Persistent data access layer
│   ├── server.js               # Express server & static asset handler
│   └── package.json
│
├── start.bat                   # 1-click Windows starter script
├── start.ps1                   # 1-click PowerShell starter script
├── package.json                # Root package configuration
└── README.md                   # Complete documentation
```

---

## 📜 Authenticity & GI Tag Credentials

All products in KalaKriti reflect genuine Indian crafts protected under Geographical Indications:
- **Jaipur Blue Pottery** (`GI-02-RAJ-POTTERY`)
- **Ajrakh Hand Block Print** (`GI-114-GUJ-AJRAKH`)
- **Madhubani / Mithila Folk Painting** (`GI-105-BIH-MITHILA`)
- **Kashmir Pashmina** (`GI-46-J&K-PASHMINA`)
- **Bastar Dhokra Bell Metal** (`GI-83-CG-DHOKRA`)
- **Channapatna Wooden Toys** (`GI-23-KAR-TOYS`)

---

*Handmade with dedication to preserve India's cultural heritage.*
