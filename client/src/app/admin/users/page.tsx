'use client';

import React, { useEffect, useState } from 'react';
import { User, UserRole } from '../../../types';
import { adminApi } from '../../../services/mockApi';
import { Search, ShieldCheck, UserCheck, Check } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await adminApi.getUsers();
      setUsers(res);
    } catch (err) {
      console.error('Failed to load users for admin', err);
    } finally {
      setLoading(false);
    }
  }

  const handleRoleToggle = async (userId: string, currentRole: UserRole) => {
    const newRole: UserRole = currentRole === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
    try {
      const updated = await adminApi.updateUserRole(userId, newRole);
      if (updated) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
        setNotice(`User ${updated.name}'s role updated to ${newRole}.`);
        setTimeout(() => setNotice(null), 3000);
      }
    } catch (err) {
      console.error('Failed to update user role', err);
    }
  };

  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Accounts</h1>
            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Account Control
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage user accounts matching the Prisma User model.
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" /> {notice}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Loading users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {usr.name[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{usr.name}</span>
                        <span className="text-[11px] text-slate-400">{usr.email}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      {new Date(usr.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </td>
                    <td className="p-4">
                      {usr.isDeleted ? (
                        <span className="px-2.5 py-1 bg-rose-50 text-rose-700 font-bold rounded-md border border-rose-200">
                          DELETED
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-200">
                          ACTIVE
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {usr.role === 'ADMIN' ? (
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-200 inline-flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> ADMIN
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200 inline-flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5" /> CUSTOMER
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRoleToggle(usr.id, usr.role)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Change to {usr.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
