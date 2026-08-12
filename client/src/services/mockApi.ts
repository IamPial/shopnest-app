import { Products, Category, User, Orders, DashboardStats, FilterOptions, UserRole, ProductStatus } from '../types';
import { mockProducts, mockCategories, mockUsers, mockOrders, mockDashboardStats } from '../mock/mockData';

const DELAY = 150;
const delay = (ms: number = DELAY) => new Promise((resolve) => setTimeout(resolve, ms));

let productsStore: Products[] = [...mockProducts];
let ordersStore: Orders[] = [...mockOrders];
let usersStore: User[] = [...mockUsers];
let categoriesStore: Category[] = [...mockCategories];

export const productApi = {
  async getProducts(options?: FilterOptions): Promise<{ products: Products[]; total: number }> {
    await delay();
    let result = productsStore.filter((p) => !p.isDeleted);

    if (options?.searchQuery) {
      const q = options.searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (options?.categoryId) {
      result = result.filter((p) => p.categoryId === options.categoryId);
    } else if (options?.categoryName) {
      const cat = categoriesStore.find((c) => c.name.toLowerCase() === options.categoryName?.toLowerCase());
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
    }

    if (options?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (options.minPrice || 0));
    }

    if (options?.maxPrice !== undefined && options.maxPrice > 0) {
      result = result.filter((p) => p.price <= (options.maxPrice || 10000));
    }

    if (options?.status) {
      result = result.filter((p) => p.status === options.status);
    }

    if (options?.inStockOnly) {
      result = result.filter((p) => p.stock > 0 && p.status === 'ACTIVE');
    }

    if (options?.sortBy) {
      switch (options.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
        default:
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return { products: result, total: result.length };
  },

  async getProductById(id: string): Promise<Products | null> {
    await delay();
    return productsStore.find((p) => p.id === id && !p.isDeleted) || null;
  },

  async createProduct(productData: Omit<Products, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>): Promise<Products> {
    await delay();
    const now = new Date().toISOString();
    const cat = categoriesStore.find((c) => c.id === productData.categoryId);
    const newProduct: Products = {
      ...productData,
      id: `prod-${Date.now()}`,
      category: cat,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
    };
    productsStore.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Products>): Promise<Products | null> {
    await delay();
    const index = productsStore.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const now = new Date().toISOString();
    productsStore[index] = { ...productsStore[index], ...updates, updatedAt: now };
    return productsStore[index];
  },

  async deleteProduct(id: string): Promise<boolean> {
    await delay();
    const index = productsStore.findIndex((p) => p.id === id);
    if (index === -1) return false;
    productsStore[index].isDeleted = true;
    productsStore[index].updatedAt = new Date().toISOString();
    return true;
  },
};

export const categoryApi = {
  async getCategories(): Promise<Category[]> {
    await delay();
    return categoriesStore.filter((c) => !c.isDelete);
  },
};

export const orderApi = {
  async getOrders(userId?: string): Promise<Orders[]> {
    await delay();
    if (userId) {
      return ordersStore.filter((o) => o.userId === userId);
    }
    return ordersStore;
  },

  async getOrderById(id: string): Promise<Orders | null> {
    await delay();
    return ordersStore.find((o) => o.id === id) || null;
  },

  async createOrder(userId: string, items: { productId: string; quantity: number }[]): Promise<Orders> {
    await delay();
    const now = new Date().toISOString();
    const orderId = `ord-${Date.now()}`;
    const user = usersStore.find((u) => u.id === userId);

    let total = 0;
    const orderItems = items.map((item, idx) => {
      const prod = productsStore.find((p) => p.id === item.productId);
      const price = prod ? prod.price : 0;
      total += price * item.quantity;
      return {
        id: `oi-${Date.now()}-${idx}`,
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price,
        product: prod,
        createdAt: now,
        updatedAt: now,
      };
    });

    const newOrder: Orders = {
      id: orderId,
      userId,
      totalAmount: Math.round(total * 100) / 100,
      createdAt: now,
      updatedAt: now,
      user,
      orderItems,
    };

    ordersStore.unshift(newOrder);
    return newOrder;
  },
};

export const adminApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    await delay();
    const totalSales = ordersStore.reduce((acc, o) => acc + o.totalAmount, 0);
    return {
      ...mockDashboardStats,
      totalSales: Math.round(totalSales * 100) / 100,
      totalOrders: ordersStore.length,
      totalProducts: productsStore.filter((p) => !p.isDeleted).length,
      recentOrders: ordersStore.slice(0, 5),
    };
  },

  async getUsers(): Promise<User[]> {
    await delay();
    return usersStore.filter((u) => !u.isDeleted);
  },

  async updateUserRole(userId: string, role: UserRole): Promise<User | null> {
    await delay();
    const user = usersStore.find((u) => u.id === userId);
    if (!user) return null;
    user.role = role;
    user.updatedAt = new Date().toISOString();
    return user;
  },
};
