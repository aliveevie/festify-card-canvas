import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CreateCardSection } from "@/components/CreateCardSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Festify - Cross-Chain Greeting Card NFTs"
        description="Send personalized greeting cards as NFTs across multiple blockchain networks. Celebrate festivals with Festify."
        url="https://www.festify.club/"
      />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CreateCardSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
