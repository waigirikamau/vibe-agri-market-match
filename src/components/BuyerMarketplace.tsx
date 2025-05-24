
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, TrendingUp, Filter, Search, Heart } from "lucide-react";
import { toast } from "sonner";

const BuyerMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showBidForm, setShowBidForm] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  const [listings] = useState([
    {
      id: 1,
      crop: "Maize",
      farmer: "John Kamau",
      quantity: "500 kg",
      askingPrice: "45 KSH/kg",
      location: "Nakuru",
      timeLeft: "2 days",
      currentBid: "48 KSH/kg",
      totalBids: 3,
      quality: "Grade A",
      harvestDate: "2 weeks ago",
      verified: true
    },
    {
      id: 2,
      crop: "Tomatoes",
      farmer: "Mary Wanjiku",
      quantity: "200 kg",
      askingPrice: "80 KSH/kg",
      location: "Kiambu",
      timeLeft: "1 day",
      currentBid: "85 KSH/kg",
      totalBids: 7,
      quality: "Premium",
      harvestDate: "3 days ago",
      verified: true
    },
    {
      id: 3,
      crop: "Avocados",
      farmer: "Peter Muthoni",
      quantity: "300 pieces",
      askingPrice: "25 KSH/piece",
      location: "Murang'a",
      timeLeft: "5 hours",
      currentBid: "28 KSH/piece",
      totalBids: 2,
      quality: "Grade A",
      harvestDate: "1 week ago",
      verified: false
    },
    {
      id: 4,
      crop: "Potatoes",
      farmer: "Grace Njeri",
      quantity: "1000 kg",
      askingPrice: "60 KSH/kg",
      location: "Meru",
      timeLeft: "3 days",
      currentBid: "62 KSH/kg",
      totalBids: 5,
      quality: "Grade B",
      harvestDate: "1 week ago",
      verified: true
    },
    {
      id: 5,
      crop: "Bananas",
      farmer: "Samuel Kiprotich",
      quantity: "200 bunches",
      askingPrice: "150 KSH/bunch",
      location: "Kisii",
      timeLeft: "6 hours",
      currentBid: "155 KSH/bunch",
      totalBids: 4,
      quality: "Premium",
      harvestDate: "4 days ago",
      verified: true
    },
    {
      id: 6,
      crop: "Onions",
      farmer: "David Ochieng",
      quantity: "800 kg",
      askingPrice: "120 KSH/kg",
      location: "Migori",
      timeLeft: "4 days",
      currentBid: "125 KSH/kg",
      totalBids: 1,
      quality: "Grade A",
      harvestDate: "5 days ago",
      verified: true
    }
  ]);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === "all" || listing.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesLocation = selectedLocation === "all" || listing.location.toLowerCase() === selectedLocation.toLowerCase();
    
    return matchesSearch && matchesCrop && matchesLocation;
  });

  const handlePlaceBid = (listingId) => {
    if (!bidAmount) {
      toast.error("Please enter a bid amount");
      return;
    }
    
    toast.success("Bid placed successfully!");
    setShowBidForm(null);
    setBidAmount("");
  };

  const getUrgencyColor = (timeLeft) => {
    if (timeLeft.includes("hour")) return "text-red-600 bg-red-50";
    if (timeLeft.includes("1 day")) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-green-600" />
            Find Fresh Produce
          </CardTitle>
          <CardDescription>
            Browse available produce from verified farmers across Kenya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input 
                placeholder="Search crops or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Crop Type</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="All crops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="avocados">Avocados</SelectItem>
                  <SelectItem value="potatoes">Potatoes</SelectItem>
                  <SelectItem value="bananas">Bananas</SelectItem>
                  <SelectItem value="onions">Onions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="nakuru">Nakuru</SelectItem>
                  <SelectItem value="kiambu">Kiambu</SelectItem>
                  <SelectItem value="murang'a">Murang'a</SelectItem>
                  <SelectItem value="meru">Meru</SelectItem>
                  <SelectItem value="kisii">Kisii</SelectItem>
                  <SelectItem value="migori">Migori</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select defaultValue="ending-soon">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Available Produce</h2>
          <p className="text-gray-600">{filteredListings.length} listings found</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    {listing.crop}
                    {listing.verified && (
                      <Badge className="bg-green-500 text-white text-xs">Verified</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">by {listing.farmer}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quantity:</span>
                <span className="font-medium">{listing.quantity}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Asking Price:</span>
                <span className="font-medium text-green-600">{listing.askingPrice}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Bid:</span>
                <span className="font-bold text-blue-600">{listing.currentBid}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quality:</span>
                <Badge variant="outline" className="text-xs">
                  {listing.quality}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {listing.location}
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(listing.timeLeft)}`}>
                  {listing.timeLeft} left
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                {listing.totalBids} bid{listing.totalBids !== 1 ? 's' : ''}
              </div>
              
              <div className="pt-3 space-y-2">
                {showBidForm === listing.id ? (
                  <div className="space-y-2">
                    <Input 
                      placeholder="Enter your bid amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handlePlaceBid(listing.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      >
                        Submit Bid
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setShowBidForm(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => setShowBidForm(listing.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      Place Bid
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact Farmer
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BuyerMarketplace;
