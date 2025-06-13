import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface WinEntry {
  id: string;
  username: string;
  game: string;
  amount: number;
  timestamp: Date;
  isJackpot?: boolean;
}

const LiveWinFeed: React.FC = () => {
  const [wins, setWins] = useState<WinEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fakeUsernames = [
    'Jaydo420', 'MissCashout', 'SpinKing88', 'LuckyLuke', 'CasinoQueen',
    'BigWinner', 'SlotMaster', 'GoldRush', 'JackpotJoe', 'WinnerTakesAll',
    'CashCow', 'SpinDoctor', 'LuckyCharm', 'MoneyMaker', 'BigBaller',
    'SlotLord', 'CasinoKing', 'WinBig', 'LuckyStrike', 'CashMachine'
  ];

  const games = [
    'Golden Rooster', 'MBK Gangster', 'Crown Rich', 'Dollar Eagle', 'Lion Gold',
    'Happy Buddha', 'Soccer Magic', 'Sea Treasures', 'Fire Dragon', 'Lucky Seven'
  ];

  const generateFakeWin = (): WinEntry => {
    const isJackpot = Math.random() < 0.1; // 10% chance of jackpot
    const baseAmount = isJackpot ? 500 + Math.random() * 2000 : 5 + Math.random() * 200;
    
    return {
      id: Math.random().toString(36).substring(2),
      username: fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)],
      game: games[Math.floor(Math.random() * games.length)],
      amount: Math.floor(baseAmount * 100) / 100,
      timestamp: new Date(),
      isJackpot
    };
  };

  useEffect(() => {
    // Initialize with some wins
    const initialWins = Array.from({ length: 5 }, generateFakeWin);
    setWins(initialWins);

    // Generate new wins every 8-13 seconds
    const interval = setInterval(() => {
      const newWin = generateFakeWin();
      setWins(prev => [newWin, ...prev.slice(0, 9)]); // Keep only last 10 wins
    }, 8000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-scroll through wins
    if (wins.length > 1) {
      const scrollInterval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % Math.min(wins.length, 3));
      }, 3000);
      return () => clearInterval(scrollInterval);
    }
  }, [wins.length]);

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (wins.length === 0) return null;

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-green-400 flex items-center gap-2">
          🎉 Live Wins
          <Badge className="bg-red-500 animate-pulse text-xs">LIVE</Badge>
        </h2>
        <span className="text-xs text-gray-400">{wins.length} recent wins</span>
      </div>

      {/* Featured Win */}
      <Card className="bg-gradient-to-r from-green-900 to-black border-green-500 p-4 mb-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-black">
                {wins[currentIndex]?.username.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white">
                  @{wins[currentIndex]?.username}
                </div>
                <div className="text-sm text-gray-300">
                  {wins[currentIndex]?.game}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${wins[currentIndex]?.isJackpot ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
                ${wins[currentIndex]?.amount.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">
                {wins[currentIndex] && formatTimeAgo(wins[currentIndex].timestamp)}
              </div>
            </div>
          </div>
          {wins[currentIndex]?.isJackpot && (
            <div className="mt-2 text-center">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold animate-pulse">
                🏆 JACKPOT WIN! 🏆
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Recent Wins List */}
      <div className="space-y-2">
        {wins.slice(1, 4).map((win, index) => (
          <Card key={win.id} className="bg-gray-900 border-gray-700 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {win.username.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">@{win.username}</span>
                  <span className="text-xs text-gray-400 ml-2">{win.game}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${win.isJackpot ? 'text-yellow-400' : 'text-green-400'}`}>
                  ${win.amount.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTimeAgo(win.timestamp)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-4">
        <button className="text-sm text-blue-400 hover:text-blue-300 underline">
          View All Recent Wins →
        </button>
      </div>

      {/* Ticker Animation */}
      <div className="mt-4 bg-gray-800 rounded-lg p-2 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          <span className="text-sm text-gray-300">
            🎰 Live Casino • 
            {wins.slice(0, 5).map(win => 
              `@${win.username} won $${win.amount.toFixed(2)} on ${win.game}`
            ).join(' • ')} • 
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveWinFeed;