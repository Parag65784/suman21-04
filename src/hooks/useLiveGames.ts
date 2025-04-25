import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // adjust path if needed

export interface Game {
  id: string;
  type: string;
  date: string;
  teama: string;
  teamb: string;
  status: string;
  teama_logo_url: string;
  teamb_logo_url: string;
  // Add more fields if you need
}

export const useLiveGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveGames = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('status', 'live')
        .order('date', { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setGames(data || []);
      }

      setLoading(false);
    };

    fetchLiveGames();
  }, []);

  return { games, loading, error };
};
