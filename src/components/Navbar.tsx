import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'store-owner':
        return '/store-owner/dashboard';
      default:
        return '/user/dashboard';
    }
  };

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Store className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">RateMyStore</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors">
                    <User className="h-5 w-5 mr-1" />
                    <span>{user?.name || 'User'}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link 
                        to={user?.role === 'store-owner' ? '/store-owner/profile' : '/user/profile'} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-primary-500 bg-primary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to={user?.role === 'store-owner' ? '/store-owner/profile' : '/user/profile'}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;