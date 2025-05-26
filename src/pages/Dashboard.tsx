
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/");
          return;
        }

        setUser(user);

        // Get user profile
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select(`
            *,
            farmer_profiles(*),
            buyer_profiles(*)
          `)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Profile fetch error:', error);
          // If no profile exists, redirect to profile setup
          if (error.code === 'PGRST116') {
            navigate('/profile-setup?type=farmer');
            return;
          }
        }

        // Decrypt phone number for display
        if (profileData?.phone_number) {
          try {
            profileData.phone_number = atob(profileData.phone_number);
          } catch (e) {
            console.log('Phone number not encrypted or invalid format');
          }
        }

        setProfile(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">
            Welcome to Shamba Connect
          </h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {profile && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Welcome, {profile.name}!
                <span className={`px-2 py-1 rounded-full text-xs ${
                  profile.user_type === 'farmer' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {profile.user_type}
                </span>
              </CardTitle>
              <CardDescription>
                {profile.location}, {profile.county}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <strong>Phone:</strong> {profile.phone_number}
                <span className="ml-2 text-xs text-gray-500">(Encrypted in database)</span>
              </div>
              
              <div>
                <strong>Verification Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  profile.verification_status === 'verified' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {profile.verification_status}
                </span>
              </div>

              {profile.user_type === 'farmer' && profile.farmer_profiles?.[0] && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Farm Details</h3>
                  {profile.farmer_profiles[0].acres && (
                    <p><strong>Farm Size:</strong> {profile.farmer_profiles[0].acres} acres</p>
                  )}
                  {profile.farmer_profiles[0].crops_grown?.length > 0 && (
                    <p><strong>Crops:</strong> {profile.farmer_profiles[0].crops_grown.join(', ')}</p>
                  )}
                </div>
              )}

              {profile.user_type === 'buyer' && profile.buyer_profiles?.[0] && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Buyer Details</h3>
                  {profile.buyer_profiles[0].business_name && (
                    <p><strong>Business:</strong> {profile.buyer_profiles[0].business_name}</p>
                  )}
                  {profile.buyer_profiles[0].preferred_crops?.length > 0 && (
                    <p><strong>Interested in:</strong> {profile.buyer_profiles[0].preferred_crops.join(', ')}</p>
                  )}
                </div>
              )}

              <div className="mt-6 text-center text-gray-600">
                <p>Dashboard features coming soon...</p>
                <p className="text-sm mt-2">
                  This will include crop listings, bidding, chat, and more!
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
