import React, { useState, useEffect } from 'react';

const CollectionCards = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const collections = [
        {
            id: 'men',
            title: "Men's",
            subtitle: "Collection",
            image: "https://i.pinimg.com/736x/d1/91/2c/d1912c968d82e414442e440dbe4aafb5.jpg",
            bgColor: "bg-[#010101]",
            accentColor: "lime"
        },
        {
            id: 'women',
            title: "Women's",
            subtitle: "Collection",
            image: "https://i.pinimg.com/originals/65/7b/a5/657ba5fe69343668d8bb48d3e30022d2.jpg",
            bgColor: "bg-[#efefef]",
            accentColor: "red-800",
            textColor: "text-gray-900"
        }
    ];


    return (
        <>
            <hr />
            <div className="min-h-screen bg-white flex items-center justify-center  sm:p-6 lg:p-12">
                <div className="w-full max-w-[1600px]">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {collections.map((collection, index) => (
                            <div
                                key={collection.id}
                                className="group relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] h-160 cursor-pointer"
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                                }}
                            >
                                {/* Background */}
                                <div className={`absolute inset-0 ${collection.bgColor} transition-transform duration-700 group-hover:scale-105`} />

                                {/* Decorative Elements */}
                                <svg
                                    className="absolute inset-0 w-full h-full opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Top wavy line */}
                                    <path
                                        d={`M ${collection.id === 'men' ? '20' : '650'} 100 Q ${collection.id === 'men' ? '100' : '550'} 150, ${collection.id === 'men' ? '150' : '500'} 180`}
                                        stroke={collection.accentColor === 'lime' ? '#a3e635' : '#1f2937'}
                                        strokeWidth="2"
                                        fill="none"
                                        className="animate-[draw_2s_ease-in-out_infinite]"
                                    />
                                    {/* Bottom circular arc */}
                                    <path
                                        d={`M ${collection.id === 'men' ? '20' : '50'} 450 Q ${collection.id === 'men' ? '80' : '200'} 520, ${collection.id === 'men' ? '150' : '350'} 500`}
                                        stroke={collection.accentColor === 'lime' ? '#a3e635' : '#1f2937'}
                                        strokeWidth="2"
                                        fill="none"
                                        className="animate-[draw_2s_ease-in-out_infinite_0.5s]"
                                    />
                                    {/* Corner decorative line */}
                                    <path
                                        d={`M ${collection.id === 'men' ? '650' : '650'} 50 Q 700 100, 720 150`}
                                        stroke={collection.accentColor === 'lime' ? '#a3e635' : '#1f2937'}
                                        strokeWidth="2"
                                        fill="none"
                                        className="animate-[draw_2s_ease-in-out_infinite_1s]"
                                    />
                                </svg>

                                {/* Sparkle decorations */}
                                <div
                                    className={`absolute ${collection.id === 'men' ? 'top-32 left-52' : 'top-80 left-1/2'} transition-all duration-300 ${hoveredCard === collection.id ? 'scale-125 rotate-180' : 'scale-100'
                                        }`}
                                    style={{
                                        animation: `float 3s ease-in-out infinite ${index * 0.5}s`
                                    }}
                                >
                                    <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
                                        <path
                                            d="M20 0 L22 18 L40 20 L22 22 L20 40 L18 22 L0 20 L18 18 Z"
                                            fill={collection.accentColor === 'lime' ? '#a3e635' : '#1f2937'}
                                        />
                                    </svg>
                                </div>

                                {/* Model Image */}
                                <div className="absolute right-0 top-0 w-3/5 h-full overflow-hidden">
                                    <img
                                        src={collection.image}
                                        alt={`${collection.title} ${collection.subtitle}`}
                                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 lg:p-14">
                                    <div className="space-y-2">
                                        <h2
                                            className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${collection.textColor || 'text-white'
                                                } transition-all duration-300 ${hoveredCard === collection.id ? 'translate-x-2' : ''
                                                }`}
                                            style={{
                                                animation: `slideInLeft 0.6s ease-out ${index * 0.2 + 0.2}s both`
                                            }}
                                        >
                                            {collection.title}
                                        </h2>
                                        <h3
                                            className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${collection.textColor || 'text-white'
                                                } transition-all duration-300 ${hoveredCard === collection.id ? 'translate-x-2' : ''
                                                }`}
                                            style={{
                                                animation: `slideInLeft 0.6s ease-out ${index * 0.2 + 0.3}s both`
                                            }}
                                        >
                                            {collection.subtitle}
                                        </h3>
                                    </div>

                                    {/* Shop Now Button */}
                                    <button
                                        className={`relative group/btn w-fit px-8 sm:px-10 py-4 sm:py-5 rounded-full border-2 ${collection.textColor
                                            ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-black'
                                            : 'border-white text-gray-200 hover:bg-white hover:text-gray-900'
                                            } text-lg sm:text-xl font-medium transition-all duration-300 overflow-hidden ${hoveredCard === collection.id ? 'scale-105 shadow-2xl' : ''
                                            }`}
                                        style={{
                                            animation: `slideInLeft 0.6s ease-out ${index * 0.2 + 0.4}s both`
                                        }}
                                    >
                                        <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                                            Shop Now
                                        </span>
                                        <div className="absolute inset-0 w-0 bg-white group-hover/btn:w-full transition-all duration-500 ease-out" />
                                    </button>
                                </div>

                                {/* Hover overlay effect */}
                                {hoveredCard === collection.id && (
                                    <div
                                        className="absolute w-96 h-96 rounded-full pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle, ${collection.accentColor === 'lime'
                                                ? 'rgba(163, 230, 53, 0.1)'
                                                : 'rgba(255, 255, 255, 0.05)'
                                                } 0%, transparent 70%)`,
                                            left: mousePosition.x - 192,
                                            top: mousePosition.y - 192,
                                            transition: 'left 0.3s, top 0.3s'
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes draw {
          0%, 100% {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
          }
          50% {
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
          }
        }
        
        .group/btn:hover .absolute {
          background: currentColor;
        }
      `}</style>
            </div>
        </>
    );
};

export default CollectionCards;