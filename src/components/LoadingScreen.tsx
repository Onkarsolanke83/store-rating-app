import { Store } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-pulse flex flex-col items-center justify-center">
        <Store className="h-16 w-16 text-primary-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">RateMyStore</h2>
        <div className="mt-4 flex space-x-2">
          <div className="h-2.5 w-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2.5 w-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-2.5 w-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;