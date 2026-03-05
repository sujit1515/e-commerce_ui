import Footer from '@/components/Common/Footer';
import AboutCTA from '@/components/Pages/About/AboutCTA';
import AboutHero from '@/components/Pages/About/AboutHero';
import AboutStats from '@/components/Pages/About/AboutStats';
import AboutStory from '@/components/Pages/About/AboutStory';
import AboutTeam from '@/components/Pages/About/AboutTeam';
import AboutTestimonials from '@/components/Pages/About/AboutTestimonials';
import AboutTimeline from '@/components/Pages/About/AboutTimeline';
import AboutValues from '@/components/Pages/About/AboutValues';
import Navbar from '@/components/Common/Navbar';
import React from 'react';

export default function Aboutpage() {
  return (
    <div>
      <Navbar/>
      <AboutHero/>
      <AboutStats/>
      <AboutStory/>
      <AboutValues/>
      <AboutTimeline/>
      <AboutTeam/>
      <AboutTestimonials/>
      <AboutCTA/>
      <Footer/>
    </div>
  )
}
