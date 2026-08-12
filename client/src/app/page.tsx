'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Products, Category } from '../types';
import { productApi, categoryApi } from '../services/mockApi';
import { ProductCard } from '../components/product/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Headphones, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          categoryApi.getCategories(),
          productApi.getProducts(),
        ]);
        setCategories(cats);
        setAllProducts(prods.products);
      } catch (err) {
        console.error('Failed to load home page data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categoryImages: Record<string, string> = {
    'Electronics & Audio': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'Smart Devices': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'Computing & Gaming': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'Lifestyle & Accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Next-Gen Product Marketplace
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Discover Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Tech & Gear</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                ShopNest connects discerning customers with top-tier audio, smart wearables, and gaming hardware. High performance guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  Explore Marketplace <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-extrabold text-white">100%</p>
                  <p className="text-xs text-slate-400">Verified Quality</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">Active</p>
                  <p className="text-xs text-slate-400">Prisma Schema</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">24/7</p>
                  <p className="text-xs text-slate-400">Customer Support</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
                  alt="AuraSound Headphones"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-indigo-400 uppercase">Featured Marketplace Item</span>
                      <h4 className="text-lg font-bold text-white">AuraSound Pro ANC</h4>
                    </div>
                    <span className="text-xl font-black text-white">$249.99</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Product Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Carefully organized collections matching our database categories.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            All Categories <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const bgImg = categoryImages[cat.name] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
            return (
              <Link
                key={cat.id}
                href={`/products?categoryId=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden h-64 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
              >
                <img
                  src={bgImg}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Handpicked Selection</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Active Products
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            View Full Catalog <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Marketplace Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-indigo-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-80 h-80 bg-indigo-600/30 rounded-full blur-2xl" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Why Shop With ShopNest Marketplace?
            </h3>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Every item listed on ShopNest undergoes strict quality inspection. Powered by TypeScript & Prisma PostgreSQL ready schema architecture.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-white">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-800/80 border border-indigo-700">
                <ShieldCheck className="w-4 h-4 text-indigo-300" /> Authenticity Guaranteed
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-800/80 border border-indigo-700">
                <Truck className="w-4 h-4 text-indigo-300" /> Fast Shipping
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-800/80 border border-indigo-700">
                <Headphones className="w-4 h-4 text-indigo-300" /> Dedicated Help
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
