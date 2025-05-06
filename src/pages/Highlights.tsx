import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TrendingUp, Bell, Newspaper, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Highlight {
  id: string;
  title: string;
  date: string;
  author: string;
  image_url: string;
  content: string;
}

interface Team {
  id: string;
  name: string;
  logo_url: string;
}

interface LatestNews {
  id: string;
  heading: string;
  news_url: string;
}

interface LiveUpdate {
  id: string;
  match: string;
  status: string;
  url: string;
  timestamp: string;
}


export function Highlights() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([]);
  const [latestNews, setLatestNews] = useState<LatestNews[]>([]);

  useEffect(() => {
    fetchHighlights();
    fetchTeams();
  }, []);

  async function fetchHighlights() {
    try {
      const { data, error } = await supabase
        .from('highlights')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setHighlights(data || []);
    } catch (error) {
      console.error('Error fetching highlights:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLatestNews();
  }, []);

  async function fetchLatestNews() {
    try {
      const { data, error } = await supabase
        .from('latest_news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLatestNews(data || []);
    } catch (error) {
      console.error('Error fetching Latest News:', error);
    } finally {
      setLoading(false);
    }
  }


  async function fetchTeams() {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');

      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  }

  useEffect(() => {
    fetchLiveUpdates();
  }, []);

  async function fetchLiveUpdates() {
    try {
      const { data, error } = await supabase
        .from('live_updates')
        .select('match, url, status')
        .order('created_at', { ascending: false });
  
      if (error) throw error;
      setLiveUpdates(
        (data || []).map((update) => ({
          ...update,
          id: update.id || 'unknown-id',
          timestamp: update.timestamp || new Date().toISOString(),
        }))
      );
    } catch (error) {
      console.error('Error fetching live updates:', error);
    }
  }

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1929] flex justify-center items-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#1A8754] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#F5B729] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1929]">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/pages/Nwes.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYWdlcy9Od2VzLnBuZyIsImlhdCI6MTc0NTc2MjQ3OSwiZXhwIjoxNzc3Mjk4NDc5fQ.iYWMk5OsGvWCxfHdyxBNHdDOEYFOtM_iPYb8EeqBULs')",
            filter: "brightness(0.8)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1929]/80 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-[#004aad]">Highlights</span>
          </h1>
          <div className="w-20 h-1 bg-[#1A8754] mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl">
            Stay updated with the latest news, scores, and highlights from the world's biggest T20 league.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            {/* Media Gallery */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-6">
              <h3 className="text-xl font-bold text-white mb-4">Media Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/articles/SRHvsDC.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnRpY2xlcy9TUkh2c0RDLnBuZyIsImlhdCI6MTc0NjQzNjMxOCwiZXhwIjoxNzc3OTcyMzE4fQ.xl6ou2BE_5gzrqNnEc9bSfjeY0KHXR7V0ygFkTN8Ok4" 
                  alt="Cricket stadium" 
                  className="rounded-lg w-full h-24 object-cover"
                />
                <img 
                  src="https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/25714-16246395136733-800.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0LzI1NzE0LTE2MjQ2Mzk1MTM2NzMzLTgwMC5qcGVnIiwiaWF0IjoxNzQ2NDM1NDAxLCJleHAiOjE3Nzc5NzE0MDF9.biYgn67O4u_ajJFe1COWyVcAujH93hT0U03DFsmmHjc" 
                  alt="Cricket delhi" 
                  className="rounded-lg w-full h-24 object-cover"
                />
                <img 
                  src="https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/articles/SRH%20vs%20DC.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnRpY2xlcy9TUkggdnMgREMucG5nIiwiaWF0IjoxNzQ2NDM1Mjg0LCJleHAiOjE3Nzc5NzEyODR9.pdhGU4XXFSDhPkU8YNl1L--HZesQXmbnnUypOgN57MI" 
                  alt="Cricket Moment" 
                  className="rounded-lg w-full h-24 object-cover"
                />
                <img 
                  src="https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/articles/ChatGPT%20Image%20May%205,%202025,%2002_31_39%20PM.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnRpY2xlcy9DaGF0R1BUIEltYWdlIE1heSA1LCAyMDI1LCAwMl8zMV8zOSBQTS5wbmciLCJpYXQiOjE3NDY0MzU3NDEsImV4cCI6MTc3Nzk3MTc0MX0.okeCuj5_2cbA9nkkwsQWRl4qu91iwJjPSbKGWKYnoKg" 
                  alt="Cricket ipl" 
                  className="rounded-lg w-full h-24 object-cover"
                />
              </div>
            </div>

            {/* Teams Section */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-6">
              <h3 className="text-xl font-bold text-white mb-4">IPL Teams</h3>
              <div className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#1A3A5C] rounded-lg p-1">
                      <img
                        src={team.logo_url}
                        alt={team.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-white font-medium">{team.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="space-y-8">
              {highlights.map((highlight) => (
                <Link 
                  to={`/article/${highlight.id}`} 
                  key={highlight.id} 
                  className="block bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] overflow-hidden hover:border-[#1A8754] transition-all duration-300"
                >
                  <img
                    src={highlight.image_url}
                    alt={highlight.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <span>{new Date(highlight.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{highlight.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-300">
                      {truncateContent(highlight.content)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Sidebar Trending*/}
          <div className="lg:col-span-3 space-y-8">
            {/* Trending Box */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-[#004aad]" />
                <h3 className="text-xl font-bold text-white">Trending</h3>
              </div>
              <div className="space-y-4">
                <div className="text-gray-300 hover:text-[#cb6ce6] cursor-pointer transition-colors">
                  #IPL2025Final
                </div>
                <div className="text-gray-300 hover:text-[#cb6ce6] cursor-pointer transition-colors">
                  #CSKvsMI
                </div>
                <div className="text-gray-300 hover:text-[#cb6ce6] cursor-pointer transition-colors">
                  #CricketFever
                </div>
              </div>
            </div>

            {/* Latest News */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Newspaper className="text-[#004aad]" />
                <h3 className="text-xl font-bold text-white">Latest News</h3>
              </div>
              <ul className="space-y-2 list-disc list-inside">
                {latestNews.length > 0 ? (
                  latestNews.map((update) => (
                    <li key={update.id} className="text-white">
                      <a
                        href={update.news_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-light hover:underline"
                      >
                        {update.heading}
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400">No live News updates available.</p>
                )}
              </ul>
            </div>

            {/* Live Updates */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl border border-[#1A3A5C] p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="text-[#004aad]" />
                <h3 className="text-xl font-bold text-white">Live Updates</h3>
              </div>
              <ul className="space-y-2 list-disc list-inside">
                {liveUpdates.length > 0 ? (
                  liveUpdates.map((update) => (
                    <li key={update.id} className="text-white">
                      <a
                        href={update.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-light hover:underline"
                      >
                        {update.match}-{update. status}
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400">No live updates available.</p>
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}