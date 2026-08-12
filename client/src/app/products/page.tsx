'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Products, Category, FilterOptions, ProductStatus } from '../../types';
import { productApi, categoryApi } from '../../services/mockApi';
import { ProductCard } from '../../components/product/ProductCard';
import { Search, Filter, X, LayoutGrid, List, RotateCcw } from 'lucide-react';

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get('search') || '';
  const initialCatId = searchParams.get('categoryId') || '';

  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCatId);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | ''>('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await categoryApi.getCategories();
        setCategories(cats);
      } catch (e) {
        console.error('Error fetching categories', e);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      try {
        const options: FilterOptions = {
          searchQuery,
          categoryId: selectedCategoryId || undefined,
          minPrice: minPrice > 0 ? minPrice : undefined,
          maxPrice: maxPrice < 500 ? maxPrice : undefined,
          status: selectedStatus || undefined,
          inStockOnly,
          sortBy,
        };
        const res = await productApi.getProducts(options);
        setProducts(res.products);
      } catch (err) {
        console.error('Error loading products', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFiltered();
  }, [searchQuery, selectedCategoryId, minPrice, maxPrice, selectedStatus, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryId('');
    setMinPrice(0);
    setMaxPrice(500);
    setSelectedStatus('');
    setInStockOnly(false);
    setSortBy('newest');
    router.push('/products');
  };

  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery !== '' ||
      selectedCategoryId !== '' ||
      minPrice > 0 ||
      maxPrice < 500 ||
      selectedStatus !== '' ||
      inStockOnly
    );
  }, [searchQuery, selectedCategoryId, minPrice, maxPrice, selectedStatus, inStockOnly]);

  const selectedCatObj = categories.find((c) => c.id === selectedCategoryId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Marketplace Catalog</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse through our product collection powered by Prisma schema models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-indigo-50/60 border border-indigo-100 rounded-2xl">
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider mr-1">Active Filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-800 text-xs font-semibold rounded-full border border-indigo-200 shadow-xs">
              Search: &quot;{searchQuery}&quot;
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setSearchQuery('')} />
            </span>
          )}

          {selectedCatObj && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-800 text-xs font-semibold rounded-full border border-indigo-200 shadow-xs">
              Category: {selectedCatObj.name}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setSelectedCategoryId('')} />
            </span>
          )}

          {(minPrice > 0 || maxPrice < 500) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-800 text-xs font-semibold rounded-full border border-indigo-200 shadow-xs">
              Price: ${minPrice} - ${maxPrice}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => { setMinPrice(0); setMaxPrice(500); }} />
            </span>
          )}

          {selectedStatus && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-800 text-xs font-semibold rounded-full border border-indigo-200 shadow-xs">
              Status: {selectedStatus}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-rose-600" onClick={() => setSelectedStatus('')} />
            </span>
          )}

          <button
            onClick={resetFilters}
            className="ml-auto text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 underline"
          >
            <RotateCcw className="w-3 h-3" /> Reset All
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* Desktop Filter Sidebar */}
        <aside className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-600" /> Filter Options
            </h3>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-xs text-indigo-600 font-semibold hover:underline">
                Clear
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Search Title</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Category</label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategoryId('')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${selectedCategoryId === '' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <span>All Categories</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${selectedCategoryId === cat.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-slate-500">Price Range</label>
              <span className="text-xs font-semibold text-slate-700">${minPrice} - ${maxPrice}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400">Min ($)</span>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Max ($)</span>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Product Status Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-500">Product Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ProductStatus | '')}
              className="w-full px-3 py-2 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200"
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="OUT_OF_STOCK">OUT OF STOCK</option>
            </select>
          </div>

        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">

          {/* Controls Header */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              Showing <span className="text-indigo-600 font-bold">{products.length}</span> items
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No matching products found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Try adjusting your search criteria or resetting filters to discover available items.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-md hover:bg-indigo-500 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function ProductCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-medium">Loading catalog...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
