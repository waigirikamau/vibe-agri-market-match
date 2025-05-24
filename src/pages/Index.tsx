
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
import ProfileCreation from "@/components/ProfileCreation";
import ProduceRepository from "@/components/ProduceRepository";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative py-12 lg:py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')"
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-yellow-900/80 backdrop-blur-[1px]"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100/90 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            Real-time market prices
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent mb-6 animate-fade-in drop-shadow-lg">
            Shamba Connect
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Connecting farmers directly to buyers with AI-powered market insights, 
            real-time pricing, and secure transactions across East Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-green-600/90 hover:bg-green-700 text-white px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              onClick={() => setActiveTab("dashboard")}
            >
              Start as Farmer
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/80 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setActiveTab("marketplace")}
            >
              Browse as Buyer
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-md border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-base lg:text-lg text-green-800">USSD/SMS Alerts</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm lg:text-base text-gray-600">Get price updates via SMS - no internet required</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-md border-yellow-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-600 mx-auto mb-2" />
                <CardTitle className="text-base lg:text-lg text-yellow-800">Direct Bidding</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm lg:text-base text-gray-600">Buyers bid directly on your produce for better prices</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-md border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <Smartphone className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-base lg:text-lg text-orange-800">M-Pesa Integration</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm lg:text-base text-gray-600">Instant payments through mobile money</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-8 lg:py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto mb-8 bg-white shadow-lg rounded-xl overflow-x-auto">
              <TabsTrigger value="dashboard" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs lg:text-sm">
                Farmer Dashboard
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs lg:text-sm">
                Marketplace
              </TabsTrigger>
              <TabsTrigger value="repository" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs lg:text-sm">
                Repository
              </TabsTrigger>
              <TabsTrigger value="profiles" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs lg:text-sm">
                Profiles
              </TabsTrigger>
              <TabsTrigger value="alerts" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs lg:text-sm">
                Price Alerts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-8">
              <FarmerDashboard />
            </TabsContent>
            
            <TabsContent value="marketplace" className="mt-8">
              <BuyerMarketplace />
            </TabsContent>
            
            <TabsContent value="repository" className="mt-8">
              <ProduceRepository />
            </TabsContent>
            
            <TabsContent value="profiles" className="mt-8">
              <ProfileCreation />
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
