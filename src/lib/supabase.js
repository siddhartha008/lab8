import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase') || supabaseAnonKey.includes('your_supabase')) {
  console.warn('Supabase environment variables not configured. Using mock mode.')
}

// Only create Supabase client if we have valid credentials
export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your_supabase'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
