/*
  # Add IPL 2025 Games

  This migration adds upcoming IPL 2025 matches to the games table
*/

INSERT INTO games (type, date, teamA, teamB, status) VALUES
  ('win', '2025-04-15 19:30:00+05:30', 'Mumbai Indians', 'Chennai Super Kings', 'upcoming'),
  ('win', '2025-04-16 19:30:00+05:30', 'Royal Challengers Bangalore', 'Kolkata Knight Riders', 'upcoming'),
  ('win', '2025-04-17 19:30:00+05:30', 'Delhi Capitals', 'Rajasthan Royals', 'upcoming'),
  ('win', '2025-04-18 19:30:00+05:30', 'Punjab Kings', 'Sunrisers Hyderabad', 'upcoming'),
  ('win', '2025-04-19 15:30:00+05:30', 'Gujarat Titans', 'Lucknow Super Giants', 'upcoming');

-- Add some score prediction games
INSERT INTO games (type, date, team, status) VALUES
  ('score', '2025-04-15 19:30:00+05:30', 'Mumbai Indians', 'upcoming'),
  ('score', '2025-04-16 19:30:00+05:30', 'Royal Challengers Bangalore', 'upcoming'),
  ('score', '2025-04-17 19:30:00+05:30', 'Rajasthan Royals', 'upcoming'),
  ('score', '2025-04-18 19:30:00+05:30', 'Punjab Kings', 'upcoming'),
  ('score', '2025-04-19 15:30:00+05:30', 'Gujarat Titans', 'upcoming');