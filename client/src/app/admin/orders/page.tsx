'use client';

import React, { useEffect, useState } from 'react';
import { Orders } from '../../../types';
import { orderApi } from '../../../services/mockApi';
import { Search, ShieldCheck, Eye, X } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingOrder, setViewingOrder] = useState<Orders | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    try {
      const res = await orderApi.getOrders();
      setOrders(res);
    } catch (err) {
      console.error('Failed to load orders for admin', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.user?.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Marketplace Orders</h1>
            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Prisma Orders Model
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review customer marketplace orders and line items.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by order ID or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Loading orders...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <span className="font-extrabold text-slate-900 text-sm">{ord.id}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{ord.user?.name || 'Customer'}</span>
                      <span className="text-[11px] text-slate-400">{ord.user?.email || 'N/A'}</span>
                    </td>
                    <td className="p-4 font-black text-slate-900">${ord.totalAmount.toFixed(2)}</td>
                    <td className="p-4 text-slate-600">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setViewingOrder(ord)}
                        className="p-2 bg-slate-100 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-semibold flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-4 h-4 text-indigo-600" /> Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Order ID: {viewingOrder.id}</h3>
                <p className="text-xs text-slate-500">
                  User: {viewingOrder.user?.name} ({viewingOrder.user?.email})
                </p>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500">Order Items</h4>
              {viewingOrder.orderItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {item.product?.image && (
                      <img src={item.product.image} alt={item.product.title} className="w-10 h-10 object-cover rounded-lg" />
                    )}
                    <div>
                      <span className="font-bold text-slate-900 block">{item.product?.title}</span>
                      <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between font-black text-slate-900 text-sm">
              <span>Total Amount</span>
              <span>${viewingOrder.totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewingOrder(null)}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
