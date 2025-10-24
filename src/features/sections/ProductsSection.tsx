import React from 'react'
import StrapiCard from '../components/ProductCard/StrapiCard'

const ProductsSection = () => {
    return (
        <div>
            <p className='mx-auto text-center rounded-full text-xl bg-emerald-600 w-[400px]'>Top sale on this week</p>
            <h1 className='text-center text-3xl'>Featured Collections</h1>
            <StrapiCard />
        </div>
    )
}

export default ProductsSection