'use client';

import React, { useEffect, useState } from 'react';
import { Products, Category, ProductStatus } from '../../../types';
import { productApi, categoryApi } from '../../../services/mockApi';
import { Plus, Search, Edit3, Trash2, ShieldCheck, X, Check } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(10);
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState<ProductStatus>('ACTIVE');
  
  const [submitting, setSubmitting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [prodsRes, catsRes] = await Promise.all([
        productApi.getProducts(),
        categoryApi.getCategories(),
      ]);
      setProducts(prodsRes.products);
      setCategories(catsRes);
      if (catsRes.length > 0) setCategoryId(catsRes[0].id);
    } catch (err) {
      console.error('Failed to load products for admin', err);
    } finally {
      setLoading(false);
    }
  }

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitle('');
    setDescription('');
    setPrice(99.99);
    setStock(20);
    setImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
    setCategoryId(categories[0]?.id || '');
    setStatus('ACTIVE');
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Products) => {
    setEditingProduct(prod);
    setTitle(prod.title);
    setDescription(prod.description);
    setPrice(prod.price);
    setStock(prod.stock);
    setImage(prod.image || '');
    setCategoryId(prod.categoryId);
    setStatus(prod.status);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingProduct) {
        const updated = await productApi.updateProduct(editingProduct.id, {
          title,
          description,
          price: Number(price),
          stock: Number(stock),
          image,
          categoryId,
          status,
        });
        if (updated) {
          setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
          setActionNotice('Product updated successfully!');
        }
      } else {
        const created = await productApi.createProduct({
          title,
          description,
          price: Number(price),
          stock: Number(stock),
          image,
          categoryId,
          status,
        });
        setProducts((prev) => [created, ...prev]);
        setActionNotice('New product created successfully!');
      }
      setIsModalOpen(false);
      setTimeout(() => setActionNotice(null), 3000);
    } catch (err) {
      console.error('Failed to save product', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await productApi.deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setActionNotice(`Product "${name}" deleted.`);
        setTimeout(() => setActionNotice(null), 3000);
      } catch (e) {
        console.error('Failed to delete product', e);
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCatId === '' || p.categoryId === selectedCatId;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Product Management</h1>
            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin CRUD
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage product table records according to the Prisma schema.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Notice */}
      {actionNotice && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" /> {actionNotice}
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search product title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500">Category:</span>
          <select
            value={selectedCatId}
            onChange={(e) => setSelectedCatId(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      {prod.image ? (
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          Img
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{prod.title}</span>
                        <span className="text-[11px] text-slate-400 font-semibold">{prod.category?.name || 'Category'}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-900">${Number(prod.price).toFixed(2)}</td>
                    <td className="p-4 font-bold text-slate-800">{prod.stock}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 font-bold text-[10px] uppercase rounded-md border ${
                          prod.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : prod.status === 'OUT_OF_STOCK'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {prod.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-2 bg-slate-100 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.title)}
                          className="p-2 bg-slate-100 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Product Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProductStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md"
                >
                  {submitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
