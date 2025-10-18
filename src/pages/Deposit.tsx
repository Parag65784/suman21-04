import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Copy, Wallet, CreditCard, Users, AlertTriangle, ExternalLink, Star, X, History, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface P2PSeller {
  id: string;
  name: string;
  wallet_address: string;
  balance: number;
  rating: number;
  accepted_currencies: string[];
  exchange_rates: Record<string, number>;
  status: string;
}

interface UPISeller {
  id: string;
  name: string;
  upi_id: string;
  status: string;
}

interface SellerModalProps {
  seller: P2PSeller;
  onClose: () => void;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  created_at: string;
}

const SellerModal: React.FC<SellerModalProps> = ({ seller, onClose }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(seller.accepted_currencies[0]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-2xl border border-[#1A3A5C] w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">{seller.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Seller Rating */}
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-[#F5B729] fill-[#F5B729]" />
            <span className="text-white font-medium">{seller.rating} / 5.0</span>
          </div>

          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Currency
            </label>
            <div className="grid grid-cols-3 gap-3">
              {seller.accepted_currencies.map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    selectedCurrency === currency
                      ? 'bg-[#F5B729] text-[#0A2540]'
                      : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
                  }`}
                >
                  {currency}
                </button>
              ))}
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="bg-[#1A3A5C] p-4 rounded-lg">
            <p className="text-gray-300 mb-2">Exchange Rate</p>
            <p className="text-xl font-bold text-white">
              1 {selectedCurrency} = {seller.exchange_rates[selectedCurrency]} ME
            </p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={seller.wallet_address} size={200} />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={seller.wallet_address}
                className="bg-[#0A1929] border border-[#1A3A5C] rounded-lg px-4 py-2 text-white w-full"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(seller.wallet_address);
                  alert('Address copied to clipboard!');
                }}
                className="p-2 bg-[#1A8754] text-white rounded-lg hover:bg-[#156A43] transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-[#1A3A5C] p-4 rounded-lg flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-[#F5B729] flex-shrink-0 mt-1" />
            <p className="text-gray-300 text-sm">
              Please verify the wallet address before sending any funds. Only send {selectedCurrency} to this address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Deposit() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [method, setMethod] = useState<'crypto' | 'upi' | 'p2p'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [p2pSellers, setP2PSellers] = useState<P2PSeller[]>([]);
  const [upiSellers, setUPISellers] = useState<UPISeller[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<P2PSeller | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    fetchP2PSellers();
    fetchUPISellers();
    if (user) {
      fetchTransactions();
    }
  }, []);

  async function fetchP2PSellers() {
    const { data } = await supabase
      .from('p2p_sellers')
      .select('*')
      .eq('status', 'active');
    if (data) setP2PSellers(data);
  }

  async function fetchUPISellers() {
    const { data } = await supabase
      .from('upi_sellers')
      .select('*')
      .eq('status', 'active');
    if (data) setUPISellers(data);
  }

  async function fetchTransactions() {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const walletAddress = "0xa8259e9001223557E73731ce435726F653B53850";

  const cryptoCurrencies = [    
    {
      name: 'Tether',
      symbol: 'USDT',
      logo: 'https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/pages/tether2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYWdlcy90ZXRoZXIyLnBuZyIsImlhdCI6MTc0NTc2NzE2NiwiZXhwIjoxNzc3MzAzMTY2fQ.jhP_qu_6iNnrW5K4HY_vXQAfnD37xuhVCeCwrnB7QXE',
      website: 'https://tether.to'
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      logo: 'https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/pages/Circle_USDC_Logo.svg.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYWdlcy9DaXJjbGVfVVNEQ19Mb2dvLnN2Zy5wbmciLCJpYXQiOjE3NDU3NjY5NDUsImV4cCI6MTc3NzMwMjk0NX0.QR-NRYj7gXkWkogwICXqcxtMRYWHINlEB7JvJF7wyTI',
      website: 'https://www.circle.com/usdc'
    },
    {
      name: 'Dai',
      symbol: 'DAI',
      logo: 'https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/pages/dai.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYWdlcy9kYWkucG5nIiwiaWF0IjoxNzQ1NzY3MjY3LCJleHAiOjE3NzczMDMyNjd9.LXpcxVs4MBU8H4eIeC2DrIGUr9LZ762BjtFWAMjvyhA',
      website: 'https://makerdao.com/en/'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0A1929]' : 'bg-gray-50'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Panel - Method Selection */}
          <div className="md:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-[#0A2540]' : 'bg-white'} rounded-xl p-6 shadow-xl`}>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Payment Methods</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setMethod('crypto')}
                  className={`w-full p-4 rounded-lg flex items-center space-x-3 transition-colors ${
                    method === 'crypto' 
                      ? 'bg-[#F5B729] text-[#0A2540]' 
                      : theme === 'dark' ? 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span>Cryptocurrency</span>
                </button>
                <button
                  onClick={() => setMethod('upi')}
                  className={`w-full p-4 rounded-lg flex items-center space-x-3 transition-colors ${
                    method === 'upi' 
                      ? 'bg-[#F5B729] text-[#0A2540]' 
                      : theme === 'dark' ? 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>UPI</span>
                </button>
                <button
                  onClick={() => setMethod('p2p')}
                  className={`w-full p-4 rounded-lg flex items-center space-x-3 transition-colors ${
                    method === 'p2p' 
                      ? 'bg-[#F5B729] text-[#0A2540]' 
                      : theme === 'dark' ? 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>P2P Exchange</span>
                </button>
              </div>
            </div>
            
            {/* Transaction History Button */}
            {user && (
              <button
                onClick={() => setShowTransactions(!showTransactions)}
                className={`w-full mt-4 p-4 rounded-lg flex items-center justify-center space-x-3 transition-colors ${theme === 'dark' ? 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                <History className="w-5 h-5" />
                <span>Transaction History</span>
              </button>
            )}
            
            <div className={`${theme === 'dark' ? 'bg-[#0A2540]' : 'bg-white'} rounded-xl p-6 shadow-xl mt-6 flex flex-col items-center`}>
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Pay Here</h3>
              
              <div className="bg-white p-4 rounded-lg">
                <QRCode value={walletAddress} size={150} />
              </div>

              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-6 text-center break-words`}>
                {walletAddress}
              </p>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="md:col-span-3">
            <div className={`${theme === 'dark' ? 'bg-[#0A2540]' : 'bg-white'} rounded-xl p-8 shadow-xl`}>
              {method === 'crypto' && (
                <div>
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Select Cryptocurrency</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {cryptoCurrencies.map((crypto) => (
                      <div
                        key={crypto.symbol}
                        className={`${theme === 'dark' ? 'bg-[#1A3A5C] hover:bg-[#1A8754]/20' : 'bg-gray-100 hover:bg-gray-200'} p-6 rounded-xl transition-colors group relative`}
                      >
                        <div className="flex flex-col items-center">
                          <img src={crypto.logo} alt={crypto.name} className="w-16 h-16 mb-4" />
                          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{crypto.name}</h3>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{crypto.symbol}</p>
                        </div>
                        <a
                          href={crypto.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                        >
                          <span className="flex items-center text-white">
                            Visit Website <ExternalLink className="ml-2 w-4 h-4" />
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-8 p-4 ${theme === 'dark' ? 'bg-[#1A3A5C]' : 'bg-gray-100'} rounded-lg`}>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-[#F5B729] flex-shrink-0 mt-1" />
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Please update your wallet address in the dashboard first. Use the same wallet for deposits and withdrawals to ensure smooth transactions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {method === 'upi' && (
                <div>
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>UPI Payment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upiSellers.map((seller) => (
                      <div key={seller.id} className={`${theme === 'dark' ? 'bg-[#1A3A5C]' : 'bg-gray-100'} p-6 rounded-xl`}>
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>{seller.name}</h3>
                        <div className="bg-white p-4 rounded-lg mb-4">
                          <QRCode value={seller.upi_id} size={200} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            readOnly
                            value={seller.upi_id}
                            className={`flex-1 ${theme === 'dark' ? 'bg-[#0A1929] text-white border-[#1A8754]' : 'bg-white text-gray-900 border-gray-300'} p-3 rounded-lg border text-sm`}
                          />
                          <button
                            onClick={() => handleCopy(seller.upi_id)}
                            className="p-3 bg-[#1A8754] text-white rounded-lg hover:bg-[#156A43] transition-colors"
                          >
                            <Copy className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {method === 'p2p' && (
                <div>
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>P2P Exchange</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${theme === 'dark' ? 'border-[#1A3A5C]' : 'border-gray-200'}`}>
                          <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Seller</th>
                          <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Available Balance</th>
                          <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Rating</th>
                          <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Accepted Currencies</th>
                          <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {p2pSellers.map((seller) => (
                          <tr 
                            key={seller.id} 
                            className={`border-b ${theme === 'dark' ? 'border-[#1A3A5C] hover:bg-[#1A3A5C]/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors cursor-pointer`}
                            onClick={() => setSelectedSeller(seller)}
                          >
                            <td className="py-4 px-6">
                              <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>{seller.name}</div>
                            </td>
                            <td className="py-4 px-6 text-[#F5B729]">
                              {seller.balance.toLocaleString()} ME
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-[#F5B729] fill-[#F5B729]" />
                                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{seller.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex space-x-2">
                                {seller.accepted_currencies.map((currency) => (
                                  <span
                                    key={currency}
                                    className={`px-2 py-1 ${theme === 'dark' ? 'bg-[#1A8754]/20 text-[#1A8754]' : 'bg-green-100 text-green-800'} rounded text-sm`}
                                  >
                                    {currency}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <button className="text-[#F5B729] hover:text-[#E3A82A] transition-colors">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transaction History Modal/Section */}
        {showTransactions && user && (
          <div className={`mt-8 ${theme === 'dark' ? 'bg-[#0A2540]' : 'bg-white'} rounded-xl p-8 shadow-xl`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Transactions</h2>
              <button
                onClick={() => setShowTransactions(false)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-[#1A3A5C]' : 'hover:bg-gray-100'} transition-colors`}
              >
                <X className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${theme === 'dark' ? 'border-[#1A3A5C]' : 'border-gray-200'}`}>
                    <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Date</th>
                    <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Type</th>
                    <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Amount</th>
                    <th className={`text-left py-4 px-6 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className={`border-b ${theme === 'dark' ? 'border-[#1A3A5C]' : 'border-gray-200'}`}>
                      <td className={`py-4 px-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {transaction.type === 'deposit' ? (
                            <ArrowDownRight className="w-4 h-4 text-[#1A8754]" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-[#F5B729]" />
                          )}
                          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className={`py-4 px-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>₹{transaction.amount}</td>
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
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan={4} className={`py-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedSeller && (
        <SellerModal
          seller={selectedSeller}
          onClose={() => setSelectedSeller(null)}
        />
      )}
    </div>
  );
}