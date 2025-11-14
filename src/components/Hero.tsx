import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-real-estate.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleExploreInvestments = () => {
    if (isAuthenticated) {
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/login');
    }
  };

  const handleHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-background" />
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Invest in Real Estate.{" "}
            <span className="text-accent-gold">Smarter.</span>{" "}
            <span className="text-accent-green">Together.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Own premium properties fractionally, earn rental income, and enjoy profits 
            with complete transparency. Start your investment journey with as little as ₹10,000.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={handleExploreInvestments}
            >
              Explore Investments
              <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <Button 
              variant="outline-white" 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={handleHowItWorks}
            >
              <Play className="mr-2" size={20} />
              How It Works
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-gold">₹50+ Cr</div>
              <div className="text-sm">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-green">12%+</div>
              <div className="text-sm">Average Annual Returns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2500+</div>
              <div className="text-sm">Happy Investors</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;