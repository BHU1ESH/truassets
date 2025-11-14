import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FeaturedPropertiesProps {
  filters?: {
    searchTerm: string;
    propertyType: string;
    budget: string;
  };
}

const FeaturedProperties = ({ filters }: FeaturedPropertiesProps) => {
  const { properties: allProperties } = useProperties();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { selectedIds, toggleProperty, isSelected } = useComparison();
  const { toast } = useToast();

  // Map properties from context to display format - MUST be before any conditional returns
  const mappedProperties = useMemo(() => allProperties.map(prop => ({
    id: prop.id,
    image: prop.image,
    title: prop.title,
    location: prop.location,
    city: prop.location.split(',')[0],
    type: prop.type,
    startingPrice: `₹${(prop.price / 100000).toFixed(2)} L`,
    priceValue: prop.price,
    totalValue: `₹${(prop.targetAmount / 10000000).toFixed(1)} Cr`,
    expectedYield: `${prop.expectedReturn}%`,
    tenure: prop.tenure,
    availableUnits: `${prop.investors}/${Math.floor(prop.targetAmount / prop.price)}`,
    status: prop.status === 'active' ? 'Available' : prop.status === 'funded' ? 'Funded' : 'Upcoming'
  })), [allProperties]);

  const filteredProperties = useMemo(() => {
    if (!filters) return mappedProperties;

    return mappedProperties.filter(property => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.city.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Property type filter
      if (filters.propertyType && filters.propertyType !== 'none' && filters.propertyType !== property.type) {
        return false;
      }

      // Budget filter
      if (filters.budget && filters.budget !== 'none') {
        const price = property.priceValue;
        switch (filters.budget) {
          case "0-10L":
            if (price >= 1000000) return false;
            break;
          case "10L-25L":
            if (price < 1000000 || price >= 2500000) return false;
            break;
          case "25L-50L":
            if (price < 2500000 || price >= 5000000) return false;
            break;
          case "50L-1Cr":
            if (price < 5000000 || price >= 10000000) return false;
            break;
          case "1Cr+":
            if (price < 10000000) return false;
            break;
        }
      }

      return true;
    });
  }, [filters, mappedProperties]);

  const properties = filteredProperties;

  return (
    <section id="properties" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Investment</span> Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium properties with verified returns and transparent investment terms.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-2xl font-semibold mb-2">No Properties Available</h3>
              <p className="text-muted-foreground mb-6">
                New investment opportunities will be listed here soon. Check back later!
              </p>
              {!isAuthenticated && (
                <Button onClick={() => navigate('/login')} variant="cta">
                  Login to Get Notified
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
            <div
              key={property.id}
              className={cn(
                "property-card overflow-hidden transition-shadow",
                isSelected(property.id) && "ring-2 ring-primary"
              )}
            >
              {/* Property Image */}
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={property.status === "Filling Fast" ? "destructive" : 
                           property.status === "Limited" ? "default" : "secondary"}
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-accent-green text-accent-green-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {property.expectedYield} IRR
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <div className="text-muted-foreground">Starting Price</div>
                    <div className="font-semibold text-foreground">{property.startingPrice}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Value</div>
                    <div className="font-semibold text-foreground">{property.totalValue}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Tenure</div>
                    <div className="font-semibold text-foreground flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {property.tenure}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Available</div>
                    <div className="font-semibold text-foreground">{property.availableUnits}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={isSelected(property.id)}
                      onCheckedChange={() => {
                        if (!isSelected(property.id) && selectedIds.length >= 4) {
                          toast({
                            title: 'Comparison limit reached',
                            description: 'You can compare up to four properties at a time.',
                            variant: 'destructive',
                          });
                          return;
                        }
                        toggleProperty(property.id);
                      }}
                    />
                    Compare
                  </label>
                  <Button className="flex-1" variant="outline">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="hero" size="lg">
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;