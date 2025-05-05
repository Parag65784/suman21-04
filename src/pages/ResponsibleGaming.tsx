import React from 'react';
import { Shield, Clock, AlertTriangle, HeartHandshake } from 'lucide-react';

export function ResponsibleGaming() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] to-[#0D3158] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] border-[15px] border-dashed border-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] border-[10px] border-dashed border-white rounded-full"></div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/4019766/pexels-photo-4019766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            filter: "brightness(0.4)"
          }}
        />
        
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Responsible <span className="text-[#F5B729]">Gaming</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl text-gray-200 max-w-2xl">
            Your wellbeing is our priority. Learn about our responsible gaming practices and support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
            <p className="text-gray-300 mb-6">
              At CrickWin, we are committed to promoting responsible gaming and ensuring
              our platform remains a safe and enjoyable environment for all users.
            </p>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>24/7 support for problem gambling</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Self-exclusion options</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Deposit and game limits</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Setting Limits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Deposit Limits</h3>
                <p className="text-sm text-gray-300">Set daily, weekly, or monthly deposit caps</p>
              </div>
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Game Limits</h3>
                <p className="text-sm text-gray-300">Control maximum bet amounts</p>
              </div>
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Time Limits</h3>
                <p className="text-sm text-gray-300">Set session duration limits</p>
              </div>
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Loss Limits</h3>
                <p className="text-sm text-gray-300">Protect against excessive losses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Signs of Problem Gambling</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                  <span>Playing more than you can afford to lose</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                  <span>Borrowing money or selling items to gamble</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                  <span>Neglecting work, school, or family commitments</span>
                </div>
              </div>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                  <span>Chasing losses with larger bets</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                  <span>Lying about gambling habits</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#F5B729] rounded-full mt-2"></div>
                  <span>Feeling anxious or stressed about gaming</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}