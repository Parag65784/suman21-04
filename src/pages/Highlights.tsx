import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

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

export function Highlights() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-light"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section 1 */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
          alt="Cricket Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/80 to-bg-dark/0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                IPL 2025 Latest Updates
              </h1>
              <p className="text-xl text-neutral-silver">
                Stay updated with the latest news, scores, and highlights from the world's biggest T20 league.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="bg-bg-card rounded-xl p-8 mb-12 border border-neutral-silver">
        <h2 className="text-2xl font-bold text-neutral-white mb-6">IPL Teams</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="text-center">
              <img
                src={team.logo_url}
                alt={team.name}
                className="w-24 h-24 mx-auto mb-3"
              />
              <p className="text-neutral-white font-semibold">{team.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-neutral-white mb-6">Latest Updates</h2>
        <div className="grid grid-cols-1 gap-8">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="bg-bg-card rounded-xl overflow-hidden border border-neutral-silver">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={highlight.image_url}
                    alt={highlight.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center text-sm text-neutral-silver mb-2">
                    <span>{new Date(highlight.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{highlight.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-white mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-neutral-silver">
                    {highlight.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}