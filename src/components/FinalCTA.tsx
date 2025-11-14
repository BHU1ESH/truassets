import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Mail } from "lucide-react";
import LeadCaptureModal from "@/components/LeadCaptureModal";

const FinalCTA = () => {
  const navigate = useNavigate();
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  return (
    <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border border-white rounded-full"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Your Investment Journey Today with{" "}
            <span className="text-accent-gold">TruAssets</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Join thousands of smart investors who are building wealth through fractional real estate ownership. 
            Start with as little as ₹10,000 and watch your money grow.
          </p>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Low Entry", subtitle: "Start from ₹10,000" },
              { title: "High Returns", subtitle: "12%+ Average IRR" },
              { title: "Zero Hassle", subtitle: "Fully Managed" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-2xl font-bold text-accent-gold mb-2">
                  {benefit.title}
                </div>
                <div className="text-white/80">
                  {benefit.subtitle}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="cta"
              size="lg"
              className="text-lg px-8 py-4 bg-accent-green hover:bg-accent-green/90"
              onClick={() => navigate('/login')}
            >
              Sign Up & Start Investing
              <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <Button
              variant="outline-white"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => setLeadModalOpen(true)}
            >
              Schedule a Call
              <Smartphone className="ml-2" size={20} />
            </Button>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-white/80">
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>invest@truassets.com</span>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              SEBI Registered | RBI Compliant | 100% Transparent
            </p>
          </div>
        </div>
      </div>
      <LeadCaptureModal open={leadModalOpen} onOpenChange={setLeadModalOpen} source="final-cta" />
    </section>
  );
};

export default FinalCTA;