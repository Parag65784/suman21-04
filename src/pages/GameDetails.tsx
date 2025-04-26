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
  
      // ✅ Check if game is live
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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-DEFAULT"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-danger-DEFAULT mb-4" />
        <h2 className="text-2xl font-bold text-neutral-black mb-2">Game Not Found</h2>
        <p className="text-neutral-gray">The game you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-bg-light rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary-DEFAULT p-6">
          <div className="flex items-center space-x-3 mb-4">
            {game.type === 'win' ? (
              <Trophy className="text-white" size={32} />
            ) : (
              <Target className="text-white" size={32} />
            )}
            <h1 className="text-2xl font-bold text-white">
              {game.type === 'win' ? 'Match Winner Prediction' : 'Score Prediction'}
            </h1>
          </div>
          <p className="text-primary-light">
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
                <img
                  src={game.teama_logo_url || `https://cricket.org/teams/${game.teama?.toLowerCase()}.png`}
                  alt={game.teama}
                  className="w-32 h-32 mx-auto mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48';
                  }}
                />
                <p className="text-xl font-semibold text-[#F5B729]">{game.teama}</p>
              </div>
              <div className="text-3xl font-bold text-neutral-light px-6">VS</div>
              <div className="text-center flex-1">
                <img
                  src={game.teamb_logo_url || `https://cricket.org/teams/${game.teamb?.toLowerCase()}.png`}
                  alt={game.teamb}
                  className="w-32 h-32 mx-auto mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48';
                  }}
                />
                <p className="text-xl font-semibold text-[#F5B729]">{game.teamb}</p>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-light rounded-2xl p-6 shadow-lg max-w-md mx-auto text-center">
              <img
                src={game.team_logo_url || `https://cricket.org/teams/${game.team?.toLowerCase()}.png`}
                alt={game.team}
                className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-primary"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                }}
              />
              <h2 className="text-2xl font-bold text-[#F5B729]">{game.team}</h2>
              <p className="text-lg text-white mb-4">Select a Score Prediction</p>
              <div className="grid grid-cols-3 gap-4 text-white text-sm text-left">
                {scoreRanges.map((range, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPrediction((idx + 1).toString())}
                    className={`cursor-pointer bg-neutral-700 hover:bg-primary transition-colors px-4 py-2 rounded-lg text-center ${
                      prediction === (idx + 1).toString() ? "bg-primary text-white" : ""
                    }`}
                  >
                    {range}
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={placeBet} className="space-y-6 mt-6">
            {game.type === 'win' ? (
              <div>
                <label className="block text-sm font-medium text-neutral-light mb-1">
                  Select Winning Team
                </label>
                <select
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  className="w-full rounded-lg border-neutral-silver focus:border-primary-light focus:ring-primary-light text-primary-dark"
                  required
                >
                  <option value="">Select a team</option>
                  <option value={game.teama}>{game.teama}</option>
                  <option value={game.teamb}>{game.teamb}</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-neutral-light mb-1">
                  Predicted Score
                </label>
                <select
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  className="w-full rounded-lg border-neutral-white focus:border-primary-light focus:ring-primary-light text-primary-dark"
                  required
                >
                  <option value="">Select a Score</option>
                  {scoreRanges.map((range, idx) => (
                    <option key={idx} value={idx + 1}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-light mb-1">
                Bet Amount (₹)
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full rounded-lg border-neutral-silver focus:border-primary-light focus:ring-primary-light text-primary-dark"
                required
              />
              <p className="text-xs text-neutral-light mt-1">Available Balance: ₹{userBalance.toFixed(2)}</p>
            </div>

            {error && (
              <div className="bg-danger-light border border-danger-DEFAULT text-danger-dark px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-success-light text-white py-3 rounded-lg hover:bg-success-dark focus:outline-none focus:ring-2 focus:ring-success-light focus:ring-offset-2 disabled:opacity-50"
            >
              {submitting ? 'Placing Bet...' : 'Place Bet'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
