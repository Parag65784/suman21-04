import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Copy, Wallet, CreditCard, Users, AlertTriangle } from 'lucide-react';

export function Deposit() {
  const [method, setMethod] = useState<'crypto' | 'upi' | 'p2p'>('crypto');

  const walletAddress = '0xa8259e9001223557E73731ce435726F653B53850';
  const upiId = 'username@upi';
  const p2pUPI = 'john.doe@upi';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const renderQRValue = () => {
    switch (method) {
      case 'crypto':
        return walletAddress;
      case 'upi':
        return upiId;
      case 'p2p':
        return p2pUPI;
    }
  };

  const renderInfoLabel = () => {
    switch (method) {
      case 'crypto':
        return 'Wallet Address';
      case 'upi':
        return 'UPI ID';
      case 'p2p':
        return 'P2P Seller UPI ID';
    }
  };

  const getMethodIcon = () => {
    switch (method) {
      case 'crypto':
        return <Wallet className="w-6 h-6" />;
      case 'upi':
        return <CreditCard className="w-6 h-6" />;
      case 'p2p':
        return <Users className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] to-[#0D3158] p-4 relative overflow-hidden">
      {/* Cricket ball pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] border-[15px] border-dashed border-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] border-[10px] border-dashed border-white rounded-full"></div>
      </div>

      <div className="relative max-w-lg mx-auto pt-12">
        <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] p-8 rounded-xl shadow-2xl border border-[#1A3A5C]">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Deposit Funds</h2>

          {/* Tabs */}
          <div className="flex justify-center mb-8 gap-3">
            {['crypto', 'upi', 'p2p'].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m as 'crypto' | 'upi' | 'p2p')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  method === m
                    ? 'bg-[#F5B729] text-[#0A2540]'
                    : 'bg-[#1A3A5C] text-white hover:bg-[#1A8754]'
                }`}
              >
                {getMethodIcon()}
                <span>{m.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-xl">
              <QRCode value={renderQRValue()} size={200} />
            </div>
          </div>

          {/* Address / ID */}
          <div className="bg-[#1A3A5C] p-6 rounded-xl mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {renderInfoLabel()}
            </label>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={renderQRValue()}
                className="flex-1 bg-[#0A1929] p-3 rounded-lg border border-[#1A8754] text-sm text-white"
              />
              <button
                onClick={() => handleCopy(renderQRValue())}
                className="ml-2 p-3 bg-[#1A8754] text-white rounded-lg hover:bg-[#156A43] transition-colors duration-300"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-[#1A3A5C] border-l-4 border-[#F5B729] p-4 mb-6 rounded-r-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-[#F5B729] flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-300">
                Only send from wallets or accounts you own. Payments are irreversible.
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-white">
            <h3 className="font-medium mb-3">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
              <li>Scan the QR or copy the {renderInfoLabel().toLowerCase()}</li>
              <li>Send the amount you wish to deposit</li>
              <li>Wait for confirmation (2–5 minutes)</li>
              <li>Your balance will reflect automatically</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}