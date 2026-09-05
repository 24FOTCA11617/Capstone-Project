import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function signUpWithSupabase({ email, password, name }) {
  if (!supabase) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.auth.signUp({ email, password, options: { data: { name } } })
}

export async function signInWithSupabase({ email, password }) {
  if (!supabase) return { data: null, error: new Error('Supabase is not configured') }
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOutFromSupabase() {
  if (supabase) return supabase.auth.signOut()
  return { error: null }
}
