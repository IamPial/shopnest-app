'use client';

import React, { useEffect, useState } from 'react';
import { Orders } from '../../types';
import { orderApi } from '../../services/mockApi';
import { useAuth } from '../../context/AuthContext';
import { Package, Search, Eye, X } from 'lucide-react';

export default function CustomerOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingOrder, setViewingOrder] = useState<Orders | null>(null);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      try {
        const res = await orderApi.getOrders(user?.id);
        setOrders(res);
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [user?.id]);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderItems.some((i) => i.product?.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order History</h1>
          <p className="text-sm text-slate-500 mt-1">
            View details of all your marketplace orders.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by order ID or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No orders found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You don&apos;t have any recorded orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition-all"
            >
              {/* Top Banner */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Order ID</span>
                    <span className="font-extrabold text-slate-900 text-sm">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Date Placed</span>
                    <span className="font-semibold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase">Total Amount</span>
                    <span className="font-extrabold text-slate-900 text-sm">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setViewingOrder(order)}
                  className="p-2 bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-indigo-50 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-600" /> Details
                </button>
              </div>

              {/* Items Preview */}
              <div className="p-6 space-y-4">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 border-b border-slate-50 pb-3 last:pb-0 last:border-0">
                    <div className="flex items-center gap-4">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-14 h-14 object-cover rounded-xl border border-slate-200 bg-slate-50"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          N/A
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.product?.title || 'Product'}</h4>
                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Order Details</h3>
                <p className="text-xs text-slate-500">ID: {viewingOrder.id}</p>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500">Items</h4>
              {viewingOrder.orderItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-medium text-slate-800">
                    {item.quantity}x {item.product?.title || 'Product'}
                  </span>
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
