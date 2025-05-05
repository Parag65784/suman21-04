import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Check, X } from 'lucide-react';

interface Game {
  id: string;
  type: 'win' | 'score';
  date: string;
  teama?: string;
  teamb?: string;
  team?: string;
  status: 'upcoming' | 'live' | 'completed';
  location?: string;
  odds?: number;
  odds_type?: 'win' | 'score';
}

interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  created_at: string;
  user: {
    name: string;
    email: string;
    wallet_address: string;
  };
}

export function AdminDashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [newGame, setNewGame] = useState({
    type: 'win',
    date: '',
    teama: '',
    teamb: '',
    team: '',
    location: '',
    odds: 0,
    odds_type: 'win'
  });

  useEffect(() => {
    fetchGames();
    fetchWithdrawals();
  }, []);

  async function fetchGames() {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }

  async function fetchWithdrawals() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          user:users(name, email, wallet_address)
        `)
        .eq('type', 'withdraw')
        .eq('status', 'pending');

      if (error) throw error;
      setWithdrawals(data);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    }
  }

  async function createGame(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('games')
        .insert({
          type: newGame.type,
          date: newGame.date,
          teama: newGame.type === 'win' ? newGame.teama : null,
          teamb: newGame.type === 'win' ? newGame.teamb : null,
          team: newGame.type === 'score' ? newGame.team : null,
          status: 'upcoming'
        });

      if (error) throw error;
      setNewGame({ type: 'win', date: '', teama: '', teamb: '', team: '', location: '', odds: 0, odds_type: 'win' });
      alert('Game created successfully!');
      await fetchGames();
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }

  async function handleWithdrawal(id: string, action: 'approve' | 'reject') {
    try {
      const { error } = await supabase
        .from('transactions')
        .update({ status: action === 'approve' ? 'completed' : 'rejected' })
        .eq('id', id);

      if (error) throw error;
      await fetchWithdrawals();
    } catch (error) {
      console.error('Error handling withdrawal:', error);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1929] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Create New Game */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Create New Game</h2>
          <form onSubmit={createGame} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Game Type
                </label>
                <select
                  value={newGame.type}
                  onChange={(e) => setNewGame({ ...newGame, type: e.target.value as 'win' | 'score' })}
                  className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5B729]"
                >
                  <option value="win">Match Winner</option>
                  <option value="score">Score Prediction</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Match Date
                </label>
                <input
                  type="datetime-local"
                  value={newGame.date}
                  onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
                  className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5B729]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={newGame.location}
                  onChange={(e) => setNewGame({ ...newGame, location: e.target.value })}
                  className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5B729]"
                  placeholder="Enter location"
                />  
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Odds
                </label>
                <input
                  type="number"
                  value={newGame.odds}
                  onChange={(e) => setNewGame({ ...newGame, odds: parseFloat(e.target.value) })}
                  className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5B729]"
                  placeholder="Enter odds"
                />
              </div>
            </div>

            {/* Team Names */}

            {newGame.type === 'win' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team A
                  </label>
                  <input
                    type="text"
                    value={newGame.teama}
                    onChange={(e) => setNewGame({ ...newGame, teama: e.target.value })}
                    className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5B729]"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team B
                  </label>
                  <input
                    type="text"
                    value={newGame.teamb}
                    onChange={(e) => setNewGame({ ...newGame, teamb: e.target.value })}
                    className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5B729]"
                    placeholder="Enter team name"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team
                </label>
                <input
                  type="text"
                  value={newGame.team}
                  onChange={(e) => setNewGame({ ...newGame, team: e.target.value })}
                  className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#F5B729]"
                  placeholder="Enter team name"
                />
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-[#F5B729] text-[#0A2540] font-bold rounded-lg hover:bg-[#E3A82A] transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Create Game
            </button>
          </form>
        </div>

        {/* Games List */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Games</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A3A5C]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Teams</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id} className="border-b border-[#1A3A5C]">
                    <td className="py-4 px-6 text-gray-300">
                      {new Date(game.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-white">
                      {game.type === 'win' ? 'Match Winner' : 'Score Prediction'}
                    </td>
                    <td className="py-4 px-6 text-white">
                      {game.type === 'win' ? `${game.teama} vs ${game.teamb}` : game.team}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        game.status === 'completed' ? 'bg-[#1A8754]/20 text-[#1A8754]' :
                        game.status === 'live' ? 'bg-[#F5B729]/20 text-[#F5B729]' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdrawal Requests */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Withdrawal Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A3A5C]">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Wallet Address</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b border-[#1A3A5C]">
                    <td className="py-4 px-6">
                      <div className="text-white font-medium">{withdrawal.user.name}</div>
                      <div className="text-gray-400 text-sm">{withdrawal.user.email}</div>
                    </td>
                    <td className="py-4 px-6 text-[#F5B729] font-bold">
                      ₹{withdrawal.amount}
                    </td>
                    <td className="py-4 px-6 text-gray-300 font-mono text-sm">
                      {withdrawal.user.wallet_address}
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {new Date(withdrawal.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleWithdrawal(withdrawal.id, 'approve')}
                          className="p-2 bg-[#1A8754]/20 text-[#1A8754] rounded-lg hover:bg-[#1A8754]/30 transition-colors"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => handleWithdrawal(withdrawal.id, 'reject')}
                          className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}