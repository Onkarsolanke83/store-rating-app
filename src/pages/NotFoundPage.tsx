import { Link } from 'react-router-dom';
import { Store, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <Store className="h-16 w-16 text-primary-300 mx-auto" />
        <h1 className="mt-6 text-5xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-bold text-gray-700">Page not found</h2>
        <p className="mt-4 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;