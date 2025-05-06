import React from 'react';
import { Shield, Lock, Bell, Database } from 'lucide-react';

export function Privacy() {
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
            backgroundImage: "url('https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            filter: "brightness(0.4)"
          }}
        />
        
        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy <span className="text-[#004aad]">Policy</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl text-gray-200 max-w-2xl">
            We take your privacy seriously. Learn how we protect and manage your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/20 p-4 rounded-xl mb-6 inline-block text-[#004aad]">
              <Database className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Name and contact information</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Date of birth and identity verification</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Payment and transaction details</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Game history and preferences</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/20 p-4 rounded-xl mb-6 inline-block text-[#004aad]">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Provide and improve our services</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Process transactions securely</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Send important notifications</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#cb6ce6] rounded-full"></div>
                <span>Prevent fraud and ensure compliance</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C]">
            <div className="bg-[#1A8754]/20 p-4 rounded-xl mb-6 inline-block text-[#004aad]">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement industry-standard security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Encryption</h3>
                <p className="text-sm text-gray-300">All data is encrypted in transit and at rest</p>
              </div>
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Access Control</h3>
                <p className="text-sm text-gray-300">Strict access controls and authentication</p>
              </div>
              <div className="bg-[#1A3A5C] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Regular Audits</h3>
                <p className="text-sm text-gray-300">Continuous security monitoring and audits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}