import { supabase } from './config';

// Test the connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from('companies').select('count').limit(1);
    if (error) throw error;
    console.log('Successfully connected to the database');
    return true;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return false;
  }
}

// Export the test function
export { testConnection }; 