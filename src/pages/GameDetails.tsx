import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Target, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/database.types';

type Game = Database['public']['Tables']['games']['Row'];

export function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [betAmount, setBetAmount] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [userBalance, setUserBalance] = useState<number>(0);

  const scoreRanges = [
    "1. Score 0 - 50",
    "2. Score 51 - 80",
    "3. Score 81 - 100",
    "4. Score 101 - 120",
    "5. Score 121 - 140",
    "6. Score 141 - 160",
    "7. Score 161 - 180",
    "8. Score 181 - 200",
    "9. Score 201 - 220",
    "10. Score 221 - 240",
    "11. Score 241 - Above",
  ];

  useEffect(() => {
    if (id) fetchGame();
    if (user) fetchUserBalance();
  }, [id, user]);

  async function fetchGame() {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setGame(data);
    } catch (error) {
      console.error('Error fetching game:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserBalance() {
    const { data, error } = await supabase
      .from('users')
      .select('balance')
      .eq('id', user?.id)
      .single();

    if (!error && data?.balance !== undefined) {
      setUserBalance(Number(data.balance));
    }
  }

  async function placeBet(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !game) return;
  
    try {
      setError('');
      setSubmitting(true);
  
      if (game.status !== 'live') {
        setError('This game is not live. You cannot place a bet.');
        return;
      }
  
      const amount = parseFloat(betAmount);
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid bet amount');
        return;
      }
  
      if (amount > userBalance) {
        setError('Insufficient balance to place the bet.');
        return;
      }
  
      if (game.type === 'win') {
        if (!prediction) {
          setError('Please select a team');
          return;
        }
  
        const { error } = await supabase.from('win_game_bets').insert({
          user_id: user.id,
          game_id: game.id,
          team: prediction,
          predicted_percentage: 50,
          bet_amount: amount
        });
  
        if (error) throw error;
      } else {
        const predictedScore = parseInt(prediction);
        if (isNaN(predictedScore) || predictedScore < 0) {
          setError('Please select a valid score range');
          return;
        }
  
        const { error } = await supabase.from('score_prediction_bets').insert({
          user_id: user.id,
          game_id: game.id,
          team: game.team!,
          predicted_score: predictedScore,
          bet_amount: amount
        });
  
        if (error) throw error;
      }
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error placing bet:', error);
      setError('Failed to place bet. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1929] flex justify-center items-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#1A8754] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#F5B729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0A1929] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-[#004aad] mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Game Not Found</h2>
          <p className="text-gray-400">The game you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1929] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] overflow-hidden">
          <div className="bg-[#1A3A5C] p-6">
            <div className="flex items-center space-x-3 mb-4">
              {game.type === 'win' ? (
                <Trophy className="text-[#cb6ce6]" size={32} />
              ) : (
                <Target className="text-[#cb6ce6]" size={32} />
              )}
              <h1 className="text-2xl font-bold text-white">
                {game.type === 'win' ? 'Match Winner Prediction' : 'Score Prediction'}
              </h1>
            </div>
            <p className="text-gray-400">
              {new Date(game.date).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </p>
          </div>

          <div className="p-6">
            {game.type === 'win' ? (
              <div className="flex items-center justify-between mb-8">
                <div className="text-center flex-1">
                  <div className="w-32 h-32 mx-auto mb-3 bg-[#1A3A5C] rounded-lg p-2">
                    <img
                      src={game.teama_logo_url || `https://cricket.org/teams/${game.teama?.toLowerCase()}.png`}
                      alt={game.teama}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128';
                      }}
                    />
                  </div>
                  <p className="text-xl font-semibold text-white">{game.teama}</p>
                </div>
                <div className="text-3xl font-bold text-[#004aad] px-6">VS</div>
                <div className="text-center flex-1">
                  <div className="w-32 h-32 mx-auto mb-3 bg-[#1A3A5C] rounded-lg p-2">
                    <img
                      src={game.teamb_logo_url || `https://cricket.org/teams/${game.teamb?.toLowerCase()}.png`}
                      alt={game.teamb}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128';
                      }}
                    />
                  </div>
                  <p className="text-xl font-semibold text-white">{game.teamb}</p>
                </div>
              </div>
            ) : (
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-3 bg-[#1A3A5C] rounded-lg p-2">
                  <img
                    src={game.team_logo_url || `https://cricket.org/teams/${game.team?.toLowerCase()}.png`}
                    alt={game.team}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128';
                    }}
                  />
                </div>
                <p className="text-xl font-semibold text-white mb-2">{game.team}</p>
                <p className="text-gray-400">Select a Score Range</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {scoreRanges.map((range, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrediction((idx + 1).toString())}
                      className={`p-3 rounded-lg text-sm transition-colors duration-300 ${
                        prediction === (idx + 1).toString()
                          ? 'bg-[#004aad] text-white'
                          : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={placeBet} className="space-y-6">
              {game.type === 'win' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Winning Team
                  </label>
                  <select
                    value={prediction}
                    onChange={(e) => setPrediction(e.target.value)}
                    className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#cb6ce6]"
                    required
                  >
                    <option value="">Select a team</option>
                    <option value={game.teama}>{game.teama}</option>
                    <option value={game.teamb}>{game.teamb}</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bet Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#cb6ce6]"
                  required
                />
                <p className="text-sm text-gray-400 mt-1">
                  Available Balance: ₹{userBalance.toFixed(2)}
                </p>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#004aad] text-white font-bold rounded-lg hover:bg-[#cb6ce6] transition-colors duration-300 disabled:opacity-50"
              >
                {submitting ? 'Placing Bet...' : 'Place Bet'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}