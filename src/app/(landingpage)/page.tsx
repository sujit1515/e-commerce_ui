
import AutumnCollection from '@/components/Landingpage/AutumnCollection';
import BestSellers from '@/components/Landingpage/BestSellers';
import Categories from '@/components/Landingpage/Categories';
import Footer from '@/components/Common/Footer';
import Hero from '@/components/Landingpage/Hero';
import Navbar from '@/components/Landingpage/Navbar';
import React from 'react';

export default function Landingpage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Categories/>
      <BestSellers/>
      <AutumnCollection/>
      <Footer/>
    </div>
  );
}
