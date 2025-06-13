import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface PayIDDepositProps {
  onBack: () => void;
  onDeposit: (amount: number) => void;
}

const PayIDDeposit: React.FC<PayIDDepositProps> = ({ onBack, onDeposit }) => {
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const payidDetails = {
    bank: 'Bendigo and Adelaide Bank',
    accountName: 'BLAKYE FEWKES',
    accountNumber: '1234567890',
    bsb: '633-000',
    reference: `SPIN${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  };

  const quickAmounts = [10, 20, 50, 100, 200, 500];

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (amount && screenshot) {
      setIsProcessing(true);
      setTimeout(() => {
        onDeposit(parseFloat(amount));
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 p-4">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} variant="ghost" className="text-white p-2">
            ←
          </Button>
          <div>
            <h1 className="text-xl font-bold">💰 Deposit Funds</h1>
            <p className="text-sm text-green-100">Instant PayID Transfer</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Amount Selection */}
        <Card className="bg-gray-900 border-gray-700 p-4">
          <h2 className="text-lg font-bold text-green-400 mb-3">💵 Select Amount</h2>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {quickAmounts.map((value) => (
              <Button
                key={value}
                onClick={() => handleQuickAmount(value)}
                variant={amount === value.toString() ? "default" : "outline"}
                className={`${amount === value.toString() ? 'bg-green-600' : 'border-gray-600'}`}
              >
                ${value}
              </Button>
            ))}
          </div>
          
          <Input
            type="number"
            placeholder="Custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
          />
        </Card>

        {/* PayID Details */}
        {amount && (
          <Card className="bg-gradient-to-br from-blue-900 to-gray-900 border-blue-500 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-blue-400">🏦 Transfer Details</h2>
              <Badge className="bg-green-500 animate-pulse">LIVE</Badge>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg space-y-2 border border-yellow-500">
              <div className="flex justify-between">
                <span className="text-gray-400">Bank:</span>
                <span className="font-mono text-white">{payidDetails.bank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">BSB:</span>
                <span className="font-mono text-white">{payidDetails.bsb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account:</span>
                <span className="font-mono text-white">{payidDetails.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="font-mono text-white">{payidDetails.accountName}</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-2">
                <span className="text-gray-400">Reference:</span>
                <span className="font-mono text-yellow-400 font-bold">{payidDetails.reference}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Instructions */}
        {amount && (
          <Card className="bg-gray-900 border-gray-700 p-4">
            <h3 className="text-md font-bold text-yellow-500 mb-3">📋 Instructions</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span>Transfer <strong>${amount}</strong> to the account above</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span>Use <strong>{payidDetails.reference}</strong> as payment reference</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span>Upload screenshot of successful transfer</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                <span>Funds credited within 2-5 minutes</span>
              </div>
            </div>
          </Card>
        )}

        {/* Screenshot Upload */}
        {amount && (
          <Card className="bg-gray-900 border-gray-700 p-4">
            <h3 className="text-md font-bold text-purple-400 mb-3">📸 Upload Screenshot</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotUpload}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
            />
            {screenshot && (
              <p className="text-green-400 text-sm mt-2">✅ Screenshot uploaded: {screenshot.name}</p>
            )}
          </Card>
        )}

        {/* Submit */}
        {amount && (
          <Button
            onClick={handleSubmit}
            disabled={!screenshot || isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-4 font-bold"
          >
            {isProcessing ? '⏳ Processing...' : '🚀 Submit & Credit Balance'}
          </Button>
        )}

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>🔒 Secure SSL Encrypted • 🏆 Licensed Operator</p>
          <p>⚡ Average processing time: 3 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default PayIDDeposit;