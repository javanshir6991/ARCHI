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
            <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg animate-pulse">
                Loading products...
            </div>
        )

    if (isError)
        return (
            <div className="p-6 text-red-400 bg-red-950/20 rounded-xl border border-red-800 shadow-lg">
                Error loading products: {error?.message ?? 'Unknown error'}
            </div>
        )

    const products: StrapiItem[] = data?.data ?? []

    return (
        <div className="min-h-screen px-4 max-w-[1600px]  mx-auto">


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((p) => {
                    const attrs = p.attributes ?? p
                    const title = attrs.title ?? 'No title'
                    const price = attrs.price ?? ''
                    const oldPrice = attrs.oldPrice ?? price * 1.3 // just a fake old price for demo

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
                            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                        >
                            {src && (
                                <img
                                    src={src}
                                    alt={title}
                                    className="w-full h-64 object-cover"
                                />
                            )}

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                                        {title}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg font-semibold text-gray-900">
                                            ${price}
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                            ${oldPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button className="mt-4 self-end bg-gray-100 hover:bg-gray-200 transition-all p-3 rounded-full">
                                    <ShoppingBag className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StrapiCard
