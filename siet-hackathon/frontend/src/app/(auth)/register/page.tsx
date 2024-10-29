"use client";
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Lock, Phone, MapPin, User } from 'lucide-react';

interface Crop {
  name: string;
  icon: string; // You can use ReactNode if you want to use components as icons
}

const crops: Crop[] = [
  { name: 'Rice', icon: '🌾' },
  { name: 'Wheat', icon: '🌾' },
  { name: 'Hotpepper', icon: '🌶️' },
  { name: 'Tomato', icon: '🍅' },
  { name: 'Cabbage', icon: '🥬' },
  { name: 'Cauliflower', icon: '🥦' },
  { name: 'Bengal gram', icon: '🌱' },
  { name: 'Onion', icon: '🧅' },
  { name: 'Potato', icon: '🥔' },
  { name: 'Sugarcane', icon: '🍭' },
  { name: 'Soyabean', icon: '🫘' },
  { name: 'Pearl millet', icon: '🌾' },
];

export default function CreateAccountForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const toggleCrop = (cropName: string) => {
    setSelectedCrops(prev => 
      prev.includes(cropName) 
        ? prev.filter(name => name !== cropName)
        : [...prev, cropName]
    );
  };

  const handleSendOtp = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/send-otp', { phone });
      console.log(response.data); // Handle response
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/create-account', {
        name,
        password,
        gender,
        phone,
        address,
        selectedCrops,
        otp,
      });
      console.log(response.data); // Handle response
      // Redirect or show success message here
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <Card className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <CardContent>
          <h1 className="text-3xl font-bold mb-6">Create new account.</h1>
          <form className="space-y-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Names" 
                className="pl-10 pr-4 py-2 w-full bg-gray-50 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="pl-10 pr-4 py-2 w-full bg-gray-50 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </Button>
            </div>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Input 
                type="tel" 
                placeholder="Phone" 
                className="pl-10 pr-4 py-2 w-full bg-gray-50 rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Address" 
                className="pl-10 pr-4 py-2 w-full bg-gray-50 rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Select your crops</Label>
              <div className="grid grid-cols-3 gap-4">
                {crops.map((crop) => (
                  <div key={crop.name} className="flex items-center space-x-2">
                    <Checkbox 
                      id={crop.name} 
                      checked={selectedCrops.includes(crop.name)}
                      onCheckedChange={() => toggleCrop(crop.name)}
                    />
                    <label
                      htmlFor={crop.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {crop.icon} {crop.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter OTP" 
                className="pl-10 pr-4 py-2 w-full bg-gray-50 rounded-md"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!otpSent}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔢</span>
            </div>
            <Button 
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleSendOtp}
              disabled={otpSent}
            >
              {otpSent ? 'OTP Sent' : 'Send OTP'}
            </Button>
            <Button 
              type="button"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              onClick={handleCreateAccount}
              disabled={!otpSent || otp.length === 0}
            >
              Create account
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? 
            <a href="#" className="text-green-500 hover:text-green-600 ml-1">Log In</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
