import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Store, AlertCircle } from 'lucide-react';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(60, 'Name must be at most 60 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  address: Yup.string()
    .max(400, 'Address must be at most 400 characters')
    .required('Address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password must include at least one uppercase letter and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setError(null);
      const { confirmPassword, ...userData } = values;
      await register(userData);
      navigate('/user/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Store className="h-12 w-12 text-primary-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          
          <Formik
            initialValues={{ 
              name: '', 
              email: '', 
              address: '', 
              password: '', 
              confirmPassword: '' 
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={`input ${errors.name && touched.name ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="name" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`input ${errors.email && touched.email ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <Field
                      as="textarea"
                      id="address"
                      name="address"
                      rows={3}
                      className={`input ${errors.address && touched.address ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="address" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      className={`input ${errors.password && touched.password ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="password" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`input ${errors.confirmPassword && touched.confirmPassword ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full py-2.5"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;