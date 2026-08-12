import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Navbar } from '../components/common/Navbar';
import Footer from '@/components/common/Footer';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopNest — Modern Product Marketplace',
  description: 'ShopNest is a modern e-commerce marketplace for electronics, wearables, audio, and gaming gear.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
