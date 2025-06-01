import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

interface ErrorWithStatus {
  status?: number;
  statusText?: string;
  data?: {
    message?: string;
  };
}

export function ErrorBoundary() {
  const error = useRouteError() as ErrorWithStatus;
  const navigate = useNavigate();

  let errorMessage: string;
  let errorTitle: string;

  if (isRouteErrorResponse(error)) {
    errorTitle = error.statusText || 'Page Not Found';
    errorMessage = error.data?.message || 'The page you are looking for does not exist.';
  } else if (error instanceof Error) {
    errorTitle = 'Application Error';
    errorMessage = error.message;
  } else {
    errorTitle = 'Unexpected Error';
    errorMessage = 'An unexpected error occurred. Please try again later.';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
            {error.status || 'Oops!'}
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {errorTitle}
          </h2>
          <p className="text-gray-600 mb-8">
            {errorMessage}
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
} 