
import Image from "next/image";

import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="bg-white">
        
        <main className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Empowering Farmers with AgriWise
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                AgriWise is a comprehensive platform offering AI-driven crop
                prediction, real-time inventory management, and tailored
                agricultural insights to help farmers maximize yield and
                efficiency.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Access expert guidance on crop health, input products, and farm
                management with ease. AgriWise brings data-driven solutions
                right to farmers&apos; fingertips for proactive decision-making.
              </p>
              <p className="text-lg text-gray-600">
                Join AgriWise to transform your farming experience with
                technology and insights designed for sustainable growth.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="w-full h-96 bg-green-600 rounded-full overflow-hidden relative">
                <Image
                  src="/logo.webp"
                  alt="Happy Indian farming family using AgriWise"
                  width={400}
                  height={400}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-transparent opacity-50"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
