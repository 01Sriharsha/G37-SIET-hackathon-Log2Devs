import Image from "next/image";
import { Check } from "lucide-react";

export default function Preview() {
  return (
    <div className="bg-[#FFF9E5] min-h-screen flex items-center justify-center p-4">
      <div className=" w-full flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex justify-center relative">
          <Image
            src="/1.jpg"
            alt="AgriWise crop prediction screen"
            width={250}
            height={500}
            className="rounded-lg shadow-lg z-10"
          />
          <Image
            src="/2.jpg"
            alt="AgriWise inventory management screen"
            width={250}
            height={500}
            className="rounded-lg shadow-lg absolute left-24 top-8 -rotate-6"
          />
          <Image
            src="/3.jpg"
            alt="AgriWise product overview screen"
            width={250}
            height={500}
            className="rounded-lg shadow-lg absolute right-24 top-8 rotate-6"
          />
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            AgriWise – Your Smart Farming Companion
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Check className="text-green-500" />
              <span className="text-lg text-gray-700">
                AI-driven crop predictions to boost yield
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="text-green-500" />
              <span className="text-lg text-gray-700">
                Real-time inventory management for seamless operations
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="text-green-500" />
              <span className="text-lg text-gray-700">
                Easy, accessible tools to streamline farm management
              </span>
            </li>
          </ul>
          <p className="text-lg text-gray-700">
            Empower your farm with AgriWise&apos;s smart solutions. Click below to
            get started!
          </p>
          <a
            href="#"
            className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}
