import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface PropertyFilterProps {
  onFilterChange: (filters: {
    searchTerm: string;
    propertyType: string;
    budget: string;
  }) => void;
}

const PropertyFilter = ({ onFilterChange }: PropertyFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    onFilterChange({ searchTerm, propertyType, budget });
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, propertyType, budget });
  };

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value);
    onFilterChange({ searchTerm, propertyType: value, budget });
  };

  const handleBudgetChange = (value: string) => {
    setBudget(value);
    onFilterChange({ searchTerm, propertyType, budget: value });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-primary-darker">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Dream Home
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover the perfect property from thousands of listings
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-elegant">
          <div className="grid md:grid-cols-12 gap-4 items-end">
            {/* Search Input */}
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by city, locality, or project name"
                  value={searchTerm}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="md:col-span-3">
              <Select value={propertyType} onValueChange={handlePropertyTypeChange}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (All Types)</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget Dropdown */}
            <div className="md:col-span-2">
              <Select value={budget} onValueChange={handleBudgetChange}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (All Budgets)</SelectItem>
                  <SelectItem value="0-10L">Under ₹10L</SelectItem>
                  <SelectItem value="10L-25L">₹10L - ₹25L</SelectItem>
                  <SelectItem value="25L-50L">₹25L - ₹50L</SelectItem>
                  <SelectItem value="50L-1Cr">₹50L - ₹1Cr</SelectItem>
                  <SelectItem value="1Cr+">Above ₹1Cr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button 
                onClick={handleSearch}
                className="w-full h-12 text-base font-semibold"
                variant="hero"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFilter;