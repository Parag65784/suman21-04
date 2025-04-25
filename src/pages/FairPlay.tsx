import React from 'react';
import { Shield, UserCheck, AlertTriangle, Scale } from 'lucide-react';

export function FairPlay() {
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
            backgroundImage: "url('https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            filter: "brightness(0.4)"
          }}
        />
        
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fair Play <span className="text-[#F5B729]">Policy</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl text-gray-200 max-w-2xl">
            Our commitment to maintaining the highest standards of fair play and transparency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Fair Gaming Practices</h2>
            <p className="text-gray-300">
              CrickWin is committed to maintaining the highest standards of fair play
              and ensuring all betting activities are conducted transparently and ethically.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Anti-Fraud Measures</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Multiple accounts prevention</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Bonus abuse detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Payment fraud protection</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F5B729] rounded-full"></div>
                <span>Match fixing prevention</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Account Verification</h2>
            <p className="text-gray-300">
              To ensure fair play, we require all users to verify their identity
              before making withdrawals. This helps us maintain a secure and
              trustworthy platform for all users.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Identity Verification</h3>
                <p className="text-sm text-gray-300">Submit government-issued ID</p>
              </div>
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Address Proof</h3>
                <p className="text-sm text-gray-300">Recent utility bill or bank statement</p>
              </div>
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Payment Verification</h3>
                <p className="text-sm text-gray-300">Verify payment methods ownership</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}