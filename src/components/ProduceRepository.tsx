
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, TrendingUp, Search, Filter, Gavel } from "lucide-react";
import { toast } from "sonner";

const ProduceRepository = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showBidModal, setShowBidModal] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  const categories = [
    { id: "cereals", name: "Cereals", count: 45 },
    { id: "vegetables", name: "Vegetables", count: 78 },
    { id: "fruits", name: "Fruits", count: 32 },
    { id: "legumes", name: "Legumes", count: 23 },
    { id: "tubers", name: "Tubers", count: 18 },
    { id: "spices", name: "Spices", count: 12 }
  ];

  const produceListings = [
    {
      id: 1,
      farmer: "John Kamau",
      category: "cereals",
      crop: "White Maize",
      quantity: "2000 kg",
      askingPrice: "45 KSH/kg",
      currentBid: "48 KSH/kg",
      location: "Nakuru",
      quality: "Grade A",
      harvestDate: "2 weeks ago",
      timeLeft: "3 days",
      totalBids: 5,
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      farmer: "Mary Wanjiku",
      category: "vegetables",
      crop: "Roma Tomatoes",
      quantity: "500 kg",
      askingPrice: "80 KSH/kg",
      currentBid: "85 KSH/kg",
      location: "Kiambu",
      quality: "Premium",
      harvestDate: "3 days ago",
      timeLeft: "1 day",
      totalBids: 8,
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      farmer: "Peter Muthoni",
      category: "fruits",
      crop: "Hass Avocados",
      quantity: "800 pieces",
      askingPrice: "25 KSH/piece",
      currentBid: "28 KSH/piece",
      location: "Murang'a",
      quality: "Export Grade",
      harvestDate: "1 week ago",
      timeLeft: "5 hours",
      totalBids: 3,
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      farmer: "Grace Njeri",
      category: "tubers",
      crop: "Irish Potatoes",
      quantity: "1500 kg",
      askingPrice: "60 KSH/kg",
      currentBid: "65 KSH/kg",
      location: "Meru",
      quality: "Grade A",
      harvestDate: "1 week ago",
      timeLeft: "2 days",
      totalBids: 6,
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      farmer: "Samuel Kiprotich",
      category: "legumes",
      crop: "French Beans",
      quantity: "300 kg",
      askingPrice: "120 KSH/kg",
      currentBid: "125 KSH/kg",
      location: "Kisii",
      quality: "Export Grade",
      harvestDate: "4 days ago",
      timeLeft: "6 hours",
      totalBids: 4,
      verified: true,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      farmer: "David Ochieng",
      category: "vegetables",
      crop: "Red Onions",
      quantity: "1000 kg",
      askingPrice: "90 KSH/kg",
      currentBid: "95 KSH/kg",
      location: "Migori",
      quality: "Grade A",
      harvestDate: "5 days ago",
      timeLeft: "4 days",
      totalBids: 2,
      verified: true,
      image: "/placeholder.svg"
    }
  ];

  const filteredListings = produceListings.filter(listing => {
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory;
    const matchesSearch = listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "all" || listing.location.toLowerCase() === selectedLocation.toLowerCase();
    
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const handlePlaceBid = (listingId) => {
    if (!bidAmount) {
      toast.error("Please enter a bid amount");
      return;
    }
    toast.success("Bid placed successfully!");
    setShowBidModal(null);
    setBidAmount("");
  };

  const getUrgencyColor = (timeLeft) => {
    if (timeLeft.includes("hour")) return "text-red-600 bg-red-50";
    if (timeLeft.includes("1 day")) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Produce Repository</h1>
        <p className="text-gray-600">Browse and bid on fresh produce from verified farmers across Kenya</p>
      </div>

      {/* Categories Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-white shadow-lg rounded-xl">
          <TabsTrigger value="all" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            All ({produceListings.length})
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Search and Filters */}
        <Card className="bg-white shadow-lg mt-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    placeholder="Search crops or farmers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter</label>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">{filteredListings.length} listings found</p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-3">
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
                  <Badge className="capitalize bg-blue-100 text-blue-800">{listing.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className="font-medium">{listing.quantity}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Asking Price:</span>
                  <span className="font-medium text-green-600">{listing.askingPrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Bid:</span>
                  <span className="font-bold text-blue-600">{listing.currentBid}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quality:</span>
                  <Badge variant="outline" className="text-xs">{listing.quality}</Badge>
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
                  {showBidModal === listing.id ? (
                    <div className="space-y-2">
                      <Input 
                        placeholder="Enter your bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
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
                          onClick={() => setShowBidModal(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setShowBidModal(listing.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      >
                        <Gavel className="w-4 h-4 mr-1" />
                        Place Bid
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ProduceRepository;
