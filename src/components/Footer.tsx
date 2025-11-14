import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Our Team", href: "#team" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" }
    ],
    investments: [
      { name: "Featured Properties", href: "#properties" },
      { name: "Investment Calculator", href: "#calculator" },
      { name: "Market Insights", href: "#insights" },
      { name: "Performance Reports", href: "#reports" },
      { name: "Portfolio Tracking", href: "#portfolio" }
    ],
    services: [
      { name: "Fractional Ownership", href: "#fractional" },
      { name: "Property Management", href: "#management" },
      { name: "Buyer-Seller Matching", href: "#matching" },
      { name: "Digital Marketing", href: "#marketing" },
      { name: "Investment Advisory", href: "#advisory" }
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "System Status", href: "#status" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Investment Risks", href: "#risks" },
      { name: "Compliance", href: "#compliance" },
      { name: "Grievances", href: "#grievances" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer id="contact" className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold mb-4">
              Tru<span className="text-accent-green">Assets</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              India's leading fractional real estate investment platform. Democratizing premium property investments for everyone.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-accent-green" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-accent-green" />
                <span>invest@truassets.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-accent-green mt-0.5" />
                <span>
                  TruAssets Tower, Bandra Kurla Complex,<br />
                  Mumbai, Maharashtra 400051
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent-green transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-white/80 hover:text-accent-green transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Investments</h3>
              <ul className="space-y-2">
                {footerLinks.investments.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-white/80 hover:text-accent-green transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-white/80 hover:text-accent-green transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-white/80 hover:text-accent-green transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Info */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Regulatory Information</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                TruAssets is registered with SEBI (Securities and Exchange Board of India) and complies with all RBI guidelines for real estate investments. All our investment products are subject to market risks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Important Disclaimers</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Past performance does not guarantee future results. All investments carry risk and you may lose some or all of your invested capital. Please read all documents carefully before investing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/80 text-sm mb-4 md:mb-0">
              © 2024 TruAssets Private Limited. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/80 hover:text-accent-green transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;