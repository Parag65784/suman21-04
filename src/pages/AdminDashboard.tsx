import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Check, X } from 'lucide-react';

interface Game {
  id: string;
  type: 'win' | 'score';
  date: string;
  teamA?: string;
  teamB?: string;
  team?: string;
  status: 'upcoming' | 'live' | 'completed';
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
    teamA: '',
    teamB: '',
    team: '',
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
          teamA: newGame.type === 'win' ? newGame.teamA : null,
          teamB: newGame.type === 'win' ? newGame.teamB : null,
          team: newGame.type === 'score' ? newGame.team : null,
          status: 'upcoming'
        });

      if (error) throw error;
      setNewGame({ type: 'win', date: '', teamA: '', teamB: '', team: '' });
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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Create New Game */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Game</h2>
        <form onSubmit={createGame} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Game Type
              </label>
              <select
                value={newGame.type}
                onChange={(e) => setNewGame({ ...newGame, type: e.target.value as 'win' | 'score' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="win">Match Winner</option>
                <option value="score">Score Prediction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Match Date
              </label>
              <input
                type="datetime-local"
                value={newGame.date}
                onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {newGame.type === 'win' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team A
                </label>
                <input
                  type="text"
                  value={newGame.teamA}
                  onChange={(e) => setNewGame({ ...newGame, teamA: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team B
                </label>
                <input
                  type="text"
                  value={newGame.teamB}
                  onChange={(e) => setNewGame({ ...newGame, teamB: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter team name"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team
              </label>
              <input
                type="text"
                value={newGame.team}
                onChange={(e) => setNewGame({ ...newGame, team: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter team name"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Create Game
          </button>
        </form>
      </div>

      {/* Games List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Games</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teams
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.map((game) => (
                <tr key={game.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(game.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {game.type === 'win' ? 'Match Winner' : 'Score Prediction'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {game.type === 'win' ? `${game.teamA} vs ${game.teamB}` : game.team}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      game.status === 'completed' ? 'bg-green-100 text-green-800' :
                      game.status === 'live' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wallet Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{withdrawal.user.name}</div>
                    <div className="text-sm text-gray-500">{withdrawal.user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{withdrawal.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {withdrawal.user.wallet_address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(withdrawal.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleWithdrawal(withdrawal.id, 'approve')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleWithdrawal(withdrawal.id, 'reject')}
                        className="text-red-600 hover:text-red-900"
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
  );
}