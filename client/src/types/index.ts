export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  role: UserRole;
  orders?: Orders[];
}

export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';

export interface Products {
  id: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  categoryId: string;
  category?: Category;
  status: ProductStatus;
  orderItem?: OrderItem[];
}

// Alias for convenience across components
export type Product = Products;

export interface Category {
  id: string;
  name: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  products?: Products[];
}

export interface Orders {
  id: string;
  userId: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  orderItems: OrderItem[];
}

// Alias for convenience across components
export type Order = Orders;

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  order?: Orders;
  product?: Products;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  salesGrowthPercentage: number;
  ordersGrowthPercentage: number;
  recentOrders: Orders[];
  monthlySalesData: { month: string; sales: number; orders: number }[];
  categoryDistribution: { category: string; count: number; percentage: number }[];
}

export interface FilterOptions {
  searchQuery?: string;
  categoryId?: string;
  categoryName?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  inStockOnly?: boolean;
  sortBy?: 'newest' | 'price-asc' | 'price-desc';
}
