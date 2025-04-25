/*
  # Initial Schema Setup for CrickWin

  1. New Tables
    - users: Custom fields for user profiles
    - games: Stores cricket matches for betting
    - win_game_bets: Stores match winner prediction bets
    - score_prediction_bets: Stores team score prediction bets
    - transactions: Tracks user deposits and withdrawals

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
    - Add policies for admin access

  3. Functions
    - update_user_balance: Handles balance updates for transactions
*/

-- Create custom types
CREATE TYPE game_type AS ENUM ('win', 'score');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdraw');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'rejected');
CREATE TYPE game_status AS ENUM ('upcoming', 'live', 'completed');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  balance decimal(10,2) DEFAULT 0.00 CHECK (balance >= 0),
  wallet_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type game_type NOT NULL,
  date timestamptz NOT NULL,
  teamA text,
  teamB text,
  team text,
  status game_status DEFAULT 'upcoming',
  winning_team text,
  final_score integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_teams CHECK (
    (type = 'win' AND teamA IS NOT NULL AND teamB IS NOT NULL AND team IS NULL) OR
    (type = 'score' AND team IS NOT NULL AND teamA IS NULL AND teamB IS NULL)
  )
);

-- Create win_game_bets table
CREATE TABLE IF NOT EXISTS win_game_bets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  game_id uuid REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  team text NOT NULL,
  predicted_percentage decimal(5,2) NOT NULL CHECK (predicted_percentage BETWEEN 0 AND 100),
  bet_amount decimal(10,2) NOT NULL CHECK (bet_amount > 0),
  status transaction_status DEFAULT 'pending',
  payout_amount decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create score_prediction_bets table
CREATE TABLE IF NOT EXISTS score_prediction_bets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  game_id uuid REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  team text NOT NULL,
  predicted_score integer NOT NULL CHECK (predicted_score >= 0),
  bet_amount decimal(10,2) NOT NULL CHECK (bet_amount > 0),
  status transaction_status DEFAULT 'pending',
  payout_amount decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type transaction_type NOT NULL,
  amount decimal(10,2) NOT NULL CHECK (amount > 0),
  status transaction_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE win_game_bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_prediction_bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for games table
CREATE POLICY "Anyone can view games"
  ON games FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert games"
  ON games FOR INSERT
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can update games"
  ON games FOR UPDATE
  USING ((auth.jwt() ->> 'role')::text = 'admin');

-- Create policies for win_game_bets table
CREATE POLICY "Users can view their own win bets"
  ON win_game_bets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create win bets"
  ON win_game_bets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for score_prediction_bets table
CREATE POLICY "Users can view their own score bets"
  ON score_prediction_bets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create score bets"
  ON score_prediction_bets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for transactions table
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawal requests"
  ON transactions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    type = 'withdraw'
  );

-- Create function to update user balance
CREATE OR REPLACE FUNCTION update_user_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    IF NEW.type = 'deposit' THEN
      UPDATE users SET balance = balance + NEW.amount WHERE id = NEW.user_id;
    ELSIF NEW.type = 'withdraw' THEN
      UPDATE users SET balance = balance - NEW.amount WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for balance updates
CREATE TRIGGER update_balance_on_transaction
  AFTER UPDATE OF status ON transactions
  FOR EACH ROW
  WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
  EXECUTE FUNCTION update_user_balance();

-- Create indexes for better query performance
CREATE INDEX idx_games_date ON games(date);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_win_game_bets_user_id ON win_game_bets(user_id);
CREATE INDEX idx_win_game_bets_game_id ON win_game_bets(game_id);
CREATE INDEX idx_score_prediction_bets_user_id ON score_prediction_bets(user_id);
CREATE INDEX idx_score_prediction_bets_game_id ON score_prediction_bets(game_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);