import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { testConnection } from './db/client';

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Main function
async function main() {
  console.log('MyAnexa Backend Service');
  console.log('Environment:', process.env.NODE_ENV || 'development');

  // Test database connection
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Failed to connect to the database');
  }

  console.log('Service is ready');
}

// Run the application
main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
}); 