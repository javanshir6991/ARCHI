import React from 'react'
import StrapiCard from '../../components/ProductCard/StrapiCard'

const ProductsSection = () => {
    return (
        <div className='border-t border-neutral-300 pt-20'>
            <p className='mx-auto text-center rounded-full text-xl py-1 bg-lime-400/50 w-[230px]'>Top sale on this week</p>
            <h1 className='text-center text-6xl mt-3 mb-7 font-semibold'>Featured Collections</h1>
            <StrapiCard />
        </div>
    )
}

export default ProductsSection