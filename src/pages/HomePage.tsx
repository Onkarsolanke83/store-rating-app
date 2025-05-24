import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Star, Shield, UserCheck } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStoreRegister = () => {
    navigate('/register-store');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white w-full">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/264502/pexels-photo-264502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
              Find and Rate the Best Stores in Your Area
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Join our community of shoppers and store owners to discover, rate, and improve shopping experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <button 
                onClick={() => navigate('/register')}
                className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 font-semibold text-lg shadow-md"
              >
                Sign Up 
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="btn bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-semibold text-lg shadow-md"
              >
                Log In with Google
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Features section */}
      <section className="py-20 md:py-28 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RateMyStore connects shoppers with store owners, creating a community focused on better shopping experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-card p-8 text-center hover:shadow-elevated transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full">
                <UserCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Shoppers</h3>
              <p className="text-gray-600">
                Find the best-rated stores, submit your own ratings, and help others discover great shopping experiences.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-card p-8 text-center hover:shadow-elevated transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-secondary-100 text-secondary-600 rounded-full">
                <Store className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Store Owners</h3>
              <p className="text-gray-600">
                Gain valuable insights from customer ratings, track your performance, and improve your business.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-card p-8 text-center hover:shadow-elevated transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-accent-100 text-accent-600 rounded-full">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Administrators</h3>
              <p className="text-gray-600">
                Manage the platform, add new stores, and ensure quality ratings for a thriving community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-primary-500 text-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">1,000+</div>
              <p className="text-primary-100 text-lg">Registered Stores</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">50,000+</div>
              <p className="text-primary-100 text-lg">User Ratings</p>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">25,000+</div>
              <p className="text-primary-100 text-lg">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-secondary-500 to-secondary-700 text-white py-16 md:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-secondary-100 max-w-3xl mx-auto mb-8">
            Join thousands of users who are already improving their shopping experiences with RateMyStore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="btn bg-white text-secondary-700 hover:bg-gray-100 px-6 py-3 font-semibold text-lg shadow-md"
            >
              Sign Up Free
            </button>
            <button 
              onClick={() => navigate('/stores')}
              className="btn bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 font-semibold text-lg shadow-md"
            >
              Browse Stores
            </button>
          </div>
        </div>
      </section>

      {/* Put Your Store Here Section - now above testimonials */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="bg-white shadow-xl rounded-2xl p-10 md:p-16 text-center max-w-2xl w-full mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary-700">Best Store Rating Platform</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">Discover, rate, and review the best stores in your area. Join us and help others find great places!</p>
          <button
            onClick={handleStoreRegister}
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg shadow-lg text-lg transition-all duration-150"
          >
            Put Your Store Here
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how RateMyStore is changing the way people shop and businesses operate.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-card p-8 hover:shadow-elevated transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-accent-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "As a store owner, the feedback I get from customers has been invaluable. I've been able to improve my business and attract more customers."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">JD</div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Jane Doe</h4>
                  <p className="text-sm text-gray-500">Store Owner</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-card p-8 hover:shadow-elevated transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-accent-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I love being able to check ratings before visiting a new store. It saves me time and ensures I have a great shopping experience every time."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-700 font-bold">JS</div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">John Smith</h4>
                  <p className="text-sm text-gray-500">Shopper</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-card p-8 hover:shadow-elevated transition-shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-accent-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Managing our platform is a breeze with the admin dashboard. I can easily add new stores and keep everything running smoothly."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center text-accent-700 font-bold">AT</div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Alex Thompson</h4>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;