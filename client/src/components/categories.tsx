import { ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import getCategories from "@/lib/api/categories";



const defaultCategoryImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
];

function getCategoryBgImage(cat: any, index: number): string {
    if (cat.image || cat.imageUrl || cat.image_url || cat.bgImage) {
        return cat.image || cat.imageUrl || cat.image_url || cat.bgImage;
    }
    const nameKey = (cat.name || '').toLowerCase().trim();

    return defaultCategoryImages[index % defaultCategoryImages.length];
}

const CategorySection = async () => {
    let categories: any[] = [];
    try {
        const data = await getCategories();
        if (Array.isArray(data)) {
            categories = data;
        } else if (data?.data && Array.isArray(data.data)) {
            categories = data.data;
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Explore Product Categories
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Carefully organized collections matching our database categories.
                    </p>
                </div>
                <Link
                    href="/products"
                    className="text-sm font-bold text-indigo-300 hover:text-indigo-200 flex items-center gap-1 group"
                >
                    All Categories <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat: any, index: number) => {
                    const bgImg = getCategoryBgImage(cat, index);
                    const productCount = cat.productCount || cat._count?.products || cat.products?.length;

                    return (
                        <Link
                            key={cat.id || cat._id || index}
                            href={`/products?categoryId=${cat.id || cat._id}`}
                            className="group relative rounded-3xl overflow-hidden h-72 border border-slate-800 shadow-lg hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-between p-6"
                        >
                            {/* Background Image */}
                            <img
                                src={bgImg}
                                alt={cat.name || 'Category'}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />

                            {/* Dark Multi-layer Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/20 group-hover:via-slate-950/60 transition-colors duration-300" />

                            {/* Top Badge & Icon */}
                            <div className="relative z-10 flex items-center justify-between">
                                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white bg-slate-950/70 backdrop-blur-md rounded-full border border-slate-700/60 shadow-inner">
                                    Collection
                                </span>
                                <div className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300 shadow-md">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Bottom Content */}
                            <div className="relative z-10 text-white space-y-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5 opacity-90">
                                    <span>{productCount !== undefined ? `${productCount} Products` : 'Browse Catalog'}</span>
                                    <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform inline-block">→</span>
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategorySection;


