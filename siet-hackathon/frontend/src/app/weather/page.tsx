import WeatherCard from "@/components/weather/page";
import IrrigationDashboard from "@/components/irrigation/page";

export default function Weather() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="w-1/2 p-4"> {/* Left card takes half of the screen */}
        <WeatherCard />
      </div>
      <div className="w-1/2 p-4"> {/* Right card takes half of the screen */}
        <IrrigationDashboard />
      </div>
    </div>
  );
}
