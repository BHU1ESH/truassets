import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Settings, Users, TrendingUp, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: "fractional-ownership",
      title: "Fractional Ownership",
      icon: Building2,
      description: "Own premium real estate assets with minimal capital investment through our fractional ownership model.",
      features: [
        "Minimum investment starting from ₹10 Lakhs",
        "Access to Grade-A commercial and residential properties",
        "Transparent ownership documentation and legal compliance",
        "Monthly rental income distribution",
        "Professional asset management included",
        "Exit options with pre-defined liquidity windows",
        "Portfolio diversification across multiple properties",
        "SEBI-compliant investment structure"
      ],
      benefits: [
        "Lower entry barrier compared to full property purchase",
        "Diversified portfolio without managing multiple properties",
        "Passive income through rental yields",
        "Capital appreciation on your share",
        "Professional management handles all operational aspects",
        "Tax benefits under applicable real estate investment regulations"
      ],
      process: [
        "Browse curated property listings with detailed financial projections",
        "Select properties matching your investment goals and risk profile",
        "Complete KYC and investment documentation",
        "Transfer funds through secure payment gateway",
        "Receive ownership certificate and access investor dashboard",
        "Start earning monthly rental income and track performance"
      ],
      pricing: "Investment amounts vary by property. Typical ticket sizes range from ₹10 Lakhs to ₹50 Lakhs per unit."
    },
    {
      id: "property-management",
      title: "Property Management",
      icon: Settings,
      description: "Comprehensive end-to-end property management services ensuring optimal returns and asset value appreciation.",
      features: [
        "24/7 property monitoring and maintenance",
        "Tenant acquisition and screening with credit verification",
        "Lease administration and rent collection",
        "Property insurance and compliance management",
        "Regular property inspections and condition reports",
        "Vendor management for repairs and maintenance",
        "Financial reporting and tax documentation",
        "Strategic asset enhancement recommendations"
      ],
      benefits: [
        "Maximize rental yields through professional tenant management",
        "Reduce vacancy periods with proactive marketing",
        "Maintain property value with preventive maintenance",
        "Handle all legal and regulatory compliance",
        "Free up your time while ensuring optimal returns",
        "Access to preferred vendor network for cost-effective services"
      ],
      process: [
        "Initial property assessment and valuation",
        "Customized management plan development",
        "Tenant acquisition and onboarding",
        "Ongoing maintenance and relationship management",
        "Monthly financial reporting and performance tracking",
        "Quarterly strategic review and optimization recommendations"
      ],
      pricing: "Management fees typically range from 8-12% of monthly rental income, depending on property type and location."
    },
    {
      id: "buyer-seller-matching",
      title: "Buyer-Seller Matching",
      icon: Users,
      description: "Intelligent platform connecting verified buyers with quality property sellers, streamlining transactions.",
      features: [
        "AI-powered property matching based on buyer preferences",
        "Verified seller and buyer profiles with KYC compliance",
        "Property valuation and due diligence support",
        "Negotiation facilitation and transaction management",
        "Legal documentation and title verification",
        "Escrow services for secure fund transfers",
        "Post-transaction support and handover assistance",
        "Market insights and pricing recommendations"
      ],
      benefits: [
        "Faster transaction closure with pre-qualified parties",
        "Reduced negotiation time through structured processes",
        "Lower transaction costs compared to traditional brokers",
        "Transparent pricing and market-aligned valuations",
        "Secure transactions with escrow protection",
        "Access to exclusive off-market opportunities"
      ],
      process: [
        "Register and complete profile verification",
        "Specify property requirements or listing details",
        "Receive curated matches with detailed property reports",
        "Schedule property visits and virtual tours",
        "Negotiate terms with platform facilitation",
        "Complete due diligence and legal documentation",
        "Secure fund transfer through escrow",
        "Property handover and post-sale support"
      ],
      pricing: "Transaction fees: 1.5-2% for buyers, 2-2.5% for sellers. Volume discounts available for multiple transactions."
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      icon: TrendingUp,
      description: "Data-driven digital marketing strategies to maximize property visibility and accelerate sales.",
      features: [
        "Property listing optimization across major portals",
        "Professional photography and 360° virtual tours",
        "Social media marketing and targeted advertising",
        "SEO-optimized property descriptions and landing pages",
        "Email marketing campaigns to qualified leads",
        "Google Ads and Facebook Ads management",
        "Content marketing and thought leadership",
        "Analytics and performance tracking"
      ],
      benefits: [
        "Increased property visibility and inquiry rates",
        "Faster sales cycles through targeted marketing",
        "Higher quality leads with better conversion rates",
        "Professional presentation enhances property value perception",
        "Comprehensive analytics for marketing ROI tracking",
        "Multi-channel presence ensures maximum reach"
      ],
      process: [
        "Property analysis and marketing strategy development",
        "Content creation including photos, videos, and descriptions",
        "Multi-channel campaign launch and optimization",
        "Lead generation and qualification",
        "Performance monitoring and campaign adjustments",
        "Monthly reporting and strategic recommendations"
      ],
      pricing: "Packages start from ₹50,000 for basic listings. Premium packages with full-service marketing from ₹2 Lakhs."
    },
    {
      id: "investment-advisory",
      title: "Investment Advisory",
      icon: BarChart3,
      description: "Expert investment advisory services helping you build and optimize your real estate portfolio.",
      features: [
        "Personalized investment strategy based on financial goals",
        "Market research and property due diligence",
        "Portfolio construction and asset allocation",
        "Risk assessment and mitigation strategies",
        "Tax planning and optimization",
        "Performance monitoring and rebalancing recommendations",
        "Market timing and exit strategy guidance",
        "Regular portfolio reviews and strategy updates"
      ],
      benefits: [
        "Data-driven investment decisions with reduced risk",
        "Access to exclusive investment opportunities",
        "Optimized portfolio for maximum returns",
        "Tax-efficient investment structures",
        "Professional guidance from experienced advisors",
        "Long-term wealth building through strategic planning"
      ],
      process: [
        "Initial consultation and financial goal assessment",
        "Risk profiling and investment capacity evaluation",
        "Customized investment plan development",
        "Property selection and due diligence",
        "Investment execution and portfolio setup",
        "Ongoing monitoring and periodic rebalancing",
        "Quarterly reviews and strategy adjustments"
      ],
      pricing: "Advisory fees: 1-1.5% of assets under management annually. One-time consultation packages available from ₹25,000."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary via-primary-dark to-primary-darker text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-accent-gold">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Comprehensive real estate solutions designed to help you build wealth, manage assets, and make informed investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={service.id} id={service.id} className="scroll-mt-24">
                  <Card className="overflow-hidden border-2 hover:shadow-xl transition-shadow">
                    <div className="grid md:grid-cols-12 gap-0">
                      {/* Icon and Title Section */}
                      <div className="md:col-span-3 bg-primary/10 p-8 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                          {service.title}
                        </h2>
                        <p className="text-sm text-muted-foreground text-center">
                          {service.description}
                        </p>
                      </div>

                      {/* Content Section */}
                      <div className="md:col-span-9 p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Features */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                              Key Features
                            </h3>
                            <ul className="space-y-2">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-accent-green" />
                              Benefits
                            </h3>
                            <ul className="space-y-2">
                              {service.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-accent-green mt-1">•</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Process */}
                        <div className="mt-8 pt-8 border-t">
                          <h3 className="text-lg font-semibold mb-4">How It Works</h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            {service.process.map((step, idx) => (
                              <div key={idx} className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                                  {idx + 1}
                                </div>
                                <p className="text-sm text-muted-foreground">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="mt-6 pt-6 border-t">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                              <p className="text-sm text-muted-foreground">{service.pricing}</p>
                            </div>
                            <Button
                              variant="cta"
                              onClick={() => navigate('/login')}
                              className="gap-2"
                            >
                              Get Started
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our team of experienced property advisors is here to help you achieve your real estate investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="cta"
                size="lg"
                className="bg-accent-green hover:bg-accent-green/90"
                onClick={() => navigate('/login')}
              >
                Schedule a Consultation
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                onClick={() => navigate('/')}
              >
                View Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;

