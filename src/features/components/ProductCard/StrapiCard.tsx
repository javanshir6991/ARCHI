import { useQuery } from '@tanstack/react-query'
import { ShoppingBag } from 'lucide-react'

type StrapiItem = {
    id: number
    attributes?: any
    [key: string]: any
}

type StrapiResponse = {
    data: StrapiItem[]
}

const STRAPI_BASE = (import.meta as any).env?.VITE_STRAPI_URL || 'http://localhost:1337'

const fetchProducts = async (): Promise<StrapiResponse> => {
    const base = STRAPI_BASE
    const url = `${base.replace(/\/$/, '')}/api/products?populate=image`
    const res = await fetch(url)
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText} ${text}`)
    }
    return res.json()
}

const StrapiCard = () => {
    const { data, isLoading, isError, error } = useQuery<StrapiResponse, Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-400 text-lg">
                Loading products...
            </div>
        )

    if (isError)
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="p-6 text-red-400 bg-white rounded-lg border border-red-200 max-w-lg">
                    Error loading products: {error?.message ?? 'Unknown error'}
                </div>
            </div>
        )

    const products: StrapiItem[] = data?.data ?? []

    return (
        <div className="min-h-screen py-10 max-w-[1600px] mx-auto ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => {
                    const attrs = p.attributes ?? p
                    const title = attrs.title ?? 'No title'
                    const price = Number(attrs.price) || 0
                    const oldPrice = Number(attrs.oldPrice) || price * 1.3

                    let imageUrl: string | undefined
                    if (attrs.image?.data?.attributes?.url) imageUrl = attrs.image.data.attributes.url
                    else if (Array.isArray(attrs.image?.data) && attrs.image.data[0]?.attributes?.url)
                        imageUrl = attrs.image.data[0].attributes.url
                    else if (attrs.image?.attributes?.url) imageUrl = attrs.image.attributes.url
                    else if (attrs.image?.url) imageUrl = attrs.image.url

                    const src = imageUrl
                        ? imageUrl.startsWith('http')
                            ? imageUrl
                            : `${STRAPI_BASE.replace(/\/$/, '')}${imageUrl}`
                        : undefined

                    return (
                        <div
                            key={p.id}
                            className="group relative bg-zinc-950 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/20 rounded-4xl"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                transition: 'all 0.5s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(163, 230, 53, 0.4)'
                                e.currentTarget.style.transform = 'translateY(-4px)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        >
                            {/* Animated gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/0 via-lime-500/0 to-lime-500/0 group-hover:from-lime-500/5 group-hover:via-transparent group-hover:to-lime-500/5 transition-all duration-700 pointer-events-none" />

                            {src && (
                                <div className="relative h-110 overflow-hidden bg-zinc-900">
                                    <img
                                        src={src}
                                        alt={title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 filter grayscale-0 group-hover:brightness-110"
                                    />

                                    {/* Dark overlay that fades on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

                                    {/* Animated line effect */}
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                </div>
                            )}

                            <div className="relative p-6 space-y-4 bg-gradient-to-b from-black to-zinc-900">
                                <h3 className="text-2xl font-semibold text-white tracking-wide group-hover:text-lime-400 transition-colors duration-300">
                                    {title}
                                </h3>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-light text-white">
                                            ${price.toFixed(2)}
                                        </span>
                                        <span className="text-xl text-gray-600 line-through">
                                            ${oldPrice.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Animated cart button */}
                                    <button
                                        className="relative w-16 h-16 rounded-full border border-lime-500/30 group-hover:border-lime-400 group-hover:bg-lime-400 transition-all duration-300 flex items-center justify-center overflow-hidden"
                                        style={{
                                            boxShadow: '0 0 20px rgba(163, 230, 53, 0)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 0 30px rgba(163, 230, 53, 0.4)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = '0 0 20px rgba(163, 230, 53, 0)'
                                        }}
                                    >
                                        <ShoppingBag className="w-8 h-8 text-lime-400 group-hover:text-black transition-colors duration-300 relative z-10" />

                                        {/* Button background animation */}
                                        <div className="absolute inset-0 bg-lime-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                                    </button>
                                </div>

                                {/* Status indicator */}
                                <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                                    <span className="text-xl text-lime-400 font-medium uppercase tracking-wider">In Stock</span>
                                </div>
                            </div>

                            {oldPrice > price && (
                                <div className="absolute top-4 right-4 bg-emerald-600 text-white font-semibold text-lg px-4 py-2 rounded-full transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300" style={{ boxShadow: '0 4px 20px rgba(163, 230, 53, 0.4)' }}>
                                    -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
                                </div>
                            )}


                            {/* Corner accent */}
                            <div className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute top-0 left-0 w-8 h-0.5 bg-gradient-to-r from-lime-400 to-transparent" />
                                <div className="absolute top-0 left-0 w-0.5 h-8 bg-gradient-to-b from-lime-400 to-transparent" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StrapiCard