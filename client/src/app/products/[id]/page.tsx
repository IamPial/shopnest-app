'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Products } from '../../../types';
import { productApi } from '../../../services/mockApi';
import { ProductCard } from '../../../components/product/ProductCard';
import { ShieldCheck, Truck, RefreshCw, ChevronLeft } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState<Products | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const prod = await productApi.getProductById(productId);
        if (prod) {
          setProduct(prod);
          const allProds = await productApi.getProducts({ categoryId: prod.categoryId });
          setRelatedProducts(allProds.products.filter((p) => p.id !== prod.id).slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load product details', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 font-semibold text-sm">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-slate-500 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const displayImage = product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-[200px]">{product.title}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={displayImage}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            <span
              className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase rounded-md shadow-md text-white ${
                product.status === 'ACTIVE' ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            >
              {product.status}
            </span>
          </div>
        </div>

        {/* Info & Pricing */}
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-lg border border-indigo-100">
              Category: {product.category?.name || 'General'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {product.title}
          </h1>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">${Number(product.price).toFixed(2)}</span>
            {product.stock > 0 ? (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                In Stock ({product.stock} units available)
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-md border border-rose-200">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-indigo-600" /> Free Dispatch
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> Verified Quality
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-indigo-600" /> 30-Day Returns
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Similar Category Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
