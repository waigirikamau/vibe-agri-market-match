
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Phone, Mail, Camera } from "lucide-react";
import { toast } from "sonner";

const ProfileCreation = () => {
  const [userType, setUserType] = useState("farmer");
  const [farmerProfile, setFarmerProfile] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    farmSize: "",
    mainCrops: "",
    experience: "",
    bio: ""
  });

  const [buyerProfile, setBuyerProfile] = useState({
    name: "",
    businessName: "",
    location: "",
    phone: "",
    email: "",
    businessType: "",
    preferredCrops: "",
    bio: ""
  });

  const handleFarmerSubmit = () => {
    if (!farmerProfile.name || !farmerProfile.location || !farmerProfile.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Farmer profile created successfully!");
  };

  const handleBuyerSubmit = () => {
    if (!buyerProfile.name || !buyerProfile.location || !buyerProfile.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Buyer profile created successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-800">Create Your Profile</CardTitle>
          <CardDescription>Join Shamba Connect as a farmer or buyer</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={setUserType} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="farmer" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                I'm a Farmer
              </TabsTrigger>
              <TabsTrigger value="buyer" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                I'm a Buyer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="farmer" className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">Full Name *</Label>
                  <Input
                    id="farmer-name"
                    placeholder="John Kamau"
                    value={farmerProfile.name}
                    onChange={(e) => setFarmerProfile({...farmerProfile, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmer-location">Location *</Label>
                  <Input
                    id="farmer-location"
                    placeholder="Nakuru, Kenya"
                    value={farmerProfile.location}
                    onChange={(e) => setFarmerProfile({...farmerProfile, location: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmer-phone">Phone Number *</Label>
                  <Input
                    id="farmer-phone"
                    placeholder="+254 700 000 000"
                    value={farmerProfile.phone}
                    onChange={(e) => setFarmerProfile({...farmerProfile, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmer-email">Email</Label>
                  <Input
                    id="farmer-email"
                    type="email"
                    placeholder="john@example.com"
                    value={farmerProfile.email}
                    onChange={(e) => setFarmerProfile({...farmerProfile, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm-size">Farm Size</Label>
                  <Select value={farmerProfile.farmSize} onValueChange={(value) => setFarmerProfile({...farmerProfile, farmSize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (0-2 acres)</SelectItem>
                      <SelectItem value="medium">Medium (2-10 acres)</SelectItem>
                      <SelectItem value="large">Large (10+ acres)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Farming Experience</Label>
                  <Select value={farmerProfile.experience} onValueChange={(value) => setFarmerProfile({...farmerProfile, experience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">0-2 years</SelectItem>
                      <SelectItem value="intermediate">3-10 years</SelectItem>
                      <SelectItem value="experienced">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="main-crops">Main Crops</Label>
                <Input
                  id="main-crops"
                  placeholder="Maize, Tomatoes, Avocados"
                  value={farmerProfile.mainCrops}
                  onChange={(e) => setFarmerProfile({...farmerProfile, mainCrops: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-bio">Bio</Label>
                <Textarea
                  id="farmer-bio"
                  placeholder="Tell buyers about your farming practices, quality standards, etc."
                  value={farmerProfile.bio}
                  onChange={(e) => setFarmerProfile({...farmerProfile, bio: e.target.value})}
                />
              </div>

              <Button onClick={handleFarmerSubmit} className="w-full bg-green-600 hover:bg-green-700">
                Create Farmer Profile
              </Button>
            </TabsContent>

            <TabsContent value="buyer" className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-name">Full Name *</Label>
                  <Input
                    id="buyer-name"
                    placeholder="Mary Wanjiku"
                    value={buyerProfile.name}
                    onChange={(e) => setBuyerProfile({...buyerProfile, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    placeholder="Fresh Mart Ltd"
                    value={buyerProfile.businessName}
                    onChange={(e) => setBuyerProfile({...buyerProfile, businessName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-location">Location *</Label>
                  <Input
                    id="buyer-location"
                    placeholder="Nairobi, Kenya"
                    value={buyerProfile.location}
                    onChange={(e) => setBuyerProfile({...buyerProfile, location: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-phone">Phone Number *</Label>
                  <Input
                    id="buyer-phone"
                    placeholder="+254 700 000 000"
                    value={buyerProfile.phone}
                    onChange={(e) => setBuyerProfile({...buyerProfile, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-email">Email</Label>
                  <Input
                    id="buyer-email"
                    type="email"
                    placeholder="mary@freshmart.com"
                    value={buyerProfile.email}
                    onChange={(e) => setBuyerProfile({...buyerProfile, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select value={buyerProfile.businessType} onValueChange={(value) => setBuyerProfile({...buyerProfile, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retailer">Retailer</SelectItem>
                      <SelectItem value="wholesaler">Wholesaler</SelectItem>
                      <SelectItem value="processor">Processor</SelectItem>
                      <SelectItem value="exporter">Exporter</SelectItem>
                      <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred-crops">Preferred Crops</Label>
                <Input
                  id="preferred-crops"
                  placeholder="Tomatoes, Potatoes, Onions"
                  value={buyerProfile.preferredCrops}
                  onChange={(e) => setBuyerProfile({...buyerProfile, preferredCrops: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buyer-bio">Bio</Label>
                <Textarea
                  id="buyer-bio"
                  placeholder="Tell farmers about your business, quality requirements, payment terms, etc."
                  value={buyerProfile.bio}
                  onChange={(e) => setBuyerProfile({...buyerProfile, bio: e.target.value})}
                />
              </div>

              <Button onClick={handleBuyerSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
                Create Buyer Profile
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCreation;
