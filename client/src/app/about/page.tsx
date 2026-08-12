'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Award, Users, HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase mx-auto">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Our Story & Mission
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-3xl mx-auto">
            Empowering Tech Lovers With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Curated Gear</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            ShopNest was founded with a singular purpose: to connect technology enthusiasts with authentic, high-performance audio, wearables, and computing products through a seamless online experience.
          </p>

          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all text-sm"
            >
              Explore Products Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-indigo-600">50K+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Satisfied Buyers</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-indigo-600">100%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality Inspected</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-indigo-600">4.9 ★</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Rating</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl sm:text-4xl font-black text-indigo-600">24/7</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Customer Care</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Principles</h2>
          <p className="text-sm text-slate-500">Built on trust, speed, and obsessive attention to product detail.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-indigo-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Authenticity First</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every item in our inventory is sourced from authorized distributors, guaranteeing original quality, serial registration, and full factory warranty.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-indigo-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Curated Excellence</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We don&apos;t list thousands of low-grade gadgets. We selectively feature products that pass our rigorous sound quality, ergonomics, and durability tests.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-indigo-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Customer Obsession</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From fast nationwide dispatch to 30-day effortless returns, our dedicated support team ensures every purchase exceeds your expectations.
            </p>
          </div>

        </div>
      </section>

      {/* Brand Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Our Vision</span>
            <h3 className="text-3xl font-extrabold text-white leading-tight">
              Building the Future of Modern Product Marketplaces
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              At ShopNest, we believe online shopping should be intuitive, transparent, and enjoyable. Our platform integrates clean TypeScript architecture, crisp UI aesthetics, and instant order tracking.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-44 h-44 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShoppingBag className="w-20 h-20" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
