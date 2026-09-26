import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import Pricing from "../components/home/Pricing";
import SampleVideos from "../components/home/SampleVideos";
import ThreeWaysToCreate from "../components/home/ThreeWaysToCreate";
import WhatYouCanMake from "../components/home/WhatYouCanMake";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ThreeWaysToCreate />
      <WhatYouCanMake />
      <SampleVideos />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;
