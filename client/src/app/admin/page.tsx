'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardStats } from '../../types';
import { adminApi } from '../../services/mockApi';
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await adminApi.getDashboardStats();
        setStats(res);
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold text-sm">
        Loading Marketplace Statistics...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h1>
            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Administrator
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time analytics and store performance management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-slate-800 transition-colors"
          >
            Fulfill Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Sales</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">${stats?.totalSales.toLocaleString()}</p>
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +{stats?.salesGrowthPercentage}% this month
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{stats?.totalOrders}</p>
            <p className="text-xs font-bold text-indigo-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +{stats?.ordersGrowthPercentage}% growth
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Products</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{stats?.totalProducts}</p>
            <p className="text-xs text-slate-500 mt-1">Across 4 main categories</p>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{stats?.totalUsers}</p>
            <p className="text-xs text-slate-500 mt-1">Active buyers & admins</p>
          </div>
        </div>

      </div>

      {/* Monthly Sales Breakdown Table/Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales Chart Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue Breakdown</h3>
              <p className="text-xs text-slate-500">Monthly sales performance history.</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
              2026 Financial Year
            </span>
          </div>

          {/* Simulated Bar Chart */}
          <div className="space-y-4 pt-2">
            {stats?.monthlySalesData.map((m) => {
              const maxVal = 12000;
              const percent = Math.round((m.sales / maxVal) * 100);
              return (
                <div key={m.month} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{m.month}</span>
                    <span className="text-slate-900 font-bold">${m.sales.toLocaleString()} ({m.orders} orders)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Share & Quick Links */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
            Category Share
          </h3>

          <div className="space-y-4">
            {stats?.categoryDistribution.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{cat.category}</span>
                  <span className="font-bold text-slate-900">{cat.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-900 h-full rounded-full"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400">Quick Navigation</h4>
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-bold text-slate-800 hover:text-indigo-600 transition-colors"
            >
              <span>Product Inventory Table</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-bold text-slate-800 hover:text-indigo-600 transition-colors"
            >
              <span>Manage Marketplace Orders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-bold text-slate-800 hover:text-indigo-600 transition-colors"
            >
              <span>Marketplace User Accounts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
