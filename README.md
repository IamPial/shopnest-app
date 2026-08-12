# 🛒 ShopNest — Product Marketplace

> A production-ready full-stack product marketplace built with Next.js, TypeScript, Tailwind CSS, Express.js, Prisma ORM, and PostgreSQL.

ShopNest is a modern e-commerce marketplace designed to demonstrate a complete frontend-to-backend architecture with JWT authentication, role-based authorization, relational database design, RESTful APIs, CRUD operations, cart management, orders, and product reviews.

---

##  Features

###  Authentication & Authorization

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Role-based authorization
- Customer and Admin roles
- Current user/profile support
- Logout functionality

###  Product Marketplace

- Browse products
- Product details
- Search products
- Filter by category
- Price filtering
- Product sorting
- Stock availability
- Product status management


###  Shopping Cart

- Add products to cart
- Update quantities
- Remove cart items
- Stock-aware quantity handling
- Cart total calculation

###  Order Management

- Create orders
- View customer orders
- View order details
- Order item management
- Order status tracking
- Admin order management

###  Admin Dashboard

- Dashboard statistics
- Product CRUD
- User management
- Order status management
- Soft delete support

---

##  Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| HeroUI / UI Library | Reusable UI components |
| React | UI development |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API |
| TypeScript | Type safety |
| Prisma ORM | Database ORM |
| PostgreSQL | Relational database |
| JWT | Authentication |
| bcrypt | Password hashing |
| CORS | Cross-origin communication |
| dotenv | Environment configuration |

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      Next.js        │
                    │    TypeScript UI    │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │     Express.js      │
                    │    TypeScript API   │
                    └──────────┬──────────┘
                               │
                  ┌────────────┼────────────┐
                  │            │            │
                  ▼            ▼            ▼
               JWT Auth     Services      Routes
                  │            │            │
                  └────────────┼────────────┘
                               ▼
                    ┌─────────────────────┐
                    │     Prisma ORM      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    └─────────────────────┘
```

---

## 🗃️ Database Design

ShopNest uses a normalized relational database.

### Main Models

```text
User
Category
Product
Order
OrderItem
```

### Relationships

```text
User
 ├── CartItems
 ├── Orders
 

Category
 └── Products

Product
 ├── Category
 ├── OrderItems


Order
 ├── User
 └── OrderItems

OrderItem
 ├── Order
 └── Product

```

### Enums

```text
UserRole
├── ADMIN
└── CUSTOMER

ProductStatus
├── ACTIVE
├── INACTIVE
└── OUT_OF_STOCK

```

### Database Features

- UUID primary keys
- Foreign key relationships
- Prisma relations
- Enums
- Unique constraints
- Database indexes
- Soft delete
- Created/updated timestamps
- Table mapping with `@@map()`

---

## 🔐 Authentication Flow

ShopNest uses custom JWT authentication.

```text
Register
   │
   ▼
Password hashed with bcrypt
   │
   ▼
User stored in PostgreSQL
   │
   ▼
Login
   │
   ▼
Credentials verified
   │
   ▼
JWT generated
   │
   ▼
Frontend stores authentication state
   │
   ▼
Protected API requests
   │
   ▼
Authorization: Bearer <JWT>
```

The backend is responsible for validating the JWT and enforcing authorization.

---

## 📡 REST API

The backend follows a consistent API response format.

### Success

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Product not found",
  "error": null
}
```

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Users

```http
GET    /api/v1/users
GET    /api/users/myself
```

### Categories

```http
POST   /api/v1/categories
GET    /api/v1/categories
```

### Products

```http
POST   /api/v1/products
GET    /api/v1/products
GET    /api/v1/products/:id
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id
```


### Orders

```http
POST   /api/v1/orders
GET    /api/v1/orders
```

---

##  Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18+
- npm
- PostgreSQL
- Git

---

## Clone Repository

```bash
git clone https://github.com/IamPial/shopnest.git

cd shopnest
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev --name init
```

Start development server:

```bash
npm run dev
```

Backend should run on:

```text
http://localhost:5000
```

---

#  Frontend Setup

Navigate to client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start development server:

```bash
npm run dev
```

Frontend should run on:

```text
http://localhost:3000
```

---

##  Prisma Studio

To inspect the database visually:

```bash
npx prisma studio
```

---

##  Frontend ↔ Backend Integration

The frontend is structured around a service layer.


### Production Integration

```text
Page
 ↓
Service
 ↓
API Client
 ↓
Express REST API
 ↓
Prisma
 ↓
PostgreSQL
```

---

##  Security

The application follows basic security practices:

- Passwords are hashed using bcrypt
- Authentication uses JWT
- Protected backend routes validate JWT
- Admin routes require appropriate authorization
- Passwords are never returned through public APIs
- Sensitive secrets are stored in environment variables
- CORS is configured on the backend
- Soft deletion is used instead of permanently removing important records

---

## 📱 Responsive Design

ShopNest is designed for:

-  Mobile
-  Tablet
-  Desktop
-  Large screens

The UI uses Tailwind CSS responsive utilities and reusable components.

---

##  Project Objectives

This project demonstrates practical knowledge of:

- REST API development
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Database relationships
- JWT authentication
- bcrypt password hashing
- Role-based authorization
- CRUD operations
- Soft delete
- API architecture
- Frontend/backend integration
- Responsive UI development
- Modular project architecture

---

##  Requirements Checklist

### Backend

- [x] Express.js
- [x] TypeScript
- [x] PostgreSQL
- [x] Prisma ORM
- [x] JWT authentication
- [x] bcrypt
- [x] CORS
- [x] dotenv
- [x] Modular architecture
- [x] Relational database
- [x] Enums
- [x] Soft delete
- [x] Timestamps
- [x] Prisma migrations
- [x] Prisma Studio
- [x] CRUD APIs

### Frontend

- [x] Next.js
- [x] TypeScript
- [x] Tailwind CSS
- [x] UI component library
- [x] Responsive design
- [x] Authentication UI
- [x] Product marketplace
- [x] Orders
- [x] Admin dashboard
- [x] CRUD interfaces
- [x] Loading states
- [x] Error states
- [x] Empty states
- [x] API-ready service layer

---



## Author

**Pial Uddin**

Frontend / Full Stack Developer

---
