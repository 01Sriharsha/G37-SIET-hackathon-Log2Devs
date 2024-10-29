import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function PreviewTwo() {
  const features = [
    { icon: "🤖", title: "AI-Based Crop Prediction" },
    { icon: "📦", title: "Inventory Management" },
    { icon: "🌱", title: "Crop Planner" },
    { icon: "🌦️", title: "Weather Alerts" },
    { icon: "👨‍🌾", title: "Connect with Community" },
    { icon: "💹", title: "Mandi Rates & Market Linkage" },
  ];

  return (
    <div className="bg-white min-h-1/2 my-40 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Digital Solutions for Farmers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col items-center p-4">
            <CardHeader className="text-5xl">{feature.icon}</CardHeader>
            <CardTitle className="text-lg font-semibold mt-2">
              {feature.title}
            </CardTitle>
          </Card>
        ))}
      </div>
    </div>
  );
}
