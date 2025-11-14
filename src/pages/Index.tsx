import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PropertyFilter from "@/components/PropertyFilter";
import FeaturedProperties from "@/components/FeaturedProperties";
import PropertyComparisonBanner from "@/components/PropertyComparisonBanner";
import WhyTruAssets from "@/components/WhyTruAssets";
import InvestorTools from "@/components/InvestorTools";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  const [propertyFilters, setPropertyFilters] = useState({
    searchTerm: "",
    propertyType: "",
    budget: ""
  });

  const handleFilterChange = (filters: typeof propertyFilters) => {
    setPropertyFilters(filters);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <PropertyFilter onFilterChange={handleFilterChange} />
      <FeaturedProperties filters={propertyFilters} />
      <PropertyComparisonBanner />
      <WhyTruAssets />
      <InvestorTools />
      <Testimonials />
      <About />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
