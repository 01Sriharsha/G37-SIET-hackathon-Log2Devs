"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin } from "lucide-react";

interface Crop {
  name: string;
  icon: string;
}

interface Farmer {
  name: string;
  phone: string;
  address: string;
  crops: Crop[];
  avatarUrl?: string; // Optional field for avatar URL
}

export default function FarmerProfile() {
  // Uncomment the following lines for dynamic fetching
  // const [farmer, setFarmer] = useState<Farmer | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchFarmerData = async () => {
  //     try {
  //       const response = await axios.get<Farmer>("YOUR_API_ENDPOINT_HERE");
  //       setFarmer(response.data);
  //     } catch (err) {
  //       setError("Failed to load farmer data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchFarmerData();
  // }, []);

  // Static data for testing
  const farmer: Farmer = {
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    address: "123 Farm Road, Cropville, AG 12345",
    crops: [
      { name: "Rice", icon: "🌾" },
      { name: "Wheat", icon: "🌾" },
      { name: "Tomato", icon: "🍅" },
      { name: "Potato", icon: "🥔" },
      { name: "Corn", icon: "🌽" },
      { name: "Carrot", icon: "🥕" },
    ],
    avatarUrl: "/placeholder.svg?height=96&width=96", // Static avatar URL
  };

  // Simulating loading state
  const loading = false; // Set to true if you want to show loading state
  const error = null; // Set an error message if needed

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4 sm:p-6 md:p-8">
      <Card className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden"> {/* Increased width */}
        <CardHeader className="pb-0">
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 border-4 border-green-500"> {/* Increased avatar size */}
              <AvatarImage
                src={farmer.avatarUrl}
                alt="Farmer avatar"
              />
              <AvatarFallback className="bg-green-100 text-green-800 text-3xl font-bold"> {/* Adjusted font size */}
                {farmer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{farmer.name}</h2> {/* Increased font size */}
          <div className="flex items-center justify-center text-sm text-gray-600 mb-1">
            <Phone size={20} className="mr-2" /> {/* Increased icon size */}
            <span>{farmer.phone}</span>
          </div>
          <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
            <MapPin size={20} className="mr-2" /> {/* Increased icon size */}
            <span>{farmer.address}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-lg mx-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden"> {/* Increased width */}
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Selected Crops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {farmer.crops.map((crop) => (
              <div key={crop.name} className="flex flex-col items-center p-3 bg-green-50 rounded-lg"> {/* Increased padding */}
                <span className="text-4xl mb-1">{crop.icon}</span> {/* Increased icon size */}
                <span className="text-sm font-medium text-gray-700">{crop.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
