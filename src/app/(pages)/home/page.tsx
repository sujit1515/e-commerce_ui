import Footer from '@/components/Common/Footer';
import Navbar from '@/components/Common/Navbar';
import CultureShift from '@/components/Pages/Home/Cultureshift';
import CuratedWonder from '@/components/Pages/Home/Curatedwonder';
import Hero from '@/components/Pages/Home/Hero';
import InstagramFollow from '@/components/Pages/Home/InstagramFollow';
import LinearPrecision from '@/components/Pages/Home/Linearprecision';
import ShopByCategory from '@/components/Pages/Home/Shopbycategory';
import WomenPhilosophySection from '@/components/Pages/Home/WomenPhilosophySection';
import React from 'react';

export default function Homepage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ShopByCategory/>
      {/* <WomenPhilosophySection/> */}
      <LinearPrecision/>
      <CuratedWonder/>
      <CultureShift/>
      <InstagramFollow/>
      <Footer/>
    </div>
  )
}
