import React, { useEffect, useState } from 'react';

export const AboutHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/pages/Untitled%20design%20(5).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYWdlcy9VbnRpdGxlZCBkZXNpZ24gKDUpLnBuZyIsImlhdCI6MTc0NTc2MTg1MywiZXhwIjoxNzc3Mjk3ODUzfQ.G6gJ1s4z2txkqN_ZolSrOgZNgKyWIGj904jokHLvHs4')",
          filter: "brightness(0.8)"
        }}
      />
      
      {/* Cricket ball vector art overlay */}
      <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] opacity-10">
        <div className="w-full h-full rounded-full border-[12px] border-[#F5B729] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[70%] h-[70%] border-[6px] border-dashed border-[#F5B729] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            About <span className="text-[#F5B729]">CrickWin</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
            Your trusted platform for cricket gaming and predictions, combining passion for cricket with cutting-edge technology.
          </p>
        </div>
      </div>
      
      {/* Cricket stumps decoration at bottom */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <div className="h-16 w-1 mx-1 bg-[#FF671F] rounded-t-md"></div>
        <div className="h-20 w-1 mx-1 bg-white rounded-t-md"></div>
        <div className="h-16 w-1 mx-1 bg-[#046A38] rounded-t-md"></div>
      </div>
    </div>
  );
};