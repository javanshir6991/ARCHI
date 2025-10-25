import CollectionCards from "../../sections/Collection/CollectionCards"
import ProductHeroBanner from "../../sections/HeroBanner/ProductHeroBanner"
import ProductsSection from "../../sections/Products/ProductsSection"
import ReviewsSection from "../../sections/Reviews/ReviewsSection"

const Home = () => {
    return (
        <>
            <ProductHeroBanner />
            <ProductsSection />
            <CollectionCards />
            <ReviewsSection />
        </>
    )
}

export default Home