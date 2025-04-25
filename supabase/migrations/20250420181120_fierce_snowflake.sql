/*
  # Add team logos and highlights table

  1. New Tables
    - teams: Stores IPL team information
    - highlights: Stores match highlights and updates
  
  2. Changes
    - Add logo column to games table
*/

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  logo_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create highlights table
CREATE TABLE IF NOT EXISTS highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date timestamptz NOT NULL,
  author text NOT NULL,
  image_url text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view teams"
  ON teams FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view highlights"
  ON highlights FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage highlights"
  ON highlights
  USING ((auth.jwt() ->> 'role')::text = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

-- Insert IPL teams
INSERT INTO teams (name, logo_url) VALUES
  ('Mumbai Indians', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Roundbig/MIroundbig.png'),
  ('Chennai Super Kings', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Roundbig/CSKroundbig.png'),
  ('Royal Challengers Bangalore', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Roundbig/RCBroundbig.png'),
  ('Kolkata Knight Riders', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Roundbig/KKRroundbig.png'),
  ('Delhi Capitals', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Roundbig/DCroundbig.png'),
  ('Punjab Kings', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Roundbig/PBKSroundbig.png'),
  ('Rajasthan Royals', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Roundbig/RRroundbig.png'),
  ('Sunrisers Hyderabad', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Roundbig/SRHroundbig.png'),
  ('Gujarat Titans', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Roundbig/GTroundbig.png'),
  ('Lucknow Super Giants', 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Roundbig/LSGroundbig.png');

-- Insert sample highlights
INSERT INTO highlights (title, date, author, image_url, content) VALUES
  ('IPL 2025 Opening Ceremony Details Announced', '2025-04-10 18:00:00+05:30', 'CrickWin Team', 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e', 'The IPL 2025 opening ceremony will feature spectacular performances...'),
  ('New Season, New Rules: What''s Changed in IPL 2025', '2025-04-11 14:30:00+05:30', 'CrickWin Team', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da', 'The BCCI has introduced several new rules for IPL 2025...');