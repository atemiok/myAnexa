import { supabase } from './config';

async function setupDatabase() {
  try {
    // Create companies table
    const { error: companiesError } = await supabase.rpc('exec_sql', {
      sql: `
        create table if not exists public.companies (
          id            uuid primary key default gen_random_uuid(),
          name          text not null unique,
          email         text not null unique,
          contact_phone text,
          status        text default 'draft' check (status in ('draft','pending_verification','verified','disabled')),
          payroll_limit numeric(12,2) default 0,
          mpesa_paybill text,
          created_at    timestamptz default now()
        );
      `
    });

    if (companiesError) {
      console.error('Error creating companies table:', companiesError);
      throw companiesError;
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

// Run the setup
setupDatabase().catch(console.error); 