
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, TrendingUp, MapPin, Clock, Camera } from "lucide-react";
import { toast } from "sonner";

const FarmerDashboard = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      crop: "Maize",
      quantity: "500 kg",
      price: "45 KSH/kg",
      location: "Nakuru",
      status: "Active",
      bids: 3,
      bestBid: "48 KSH/kg"
    },
    {
      id: 2,
      crop: "Tomatoes",
      quantity: "200 kg",
      price: "80 KSH/kg",
      location: "Kiambu",
      status: "Sold",
      bids: 7,
      bestBid: "85 KSH/kg"
    },
    {
      id: 3,
      crop: "Avocados",
      quantity: "300 pieces",
      price: "25 KSH/piece",
      location: "Murang'a",
      status: "Active",
      bids: 2,
      bestBid: "28 KSH/piece"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newListing, setNewListing] = useState({
    crop: "",
    quantity: "",
    price: "",
    location: "",
    description: ""
  });

  const handleAddListing = () => {
    if (!newListing.crop || !newListing.quantity || !newListing.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const listing = {
      id: listings.length + 1,
      crop: newListing.crop,
      quantity: newListing.quantity,
      price: newListing.price,
      location: newListing.location,
      status: "Active",
      bids: 0,
      bestBid: "No bids yet"
    };

    setListings([...listings, listing]);
    setNewListing({ crop: "", quantity: "", price: "", location: "", description: "" });
    setShowAddForm(false);
    toast.success("Listing added successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Active Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.reduce((sum, listing) => sum + listing.bids, 0)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Items Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.filter(l => l.status === "Sold").length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">This Month Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH 45,200</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Listing Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Produce Listings</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {/* Add Listing Form */}
      {showAddForm && (
        <Card className="bg-white shadow-xl border-green-200 animate-in slide-in-from-top duration-300">
          <CardHeader>
            <CardTitle className="text-green-800">Add New Produce Listing</CardTitle>
            <CardDescription>List your produce to connect with buyers directly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type *</Label>
                <Select value={newListing.crop} onValueChange={(value) => setNewListing({...newListing, crop: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maize">Maize</SelectItem>
                    <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                    <SelectItem value="Avocados">Avocados</SelectItem>
                    <SelectItem value="Potatoes">Potatoes</SelectItem>
                    <SelectItem value="Bananas">Bananas</SelectItem>
                    <SelectItem value="Onions">Onions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input 
                  placeholder="e.g., 500 kg"
                  value={newListing.quantity}
                  onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Expected Price *</Label>
                <Input 
                  placeholder="e.g., 45 KSH/kg"
                  value={newListing.price}
                  onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  placeholder="e.g., Nakuru"
                  value={newListing.location}
                  onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                placeholder="Describe your produce quality, harvesting date, etc."
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAddListing}
                className="bg-green-600 hover:bg-green-700"
              >
                Add Listing
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button variant="outline" className="ml-auto">
                <Camera className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-gray-800">{listing.crop}</CardTitle>
                <Badge 
                  variant={listing.status === "Active" ? "default" : "secondary"}
                  className={listing.status === "Active" ? "bg-green-500" : "bg-gray-500"}
                >
                  {listing.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {listing.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Quantity:</span>
                <span className="font-medium">{listing.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Your Price:</span>
                <span className="font-medium text-green-600">{listing.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Best Bid:</span>
                <span className="font-medium text-blue-600">{listing.bestBid}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{listing.bids} bids</span>
                </div>
                {listing.status === "Active" && (
                  <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                    View Bids
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;
