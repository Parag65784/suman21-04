import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Copy, Wallet, CreditCard, Users, AlertTriangle, ExternalLink, Star, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

const SellerModal: React.FC<SellerModalProps> = ({ seller, onClose }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(seller.accepted_currencies[0]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-6 rounded-lg shadow-xl border border-[#1A3A5C] w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{seller.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
  
        <div className="space-y-5">
          {/* Seller Rating */}
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-[#F5B729] fill-[#F5B729]" />
            <span className="text-white text-sm font-medium">{seller.rating} / 5.0</span>
          </div>
  
          {/* Currency Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Select Currency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {seller.accepted_currencies.map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`py-2 px-3 rounded-md text-center text-sm transition-colors ${
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
          <div className="flex space-x-4">
            {/* Exchange Rate */}
            <div className="bg-[#1A3A5C] p-3 rounded-md w-1/2">
              <p className="text-gray-300 text-xs mb-1">Exchange Rate</p>
              <p className="text-lg font-bold text-white">
                1 {selectedCurrency} = {seller.exchange_rates[selectedCurrency]} e₹‎
              </p>
            </div>

            {/* Available Balance */}
            <div className="bg-[#1A3A5C] rounded-md p-3 w-1/2">
              <p className="text-xs text-gray-400 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-[#F5B729]">e₹‎{seller.balance || 0}</p>
            </div>
          </div>

  
          {/* QR Code */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white p-3 rounded-md">
              <QRCode value={seller.wallet_address} size={160} />
            </div>
            <div className="flex items-center space-x-2 w-full">
              <input
                type="text"
                readOnly
                value={seller.wallet_address}
                className="bg-[#0A1929] border border-[#1A3A5C] rounded-md px-3 py-1.5 text-white w-full text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(seller.wallet_address);
                  alert('Address copied to clipboard!');
                }}
                className="p-2 bg-[#1A8754] text-white rounded-md hover:bg-[#156A43] transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
  
          {/* Warning */}
          <div className="bg-[#1A3A5C] p-3 rounded-md flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-[#F5B729] flex-shrink-0 mt-0.5" />
            <p className="text-gray-300 text-xs">
              Please verify the wallet address before sending any funds. Only send {selectedCurrency} to this address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export function Deposit() {
  const [method, setMethod] = useState<'crypto' | 'upi' | 'p2p'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [p2pSellers, setP2PSellers] = useState<P2PSeller[]>([]);
  const [upiSellers, setUPISellers] = useState<UPISeller[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<P2PSeller | null>(null);

  useEffect(() => {
    fetchP2PSellers();
    fetchUPISellers();
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
    <div className="min-h-screen bg-[#0A1929] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Panel - Method Selection */}
          <div className="md:col-span-1">
            <div className="bg-[#0A2540] rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Payment Methods</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setMethod('crypto')}
                  className={`w-full p-4 rounded-lg flex items-center space-x-3 transition-colors ${
                    method === 'crypto' 
                      ? 'bg-[#F5B729] text-[#0A2540]' 
                      : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
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
                      : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
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
                      : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>P2P Exchange</span>
                </button>
              </div>
            </div>
            <div className="bg-[#0A2540] rounded-xl p-6 shadow-xl mt-6 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-4">Pay Here</h3>
              
              <div className="bg-white p-4 rounded-lg">
                <QRCode value={walletAddress} size={150} />
              </div>

              <p className="text-white mt-6 text-center break-words">
                {walletAddress}
              </p>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="md:col-span-3">
            <div className="bg-[#0A2540] rounded-xl p-8 shadow-xl">
              {method === 'crypto' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Select Cryptocurrency</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {cryptoCurrencies.map((crypto) => (
                      <div
                        key={crypto.symbol}
                        className="bg-[#1A3A5C] p-6 rounded-xl hover:bg-[#1A8754]/20 transition-colors group relative"
                      >
                        <div className="flex flex-col items-center">
                          <img src={crypto.logo} alt={crypto.name} className="w-16 h-16 mb-4" />
                          <h3 className="text-lg font-semibold text-white">{crypto.name}</h3>
                          <p className="text-gray-400">{crypto.symbol}</p>
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
                  <div className="mt-8 p-4 bg-[#1A3A5C] rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-[#F5B729] flex-shrink-0 mt-1" />
                      <p className="text-gray-300">
                        Please update your wallet address in the dashboard first. Use the same wallet for deposits and withdrawals to ensure smooth transactions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {method === 'upi' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">UPI Payment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upiSellers.map((seller) => (
                      <div key={seller.id} className="bg-[#1A3A5C] p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-4">{seller.name}</h3>
                        <div className="bg-white p-4 rounded-lg mb-4">
                          <QRCode value={seller.upi_id} size={200} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            readOnly
                            value={seller.upi_id}
                            className="flex-1 bg-[#0A1929] p-3 rounded-lg border border-[#1A8754] text-sm text-white"
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

                  {/* Payment Notes Section */}
                  <div className="mt-10 bg-[#112B44] p-6 rounded-xl text-white">
                    <h3 className="text-xl font-semibold mb-4">💡 Payment Notes</h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                      <li>1 INR = 1 eRs. Funds will be instantly credited to your Crickwin wallet.</li>
                      <li>Ensure your UPI address is correctly updated for successful withdrawals and deposits.</li>
                      <li>To withdraw via Binance or any EVM chain, update your wallet address in settings.</li>
                      <li>Blockchain withdrawals will incur additional network transaction fees.</li>
                      <li>UPI deposits are processed instantly. Withdrawals may take up to 30 minutes.</li>
                    </ul>
                  </div>
                </div>
              )}


              {method === 'p2p' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">P2P Exchange</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1A3A5C]">
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Seller</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Available Balance</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Rating</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Accepted Currencies</th>
                          <th className="text-left py-4 px-6 text-sm font-medium text-gray-400"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {p2pSellers.map((seller) => (
                          <tr 
                            key={seller.id} 
                            className="border-b border-[#1A3A5C] hover:bg-[#1A3A5C]/50 transition-colors cursor-pointer"
                            onClick={() => setSelectedSeller(seller)}
                          >
                            <td className="py-4 px-6">
                              <div className="text-white font-medium">{seller.name}</div>
                            </td>
                            <td className="py-4 px-6 text-[#F5B729]">
                              {seller.balance.toLocaleString()} e₹‎
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-[#F5B729] fill-[#F5B729]" />
                                <span className="text-white">{seller.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex space-x-2">
                                {seller.accepted_currencies.map((currency) => (
                                  <span
                                    key={currency}
                                    className="px-2 py-1 bg-[#1A8754]/20 text-[#1A8754] rounded text-sm"
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