import Footer from '@/components/Common/Footer';
import Navbar from '@/components/Common/Navbar';
import ConsciousLuxury from '@/components/Pages/Home/ConsciousLuxury';
import Hero from '@/components/Pages/Home/Hero';
import ShopByCategory from '@/components/Pages/Home/Shopbycategory';
import SummerCollection from '@/components/Pages/Home/SummerCollection'; 
import TrustedCompanies from '@/components/Pages/Home/TrustedCompanies';
import React from 'react';

export default function Homepage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ShopByCategory/>
      <SummerCollection/>
      <TrustedCompanies/>
      <ConsciousLuxury/>
      <Footer/>
    </div>
  )
}
