import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Software Engineer",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "TruAssets made real estate investment accessible for me. I started with ₹50,000 and have already seen 13% returns in my first year. The transparency and regular updates give me complete confidence."
    },
    {
      name: "Priya Sharma",
      role: "Marketing Manager",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The fractional ownership model is brilliant! I own shares in 3 premium properties across Mumbai and Delhi. The monthly rental income is a great additional source of passive income."
    },
    {
      name: "Amit Patel",
      role: "Business Owner",
      location: "Ahmedabad",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "What I love most about TruAssets is the complete transparency. Every document, every update, every rental payment is clearly communicated. It's like having a personal real estate advisor."
    },
    {
      name: "Sneha Reddy",
      role: "Doctor",
      location: "Hyderabad",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a busy professional, I appreciate how hassle-free this investment is. TruAssets handles everything - from property management to tenant issues. I just receive my monthly returns."
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-primary">Investors</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real investors who have grown their wealth with TruAssets.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="testimonial-card p-8 md:p-12 text-center relative">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent-gold text-accent-gold" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed italic">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center space-x-4">
              <img 
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-foreground text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground">
                  {testimonials[currentIndex].role}
                </div>
                <div className="text-primary text-sm">
                  {testimonials[currentIndex].location}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden md:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center space-x-4 mt-8 md:hidden">
            <Button variant="outline" size="sm" onClick={prevTestimonial}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={nextTestimonial}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;