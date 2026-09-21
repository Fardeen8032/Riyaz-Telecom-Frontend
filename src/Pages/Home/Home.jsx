import Calltoaction from "../../Components/CTA/Calltoaction"
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts"
import HomeBanner from "../../Components/HomeBanner/HomeBanner"
import Mobilecategory from "../../Components/Mobilecategory/Mobilecategory"
import WhatWeOffer from "../../Components/Whatweoffer/WhatWeOffer"


const Home = () => {
  return (
    <>
      <HomeBanner />
      <FeaturedProducts />
      <Mobilecategory />
      <WhatWeOffer />
      <Calltoaction />
    </>
  )
}

export default Home