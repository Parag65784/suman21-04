import React, { useEffect, useState } from 'react';
import { Target, Trophy, Wallet, AlertTriangle, ChevronRight } from 'lucide-react';

export const HowToPlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1929]">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            filter: "brightness(0.4)"
          }}
        />
        
        {/* Decorative cricket ball pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] opacity-20">
            <div className="w-full h-full rounded-full border-[8px] border-[#F5B729]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70%] h-[70%] border-[4px] border-dashed border-[#F5B729] rounded-full animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              How to <span className="text-[#F5B729]">Play</span>
            </h1>
            <div className="w-20 h-1 bg-[#1A8754] mb-6" />
            <p className="text-xl text-gray-200 max-w-2xl">
              Your guide to making winning predictions and managing your cricket betting experience.
            </p>
          </div>
        </div>
      </div>

      {/* Match Winner Prediction Section */}
      <div className="py-20 bg-gradient-to-b from-[#0A1929] to-[#0D3158] relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Rangoli pattern */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
              <div className="w-full h-full border-[2px] border-white rounded-full"></div>
              <div className="absolute inset-[10%] border-[2px] border-white rounded-full"></div>
              <div className="absolute inset-[20%] border-[2px] border-white rounded-full"></div>
              <div className="absolute inset-[30%] border-[2px] border-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Match Winner Prediction</h2>
            <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Select Match",
                description: "Choose from upcoming cricket matches across different tournaments.",
                icon: <Trophy className="w-8 h-8" />
              },
              {
                title: "Choose Winner",
                description: "Select the team you predict will win the match.",
                icon: <Target className="w-8 h-8" />
              },
              {
                title: "Place Bet",
                description: "Enter your bet amount within the specified limits.",
                icon: <Wallet className="w-8 h-8" />
              },
              {
                title: "Confirm",
                description: "Review and confirm your prediction to complete.",
                icon: <ChevronRight className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl border border-[#1A3A5C] hover:border-[#1A8754] transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-[#1A8754]/10 p-4 rounded-xl mb-6 inline-block text-[#F5B729]">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Prediction Section */}
      <div className="py-20 bg-[#0A1929] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Score Prediction</h2>
            <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="relative">
                <img 
                  src="https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/virat_kohli_century_vs_srh_ap.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0L3ZpcmF0X2tvaGxpX2NlbnR1cnlfdnNfc3JoX2FwLndlYnAiLCJpYXQiOjE3NDU0MjgwNzksImV4cCI6MTc3Njk2NDA3OX0.ANLxFhnGOybJC4XMFRhT1PDyebnFzISbjs2PGb9qrHY"
                  alt="Cricket scoreboard"
                  className="rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] to-transparent opacity-60 rounded-xl"></div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-6 rounded-xl border border-[#1A3A5C]">
                  <h3 className="text-xl font-bold text-white mb-4">How to Predict Scores</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#1A8754] rounded-full p-1">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p>Select a team's upcoming match</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#1A8754] rounded-full p-1">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p>Enter your predicted final score</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#1A8754] rounded-full p-1">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p>Specify your bet amount</p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-[#1A8754] rounded-full p-1">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p>Confirm your prediction</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Managing Funds Section */}
      <div className="py-20 bg-gradient-to-b from-[#0A1929] to-[#0D3158] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Managing Your Funds</h2>
            <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Deposits & Withdrawals</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>Add funds using UPI or bank transfer</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>Withdraw winnings to your wallet</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>Track all transactions in your dashboard</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>Set betting limits for responsible gaming</p>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Important Rules</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>Must be 18+ to participate</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>Verify your account before withdrawal</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>Maximum bet limits apply</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-[#1A8754] rounded-full p-1">
                      <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p>All bets are final once placed</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};