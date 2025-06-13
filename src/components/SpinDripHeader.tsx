import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SpinDripHeaderProps {
  balance: number;
  onDeposit: () => void;
  onWithdraw: () => void;
  onRefresh: () => void;
}

const SpinDripHeader: React.FC<SpinDripHeaderProps> = ({ 
  balance, 
  onDeposit, 
  onWithdraw, 
  onRefresh 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [showBalanceAnimation, setShowBalanceAnimation] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setShowBalanceAnimation(true);
    
    setTimeout(() => {
      onRefresh();
      setIsRefreshing(false);
      setLastRefresh(new Date());
      
      setTimeout(() => {
        setShowBalanceAnimation(false);
      }, 1000);
    }, 1500);
  };

  const formatLastRefresh = () => {
    if (!lastRefresh) return '';
    const seconds = Math.floor((new Date().getTime() - lastRefresh.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SpinDrip</h1>
            <p className="text-xs text-gray-400">Premium Casino</p>
          </div>
        </div>

        {/* User Info */}
        <div className="text-right">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 text-xs">ONLINE</Badge>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Welcome back!</p>
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 p-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-300">Available Balance</p>
            <div className={`text-2xl font-bold text-green-400 ${showBalanceAnimation ? 'animate-pulse' : ''}`}>
              ${balance.toFixed(2)}
            </div>
            {lastRefresh && (
              <p className="text-xs text-gray-500">Updated {formatLastRefresh()}</p>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-300">Today's Profit</div>
            <div className="text-lg font-bold text-yellow-400">
              +${(Math.random() * 50 + 10).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={onDeposit}
            className="bg-green-600 hover:bg-green-700 font-bold py-3"
          >
            💰 Deposit
          </Button>
          
          <Button 
            onClick={onWithdraw}
            className="bg-red-600 hover:bg-red-700 font-bold py-3"
          >
            💸 Withdraw
          </Button>
          
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="border-blue-500 text-blue-400 hover:bg-blue-900/20 font-bold py-3"
          >
            {isRefreshing ? (
              <span className="flex items-center gap-1">
                <span className="animate-spin">🔄</span>
                <span className="text-xs">Sync...</span>
              </span>
            ) : (
              '🔄 Refresh'
            )}
          </Button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-center">
        <p className="text-sm font-semibold text-white">
          🎁 First Deposit Bonus: 100% Match up to $500! 
          <span className="underline cursor-pointer ml-1">Claim Now</span>
        </p>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-800/50 p-3">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              🎰 Games: <span className="text-white font-semibold">150+</span>
            </span>
            <span className="text-gray-400">
              🏆 RTP: <span className="text-green-400 font-semibold">96.5%</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              👥 Online: <span className="text-blue-400 font-semibold">{88 + Math.floor(Math.random() * 33)}</span>
            </span>
            <span className="text-gray-400">
              ⚡ Ping: <span className="text-green-400 font-semibold">12ms</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinDripHeader;