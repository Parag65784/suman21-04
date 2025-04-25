import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
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
            backgroundImage: "url('https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            filter: "brightness(0.4)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1929]/80 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Available <span className="text-[#F5B729]">Matches</span>
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
                ? 'bg-[#F5B729] text-[#0A2540]'
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
                ? 'bg-[#F5B729] text-[#0A2540]'
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
                ? 'bg-[#F5B729] text-[#0A2540]'
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
                <div className="w-6 h-6 border-2 border-[#F5B729] border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <div key={game.id} className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] overflow-hidden hover:border-[#1A8754] transition-all duration-300 transform hover:-translate-y-1">
                <div className={`p-4 ${
                  game.status === 'live' 
                    ? 'bg-[#1A8754]' 
                    : game.status === 'upcoming'
                    ? 'bg-[#F5B729]'
                    : 'bg-gray-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {game.type === 'win' ? (
                        <Trophy className="text-white" size={24} />
                      ) : (
                        <Target className="text-white" size={24} />
                      )}
                      <span className="text-white font-semibold">
                        {game.type === 'win' ? 'Match Winner' : 'Score Prediction'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {game.status === 'live' && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                      <span className="text-white font-medium text-sm">
                        {game.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-400 text-sm">
                      {new Date(game.date).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>

                  {game.type === 'win' ? (
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#1A3A5C] rounded-lg p-2">
                          <img
                            src={game.teama_logo_url || `https://cricket.org/teams/${game.teama?.toLowerCase()}.png`}
                            alt={game.teama}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                            }}
                          />
                        </div>
                        <p className="font-medium text-white">{game.teama}</p>
                      </div>
                      <div className="px-4">
                        <div className="text-2xl font-bold text-[#F5B729]">VS</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#1A3A5C] rounded-lg p-2">
                          <img
                            src={game.teamb_logo_url || `https://cricket.org/teams/${game.teamb?.toLowerCase()}.png`}
                            alt={game.teamb}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                            }}
                          />
                        </div>
                        <p className="font-medium text-white">{game.teamb}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-3 bg-[#1A3A5C] rounded-lg p-2">
                        <img
                          src={game.team_logo_url || `https://cricket.org/teams/${game.team?.toLowerCase()}.png`}
                          alt={game.team}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                          }}
                        />
                      </div>
                      <p className="font-medium text-white mb-1">{game.team}</p>
                      <p className="text-sm text-gray-400">Predict the final score</p>
                    </div>
                  )}

                  <a
                    href={`/games/${game.id}`}
                    className="block w-full text-center py-3 bg-[#F5B729] text-[#0A2540] font-bold rounded-lg hover:bg-[#E3A82A] transition-colors duration-300"
                  >
                    Place Bet
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}