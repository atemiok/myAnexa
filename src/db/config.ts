import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Load environment variables
config();

// Environment variables schema
const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
});

// Parse and validate environment variables
const env = envSchema.parse({
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
});

// Initialize Supabase client
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

// Database configuration for direct PostgreSQL connection (if needed)
export const dbConfig = {
  connectionString: `postgres://postgres.${env.SUPABASE_URL.split('//')[1]}:5432/postgres`,
  ssl: {
    rejectUnauthorized: false
  }
}; 