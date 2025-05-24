import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, Star, Users, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface StoreRating {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  rating: number;
  ratedAt: string;
}

interface StoreData {
  id: number;
  name: string;
  address: string;
  email: string;
  averageRating: number;
  totalRatings: number;
  recentRatings: StoreRating[];
}

const StoreOwnerDashboard = () => {
  const { user } = useAuth();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for development
  const sampleStoreData = {
    id: 1,
    name: 'Tech Haven',
    address: '123 Main St, New York',
    email: 'contact@techhaven.com',
    averageRating: 4.7,
    totalRatings: 36,
    recentRatings: [
      {
        id: 1,
        userId: 1,
        userName: 'John Smith',
        userEmail: 'john@example.com',
        rating: 5,
        ratedAt: '2025-04-15T10:30:00Z'
      },
      {
        id: 2,
        userId: 2,
        userName: 'Emily Johnson',
        userEmail: 'emily@example.com',
        rating: 4,
        ratedAt: '2025-04-14T14:45:00Z'
      },
      {
        id: 3,
        userId: 3,
        userName: 'Michael Brown',
        userEmail: 'michael@example.com',
        rating: 5,
        ratedAt: '2025-04-13T09:15:00Z'
      },
      {
        id: 4,
        userId: 4,
        userName: 'Sarah Wilson',
        userEmail: 'sarah@example.com',
        rating: 4,
        ratedAt: '2025-04-12T17:20:00Z'
      },
      {
        id: 5,
        userId: 5,
        userName: 'David Martinez',
        userEmail: 'david@example.com',
        rating: 5,
        ratedAt: '2025-04-11T13:10:00Z'
      }
    ]
  };

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // In a real app, uncomment this to fetch from API
        // const response = await axios.get(`${API_URL}/store-owner/store`);
        // setStoreData(response.data);
        
        // For development, use sample data
        setStoreData(sampleStoreData);
      } catch (error) {
        console.error('Error fetching store data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Store Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-secondary-700 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white">{storeData?.name}</h1>
            <p className="text-secondary-100 mt-1">{storeData?.address}</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/store-owner/profile" className="btn bg-white text-secondary-700 hover:bg-gray-100">
              <Store className="h-5 w-5 mr-2" />
              Store Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Average Rating */}
        <div className="bg-white overflow-hidden shadow-card rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
                <Star className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{storeData?.averageRating.toFixed(1)} / 5.0</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Ratings */}
        <div className="bg-white overflow-hidden shadow-card rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Ratings</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{storeData?.totalRatings}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Trending */}
        <div className="bg-white overflow-hidden shadow-card rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-success-100 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Trending</dt>
                  <dd>
                    <div className="text-lg font-semibold text-success-600">
                      {storeData && storeData.averageRating >= 4.5 ? 'Positive' : 'Stable'}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Ratings */}
      <div className="bg-white shadow-card rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Star className="h-5 w-5 mr-2 text-accent-500" />
            Recent Ratings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            See what customers are saying about your store
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {storeData?.recentRatings.map((rating) => (
                <tr key={rating.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                        {rating.userName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{rating.userName}</div>
                        <div className="text-sm text-gray-500">{rating.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < rating.rating ? 'text-accent-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {formatDate(rating.ratedAt)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;