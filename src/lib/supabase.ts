import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseAnonKey) {
       console.warn('Supabase credentials are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
       // Return a dummy client or throw. We return a mock to prevent immediate crashes, 
       // but actual operations will fail if they don't check.
       // Actually, we must return a real client but Supabase requires valid URL.
       // We'll initialize with a dummy URL that will fail on fetch but not on creation.
       return createClient('https://dummy.supabase.co', 'dummy_key');
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// For backward compatibility, export a proxy that lazily instantiates
export const supabase = new Proxy({}, {
  get: (target, prop) => {
    const client = getSupabase();
    return (client as any)[prop];
  }
}) as SupabaseClient;
