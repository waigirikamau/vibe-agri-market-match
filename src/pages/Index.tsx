
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, MapPin, Bell, MessageSquare, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import FarmerDashboard from "@/components/FarmerDashboard";
import BuyerMarketplace from "@/components/BuyerMarketplace";
import PriceAlerts from "@/components/PriceAlerts";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-600/10 backdrop-blur-sm"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
            <TrendingUp className="w-4 h-4" />
            Real-time market prices
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            Shamba Connect
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connecting farmers directly to buyers with AI-powered market insights, 
            real-time pricing, and secure transactions across East Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setActiveTab("dashboard")}
            >
              Start as Farmer
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setActiveTab("marketplace")}
            >
              Browse as Buyer
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-green-800">USSD/SMS Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get price updates via SMS - no internet required</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-yellow-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <CardTitle className="text-yellow-800">Direct Bidding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Buyers bid directly on your produce for better prices</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <Smartphone className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-orange-800">M-Pesa Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Instant payments through mobile money</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-white shadow-lg rounded-xl">
              <TabsTrigger value="dashboard" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Farmer Dashboard
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Marketplace
              </TabsTrigger>
              <TabsTrigger value="alerts" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Price Alerts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-8">
              <FarmerDashboard />
            </TabsContent>
            
            <TabsContent value="marketplace" className="mt-8">
              <BuyerMarketplace />
            </TabsContent>
            
            <TabsContent value="alerts" className="mt-8">
              <PriceAlerts />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;
