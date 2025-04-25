export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          balance: number
          wallet_address: string | null
          created_at: string
          updated_at: string
          upi_id: string | null
        }
        Insert: {
          id: string
          name: string
          email: string
          balance?: number
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
          upi_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          balance?: number
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
          upi_id?: string | null
        }
      }
      games: {
        Row: {
          id: string
          type: 'win' | 'score'
          date: string
          teama: string | null
          teamb: string | null
          team: string | null
          status: 'upcoming' | 'live' | 'completed'
          winning_team: string | null
          final_score: number | null
          created_at: string
          updated_at: string
          teama_logo_url: string | null
          teamb_logo_url: string | null
          team_logo_url: string | null
          score_a: string | null
          location: string | null
          odds_teama: number | null
          odds_teamb: number | null
          odds_team: number | null
          odds_draw: number | null
        }
        Insert: {
          id?: string
          type: 'win' | 'score'
          date: string
          teama?: string | null
          teamb?: string | null
          team?: string | null
          status?: 'upcoming' | 'live' | 'completed'
          winning_team?: string | null
          final_score?: number | null
          created_at?: string
          updated_at?: string
          teama_logo_url?: string | null
          teamb_logo_url?: string | null
          team_logo_url?: string | null
          score_a?: string | null
          location?: string | null
          odds_teama?: number | null
          odds_teamb?: number | null
          odds_team?: number | null
          odds_draw?: number | null
        }
        Update: {
          id?: string
          type?: 'win' | 'score'
          date?: string
          teama?: string | null
          teamb?: string | null
          team?: string | null
          status?: 'upcoming' | 'live' | 'completed'
          winning_team?: string | null
          final_score?: number | null
          created_at?: string
          updated_at?: string
          teama_logo_url?: string | null
          teamb_logo_url?: string | null
          team_logo_url?: string | null
          score_a?: string | null
          location?: string | null
          odds_teama?: number | null
          odds_teamb?: number | null
          odds_team?: number | null
          odds_draw?: number | null
        }
      }
      
      win_game_bets: {
        Row: {
          id: string
          user_id: string
          game_id: string
          team: string
          predicted_percentage: number
          bet_amount: number
          status: 'pending' | 'completed' | 'rejected'
          payout_amount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          team: string
          predicted_percentage: number
          bet_amount: number
          status?: 'pending' | 'completed' | 'rejected'
          payout_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          team?: string
          predicted_percentage?: number
          bet_amount?: number
          status?: 'pending' | 'completed' | 'rejected'
          payout_amount?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      score_prediction_bets: {
        Row: {
          id: string
          user_id: string
          game_id: string
          team: string
          predicted_score: number
          bet_amount: number
          status: 'pending' | 'completed' | 'rejected'
          payout_amount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          team: string
          predicted_score: number
          bet_amount: number
          status?: 'pending' | 'completed' | 'rejected'
          payout_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          team?: string
          predicted_score?: number
          bet_amount?: number
          status?: 'pending' | 'completed' | 'rejected'
          payout_amount?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'deposit' | 'withdraw'
          amount: number
          status: 'pending' | 'completed' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'deposit' | 'withdraw'
          amount: number
          status?: 'pending' | 'completed' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'deposit' | 'withdraw'
          amount?: number
          status?: 'pending' | 'completed' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      game_type: 'win' | 'score'
      transaction_type: 'deposit' | 'withdraw'
      transaction_status: 'pending' | 'completed' | 'rejected'
      game_status: 'upcoming' | 'live' | 'completed'
    }
  }
}