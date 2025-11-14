import { Shield, Eye, Home, TrendingUp } from "lucide-react";

const WhyTruAssets = () => {
  const features = [
    {
      icon: Shield,
      title: "Complete Transparency",
      description: "All properties are vetted by experts with detailed financial reports, legal documentation, and regular performance updates."
    },
    {
      icon: Eye,
      title: "Expert Insights",
      description: "Our team of real estate professionals and market analysts provide you with data-driven investment recommendations."
    },
    {
      icon: Home,
      title: "Hassle-Free Ownership",
      description: "We handle property management, tenant relations, maintenance, and legal compliance so you can focus on returns."
    },
    {
      icon: TrendingUp,
      title: "Proven Growth",
      description: "Track record of delivering consistent returns with an average of 12%+ IRR across our investment portfolio."
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-light/10 to-accent-green/10">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">TruAssets</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building trust through transparency, expertise, and proven results in fractional real estate investment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card p-6 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">₹50+ Cr</div>
              <div className="text-muted-foreground">Assets Under Management</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-green mb-2">12%+</div>
              <div className="text-muted-foreground">Average IRR</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-gold mb-2">2500+</div>
              <div className="text-muted-foreground">Happy Investors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">100%</div>
              <div className="text-muted-foreground">Transparency</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTruAssets;