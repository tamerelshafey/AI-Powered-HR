
import { createClient } from '@supabase/supabase-js';

const supabaseUrlFromEnv = process.env.SUPABASE_URL;
const supabaseAnonKeyFromEnv = process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = 
    !!supabaseUrlFromEnv && 
    !!supabaseAnonKeyFromEnv && 
    !supabaseUrlFromEnv.includes('placeholder.supabase.co') && 
    !supabaseAnonKeyFromEnv.includes('YOUR_SUPABASE_ANON_KEY');

if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) are not set. The app will use mock data. Please configure these in your environment.");
}

// Provide a placeholder URL and key to createClient ONLY if the real ones are missing.
// This prevents the client from crashing on initialization.
// The application logic relies on `isSupabaseConfigured` to decide whether to make a real API call or use mocks,
// so this dummy client will never actually be used to make a request.
const supabaseUrl = supabaseUrlFromEnv || 'https://placeholder.supabase.co';
const supabaseAnonKey = supabaseAnonKeyFromEnv || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);