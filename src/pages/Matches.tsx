import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { GameCard } from '../components/GameCard';
import { Trophy, Target, Clock } from 'lucide-react';

type Game = Database['public']['Tables']['games']['Row'];

export function Matches() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'win' | 'score'>('all');

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('status', { ascending: false })
        .order('date', { ascending: true });

      if (error) throw error;
      
      const sortedGames = (data || []).sort((a, b) => {
        if (a.status === 'live' && b.status !== 'live') return -1;
        if (a.status !== 'live' && b.status === 'live') return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      
      setGames(sortedGames);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredGames = games.filter(game => {
    if (activeTab === 'all') return true;
    return game.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#0A1929]">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/pages/VS.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYWdlcy9WUy5wbmciLCJpYXQiOjE3NDU3NjMyMDYsImV4cCI6MTc3NzI5OTIwNn0.bh2cbt0IrfhchFDQXDTOvjEcGUsUE516Wbyp11WlRAc')",
            filter: "brightness(0.8)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1929]/80 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Available <span className="text-[#004aad]">Matches</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl">
            Place your bets on live and upcoming cricket matches
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === 'all'
                ? 'bg-[#004aad] text-white'
                : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>All Matches</span>
          </button>
          <button
            onClick={() => setActiveTab('win')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === 'win'
                ? 'bg-[#004aad] text-white'
                : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Winner Prediction</span>
          </button>
          <button
            onClick={() => setActiveTab('score')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === 'score'
                ? 'bg-[#004aad] text-white'
                : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>Score Prediction</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-[#1A8754] border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#004aad] border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}