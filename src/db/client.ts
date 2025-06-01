import { Pool } from 'pg';
import { dbConfig } from './config';

// Create a new pool instance
export const pool = new Pool(dbConfig);

// Test the connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
    return true;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return false;
  }
}

// Export the pool and test function
export { testConnection }; 