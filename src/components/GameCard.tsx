import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, TrendingUp, Trophy, Target } from 'lucide-react';
import { Database } from '../lib/database.types';
import { useTheme } from '../contexts/ThemeContext';

type Game = Database['public']['Tables']['games']['Row'];

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const { theme } = useTheme();
  const isWinGame = game.type === 'win';

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const getTeamLogo = (url?: string | null, name?: string | null) => (
    <div className={`w-24 h-24 rounded-full ${theme === 'dark' ? 'bg-[#0D1F33]' : 'bg-gray-100'} flex items-center justify-center overflow-hidden`}>
      {url ? (
        <img
          src={url}
          alt={name ?? 'Team logo'}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
          }}
        />
      ) : (
        <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-bold`}>{name?.slice(0, 2)}</span>
      )}
    </div>
  );

  return (
    <div className={`${theme === 'dark' ? 'bg-[#0D1F33]' : 'bg-white'} rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 ${
      game.status === 'live' ? 'border-l-4 border-green-500' : ''
    }`}>
      {/* Status bar */}
      <div className={`py-1 px-4 text-xs font-semibold ${
        game.status === 'live'
          ? 'bg-green-500 text-white flex items-center'
          : game.status === 'completed'
          ? 'bg-blue-500 text-white'
          : theme === 'dark' ? 'bg-[#102A44] text-gray-300' : 'bg-gray-100 text-gray-600'
      }`}>
        {game.status === 'live' ? (
          <>
            <span className="mr-2 h-2 w-2 bg-white rounded-full animate-pulse"></span>
            LIVE NOW
          </>
        ) : game.status === 'completed' ? (
          'COMPLETED'
        ) : (
          formatDate(game.date)
        )}
      </div>

      {/* Main content */}
      <div className="p-5 space-y-5">
        {/* Date / Time / Location */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{formatTime(game.date)}</span>
          </div>
          {game.location && (
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{game.location}</span>
            </div>
          )}
        </div>

        {/* Teams */}
        {isWinGame ? (
          <div className="flex justify-between items-center">
            {/* Team A */}
            <div className="flex flex-col items-center">
              {getTeamLogo(game.teama_logo_url ?? undefined, game.teama)}
              <div className={`mt-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{game.teama}</div>
              {(game.status === 'live' || game.status === 'completed') && (
                <div className="text-2xl font-bold text-[#F5B729]">{game.teama_score}</div>
              )}
              {game.status === 'completed' && game.winning_team === game.teama && (
                <div className="mt-1 text-green-500 text-sm font-medium">Winner</div>
              )}
            </div>

            {/* VS */}
            <div className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>VS</div>

            {/* Team B */}
            <div className="flex flex-col items-center">
              {getTeamLogo(game.teamb_logo_url ?? undefined, game.teamb)}
              <div className={`mt-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{game.teamb}</div>
              {(game.status === 'live' || game.status === 'completed') && (
                <div className="text-2xl font-bold text-[#F5B729]">{game.teamb_score}</div>
              )}
              {game.status === 'completed' && game.winning_team === game.teamb && (
                <div className="mt-1 text-green-500 text-sm font-medium">Winner</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center">
            {getTeamLogo(game.team_logo_url ?? undefined, game.team ?? undefined)}
            <div className={`mt-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{game.team}</div>
            {(game.status === 'live' || game.status === 'completed') && (
              <div className="text-2xl font-bold text-[#F5B729]">{game.team_score}</div>
            )}
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Predict the final score</div>
          </div>
        )}

        {/* Odds Section */}
        {isWinGame && game.odds_teama && game.odds_teamb ? (
          <div className={`${theme === 'dark' ? 'bg-[#0A1929]' : 'bg-gray-50'} p-3 rounded-lg`}>
            <div className={`text-xs mb-2 flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              Game Odds
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`${theme === 'dark' ? 'bg-[#102A44]' : 'bg-white'} rounded px-3 py-2 text-center`}>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{game.teama}</div>
                <div className="text-[#F5B729] font-bold">{game.odds_teama.toFixed(2)}</div>
              </div>
              <div className={`${theme === 'dark' ? 'bg-[#102A44]' : 'bg-white'} rounded px-3 py-2 text-center`}>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{game.teamb}</div>
                <div className="text-[#F5B729] font-bold">{game.odds_teamb.toFixed(2)}</div>
              </div>
              {game.odds_draw && (
                <div className={`col-span-2 ${theme === 'dark' ? 'bg-[#102A44]' : 'bg-white'} rounded px-3 py-2 text-center`}>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Draw</div>
                  <div className="text-[#F5B729] font-bold">{game.odds_draw.toFixed(2)}</div>
                </div>
              )}
            </div>
          </div>
        ) : !isWinGame && game.odds_team && (
          <div className={`${theme === 'dark' ? 'bg-[#0A1929]' : 'bg-gray-50'} p-3 rounded-lg text-center`}>
            <div className={`text-xs mb-2 flex items-center justify-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <Target className="w-3 h-3 mr-1" />
              Score Prediction
            </div>
            <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              Guess the final score for <span className="font-semibold">{game.team}</span>
              <div className="text-[#F5B729] font-bold">{game.odds_team.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* Game type tag */}
        <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="bg-[#1A8754]/10 p-2 rounded-md">
            {isWinGame ? <Trophy className="w-4 h-4 text-[#F5B729]" /> : <Target className="w-4 h-4 text-[#F5B729]" />}
          </div>
          {isWinGame ? 'Match Winner' : 'Score Prediction'}
        </div>

        {/* CTA Button */}
        <Link
          to={`/games/${game.id}`}
          className="block w-full text-center py-3 bg-[#F5B729] text-[#0A2540] font-bold rounded-lg hover:bg-[#E3A82A] transition-colors"
        >
          {game.status === 'live' ? 'Bet Now' : game.status === 'completed' ? 'View Result' : 'Place Bet'}
        </Link>
      </div>
    </div>
  );
}