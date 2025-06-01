# MyAnexa

A modern web application for managing loan requests, invoices, and payroll financing.

## Features

- Role-based access control (Admin, Employer, Employee)
- Loan request management
- Invoice tracking
- Payroll financing
- File uploads with Supabase storage
- Form validation with Formik and Zod
- Optimistic updates for better UX

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v6
- React Query
- Formik + Zod
- Supabase
- Tailwind CSS

## Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file as described above.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
  ├── api/          # API client and utilities
  ├── components/   # Reusable UI components
  ├── hooks/        # Custom React hooks
  ├── pages/        # Page components
  ├── types/        # TypeScript type definitions
  └── utils/        # Utility functions
```

## Deployment

### Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import your project into [Vercel](https://vercel.com/).
3. Set the following environment variables in your Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Vercel will automatically detect the build command (`npm run build`) and output directory (`dist`).
5. To support client-side routing for `/admin`, `/employer`, and `/employee`, a `vercel.json` file is included:

```json
{
  "rewrites": [
    { "source": "/admin/**", "destination": "/" },
    { "source": "/employer/**", "destination": "/" },
    { "source": "/employee/**", "destination": "/" }
  ]
}
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build (default port: 4173)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

# MyAnexa Backend

This is the backend service for the MyAnexa application, built with Supabase and TypeScript.

## Project Structure

```
myanexa-backend/
├── src/
│   ├── api/        # API endpoints and handlers
│   ├── db/         # Database queries and migrations
│   └── types/      # TypeScript type definitions
├── supabase/
│   ├── migrations/ # Database migrations
│   └── config.toml # Supabase configuration
└── package.json
```

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the local development environment:
   ```bash
   supabase start
   ```

3. Apply database migrations:
   ```bash
   supabase db push
   ```

## Development

- The project uses TypeScript for type safety
- Database migrations are managed through Supabase
- API endpoints are implemented using Supabase Edge Functions

## Database Schema

The database includes the following main tables:
- `companies`: Company information and settings
- `employees`: Employee profiles and settings
- `wage_requests`: Employee wage advance requests
- `payroll_financing`: Company payroll financing requests
- `transactions`: Financial transactions
- `audit_logs`: System audit trail

## Environment Variables

Create a `.env` file in the project root with the following variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
``` 