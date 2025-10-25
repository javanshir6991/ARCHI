import { useState, useEffect, type ChangeEvent } from 'react';
import { Search, ShoppingBag, ChevronRight, Menu, User, Heart, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'

const STRAPI_BASE = (import.meta as any).env?.VITE_STRAPI_URL || 'http://localhost:1337'

type StrapiItem = { id: number; attributes?: any;[key: string]: any }
type StrapiResponse = { data: StrapiItem[] }

function SearchResultsDropdown({ query, visible }: { query: string; visible: boolean }) {
    const { data, isLoading } = useQuery<StrapiResponse, Error>({
        queryKey: ['search', query],
        queryFn: async () => {
            const url = `${STRAPI_BASE.replace(/\/$/, '')}/api/products?populate=image&filters[title][$containsi]=${encodeURIComponent(query)}`
            const res = await fetch(url)
            if (!res.ok) throw new Error('Search failed')
            return res.json()
        },
        enabled: visible && query.length > 0,
    })

    if (!visible) return null

    const items: StrapiItem[] = (data as StrapiResponse | undefined)?.data ?? []

    return (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md max-h-80 overflow-auto z-50">
            {isLoading && <div className="p-4 text-sm text-gray-600">Searching...</div>}
            {!isLoading && items.length === 0 && (
                <div className="p-4 text-sm text-gray-600">No results</div>
            )}
            <ul>
                {items.map((p: StrapiItem) => {
                    const attrs = p.attributes ?? p
                    const title = attrs.title ?? 'Untitled'
                    const price = attrs.price ?? ''
                    return (
                        <li
                            key={p.id}
                            onMouseDown={(e) => e.preventDefault()} /* prevent input blur */
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-800">{title}</div>
                                <div className="text-sm font-semibold text-gray-700">{price ? `$${price}` : ''}</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default function ArchiHeader() {
    const [cartCount] = useState(3);
    const [searchFocused, setSearchFocused] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')

    // debounce the search input to avoid spamming the API
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(query.trim()), 300)
        return () => clearTimeout(t)
    }, [query])

    return (
        <div className="w-full">
            <div className="bg-linear-to-r from-neutral-950 via-emerald-800 to-neutral-950 text-white hidden lg:block">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 lg:py-6">
                    <div className="flex items-center justify-between text-sm lg:text-xl">
                        <div className="flex items-center gap-2 lg:gap-4">
                            <span className="text-xs lg:text-xl">Free Delivery on orders over $80. Don't miss discount.</span>
                            <button className="hidden sm:flex items-center gap-1.5 bg-white/15 hover:bg-white/25  transition-all duration-300 px-3 lg:px-4 py-1.5 rounded-full text-xs lg:text-base font-medium backdrop-blur-sm">
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

                        <div className="flex items-center shrink-0 h-14 mr-3 w-32 lg:w-45">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 135.466 38.189"><title>Archi</title><path d="M31.6,25.834V63.59H26.776V41.014H17.523L1.436,63.59H0L26.776,25.834ZM26.761,28.2l-8.376,11.54h8.376Zm19.768-2.365q9.528.647,9.528,7.57T46.529,41.02L62.45,63.59H61.017L45.428,41.977V63.59h-4.8V25.834Zm-.962,1.1V39.772q5.241,0,5.241-6.42T45.567,26.933Zm39.077-1.122a23.226,23.226,0,0,1,11.672,3.082v1.789a16.29,16.29,0,0,0-10.794-4.135c-9.435,0-17.083,8.232-17.083,18.386S76.087,63.32,85.522,63.32a16.29,16.29,0,0,0,10.794-4.135v1.732A23.226,23.226,0,0,1,84.644,64c-11.829,0-21.418-8.549-21.418-19.095S72.815,25.811,84.644,25.811Zm17.961,0h5.1V39.74h9.172V25.811h4.858V63.32h-4.858V40.961H107.7V63.32h-5.1Zm27.962,0h4.9V63.32h-4.9Z" transform="translate(0 -25.811)" fill-rule="evenodd"></path></svg>
                        </div>

                        <div className="hidden lg:flex flex-1">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <Search className={`transition-colors duration-200 ${searchFocused ? 'text-emerald-600' : 'text-gray-400'}`} size={24} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={query}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                                    className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white rounded-full py-3 pl-14 pr-4 text-base lg:text-lg text-neutral-700 border border-transparent focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                />

                                {/* Search results dropdown */}
                                <SearchResultsDropdown
                                    query={debouncedQuery}
                                    visible={searchFocused && debouncedQuery.length > 0}
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