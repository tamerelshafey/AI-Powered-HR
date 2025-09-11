import { createClient } from '@supabase/supabase-js';
import { User } from '../types';

// This assumes a 'profiles' table in Supabase that matches the User type.
// It must have an 'auth_uuid' column (UUID) which is a foreign key to 'auth.users.id'.
interface Profile extends User {}

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id'|'auth_uuid'>
        Update: Partial<Profile>
      }
    }
  }
}


const supabaseUrl = 'https://kxgdvqxdyikoxzepbofp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Z2R2cXhkeWlrb3h6ZXBib2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTA3OTEsImV4cCI6MjA3MzE2Njc5MX0.mq9ZCcoo4EVi5Opjbx5YgeNCD725Yf_8tViEQmLGtR4';

// The generic type provides autocomplete and type safety for interacting with the database.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);