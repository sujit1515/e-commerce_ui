import Footer from '@/components/Common/Footer'
import Navbar from '@/components/Common/Navbar'
import ContactFAQ from '@/components/Pages/Contact/ContactFaq'
import ContactForm from '@/components/Pages/Contact/ContactForm'
import ContactHero from '@/components/Pages/Contact/ContactHero'
import ContactInfo from '@/components/Pages/Contact/ContactInfo'
import ContactMap from '@/components/Pages/Contact/ContactMap'
import ContactSocial from '@/components/Pages/Contact/ContactSocial'
import React from 'react'

export default function Contactpage() {
  return (
    <div>
      <Navbar/>
      <ContactHero/>
      <ContactInfo/>
      <ContactForm/>
      <ContactMap/>
      <ContactFAQ/>
      <ContactSocial/>
      <Footer/>
    </div>
  )
}
