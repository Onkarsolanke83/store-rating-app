import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import StoreCard from '../../components/StoreCard';

const API_URL = 'http://localhost:5000/api';

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  userRating?: number;
}

const StoresList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Sample data for development
  const sampleStores = [
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
    },
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
      averageRating: 3.9
    },
    {
      id: 5,
      name: 'Sports & Outdoors',
      email: 'info@sportsoutdoors.com',
      address: '654 Maple Dr, Phoenix',
      averageRating: 4.5
    },
    {
      id: 6,
      name: 'Book Corner',
      email: 'books@bookcorner.com',
      address: '987 Cedar Ln, Philadelphia',
      averageRating: 4.2
    },
    {
      id: 7,
      name: 'Electronic World',
      email: 'info@electronicworld.com',
      address: '456 Circuit Ave, San Francisco',
      averageRating: 3.6
    },
    {
      id: 8,
      name: 'Garden Center',
      email: 'hello@gardencenter.com',
      address: '789 Green St, Seattle',
      averageRating: 4.1
    }
  ];

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // In a real app, uncomment this to fetch from API
        // const response = await axios.get(`${API_URL}/stores`);
        // setStores(response.data);
        // setFilteredStores(response.data);
        
        // For development, use sample data
        setStores(sampleStores);
        setFilteredStores(sampleStores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    filterStores();
  }, [searchTerm, ratingFilter, stores]);

  const filterStores = () => {
    let filtered = stores;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        store =>
          store.name.toLowerCase().includes(term) ||
          store.address.toLowerCase().includes(term)
      );
    }

    // Filter by rating
    if (ratingFilter !== null) {
      filtered = filtered.filter(store => 
        Math.floor(store.averageRating) === ratingFilter
      );
    }

    setFilteredStores(filtered);
  };

  const handleRatingUpdate = async () => {
    // In a real app, uncomment this to refetch from API
    // const response = await axios.get(`${API_URL}/stores`);
    // setStores(response.data);
    
    // For development, do nothing
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">Stores</h1>
        <p className="text-gray-500">
          Browse and rate stores in our directory
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-card rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by store name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={ratingFilter === null ? '' : ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
                className="input pl-10"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stores List */}
      {isLoading ? (
        <div className="text-center py-10">
          <div className="spinner"></div>
          <p className="mt-2 text-gray-600">Loading stores...</p>
        </div>
      ) : filteredStores.length === 0 ? (
        <div className="text-center py-10 bg-white shadow-card rounded-lg">
          <p className="text-gray-500">No stores found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <StoreCard 
              key={store.id} 
              store={store} 
              onRatingUpdate={handleRatingUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoresList;