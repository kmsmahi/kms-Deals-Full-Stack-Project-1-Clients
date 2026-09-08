# 🛍️ KMS-DEALS — Client

> A modern, responsive client-side application for **KMS-DEALS**, a product marketplace and bidding platform where users can explore products, create listings, place bids, and manage their marketplace activities.

---

## 📌 Project Overview

**KMS-DEALS Client** is the frontend application of the KMS-DEALS full-stack marketplace project.

The application provides a clean and interactive interface for users to:

* Explore available products
* Search and sort marketplace listings
* View detailed product information
* Create and manage product listings
* Place bids on products
* Track submitted bids
* Manage personal products
* Register and authenticate securely
* Access protected marketplace features

This repository contains **only the client-side/frontend implementation**. The backend API and database are maintained separately.

---

## 🚀 Project Title

### KMS-DEALS — Online Deals & Bidding Marketplace

**Repository:** `kms-Deals-Full-Stack-Project-1-Clients`

**Project Type:** Client-Side / Frontend Application

**Architecture:** React SPA + REST API Integration

---

## 🧰 Technology Stack

### Frontend

| Technology                  | Purpose                                |
| --------------------------- | -------------------------------------- |
| **React.js**                | Building the user interface            |
| **Vite**                    | Development environment and build tool |
| **JavaScript (ES6+)**       | Application logic                      |
| **Tailwind CSS**            | Utility-first styling                  |
| **DaisyUI**                 | UI components and styling utilities    |
| **React Router**            | Client-side routing and navigation     |
| **Framer Motion**           | Animations and page transitions        |
| **React Icons**             | Interface icons                        |
| **Firebase Authentication** | User authentication                    |

The current `package.json` confirms React, Vite, Tailwind CSS, DaisyUI, Firebase, React Router, Framer Motion, and React Icons as project dependencies.

### Backend Communication

The client communicates with a separate backend REST API using the browser's **Fetch API**.

Examples include:

* Loading products
* Loading individual product details
* Creating products
* Loading user-specific products
* Loading bids
* Creating bids
* Updating bid status
* Deleting products
* Withdrawing bids

The frontend currently uses API endpoints such as `/all-products`, `/productDetails/:id`, `/products`, `/my-products`, and `/bids`.

---

## ✨ Key Features

### 🏠 1. Modern Home Page

* Responsive landing page
* Hero/banner section
* Recently added products
* Clean marketplace-focused UI
* Reusable product components

The home page loads the latest products from the backend API and displays them through reusable components.

---

### 🛒 2. Product Marketplace

Users can browse the available marketplace products through the **All Products** page.

Features include:

* Product listing
* Product cards
* Product name/category search
* Price-based sorting
* Loading states
* Error handling
* Responsive layout

The marketplace supports searching by product title/category and sorting products by price from low to high or high to low.

---

### 🔎 3. Product Details

Each product has a dedicated details page containing:

* Product information
* Product pricing
* Seller/listing information
* Bidding interface
* Existing bids
* Bid status management

The client retrieves product details and associated bids dynamically using the product ID.

---

### 💰 4. Product Bidding System

Users can place bids on products through an interactive bidding interface.

Features include:

* Bid amount validation
* Buyer information
* Bid submission
* Existing bid listing
* Bid status updates
* Automatic bid list refresh
* Accept/reject bid functionality

The client sends bid data to the backend through a POST request and supports bid status updates through PATCH requests.

---

### 📦 5. Create Product Listing

Authenticated users can create new marketplace listings.

The product creation form supports:

* Product information
* Category
* Price range
* Product details
* Listing submission
* Loading state
* Error handling
* Automatic navigation after successful submission

The client prepares the product data and sends it to the backend through the `/products` endpoint.

---

### 👤 6. My Products

Users can manage the products they have listed on KMS-DEALS.

Features include:

* View personal listings
* Loading and error states
* Product management
* Delete product functionality
* User-specific product retrieval

Products are retrieved based on the authenticated user's email.

---

### 📋 7. My Bids

Users can monitor bids they have submitted.

Features include:

* View submitted bids
* Track bidding history
* Monitor bid information
* Withdraw bids
* Loading and error handling

The client retrieves the logged-in user's bids and supports withdrawing a bid through the API.

---

### 🔐 8. Authentication

Authentication is handled through **Firebase Authentication**.

The application includes:

* Email/password login
* Google authentication
* User registration
* Logout
* Authentication context
* Protected routes
* Authentication-aware navigation

The login page implements both email/password authentication and Google sign-in through the application's authentication provider.

