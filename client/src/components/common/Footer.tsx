"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { SlSocialLinkedin } from "react-icons/sl";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo & Info Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex gap-2 items-center group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Shop<span className="text-indigo-400">Nest</span>
              </h1>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover and buy premium tech gear, electronics, smart audio, and gadgets. Built for technology enthusiasts, creators, and modern online shoppers.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm font-medium text-slate-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">
              Social Links
            </h2>
            <div className="flex flex-wrap gap-3 text-white">
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button
                  isIconOnly
                  className="bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-all min-w-10 h-10 flex items-center justify-center"
                >
                  <LuFacebook className="text-lg" />
                </Button>
              </Link>
              <Link href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button
                  isIconOnly
                  className="bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-all min-w-10 h-10 flex items-center justify-center"
                >
                  <FaXTwitter className="text-lg" />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button
                  isIconOnly
                  className="bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-all min-w-10 h-10 flex items-center justify-center"
                >
                  <SlSocialLinkedin className="text-lg" />
                </Button>
              </Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button
                  isIconOnly
                  className="bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-all min-w-10 h-10 flex items-center justify-center"
                >
                  <LuInstagram className="text-lg" />
                </Button>
              </Link>
            </div>
            <div className="mt-5 text-xs text-slate-400 space-y-1">
              <p>+880 1786 901 1622</p>
              <p>info@shopnest.com</p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
              Newsletter
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get latest updates and product availability notifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full items-stretch">
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-lg bg-slate-800 border border-slate-700 text-white text-xs px-3.5 py-2.5 w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors placeholder:text-slate-500"
              />
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg px-5 h-10 text-xs transition-colors shadow-sm shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 ShopNest. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-300 hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-300 hover:underline transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
