const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SERVER_API || '';
  return url.replace(/\/+$/, '');
};

export const getAllProducts = async (options?: any) => {
  const baseUrl = getBaseUrl();
  try {
    if (!baseUrl) return [];
    
    let queryStr = '';
    if (options && typeof options === 'object') {
      const params = new URLSearchParams();
      if (options.categoryId) params.append('categoryId', options.categoryId);
      if (options.searchQuery) params.append('search', options.searchQuery);
      if (options.minPrice) params.append('minPrice', String(options.minPrice));
      if (options.maxPrice) params.append('maxPrice', String(options.maxPrice));
      if (options.status) params.append('status', options.status);
      if (options.sortBy) params.append('sortBy', options.sortBy);
      const str = params.toString();
      if (str) queryStr = `?${str}`;
    }

    const res = await fetch(`${baseUrl}/products${queryStr}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Products fetch failed with status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.products)) return data.products;
    return [];
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  const baseUrl = getBaseUrl();
  try {
    if (!baseUrl || !id) return null;
    const res = await fetch(`${baseUrl}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || data || null;
  } catch (error) {
    console.error(`Error in getProductById(${id}):`, error);
    return null;
  }
};

export const createProduct = async (productData: any) => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error(`Create product failed with status ${res.status}`);
    const data = await res.json();
    return data?.data || data;
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, updates: any) => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Update product failed with status ${res.status}`);
    const data = await res.json();
    return data?.data || data;
  } catch (error) {
    console.error(`Error in updateProduct(${id}):`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/products/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (error) {
    console.error(`Error in deleteProduct(${id}):`, error);
    return false;
  }
};

export default getAllProducts;