export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      country: {
        Row: {
          continent: string
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          continent: string
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          continent?: string
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      game_weeks: {
        Row: {
          end_date: string | null
          gw: string | null
          id: string
          is_active: boolean
          league_id: number | null
          start_date: string | null
        }
        Insert: {
          end_date?: string | null
          gw?: string | null
          id?: string
          is_active?: boolean
          league_id?: number | null
          start_date?: string | null
        }
        Update: {
          end_date?: string | null
          gw?: string | null
          id?: string
          is_active?: boolean
          league_id?: number | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_weeks_league_id_fkey"
            columns: ["league_id"]
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          }
        ]
      }
      leagues: {
        Row: {
          country_id: number | null
          created_at: string | null
          end_date: string | null
          id: number
          name: string
          season_id: number | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          country_id?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: number
          name: string
          season_id?: number | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          country_id?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: number
          name?: string
          season_id?: number | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leagues_country_id_fkey"
            columns: ["country_id"]
            referencedRelation: "country"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leagues_season_id_fkey"
            columns: ["season_id"]
            referencedRelation: "season"
            referencedColumns: ["id"]
          }
        ]
      }
      livescore_api_teams: {
        Row: {
          created_at: string | null
          external_country_id: string | null
          external_country_name: string | null
          external_id: string
          id: string
          name: string | null
          stadium: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          external_country_id?: string | null
          external_country_name?: string | null
          external_id: string
          id?: string
          name?: string | null
          stadium?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          external_country_id?: string | null
          external_country_name?: string | null
          external_id?: string
          id?: string
          name?: string | null
          stadium?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      players: {
        Row: {
          active: boolean | null
          created_at: string | null
          external_id: string | null
          first_name: string | null
          id: number
          jersey_number: number | null
          last_name: string | null
          position_id: number | null
          source: string | null
          team_id: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          external_id?: string | null
          first_name?: string | null
          id?: number
          jersey_number?: number | null
          last_name?: string | null
          position_id?: number | null
          source?: string | null
          team_id?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          external_id?: string | null
          first_name?: string | null
          id?: number
          jersey_number?: number | null
          last_name?: string | null
          position_id?: number | null
          source?: string | null
          team_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_position_id_fkey"
            columns: ["position_id"]
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      positions: {
        Row: {
          abbrevation: string
          created_at: string | null
          id: number
          position: string
          updated_at: string | null
        }
        Insert: {
          abbrevation: string
          created_at?: string | null
          id?: number
          position: string
          updated_at?: string | null
        }
        Update: {
          abbrevation?: string
          created_at?: string | null
          id?: number
          position?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      season: {
        Row: {
          created_at: string | null
          id: number
          season: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          season: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          season?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      squad_configs: {
        Row: {
          created_at: string | null
          id: string
          league_id: number | null
          max_players_per_team: number
          max_transfers_per_gw: number
          required_defenders: number
          required_forwards: number
          required_goalkeepers: number
          required_midfielders: number
          required_players: number
          required_starting_squad: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          league_id?: number | null
          max_players_per_team?: number
          max_transfers_per_gw?: number
          required_defenders?: number
          required_forwards?: number
          required_goalkeepers?: number
          required_midfielders?: number
          required_players?: number
          required_starting_squad?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          league_id?: number | null
          max_players_per_team?: number
          max_transfers_per_gw?: number
          required_defenders?: number
          required_forwards?: number
          required_goalkeepers?: number
          required_midfielders?: number
          required_players?: number
          required_starting_squad?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "squad_confgis_league_id_fkey"
            columns: ["league_id"]
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          }
        ]
      }
      team_profile: {
        Row: {
          created_at: string | null
          id: number
          season_id: number | null
          team_name: string
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          season_id?: number | null
          team_name: string
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          season_id?: number | null
          team_name?: string
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_profile_season_id_fkey"
            columns: ["season_id"]
            referencedRelation: "season"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_profile_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_detail"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          external_id: string | null
          id: number
          league_id: number | null
          name: string
          season_id: number | null
          short_name: string | null
          source: string | null
          stadium: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          external_id?: string | null
          id?: number
          league_id?: number | null
          name: string
          season_id?: number | null
          short_name?: string | null
          source?: string | null
          stadium?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          external_id?: string | null
          id?: number
          league_id?: number | null
          name?: string
          season_id?: number | null
          short_name?: string | null
          source?: string | null
          stadium?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_league_id_fkey"
            columns: ["league_id"]
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_season_id_fkey"
            columns: ["season_id"]
            referencedRelation: "season"
            referencedColumns: ["id"]
          }
        ]
      }
      user_detail: {
        Row: {
          auth_id: string
          created_at: string | null
          date_of_birth: string
          favourite_team: number | null
          first_name: string
          gender: string
          id: number
          last_name: string
          updated_at: string | null
        }
        Insert: {
          auth_id: string
          created_at?: string | null
          date_of_birth: string
          favourite_team?: number | null
          first_name: string
          gender: string
          id?: number
          last_name: string
          updated_at?: string | null
        }
        Update: {
          auth_id?: string
          created_at?: string | null
          date_of_birth?: string
          favourite_team?: number | null
          first_name?: string
          gender?: string
          id?: number
          last_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_detail_auth_id_fkey"
            columns: ["auth_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_detail_favourite_team_fkey"
            columns: ["favourite_team"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      user_squad_entry: {
        Row: {
          created_at: string | null
          game_week: string | null
          id: string
          is_starting: boolean | null
          player_id: number | null
          team_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          game_week?: string | null
          id?: string
          is_starting?: boolean | null
          player_id?: number | null
          team_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          game_week?: string | null
          id?: string
          is_starting?: boolean | null
          player_id?: number | null
          team_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_squad_entry_game_week_fkey"
            columns: ["game_week"]
            referencedRelation: "game_weeks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_squad_entry_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_squad_entry_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "team_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_squad_entry_transactions: {
        Row: {
          created_at: string | null
          game_week: string
          id: string
          player_in: number | null
          player_out: number | null
          team_id: number
          txn_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          game_week: string
          id?: string
          player_in?: number | null
          player_out?: number | null
          team_id: number
          txn_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          game_week?: string
          id?: string
          player_in?: number | null
          player_out?: number | null
          team_id?: number
          txn_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_squad_entry_transactions_game_week_fkey"
            columns: ["game_week"]
            referencedRelation: "game_weeks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_squad_entry_transactions_player_in_fkey"
            columns: ["player_in"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_squad_entry_transactions_player_out_fkey"
            columns: ["player_out"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_squad_entry_transactions_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "team_profile"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

