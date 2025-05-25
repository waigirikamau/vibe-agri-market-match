
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, MapPin, Phone, Building, Tractor } from "lucide-react";

const ProfileSetup = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') as 'farmer' | 'buyer';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "",
    county: "",
    location: "",
    phone_number: "",
    // Farmer specific
    acres: "",
    crops_grown: "",
    // Buyer specific
    business_name: "",
    preferred_crops: ""
  });

  useEffect(() => {
    // Get current user to prefill phone number
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.phone_number) {
        setProfile(prev => ({
          ...prev,
          phone_number: user.user_metadata.phone_number
        }));
      }
    };
    getCurrentUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      // Create main profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          user_type: userType,
          phone_number: profile.phone_number,
          name: profile.name,
          county: profile.county,
          location: profile.location
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Create type-specific profile
      if (userType === 'farmer') {
        const { error: farmerError } = await supabase
          .from('farmer_profiles')
          .insert({
            profile_id: profileData.id,
            acres: profile.acres ? parseFloat(profile.acres) : null,
            crops_grown: profile.crops_grown ? profile.crops_grown.split(',').map(c => c.trim()) : []
          });

        if (farmerError) throw farmerError;
      } else {
        const { error: buyerError } = await supabase
          .from('buyer_profiles')
          .insert({
            profile_id: profileData.id,
            business_name: profile.business_name || null,
            preferred_crops: profile.preferred_crops ? profile.preferred_crops.split(',').map(c => c.trim()) : []
          });

        if (buyerError) throw buyerError;
      }

      toast.success("Profile created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userType) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 bg-${userType === 'farmer' ? 'green' : 'blue'}-100 rounded-full flex items-center justify-center`}>
            {userType === 'farmer' ? <Tractor className="w-8 h-8" /> : <Building className="w-8 h-8" />}
          </div>
          <CardTitle className="text-2xl">Complete Your {userType === 'farmer' ? 'Farmer' : 'Buyer'} Profile</CardTitle>
          <CardDescription>
            Fill in your details to start using Shamba Connect
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    placeholder="John Kamau"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={profile.phone_number}
                    onChange={(e) => setProfile({...profile, phone_number: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="county">County *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="county"
                    placeholder="Nakuru"
                    value={profile.county}
                    onChange={(e) => setProfile({...profile, county: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location/Town *</Label>
                <Input
                  id="location"
                  placeholder="Nakuru Town"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  required
                />
              </div>
            </div>

            {userType === 'farmer' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="acres">Farm Size (Acres)</Label>
                  <Input
                    id="acres"
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={profile.acres}
                    onChange={(e) => setProfile({...profile, acres: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crops">Crops You Grow</Label>
                  <Textarea
                    id="crops"
                    placeholder="Maize, Tomatoes, Avocados (separate with commas)"
                    value={profile.crops_grown}
                    onChange={(e) => setProfile({...profile, crops_grown: e.target.value})}
                  />
                </div>
              </>
            )}

            {userType === 'buyer' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="business">Business Name (Optional)</Label>
                  <Input
                    id="business"
                    placeholder="Fresh Mart Ltd"
                    value={profile.business_name}
                    onChange={(e) => setProfile({...profile, business_name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred">Preferred Crops</Label>
                  <Textarea
                    id="preferred"
                    placeholder="Tomatoes, Potatoes, Onions (separate with commas)"
                    value={profile.preferred_crops}
                    onChange={(e) => setProfile({...profile, preferred_crops: e.target.value})}
                  />
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className={`w-full bg-${userType === 'farmer' ? 'green' : 'blue'}-600 hover:bg-${userType === 'farmer' ? 'green' : 'blue'}-700`}
              disabled={isLoading}
            >
              {isLoading ? "Creating profile..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
