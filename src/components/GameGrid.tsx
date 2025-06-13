import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Game {
  id: string;
  name: string;
  image: string;
  popular?: boolean;
  hot?: boolean;
  provider?: string;
}

interface GameGridProps {
  onGameSelect: (gameId: string) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ onGameSelect }) => {
  const games: Game[] = [
    { id: 'golden-rooster', name: 'Golden Rooster', image: '🐓', popular: true, hot: true, provider: 'Pragmatic' },
    { id: 'mbk-gangster', name: 'MBK Gangster', image: '🔫', popular: true, hot: true, provider: 'NetEnt' },
    { id: 'crown-rich', name: 'Crown Rich', image: '👑', popular: true, provider: 'Microgaming' },
    { id: 'dollar-eagle', name: 'Dollar Eagle', image: '🦅', hot: true, provider: 'Play\'n GO' },
    { id: 'lion-gold', name: 'Lion Gold', image: '🦁', popular: true, provider: 'Pragmatic' },
    { id: 'happy-buddha', name: 'Happy Buddha', image: '🧘', provider: 'NetEnt' },
    { id: 'soccer-magic', name: 'Soccer Magic', image: '⚽', hot: true, provider: 'Microgaming' },
    { id: 'sea-treasures', name: 'Sea Treasures', image: '🏴‍☠️', provider: 'Play\'n GO' },
    { id: 'fire-dragon', name: 'Fire Dragon', image: '🐉', popular: true, provider: 'Pragmatic' },
    { id: 'lucky-seven', name: 'Lucky Seven', image: '🎰', hot: true, provider: 'NetEnt' },
    { id: 'wild-west', name: 'Wild West', image: '🤠', provider: 'Microgaming' },
    { id: 'fruit-party', name: 'Fruit Party', image: '🍎', popular: true, provider: 'Pragmatic' }
  ];

  return (
    <div className="px-4 pb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-yellow-500">🎰 Games</h2>
        <span className="text-sm text-gray-400">{games.length} games</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {games.map((game) => (
          <Card 
            key={game.id}
            className="bg-gradient-to-br from-gray-900 to-black border-gray-700 hover:border-yellow-500 cursor-pointer transition-all duration-300 relative overflow-hidden group"
            onClick={() => onGameSelect(game.id)}
          >
            <div className="aspect-square p-2 text-center relative">
              {game.hot && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0 rounded-full animate-pulse z-10">
                  🔥
                </Badge>
              )}
              {game.popular && !game.hot && (
                <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 py-0 rounded-full z-10">
                  ⭐
                </Badge>
              )}
              
              <div className="text-2xl md:text-3xl mb-1 group-hover:scale-110 transition-transform">
                {game.image}
              </div>
              
              <div className="text-xs font-semibold text-white mb-1 leading-tight">
                {game.name}
              </div>
              
              <div className="text-xs text-gray-400">
                {game.provider}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-yellow-500 font-bold text-sm">PLAY</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Recently Played */}
      <div className="mt-6">
        <h3 className="text-md font-bold text-yellow-500 mb-3">🕒 Recently Played</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {games.slice(0, 4).map((game) => (
            <Card 
              key={`recent-${game.id}`}
              className="bg-gray-800 border-gray-600 cursor-pointer hover:border-yellow-500 transition-all flex-shrink-0"
              onClick={() => onGameSelect(game.id)}
            >
              <div className="p-2 text-center w-16">
                <div className="text-lg mb-1">{game.image}</div>
                <div className="text-xs text-gray-300 truncate">{game.name}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;