import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (values: LoginValues) => {
    try {
      const result = await login(values.email, values.password);
      const role = result?.role;
      
      // Redirect based on role
      if (role) {
        switch (role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'employer':
            navigate('/employer/dashboard');
            break;
          case 'employee':
            navigate('/employee/dashboard');
            break;
          default:
            navigate(from);
        }
      } else {
        console.error('Login failed: Role is undefined');
        navigate(from);
      }
    } catch (error) {
      console.error('Login failed:', error);
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={toFormikValidationSchema(loginSchema)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Email address"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.password && touched.password ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder="Password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
} 