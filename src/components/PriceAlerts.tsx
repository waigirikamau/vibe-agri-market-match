
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Bell, Phone, MessageSquare, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      crop: "Maize",
      location: "Nakuru",
      currentPrice: "45 KSH/kg",
      targetPrice: "50 KSH/kg",
      trend: "up",
      change: "+5%",
      alertType: "SMS",
      active: true
    },
    {
      id: 2,
      crop: "Tomatoes",
      location: "Kiambu",
      currentPrice: "80 KSH/kg",
      targetPrice: "75 KSH/kg",
      trend: "down",
      change: "-8%",
      alertType: "USSD",
      active: true
    },
    {
      id: 3,
      crop: "Avocados",
      location: "Murang'a",
      currentPrice: "25 KSH/piece",
      targetPrice: "30 KSH/piece",
      trend: "up",
      change: "+2%",
      alertType: "App",
      active: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crop: "",
    location: "",
    targetPrice: "",
    alertType: "SMS"
  });

  const marketPrices = [
    { crop: "Maize", market: "Nakuru Market", price: "45 KSH/kg", trend: "up", change: "+5%" },
    { crop: "Tomatoes", market: "Wakulima Market", price: "80 KSH/kg", trend: "down", change: "-8%" },
    { crop: "Avocados", market: "Kiambu Market", price: "25 KSH/piece", trend: "up", change: "+2%" },
    { crop: "Potatoes", market: "Meru Market", price: "60 KSH/kg", trend: "up", change: "+3%" },
    { crop: "Bananas", market: "Kisii Market", price: "150 KSH/bunch", trend: "down", change: "-2%" },
    { crop: "Onions", market: "Migori Market", price: "120 KSH/kg", trend: "up", change: "+7%" }
  ];

  const handleAddAlert = () => {
    if (!newAlert.crop || !newAlert.location || !newAlert.targetPrice) {
      toast.error("Please fill in all fields");
      return;
    }

    const alert = {
      id: alerts.length + 1,
      crop: newAlert.crop,
      location: newAlert.location,
      currentPrice: "Current price",
      targetPrice: newAlert.targetPrice,
      trend: "up",
      change: "0%",
      alertType: newAlert.alertType,
      active: true
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ crop: "", location: "", targetPrice: "", alertType: "SMS" });
    setShowAddForm(false);
    toast.success("Price alert created successfully!");
  };

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success("Alert deleted successfully!");
  };

  const toggleAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* USSD Quick Access */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Quick Price Check (No Internet Required)
          </CardTitle>
          <CardDescription className="text-green-100">
            Dial these codes for instant price updates via USSD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">*123#</div>
              <div className="text-sm opacity-90">All Market Prices</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">*123*1#</div>
              <div className="text-sm opacity-90">Cereal Prices</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">*123*2#</div>
              <div className="text-sm opacity-90">Vegetable Prices</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Market Prices */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Live Market Prices
          </CardTitle>
          <CardDescription>
            Real-time prices from major markets across Kenya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketPrices.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-gray-800">{item.crop}</div>
                    <div className="text-sm text-gray-600">{item.market}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {item.change}
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600">{item.price}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Alerts */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Price Alerts</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Alert
        </Button>
      </div>

      {/* Add Alert Form */}
      {showAddForm && (
        <Card className="bg-white shadow-xl border-blue-200 animate-in slide-in-from-top duration-300">
          <CardHeader>
            <CardTitle className="text-blue-800">Create Price Alert</CardTitle>
            <CardDescription>Get notified when prices reach your target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type</Label>
                <Select value={newAlert.crop} onValueChange={(value) => setNewAlert({...newAlert, crop: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
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
                <Label htmlFor="location">Market/Location</Label>
                <Select value={newAlert.location} onValueChange={(value) => setNewAlert({...newAlert, location: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nakuru">Nakuru</SelectItem>
                    <SelectItem value="Kiambu">Kiambu</SelectItem>
                    <SelectItem value="Murang'a">Murang'a</SelectItem>
                    <SelectItem value="Meru">Meru</SelectItem>
                    <SelectItem value="Kisii">Kisii</SelectItem>
                    <SelectItem value="Migori">Migori</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetPrice">Target Price</Label>
                <Input 
                  placeholder="e.g., 50 KSH/kg"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alertType">Alert Method</Label>
                <Select value={newAlert.alertType} onValueChange={(value) => setNewAlert({...newAlert, alertType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="USSD">USSD</SelectItem>
                    <SelectItem value="App">App Notification</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAddAlert}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Alert
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`${alert.active ? 'bg-white border-blue-200' : 'bg-gray-50 border-gray-200'} shadow-lg transition-all duration-300`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    {alert.crop}
                    <Badge 
                      variant={alert.active ? "default" : "secondary"}
                      className={alert.active ? "bg-green-500" : "bg-gray-500"}
                    >
                      {alert.active ? "Active" : "Paused"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{alert.location}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleAlert(alert.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Price:</span>
                <span className="font-medium">{alert.currentPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Target Price:</span>
                <span className="font-medium text-blue-600">{alert.targetPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Trend:</span>
                <div className={`flex items-center gap-1 ${
                  alert.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {alert.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{alert.change}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Alert via:</span>
                <Badge variant="outline" className="text-xs">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {alert.alertType}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PriceAlerts;
