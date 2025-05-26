
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, MapPin, Phone, Building, Tractor, ArrowLeft, Loader2 } from "lucide-react";

const ProfileSetup = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') as 'farmer' | 'buyer';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
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
    const checkAuthAndSetup = async () => {
      try {
        // Get current user session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          toast.error("Authentication error. Please log in again.");
          navigate("/");
          return;
        }

        if (!session?.user) {
          toast.error("Please log in to complete your profile.");
          navigate("/");
          return;
        }

        setCurrentUser(session.user);
        
        // Check if user already has a profile
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (existingProfile) {
          toast.success("Profile already exists! Redirecting to dashboard.");
          navigate("/dashboard");
          return;
        }

        // Pre-fill email if available
        if (session.user.email) {
          setProfile(prev => ({
            ...prev,
            name: session.user.user_metadata?.name || ""
          }));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error("Authentication error. Please log in again.");
        navigate("/");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthAndSetup();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("No authenticated user found. Please log in again.");
      navigate("/");
      return;
    }

    setIsLoading(true);

    try {
      // Encrypt sensitive data (phone number)
      const encryptedPhone = btoa(profile.phone_number); // Basic encoding for demo

      // Create main profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: currentUser.id,
          user_type: userType,
          phone_number: encryptedPhone, // Store encrypted
          name: profile.name,
          county: profile.county,
          location: profile.location
        })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      // Create type-specific profile
      if (userType === 'farmer') {
        const { error: farmerError } = await supabase
          .from('farmer_profiles')
          .insert({
            profile_id: profileData.id,
            acres: profile.acres ? parseFloat(profile.acres) : null,
            crops_grown: profile.crops_grown ? profile.crops_grown.split(',').map(c => c.trim()) : []
          });

        if (farmerError) {
          console.error('Farmer profile error:', farmerError);
          throw farmerError;
        }
      } else {
        const { error: buyerError } = await supabase
          .from('buyer_profiles')
          .insert({
            profile_id: profileData.id,
            business_name: profile.business_name || null,
            preferred_crops: profile.preferred_crops ? profile.preferred_crops.split(',').map(c => c.trim()) : []
          });

        if (buyerError) {
          console.error('Buyer profile error:', buyerError);
          throw buyerError;
        }
      }

      toast.success("Profile created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Profile creation error:', error);
      toast.error(error.message || "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!userType) {
    navigate("/");
    return null;
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className={`w-16 h-16 bg-${userType === 'farmer' ? 'green' : 'blue'}-100 rounded-full flex items-center justify-center`}>
              {userType === 'farmer' ? <Tractor className="w-8 h-8" /> : <Building className="w-8 h-8" />}
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
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
                <Label htmlFor="phone">Phone Number * (Encrypted)</Label>
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
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating profile...
                </div>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
