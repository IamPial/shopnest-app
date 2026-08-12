'use client';

import React from 'react';
import Link from 'next/link';
import { Products } from '../../types';
import { ArrowRight, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Products;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const displayImage = product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={displayImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span
            className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md shadow-sm ${
              product.status === 'ACTIVE'
                ? 'bg-emerald-600 text-white'
                : product.status === 'OUT_OF_STOCK'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-600 text-white'
            }`}
          >
            {product.status.replace('_', ' ')}
          </span>
        </div>

        {/* Stock Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[10px] font-semibold bg-amber-500/90 text-white rounded">
            Only {product.stock} left
          </span>
        )}

        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="px-4 py-2 bg-white text-slate-900 text-xs font-semibold rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> View Details
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-semibold text-indigo-600 uppercase tracking-wider">
            {product.category?.name || 'Category'}
          </span>
          <span className="text-[10px] text-slate-400">Stock: {product.stock}</span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`} className="block group-hover:text-indigo-600 transition-colors mb-2">
          <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 mt-auto">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">${Number(product.price).toFixed(2)}</span>
            </div>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="p-2.5 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 rounded-xl transition-all font-medium text-xs flex items-center gap-1"
            title="View Product"
          >
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
