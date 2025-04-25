import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { GameCard } from './GameCard';
import { Database } from '../lib/database.types';
import { Trophy, Clock, Radio } from 'lucide-react';

type Game = Database['public']['Tables']['games']['Row'];

export function GamesList() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live'>('all');

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
    if (filter === 'all') return true;
    return game.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#1A8754] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#F5B729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Cricket field lines background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
      </div>

      <div className="relative">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Available Matches</h2>
            <div className="w-20 h-1 bg-[#1A8754]"></div>
          </div>

          <div className="flex space-x-3">
            {[
              { value: 'all', label: 'All Matches', icon: Trophy },
              { value: 'upcoming', label: 'Upcoming', icon: Clock },
              { value: 'live', label: 'Live Now', icon: Radio }
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setFilter(value as typeof filter)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                  filter === value
                    ? 'bg-[#F5B729] text-[#0A2540]'
                    : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
          {filteredGames.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Trophy className="w-16 h-16 text-[#1A3A5C] mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Matches Found</h3>
              <p className="text-gray-400">
                There are no matches available for the selected filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}