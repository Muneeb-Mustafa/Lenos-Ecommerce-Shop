import React from 'react'
import Hero from '../../components/HeroSection/Hero'
import Products from '../../components/Products/Products'
import Section3 from '../../components/Section3/Section3'
import Section4 from '../../components/Section4/Section4'
import Section5 from '../../components/Section5/Section5'
import ImageSlider from '../../components/ImageSlider/ImageSlider'

const Home2 = () => {
  return (
    <main className='text-center'> 
        <Hero/>
        <Products/>
        <Section3/>
        <Section4/>
        <Section5/>
        <ImageSlider/>
    </main>
  )
}

export default Home2