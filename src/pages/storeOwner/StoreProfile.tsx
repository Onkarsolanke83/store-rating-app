import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, Store, Mail, MapPin, Lock } from 'lucide-react';

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password must include at least one uppercase letter and one special character'
    )
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required')
});

const StoreProfile = () => {
  const { user, updatePassword } = useAuth();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample store data for development
  const storeData = {
    name: 'Tech Haven',
    email: 'contact@techhaven.com',
    address: '123 Main St, New York',
    phone: '(555) 123-4567',
    description: 'Your one-stop shop for all technology needs. We offer the latest gadgets, computer accessories, and tech support services.'
  };

  const handlePasswordUpdate = async (values: any, { resetForm }: any) => {
    try {
      setError(null);
      setSuccess(null);
      
      await updatePassword(values.currentPassword, values.newPassword);
      setSuccess('Password updated successfully!');
      resetForm();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update password. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-6">Store Profile</h1>
      
      {/* Store Information */}
      <div className="bg-white shadow-card rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Store Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <div className="flex items-center text-gray-700 mb-1">
              <Store className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium">Store Name</span>
            </div>
            <p className="text-lg">{storeData.name}</p>
          </div>
          
          <div>
            <div className="flex items-center text-gray-700 mb-1">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium">Store Email</span>
            </div>
            <p className="text-lg">{storeData.email}</p>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center text-gray-700 mb-1">
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium">Store Address</span>
            </div>
            <p className="text-lg">{storeData.address}</p>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center text-gray-700 mb-1">
              <span className="text-sm font-medium">Store Description</span>
            </div>
            <p className="text-gray-700">{storeData.description}</p>
          </div>
        </div>
      </div>
      
      {/* Account Information */}
      <div className="bg-white shadow-card rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <div className="flex items-center text-gray-700 mb-1">
              <span className="text-sm font-medium">Owner Name</span>
            </div>
            <p className="text-lg">{user?.name}</p>
          </div>
          
          <div>
            <div className="flex items-center text-gray-700 mb-1">
              <span className="text-sm font-medium">Owner Email</span>
            </div>
            <p className="text-lg">{user?.email}</p>
          </div>
        </div>
      </div>
      
      {/* Change Password */}
      <div className="bg-white shadow-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
        
        {success && (
          <div className="mb-4 bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-md flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-success-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="ml-3">{success}</p>
          </div>
        )}
        
        {error && (
          <div className="mb-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }}
          validationSchema={PasswordSchema}
          onSubmit={handlePasswordUpdate}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      className={`input pl-10 ${errors.currentPassword && touched.currentPassword ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                  </div>
                  <ErrorMessage name="currentPassword" component="div" className="mt-1 text-sm text-error-600" />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className={`input pl-10 ${errors.newPassword && touched.newPassword ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                  </div>
                  <ErrorMessage name="newPassword" component="div" className="mt-1 text-sm text-error-600" />
                  <p className="mt-1 text-sm text-gray-500">
                    Password must be 8-16 characters with at least one uppercase letter and one special character.
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`input pl-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-error-600" />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StoreProfile;