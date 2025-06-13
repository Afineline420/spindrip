import React, { useState, useEffect } from 'react';
import SpinDripHeader from './SpinDripHeader';
import GameGrid from './GameGrid';
import LiveWinFeed from './LiveWinFeed';
import PayIDDeposit from './PayIDDeposit';
import WithdrawTrap from './WithdrawTrap';
import SlotMachine from './SlotMachine';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const SpinDripApp: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showGame, setShowGame] = useState<string | null>(null);
  const [liveUsers, setLiveUsers] = useState(88);
  const [totalPayout, setTotalPayout] = useState(892456);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => 88 + Math.floor(Math.random() * 33));
      setTotalPayout(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleDeposit = () => setShowDeposit(true);
  const handleWithdraw = () => setShowWithdraw(true);
  const handleRefresh = () => {
    // Simulate balance refresh
    setBalance(prev => prev + Math.floor(Math.random() * 20) + 5);
  };

  const handleGameSelect = (gameId: string) => setShowGame(gameId);

  if (showGame) {
    return (
      <SlotMachine 
        gameId={showGame}
        balance={balance}
        setBalance={setBalance}
        onBack={() => setShowGame(null)}
      />
    );
  }

  if (showDeposit) {
    return (
      <PayIDDeposit 
        onBack={() => setShowDeposit(false)}
        onDeposit={(amount) => {
          setBalance(prev => prev + amount);
          setShowDeposit(false);
        }}
      />
    );
  }

  if (showWithdraw) {
    return (
      <WithdrawTrap 
        balance={balance}
        onBack={() => setShowWithdraw(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SpinDripHeader 
        balance={balance} 
        onDeposit={handleDeposit} 
        onWithdraw={handleWithdraw} 
        onRefresh={handleRefresh} 
      />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-4 m-4 rounded-lg text-center animate-pulse">
        <h2 className="text-xl font-bold mb-1">🎯 SPIN & WIN UP TO $640!</h2>
        <p className="text-sm">Join {liveUsers} players online now!</p>
        <Badge className="mt-2 bg-green-500 animate-bounce">LIVE</Badge>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['🔥 Hot', '⭐ Popular', '🎰 Slots', '🃏 Table', '🎲 Live'].map((cat) => (
            <Button key={cat} variant="outline" className="whitespace-nowrap border-yellow-500 text-yellow-500">
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <GameGrid onGameSelect={handleGameSelect} />
      <LiveWinFeed />
      
      {/* Stats Footer */}
      <div className="p-4 text-center text-sm text-gray-400">
        <p>💰 Total Paid Out: ${totalPayout.toLocaleString()}</p>
        <p>👥 {liveUsers} players online</p>
        <p className="text-xs mt-2">🔒 Secure • 🏆 Licensed • ⚡ Instant Payouts</p>
      </div>
    </div>
  );
};

export default SpinDripApp;