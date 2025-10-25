import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ReviewsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const testimonials = [
        {
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
            rating: 4,
            title: "I Love This Store",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nisl ipsum, porttitor ut massa sit amet, pharetra ultricies tortor. Nam hendrerit aliquam nisl, at maximus enim rhoncus ac. Fusce sed leo porttitor, finibus lacus sed, fringilla nunc.",
            name: "Brooklyn",
            location: "Lorem ipsum dolor sit amet"
        },
        {
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
            rating: 5,
            title: "Amazing Experience",
            review: "Exceptional quality and outstanding service! The attention to detail is remarkable, and the team went above and beyond to ensure my satisfaction. I couldn't be happier with my purchase.",
            name: "Marcus",
            location: "New York City"
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
            rating: 5,
            title: "Highly Recommended",
            review: "From start to finish, everything was perfect. The product exceeded my expectations and the customer service was top-notch. Will definitely be coming back!",
            name: "Sarah",
            location: "Los Angeles"
        }
    ];

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const current = testimonials[currentIndex];

    return (
        <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-[1600px]">
                <p className='mx-auto text-center rounded-full text-xl py-1 bg-lime-400/50 w-[230px]'>Testimonials</p>
                <h1 className='text-center text-6xl mt-3 mb-26 font-semibold'>What People Are Saying</h1>
                <div className="bg-white   overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Image Section */}
                        <div className="relative h-64 sm:h-80 lg:h-auto rounded-3xl overflow-hidden bg-gray-100">
                            <div
                                key={currentIndex}
                                className="absolute inset-0 animate-[fadeIn_0.5s_ease-in-out]"
                            >
                                <img
                                    src={current.image}
                                    alt={current.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between">
                            <div
                                key={`content-${currentIndex}`}
                                className="animate-[slideUp_0.5s_ease-out]"
                            >
                                {/* Star Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${i < current.rating
                                                ? 'fill-lime-400 text-lime-400'
                                                : 'fill-gray-200 text-gray-200'
                                                }`}
                                            style={{
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                    "{current.title}"
                                </h2>

                                {/* Review Text */}
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                                    "{current.review}"
                                </p>

                                {/* Divider */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

                                {/* Author Info */}
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {current.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        {current.location}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={handlePrev}
                                    disabled={isAnimating}
                                    className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 transition-all duration-300 disabled:opacity-50"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-white transition-colors" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={isAnimating}
                                    className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-900 transition-all duration-300 disabled:opacity-50"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (!isAnimating && index !== currentIndex) {
                                    setIsAnimating(true);
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsAnimating(false), 500);
                                }
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-8 bg-gray-900'
                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default ReviewsSection;