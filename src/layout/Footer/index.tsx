import { useState, useEffect, type MouseEvent } from 'react';
import { Facebook, Instagram, Youtube, Twitter, Send, MapPin, ArrowRight } from 'lucide-react';

const AnimatedFooter = () => {
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setCursorPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    const footerLinks = {
        Collection: ['Jackets', 'Men', 'Pants', 'T-shirts', 'Women'],
        Company: ['Shop', 'Contact Us', 'Coming Soon', 'FAQ & Help'],
        'Need Help': ['Changelog', 'Style Guide', 'Licensing']
    };

    const socialIcons = [
        { Icon: Facebook, label: 'Facebook' },
        { Icon: Instagram, label: 'Instagram' },
        { Icon: Youtube, label: 'YouTube' },
        { Icon: Twitter, label: 'Twitter' },
        { Icon: Send, label: 'Pinterest' }
    ];

    return (
        <footer
            className="relative min-h-screen mt-10 bg-black text-white overflow-hidden flex items-center"
            onMouseMove={handleMouseMove}
        >
            {/* Minimalistic gradient spotlight */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] transition-all duration-700 ease-out pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(163, 230, 53, 0.4) 0%, transparent 99%)',
                    left: `${cursorPos.x}%`,
                    top: `${cursorPos.y}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-lime-400/60 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${8 + Math.random() * 8}s ease-in-out infinite ${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative w-full max-w-[1800px] mx-auto px-12 py-24">
                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-32 mb-32">
                    {/* Left Section - Brand */}
                    <div
                        className="lg:col-span-5 space-y-12"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        {/* Logo with animated line */}
                        <div className="relative inline-block group">
                            <h1 className="text-[120px] font-light tracking-tighter leading-none">
                                <span className="inline-block relative">
                                    ARCHI
                                    <div className="absolute bottom-0 left-0 h-[6px] bg-lime-400 w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                                </span>
                            </h1>
                        </div>

                        <p className="text-2xl text-gray-400 leading-relaxed max-w-lg">
                            Sign up today and get <span className="text-lime-400 font-semibold">$20 off</span> your first order
                        </p>

                        {/* Newsletter Input */}
                        <div className="relative max-w-xl group/input">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full bg-transparent border-b-2 border-gray-800 focus:border-lime-400 py-6 text-xl text-white placeholder-gray-600 outline-none transition-all duration-500"
                                onKeyPress={(e) => e.key === 'Enter' && console.log('Submit:', email)}
                            />
                            <button
                                onClick={() => console.log('Submit:', email)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-lime-400 hover:bg-lime-500 text-black rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-90"
                            >
                                <ArrowRight className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-0 left-0 h-[2px] bg-lime-400 w-0 group-hover/input:w-full transition-all duration-700" />
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-6 pt-8">
                            {socialIcons.map(({ Icon, label }, i) => (
                                <button
                                    key={label}
                                    onMouseEnter={() => setHoveredSocial(i)}
                                    onMouseLeave={() => setHoveredSocial(null)}
                                    className="relative w-14 h-14 group"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`
                                    }}
                                >
                                    <div className="absolute inset-0 border border-gray-800 group-hover:border-lime-400 rounded-full transition-all duration-500" />
                                    <div className="absolute inset-0 bg-lime-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                                    <Icon className="absolute inset-0 m-auto w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-500 z-10" />
                                    {hoveredSocial === i && (
                                        <div className="absolute inset-0 border-2 border-lime-400 rounded-full animate-ping" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Links */}
                    <div
                        className="lg:col-span-7 grid md:grid-cols-3 gap-16"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                        }}
                    >
                        {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
                            <div key={title} className="space-y-8">
                                <h3 className="text-sm uppercase tracking-[0.3em] text-gray-600 font-semibold">
                                    {title}
                                </h3>
                                <ul className="space-y-5">
                                    {links.map((link, i) => (
                                        <li
                                            key={link}
                                            style={{
                                                opacity: isVisible ? 1 : 0,
                                                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                                                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + sectionIndex * 0.1 + i * 0.05}s`
                                            }}
                                        >
                                            <a
                                                href="#"
                                                className="group/link text-xl text-gray-400 hover:text-white transition-colors duration-500 relative inline-block"
                                            >
                                                {link}
                                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime-400 group-hover/link:w-full transition-all duration-500" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>



                {/* Animated Divider */}
                <div className="relative h-px mb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-900" />
                    <div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-lime-400 to-transparent"
                        style={{
                            animation: 'shimmer 2s ease-in-out infinite'
                        }}
                    />
                </div>

                {/* Bottom Bar */}
                <div
                    className="flex flex-col md:flex-row justify-between items-center gap-8"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
                    }}
                >
                    <div className="flex items-center gap-12">
                        <p className="text-gray-600 text-lg">
                            © 2025 <span className="text-white">Archi</span>
                        </p>
                        <div className="flex items-center gap-2 text-gray-600 text-lg">
                            <MapPin className="w-3 h-3" />
                            <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
                        </div>
                    </div>

                    <div className="flex gap-12">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-white text-lg transition-colors duration-500 relative group/bottom"
                        >
                            Terms & Conditions
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime-400 group-hover/bottom:w-full transition-all duration-500" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-white text-lg transition-colors duration-500 relative group/bottom"
                        >
                            Legal & Privacy
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime-400 group-hover/bottom:w-full transition-all duration-500" />
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(100px, -100px);
            opacity: 0.6;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
        </footer>
    );
};

export default AnimatedFooter;