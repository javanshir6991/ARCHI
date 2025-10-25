import React from 'react';
import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react';

export default function HeroBanner() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[650px] py-12 lg:py-0">
                        {/* Left Content */}
                        <div className="relative z-10 order-2 lg:order-1">
                            <span className="inline-block bg-gradient-to-r from-lime-300 to-emerald-300 text-black text-xl font-semibold px-6 py-2.5 rounded-full mb-6 shadow-lg">
                                New Trend 2025
                            </span>
                            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold text-gray-900 leading-none mb-6">
                                Waves Puffer
                            </h1>
                            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-semibold text-gray-900 leading-none mb-8">
                                Coat <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-emerald-600">Black</span>
                            </h2>

                            <button className="inline-block bg-blend-saturation mt-6 hover:bg-emerald-700 text-black hover:text-white font-semibold px-27 py-5 rounded-full border-2 border-gray-900 hover:border-emerald-700 transition-all duration-300 text-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                                Shop Now
                            </button>
                        </div>

                        {/* Right Image */}
                        <div className="relative order-1 lg:order-2 h-[450px] sm:h-[550px] lg:h-[650px]">
                            <img src="https://cdn.prod.website-files.com/68519fc02007af8091e4b3e4/6851a088716aed66e8280f34_hero-image.webp" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-8 lg:py-12 border-t border-gray-200">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Free Shipping */}
                        <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                                    <Truck className="w-7 h-7 text-emerald-700" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Free Shipping</h3>
                                <p className="text-sm text-gray-600">Free Shipping for orders over $80</p>
                            </div>
                        </div>

                        {/* Money Back Guarantee */}
                        <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center relative group-hover:shadow-lg transition-shadow">
                                    <RotateCcw className="w-7 h-7 text-emerald-700" />
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center shadow-md">
                                        <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Money Back guarantee</h3>
                                <p className="text-sm text-gray-600">100% money back guarantee</p>
                            </div>
                        </div>

                        {/* 24/7 Online Support */}
                        <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center relative group-hover:shadow-lg transition-shadow">
                                    <Headphones className="w-7 h-7 text-emerald-700" />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-lime-400 rounded-full animate-pulse shadow-md"></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">24/7 online support</h3>
                                <p className="text-sm text-gray-600">24 hours a day, 7 days a week</p>
                            </div>
                        </div>

                        {/* Flexible Payment */}
                        <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                                    <CreditCard className="w-7 h-7 text-emerald-700" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Flexible Payment</h3>
                                <p className="text-sm text-gray-600">Pay with Multiple Credit Cards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}} />
        </div>
    );
}