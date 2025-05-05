import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  image_url: string;
  content: string;
}

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  async function fetchArticle() {
    try {
      const { data, error } = await supabase
        .from('highlights')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  }

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

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A1929] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
          <p className="text-gray-400">The article you're looking for doesn't exist.</p>
          <Link to="/highlights" className="text-[#F5B729] hover:text-[#E3A82A] mt-4 inline-block">
            Back to Highlights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1929]">
      {/* Full-width hero image */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${article.image_url})`,
            filter: "brightness(0.8)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-[#0A1929]/50 to-transparent" />
        
        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/highlights"
              className="inline-flex items-center space-x-2 text-[#F5B729] hover:text-[#E3A82A] mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Highlights</span>
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="w-full bg-gradient-to-b from-[#0A1929] to-[#0D3158]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-12 gap-8">
            {/* Main content */}
            <div className="col-span-12 lg:col-span-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-6">
                  {article.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-lg">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <div className="bg-[#0A2540] rounded-xl p-6 border border-[#1A3A5C]">
                <h3 className="text-xl font-bold text-white mb-4">About the Author</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#1A3A5C] rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-[#F5B729]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{article.author}</p>
                    <p className="text-gray-400 text-sm">Cricket Analyst</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A2540] rounded-xl p-6 border border-[#1A3A5C]">
                <h3 className="text-xl font-bold text-white mb-4">Share Article</h3>
                <div className="flex space-x-4">
                  <button className="flex-1 bg-[#1A3A5C] text-white py-2 rounded-lg hover:bg-[#1A8754] transition-colors">
                    Share
                  </button>
                  <button className="flex-1 bg-[#1A3A5C] text-white py-2 rounded-lg hover:bg-[#1A8754] transition-colors">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}