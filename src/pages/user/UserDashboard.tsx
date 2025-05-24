import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, Star, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import StoreCard from '../../components/StoreCard';

const API_URL = 'http://localhost:5000/api';

interface UserStore {
  id: number;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  userRating?: number;
}

const UserDashboard = () => {
  const { user } = useAuth();
  const [recentlyRatedStores, setRecentlyRatedStores] = useState<UserStore[]>([]);
  const [topRatedStores, setTopRatedStores] = useState<UserStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for development
  const sampleRecentlyRatedStores = [
    {
      id: 1,
      name: 'Tech Haven',
      email: 'contact@techhaven.com',
      address: '123 Main St, New York',
      averageRating: 4.7,
      userRating: 5
    },
    {
      id: 2,
      name: 'Fashion Boutique',
      email: 'info@fashionboutique.com',
      address: '456 Oak Ave, Los Angeles',
      averageRating: 4.3,
      userRating: 4
    }
  ];

  const sampleTopRatedStores = [
    {
      id: 3,
      name: 'Gourmet Foods',
      email: 'hello@gourmetfoods.com',
      address: '789 Pine Rd, Chicago',
      averageRating: 4.8
    },
    {
      id: 4,
      name: 'Home Essentials',
      email: 'support@homeessentials.com',
      address: '321 Elm St, Houston',
      averageRating: 4.6
    },
    {
      id: 5,
      name: 'Sports & Outdoors',
      email: 'info@sportsoutdoors.com',
      address: '654 Maple Dr, Phoenix',
      averageRating: 4.5
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, uncomment this to fetch from API
        // const recentlyRatedResponse = await axios.get(`${API_URL}/users/stores/rated`);
        // const topRatedResponse = await axios.get(`${API_URL}/stores/top-rated`);
        // setRecentlyRatedStores(recentlyRatedResponse.data);
        // setTopRatedStores(topRatedResponse.data);
        
        // For development, use sample data
        setRecentlyRatedStores(sampleRecentlyRatedStores);
        setTopRatedStores(sampleTopRatedStores);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRatingUpdate = async () => {
    // In a real app, uncomment this to refetch from API
    // const recentlyRatedResponse = await axios.get(`${API_URL}/users/stores/rated`);
    // setRecentlyRatedStores(recentlyRatedResponse.data);
    
    // For development, do nothing
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white">Welcome, {user?.name}!</h1>
            <p className="text-primary-100 mt-1">Find and rate your favorite stores</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/user/stores" className="btn bg-white text-primary-700 hover:bg-gray-100">
              <Store className="h-5 w-5 mr-2" />
              Browse Stores
            </Link>
            <Link to="/user/profile" className="btn bg-primary-600 text-white hover:bg-primary-700">
              My Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-card mb-8 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for stores by name or location..."
            className="input pl-10"
          />
        </div>
      </div>

      {/* Recently Rated Stores */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Recent Ratings</h2>
          <Link to="/user/stores" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Stores
          </Link>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="spinner"></div>
            <p className="mt-2 text-gray-600">Loading your ratings...</p>
          </div>
        ) : recentlyRatedStores.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card p-6 text-center">
            <Store className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Ratings Yet</h3>
            <p className="text-gray-500 mb-4">
              You haven't rated any stores yet. Explore and rate stores to see them here.
            </p>
            <Link to="/user/stores" className="btn btn-primary inline-flex">
              Find Stores to Rate
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyRatedStores.map((store) => (
              <StoreCard 
                key={store.id} 
                store={store} 
                onRatingUpdate={handleRatingUpdate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Top Rated Stores */}
      <div>
        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-accent-400 fill-current mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Top Rated Stores</h2>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="spinner"></div>
            <p className="mt-2 text-gray-600">Loading top stores...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRatedStores.map((store) => (
              <StoreCard 
                key={store.id} 
                store={store} 
                onRatingUpdate={handleRatingUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;