---

### 🛡️ 9. Protected Routes

Private marketplace features are protected from unauthenticated access.

The project includes dedicated authentication and routing components such as:

* `AuthProvider`
* `PrivateRout`
* `AuthLayout`
* `AllRouts`

This keeps authentication logic and route protection separated from individual pages.

---

### 🎨 10. Responsive & Interactive UI

The interface is designed to provide a smooth experience across different screen sizes.

The project uses:

* Tailwind CSS
* DaisyUI
* Framer Motion
* Responsive layouts
* Reusable components
* Loading indicators
* Error states
* Interactive forms
* Animated UI elements

Framer Motion is used throughout the client for UI animation and transition effects.

---

## 📁 Project Structure

```text
kms-Deals-Full-Stack-Project-1-Clients/
│
├── public/
│   └── Static/public assets
│
├── src/
│   │
│   ├── Componenets/
│   │   ├── AuthLayout.jsx
│   │   ├── Banner.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRout.jsx
│   │   ├── ProductCard.jsx
│   │   ├── RecentProducts.jsx
│   │   └── SingleCard.jsx
│   │
│   ├── Firebase/
│   │   └── firebase.config.js
│   │
│   ├── LayOuts/
│   │   └── MainLayout.jsx
│   │
│   ├── Pages/
│   │   ├── AllProducts.jsx
│   │   ├── CreateProduct.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Logout.jsx
│   │   ├── MyBids.jsx
│   │   ├── MyProducts.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Register.jsx
│   │
│   ├── Provider/
│   │   └── AuthProvider.jsx
│   │
│   ├── Routs/
│   │   └── AllRouts.jsx
│   │
│   ├── assets/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

The repository currently follows a component/page/provider/layout/routing-based React structure, making the frontend functionality separated into logical modules.

---

## 🏗️ Client-Side Architecture

```text
                    ┌─────────────────────┐
                    │      User / UI      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       React Router       Auth Provider      Components
             │                 │                 │
             ▼                 ▼                 ▼
          Pages            Firebase          UI / Cards
             │
             ▼
       Fetch API Calls
             │
             ▼
   ┌─────────────────────────┐
   │   Separate Backend API  │
   └─────────────────────────┘
```

> **Note:** The backend server and database are **not included in this repository**. This repository represents only the client-side application.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kmsmahi/kms-Deals-Full-Stack-Project-1-Clients.git
```

### 2. Navigate to the Project

```bash
cd kms-Deals-Full-Stack-Project-1-Clients
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will then be available through the local Vite development server.

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

These scripts are defined in the project's `package.json`.

---

## 🔗 Backend Integration

This client is designed to work with a separate backend API.

The frontend communicates with the backend through REST endpoints using `fetch()`.

Example flow:

```text
User Interaction
       ↓
React Component
       ↓
Fetch API
       ↓
Backend REST API
       ↓
Database
       ↓
JSON Response
       ↓
React State
       ↓
Updated UI
```

For example, the product details page retrieves product information and bids from the backend, while the bidding interface sends new bids and status updates back to the API.

---

## 🎯 Project Highlights

* ⚛️ Modern React-based SPA
* ⚡ Vite-powered development environment
* 🎨 Tailwind CSS + DaisyUI UI system
* 🔐 Firebase authentication
* 🔑 Protected routes
* 🔎 Product search
* ↕️ Price sorting
* 📦 Product listing management
* 💰 Product bidding system
* 📋 Personal bid tracking
* 🛍️ Personal product management
* 🎬 Framer Motion animations
* 📱 Responsive design
* 🔄 REST API integration
* ⚠️ Loading and error handling
* 🧩 Reusable React components

---

## 👨‍💻 Builder

### Kazi Md. Salauddin Mahi

**Computer Science & Engineering**
**International Islamic University Chittagong (IIUC)**

Passionate about modern web development, MERN stack technologies, and building responsive, user-focused applications.

### Connect

* **GitHub:** [@kmsmahi](https://github.com/kmsmahi)

---

## 📄 Project Scope

This repository contains **only the frontend/client-side implementation** of KMS-DEALS.

### Included

* React application
* UI components
* Pages
* Routing
* Firebase authentication integration
* Client-side state management
* API integration
* Responsive design
* Product and bidding interfaces

### Not Included

* Backend server
* MongoDB/database configuration
* Backend API implementation
* Server-side business logic

---

## ⭐ Acknowledgement

Built as a full-stack web development project with a dedicated **React client application** and a separate backend service.

---

