import Footer from '@/components/Common/Footer';
import Navbar from '@/components/Common/Navbar';
import ElectronicsHeroBanner from '@/components/Pages/Electronics/Electronicsherobanner';
import PhilosophySection from '@/components/Pages/Electronics/Philosophysection';
import ProductGrid from '@/components/Pages/Electronics/Productgrid';
import React from 'react';

export default function MensCollectionpage() {
  return (
    <div>
      <Navbar/>
      <ElectronicsHeroBanner/>
      <ProductGrid/>
      <PhilosophySection/>
      <Footer/>
    </div>
  )
}
