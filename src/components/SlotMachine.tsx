import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SlotMachineProps {
  gameId: string;
  balance: number;
  setBalance: (balance: number | ((prev: number) => number)) => void;
  onBack: () => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ gameId, balance, setBalance, onBack }) => {
  const [reels, setReels] = useState(['🍒', '🍋', '🍇']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [autoSpin, setAutoSpin] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);
  const [showBigWin, setShowBigWin] = useState(false);

  const symbols = ['🍒', '🍋', '🍇', '🍊', '🍎', '💎', '🔔', '⭐', '💰', '🎰'];
  
  const gameThemes: Record<string, { name: string; symbols: string[]; bg: string }> = {
    'golden-rooster': { name: '🐓 Golden Rooster', symbols: ['🐓', '🥚', '🌟', '💰', '🔔'], bg: 'from-yellow-600 to-orange-600' },
    'mbk-gangster': { name: '🔫 MBK Gangster', symbols: ['🔫', '💰', '🚗', '💎', '👑'], bg: 'from-gray-600 to-black' },
    'crown-rich': { name: '👑 Crown Rich', symbols: ['👑', '💎', '💰', '🏆', '⭐'], bg: 'from-purple-600 to-pink-600' },
    'dollar-eagle': { name: '🦅 Dollar Eagle', symbols: ['🦅', '💵', '🏔️', '⚡', '🌟'], bg: 'from-blue-600 to-green-600' },
    'lion-gold': { name: '🦁 Lion Gold', symbols: ['🦁', '👑', '💰', '🌟', '🔥'], bg: 'from-yellow-500 to-red-500' }
  };

  const currentTheme = gameThemes[gameId] || gameThemes['golden-rooster'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoSpin && balance >= betAmount && !isSpinning) {
      interval = setInterval(() => {
        handleSpin();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [autoSpin, balance, betAmount, isSpinning]);

  const handleSpin = () => {
    if (balance < betAmount || isSpinning) return;
    
    setIsSpinning(true);
    setBalance(prev => prev - betAmount);
    setTotalSpins(prev => prev + 1);
    setLastWin(0);
    
    // Spinning animation
    const spinInterval = setInterval(() => {
      setReels([
        currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)],
        currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)],
        currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)]
      ]);
    }, 100);
    
    setTimeout(() => {
      clearInterval(spinInterval);
      
      // Rigged logic: 15% win rate, 5% big win
      const random = Math.random();
      let finalReels: string[];
      let winAmount = 0;
      
      if (random < 0.05) { // 5% big win
        finalReels = [currentTheme.symbols[0], currentTheme.symbols[0], currentTheme.symbols[0]];
        winAmount = betAmount * (50 + Math.floor(Math.random() * 100));
        setShowBigWin(true);
        setTimeout(() => setShowBigWin(false), 3000);
      } else if (random < 0.15) { // 10% small win
        finalReels = [currentTheme.symbols[1], currentTheme.symbols[1], currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)]];
        winAmount = betAmount * (2 + Math.floor(Math.random() * 8));
      } else { // 85% loss
        finalReels = [
          currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)],
          currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)],
          currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)]
        ];
        // Ensure no winning combinations
        while (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          finalReels[2] = currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)];
        }
      }
      
      setReels(finalReels);
      
      if (winAmount > 0) {
        setLastWin(winAmount);
        setBalance(prev => prev + winAmount);
      }
      
      setIsSpinning(false);
    }, 1500);
  };

  const handleMaxBet = () => {
    setBetAmount(Math.min(balance, 10));
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Big Win Animation */}
      {showBigWin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-pulse">
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">BIG WIN!</div>
            <div className="text-6xl font-bold text-green-400">${lastWin.toFixed(2)}</div>
            <div className="text-xl text-white mt-4 animate-pulse">💰 JACKPOT! 💰</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-gradient-to-r ${currentTheme.bg} p-4`}>
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" className="text-white p-2">
            ← Back
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold">{currentTheme.name}</h1>
            <Badge className="bg-green-500">RTP: 96.5%</Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-200">Balance</div>
            <div className="text-lg font-bold">${balance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card className="bg-gray-800 p-3 text-center">
            <div className="text-sm text-gray-400">Total Spins</div>
            <div className="text-lg font-bold">{totalSpins}</div>
          </Card>
          <Card className="bg-gray-800 p-3 text-center">
            <div className="text-sm text-gray-400">Last Win</div>
            <div className="text-lg font-bold text-green-400">${lastWin.toFixed(2)}</div>
          </Card>
          <Card className="bg-gray-800 p-3 text-center">
            <div className="text-sm text-gray-400">Bet Amount</div>
            <div className="text-lg font-bold">${betAmount.toFixed(2)}</div>
          </Card>
        </div>

        {/* Slot Machine */}
        <Card className={`bg-gradient-to-br ${currentTheme.bg} p-6 mb-4 border-2 border-yellow-500`}>
          <div className="bg-black p-6 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {reels.map((symbol, index) => (
                <div key={index} className={`text-6xl p-4 bg-gray-800 rounded-lg border-2 border-yellow-500 ${isSpinning ? 'animate-spin' : ''}`}>
                  {symbol}
                </div>
              ))}
            </div>
            
            {lastWin > 0 && (
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-green-400 animate-pulse">
                  WIN: ${lastWin.toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Bet Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setBetAmount(Math.max(0.5, betAmount - 0.5))}
                  variant="outline"
                  className="border-yellow-500 text-yellow-500"
                  disabled={isSpinning}
                >
                  -
                </Button>
                <span className="text-lg font-bold px-4">${betAmount.toFixed(2)}</span>
                <Button 
                  onClick={() => setBetAmount(Math.min(balance, betAmount + 0.5))}
                  variant="outline"
                  className="border-yellow-500 text-yellow-500"
                  disabled={isSpinning}
                >
                  +
                </Button>
              </div>
              <Button 
                onClick={handleMaxBet}
                variant="outline"
                className="border-red-500 text-red-500"
                disabled={isSpinning}
              >
                MAX BET
              </Button>
            </div>

            {/* Spin Controls */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleSpin}
                disabled={balance < betAmount || isSpinning}
                className="bg-green-600 hover:bg-green-700 text-xl py-4 font-bold"
              >
                {isSpinning ? '🎰 SPINNING...' : '🎰 SPIN'}
              </Button>
              <Button 
                onClick={() => setAutoSpin(!autoSpin)}
                variant={autoSpin ? "destructive" : "outline"}
                className={`text-xl py-4 font-bold ${autoSpin ? '' : 'border-blue-500 text-blue-500'}`}
                disabled={balance < betAmount}
              >
                {autoSpin ? '⏹️ STOP' : '🔄 AUTO'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Paytable */}
        <Card className="bg-gray-900 border-gray-700 p-4">
          <h3 className="text-lg font-bold text-yellow-500 mb-3">💰 Paytable</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>3x {currentTheme.symbols[0]}</span>
              <span className="text-green-400">50x - 150x</span>
            </div>
            <div className="flex justify-between">
              <span>3x {currentTheme.symbols[1]}</span>
              <span className="text-green-400">10x - 30x</span>
            </div>
            <div className="flex justify-between">
              <span>2x {currentTheme.symbols[0]} or {currentTheme.symbols[1]}</span>
              <span className="text-green-400">2x - 10x</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SlotMachine;