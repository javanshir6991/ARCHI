import React, { useState } from 'react';
import { Search, ShoppingBag, ChevronRight, Menu, User, Heart, X } from 'lucide-react';

export default function ArchiHeader() {
    const [cartCount] = useState(3);
    const [searchFocused, setSearchFocused] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
        <div className="w-full shadow-sm">
            <div className="bg-gradient-to-r from-neutral-950 via-emerald-800 to-neutral-950 text-white hidden lg:block">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 lg:py-6">
                    <div className="flex items-center justify-between text-sm lg:text-xl">
                        <div className="flex items-center gap-2 lg:gap-4">
                            <span className="text-xs lg:text-xl">Free Delivery on orders over $80. Don't miss discount.</span>
                            <button className="hidden sm:flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-all duration-300 px-3 lg:px-4 py-1.5 rounded-full text-xs lg:text-base font-medium backdrop-blur-sm">
                                Shop Now
                                <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className="hidden md:flex items-center gap-4 lg:gap-8 text-xs lg:text-xl">
                            <button className="hover:text-emerald-200 transition-colors">Contact Us</button>
                            <button className="hover:text-emerald-200 transition-colors">FAQs</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 lg:py-5">
                    <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <div className="flex items-center flex-shrink-0">
                            <img className='w-43' src="https://logomakerr.ai/blog/wp-content/uploads/2022/08/2019-to-Present-Zara-logo-design.jpg" alt="" />
                        </div>

                        <div className="hidden lg:flex flex-1">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <Search className={`transition-colors duration-200 ${searchFocused ? 'text-emerald-600' : 'text-gray-400'}`} size={24} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white rounded-full py-3 pl-14 pr-4 text-base lg:text-lg text-neutral-700 border border-transparent focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Search size={22} className="text-gray-700" />
                        </button>

                        <div className="flex items-center gap-1 sm:gap-2">
                            <button className="hidden sm:block p-2 lg:p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200 group">
                                <User className="text-gray-700 group-hover:text-emerald-700" size={28} />
                            </button>

                            <button className="hidden md:block p-2 lg:p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200 group">
                                <Heart className="text-gray-700 group-hover:text-red-500" size={28} />
                            </button>

                            <button className="relative p-2 lg:p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200 group">
                                <ShoppingBag className="text-gray-700 group-hover:text-emerald-700" size={28} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-md">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {mobileSearchOpen && (
                        <div className="lg:hidden mt-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <Search className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white rounded-full py-3 pl-12 pr-4 text-sm text-neutral-700 border border-transparent focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMobileMenuOpen(false)}>
                    <div className="bg-white w-80 h-full p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Menu</h2>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="space-y-4">
                            <a href="#" className="block py-3 text-base font-medium text-gray-700 hover:text-emerald-700 border-b border-gray-100">New Arrivals</a>
                            <a href="#" className="block py-3 text-base font-medium text-gray-700 hover:text-emerald-700 border-b border-gray-100">Best Sellers</a>
                            <a href="#" className="block py-3 text-base font-medium text-gray-700 hover:text-emerald-700 border-b border-gray-100">Living Room</a>
                            <a href="#" className="block py-3 text-base font-medium text-gray-700 hover:text-emerald-700 border-b border-gray-100">Bedroom</a>
                            <a href="#" className="block py-3 text-base font-medium text-gray-700 hover:text-emerald-700 border-b border-gray-100">Office</a>
                            <a href="#" className="block py-3 text-base font-medium text-emerald-700 hover:text-emerald-800 border-b border-gray-100">Sale</a>
                            <div className="pt-4 space-y-3">
                                <a href="#" className="block py-2 text-sm text-gray-600 hover:text-emerald-700">Contact Us</a>
                                <a href="#" className="block py-2 text-sm text-gray-600 hover:text-emerald-700">FAQs</a>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}