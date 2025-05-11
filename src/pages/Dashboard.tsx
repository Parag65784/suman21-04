import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Wallet, History, Trophy, User, Mail, CreditCard, Clock, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  balance: number;
  wallet_address: string;
  upi_id: string;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

interface Bet {
  id: string;
  game_id: string;
  bet_amount: number;
  status: string;
  created_at: string;
  game: {
    type: 'win' | 'score';
    teama?: string;
    teamb?: string;
    team?: string;
    date: string;
  };
}

const ITEMS_PER_PAGE = 20;

export function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');
  const [upiId, setUpiId] = useState('');
  const [activeTab, setActiveTab] = useState<'transactions' | 'bets'>('transactions');
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const [currentBetsPage, setCurrentBetsPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalBets, setTotalBets] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchTransactions();
      fetchBets();
    }
  }, [user, currentTransactionPage, currentBetsPage]);

  async function fetchUserProfile() {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return;
      
      setProfile(data);
      setWalletAddress(data.wallet_address || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function fetchTransactions() {
    try {
      // Get total count
      const { count: totalCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      setTotalTransactions(totalCount || 0);

      // Get paginated data
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .range((currentTransactionPage - 1) * ITEMS_PER_PAGE, currentTransactionPage * ITEMS_PER_PAGE - 1);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBets() {
    try {
      // Get total count for win bets
      const { count: winCount } = await supabase
        .from('win_game_bets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      // Get total count for score bets
      const { count: scoreCount } = await supabase
        .from('score_prediction_bets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      setTotalBets((winCount || 0) + (scoreCount || 0));

      // Get paginated win bets
      const winBets = await supabase
        .from('win_game_bets')
        .select('*, game:games(*)')
        .eq('user_id', user?.id)
        .range((currentBetsPage - 1) * ITEMS_PER_PAGE, currentBetsPage * ITEMS_PER_PAGE - 1);

      // Get paginated score bets
      const scoreBets = await supabase
        .from('score_prediction_bets')
        .select('*, game:games(*)')
        .eq('user_id', user?.id)
        .range((currentBetsPage - 1) * ITEMS_PER_PAGE, currentBetsPage * ITEMS_PER_PAGE - 1);

      if (winBets.error) throw winBets.error;
      if (scoreBets.error) throw scoreBets.error;

      const allBets = [...(winBets.data || []), ...(scoreBets.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, ITEMS_PER_PAGE);

      setBets(allBets);
    } catch (error) {
      console.error('Error fetching bets:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateWalletAddress() {
    try {
      const { error } = await supabase
        .from('users')
        .update({ wallet_address: walletAddress })
        .eq('id', user?.id);

      if (error) throw error;
      await fetchUserProfile();
    } catch (error) {
      console.error('Error updating wallet address:', error);
    }
  }

  async function updateUpiId() {
    try {
      const { error } = await supabase
        .from('users')
        .update({ upi_id: upiId })
        .eq('id', user?.id);
  
      if (error) throw error;
      await fetchUserProfile();
    } catch (error) {
      console.error('Error updating UPI ID:', error);
    }
  }

  async function requestWithdrawal() {
    try {
      const amount = parseFloat(withdrawAmount);
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid amount');
        return;
      }

      if (amount > (profile?.balance || 0)) {
        setError('Insufficient balance');
        return;
      }

      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          type: 'withdraw',
          amount,
          status: 'pending'
        });

      if (error) throw error;
      setWithdrawAmount('');
      setError('');
      await fetchTransactions();
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      setError('Failed to request withdrawal');
    }
  }

  const renderPagination = (currentPage: number, setPage: (page: number) => void, totalItems: number) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    return (
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-[#1A3A5C] text-white hover:bg-[#1A8754] disabled:opacity-50 disabled:hover:bg-[#1A3A5C] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-[#1A3A5C] text-white hover:bg-[#1A8754] disabled:opacity-50 disabled:hover:bg-[#1A3A5C] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A1929] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="bg-[#1A8754]/10 p-2 rounded-lg">
                  <User className="w-6 h-6 text-[#F5B729]" />
                </div>
                <h2 className="text-2xl font-bold text-white">{profile?.name}</h2>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{profile?.email}</span>
              </div>
            </div>
            <div className="bg-[#1A3A5C] rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-[#F5B729]">₹{profile?.balance || 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Wallet Address */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-300">
                <CreditCard className="w-4 h-4" />
                <span>Wallet Address</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="flex-1 bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#F5B729]"
                  placeholder="Enter your wallet address"
                />
                <button
                  onClick={updateWalletAddress}
                  className="px-4 py-2 bg-[#1A8754] text-white rounded-lg hover:bg-[#156A43] transition-colors duration-300"
                >
                  Update
                </button>
              </div>
            </div>

            {/* UPI ID */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-300">
                <CreditCard className="w-4 h-4" />
                <span>UPI ID</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="flex-1 bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#F5B729]"
                  placeholder="Enter your UPI ID"
                />
                <button
                  onClick={updateUpiId}
                  className="px-4 py-2 bg-[#1A8754] text-white rounded-lg hover:bg-[#156A43] transition-colors duration-300"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Withdrawal */}
            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center space-x-2 text-gray-300">
                <Wallet className="w-4 h-4" />
                <span>Request Withdrawal</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="flex-1 bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#F5B729]"
                  placeholder="Enter amount"
                />
                <button
                  onClick={requestWithdrawal}
                  className="px-6 py-2 bg-[#F5B729] text-[#0A2540] font-bold rounded-lg hover:bg-[#E3A82A] transition-colors duration-300"
                >
                  Withdraw
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === 'transactions'
                ? 'bg-[#F5B729] text-[#0A2540]'
                : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
            }`}
          >
            <History className="w-5 h-5" />
            <span>Transactions</span>
          </button>
          <button
            onClick={() => setActiveTab('bets')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              activeTab === 'bets'
                ? 'bg-[#F5B729] text-[#0A2540]'
                : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>Game History</span>
          </button>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-[#1A8754] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#F5B729] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          ) : activeTab === 'transactions' ? (
            <>
              <h3 className="text-xl font-bold text-white mb-6">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1A3A5C]">
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Date</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Type</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Amount</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-[#1A3A5C]">
                        <td className="py-4 px-6 text-gray-300">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {transaction.type === 'deposit' ? (
                              <ArrowDownRight className="w-4 h-4 text-[#1A8754]" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4 text-[#F5B729]" />
                            )}
                            <span className="text-white">
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-white">₹{transaction.amount}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'completed' ? 'bg-[#1A8754]/20 text-[#1A8754]' :
                            transaction.status === 'pending' ? 'bg-[#F5B729]/20 text-[#F5B729]' :
                            'bg-red-500/20 text-red-500'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination(currentTransactionPage, setCurrentTransactionPage, totalTransactions)}
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-6">Game History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1A3A5C]">
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Date</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Match</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Amount</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bets.map((bet) => (
                      <tr key={bet.id} className="border-b border-[#1A3A5C]">
                        <td className="py-4 px-6 text-gray-300">
                          {new Date(bet.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-white">
                          {bet.game.type === 'win' 
                            ? `${bet.game.teama} vs ${bet.game.teamb}`
                            : bet.game.team
                          }
                        </td>
                        <td className="py-4 px-6 text-white">₹{bet.bet_amount}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            bet.status === 'completed' ? 'bg-[#1A8754]/20 text-[#1A8754]' :
                            bet.status === 'pending' ? 'bg-[#F5B729]/20 text-[#F5B729]' :
                            'bg-red-500/20 text-red-500'
                          }`}>
                            {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPagination(currentBetsPage, setCurrentBetsPage, totalBets)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}