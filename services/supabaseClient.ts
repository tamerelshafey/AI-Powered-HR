
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn("Supabase environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) are not set. The app will use mock data. Please configure these in your environment.");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
