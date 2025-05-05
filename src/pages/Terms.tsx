import React from 'react';
import { ScrollText, UserCheck, Scale, AlertTriangle } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] to-[#0D3158] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <div className="w-full h-full border-[2px] border-white rounded-full"></div>
            <div className="absolute inset-[10%] border-[2px] border-white rounded-full"></div>
            <div className="absolute inset-[20%] border-[2px] border-white rounded-full"></div>
            <div className="absolute inset-[30%] border-[2px] border-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            filter: "brightness(0.4)"
          }}
        />
        
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & <span className="text-[#F5B729]">Conditions</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl text-gray-200 max-w-2xl">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <ScrollText className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing and using CrickWin, you agree to be bound by these Terms and Conditions.
              If you do not agree with any part of these terms, you must not use our service.
            </p>
            <div className="bg-[#1A3A5C] p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                These terms constitute a legally binding agreement between you and CrickWin.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Eligibility</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Must be at least 18 years old</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Legal capacity to enter into contracts</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Not restricted by applicable laws</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Valid identity verification</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-3">General Rules</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                    <span>All bets are final once placed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                    <span>Minimum and maximum bet limits apply</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                    <span>Results are based on official match outcomes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-3">Void Bets</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                    <span>Technical errors or glitches</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                    <span>Suspicious gaming patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                    <span>Cancelled or abandoned matches</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}