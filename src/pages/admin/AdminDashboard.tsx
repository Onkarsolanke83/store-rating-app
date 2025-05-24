import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Store, Star, TrendingUp, Activity, UserPlus, MapPin } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
  averageRating: number;
  recentUsers: any[];
  recentStores: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
    averageRating: 0,
    recentUsers: [],
    recentStores: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/dashboard`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Sample data for development
  const sampleStats = {
    totalUsers: 124,
    totalStores: 57,
    totalRatings: 843,
    averageRating: 4.2,
    recentUsers: [
      { id: 1, name: 'Jane Cooper', email: 'jane@example.com', role: 'user' },
      { id: 2, name: 'Robert Johnson', email: 'robert@example.com', role: 'store-owner' },
      { id: 3, name: 'Emily Davis', email: 'emily@example.com', role: 'user' },
      { id: 4, name: 'Michael Wilson', email: 'michael@example.com', role: 'user' }
    ],
    recentStores: [
      { id: 1, name: 'Tech Haven', address: '123 Main St, New York', averageRating: 4.7 },
      { id: 2, name: 'Fashion Boutique', address: '456 Oak Ave, Los Angeles', averageRating: 4.3 },
      { id: 3, name: 'Gourmet Foods', address: '789 Pine Rd, Chicago', averageRating: 4.8 },
      { id: 4, name: 'Home Essentials', address: '321 Elm St, Houston', averageRating: 3.9 }
    ]
  };

  // Use sample data for development
  const displayStats = isLoading ? sampleStats : stats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of the platform's performance and recent activity.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link
            to="/admin/users"
            className="btn btn-primary"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add User
          </Link>
          <Link
            to="/admin/stores"
            className="btn btn-secondary"
          >
            <Store className="h-5 w-5 mr-2" />
            Add Store
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="bg-white overflow-hidden shadow-card rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{displayStats.totalUsers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/users" className="font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Total Stores */}
        <div className="bg-white overflow-hidden shadow-card rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                <Store className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Stores</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{displayStats.totalStores}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/stores" className="font-medium text-secondary-600 hover:text-secondary-500">
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Total Ratings */}
        <div className="bg-white overflow-hidden shadow-card rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
                <Star className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Ratings</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{displayStats.totalRatings}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/ratings" className="font-medium text-accent-600 hover:text-accent-500">
                View details
              </Link>
            </div>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-white overflow-hidden shadow-card rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-success-100 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{displayStats.averageRating.toFixed(1)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/statistics" className="font-medium text-success-600 hover:text-success-500">
                View analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Recent Users */}
          <div className="bg-white shadow-card overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary-500" />
                  New Users
                </h3>
                <Link to="/admin/users" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  View all
                </Link>
              </div>
              <div className="overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {displayStats.recentUsers.map((user) => (
                    <li key={user.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-primary-100 text-primary-800' 
                              : user.role === 'store-owner'
                                ? 'bg-secondary-100 text-secondary-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role === 'admin' 
                              ? 'Admin' 
                              : user.role === 'store-owner' 
                                ? 'Store Owner' 
                                : 'User'}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recent Stores */}
          <div className="bg-white shadow-card overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <Store className="h-5 w-5 mr-2 text-secondary-500" />
                  New Stores
                </h3>
                <Link to="/admin/stores" className="text-sm font-medium text-secondary-600 hover:text-secondary-500">
                  View all
                </Link>
              </div>
              <div className="overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {displayStats.recentStores.map((store) => (
                    <li key={store.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700">
                            {store.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{store.name}</p>
                          <p className="text-sm text-gray-500 truncate flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {store.address}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-accent-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{store.averageRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8 bg-white shadow-card overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-success-500" />
              System Status
            </h3>
          </div>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-success-100 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-success-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-success-800">API Services</h4>
                    <p className="text-xs text-success-600">Operational</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-success-100 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-success-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-success-800">Database</h4>
                    <p className="text-xs text-success-600">Operational</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-success-100 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-success-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-success-800">Web Services</h4>
                    <p className="text-xs text-success-600">Operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;