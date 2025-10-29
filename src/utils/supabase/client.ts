import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

const supabaseUrl = `https://${projectId}.supabase.co`
const supabaseAnonKey = publicAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  username?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  content: string
  user_id: string
  room_id: string
  created_at: string
  profiles?: Profile
}

export interface Room {
  id: string
  name: string
  description?: string
  is_private: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface RoomMember {
  id: string
  room_id: string
  user_id: string
  joined_at: string
  role: 'admin' | 'member'
}