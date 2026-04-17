// import Footer from '@/components/Common/Footer';
// import Navbar from '@/components/Common/Navbar';
// import MensCollectionPage from '@/components/Shop/Men/MensCollectionPage';
// import React from 'react';

// export default function MensCollectionpage() {
//   return (
//     <div>
//       <Navbar/>
//       <MensCollectionPage/>
//       <Footer/>
//     </div>
//   )
// }
// app/women/page.tsx  (or pages/women/index.tsx for Pages Router)

import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";
import WomensCollectionPage from "@/components/Shop/Women/Womenscollectionpage";

export const metadata = {
  title: "Women's Collection | Your Store",
  description:
    "Discover our curated women's collection — elevated womenswear for every occasion.",
};

export default function WomensPage() {
  return (
    <>
      <Navbar />
      <WomensCollectionPage />
      <Footer />
    </>
  );
}