
import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Header = () => {
  const handleNotificationClick = () => {
    toast.info("Notifications panel would open here");
  };

  const handleProfileClick = () => {
    toast.info("Profile menu would open here");
  };

  const handleMenuClick = () => {
    toast.info("Mobile menu would open here");
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
            Shamba Connect
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative hover:bg-green-50 transition-colors" 
            onClick={handleNotificationClick}
          >
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
              3
            </Badge>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-green-50 transition-colors"
            onClick={handleProfileClick}
          >
            <User className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden hover:bg-green-50 transition-colors"
            onClick={handleMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
