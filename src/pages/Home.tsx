import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { WhyChooseUs } from '../components/about/WhyChooseUs';
import { Testimonials } from '../components/about/Testimonials';
import { Commitment } from '../components/about/Commitment';
import { GamesList } from '../components/GamesList';

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const slides = [
    {
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/hero-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0L2hlcm8tMy5wbmciLCJpYXQiOjE3NDU3NjAwMDMsImV4cCI6MTc3NzI5NjAwM30.zgY9dVio8anhZ6L3LZu4cd40H6zZgf_fq5ovlSM8O2c",
      title: "Welcome to CrickWin",
      description: "Experience the thrill of cricket game with real-time matches and instant rewards."
    },
    {
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/hero-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0L2hlcm8tMi5wbmciLCJpYXQiOjE3NDU3NDQ0MjEsImV4cCI6MTc3NzI4MDQyMX0.NKWfXtXplBoa9wmwmnW5ZTvHVV6XxdW-aL7XtqiHBgc",
      title: "Live IPL Matches",
      description: "Place your bets on live IPL matches and win big rewards!"
    },
    {
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/hero-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0L2hlcm8tMS5wbmciLCJpYXQiOjE3NDU2MDQ2NTMsImV4cCI6MTc3NzE0MDY1M30.UcnhvTWzhY-Ubyc1_YH2dYuQsKL-j8a5p79BAJGhFNY",
      title: "Secure Gameplay",
      description: "Your security is our priority. Bet with confidence on our platform."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  
    setIsVisible(true);
  
    return () => clearInterval(timer);
  }, [slides.length]); // <-- fixed dependency

  return (
    <div className="min-h-screen bg-[#0A1929]">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Cricket ball vector art overlay */}
        <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] opacity-10 z-10">
          <div className="w-full h-full rounded-full border-[12px] border-[#F5B729] relative animate-spin-slow">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] h-[70%] border-[6px] border-dashed border-[#F5B729] rounded-full"></div>
            </div>
          </div>
        </div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${slide.image}")`,
                filter: "brightness(0.8)"
              }}
            />
            <div className="relative h-full flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="flex flex-col items-start justify-center text-left h-full">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                      {slide.title}
                    </h1>
                    <div className="w-20 h-1 bg-[#1A8754] mb-6" />
                    <p className="text-xl text-gray-200 mb-8">
                      {slide.description}
                    </p>
                    <Link
                      to="/how-to-play"
                      className="inline-flex items-center px-8 py-4 bg-[#F5B729] text-[#0A2540] font-bold rounded-lg hover:bg-[#E3A82A] transition-colors duration-300"
                    >
                      <span>Start Playing</span>
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#F5B729] w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#0D3158] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">41+</div>
              <div className="text-gray-300">Matches Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">₹.62Cr+</div>
              <div className="text-gray-300">Payouts Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <WhyChooseUs />
      
      {/* Live Matches Section */}
      <section className="py-20 bg-[#0A1929] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] border-[15px] border-dashed border-white rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] border-[10px] border-dashed border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Matches</h2>
            <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
          </div>

          {/* Games List renders grid itself */}
          <GamesList />
        </div>
      </section>

      <Testimonials />
      <Commitment />
    </div>
  );
}