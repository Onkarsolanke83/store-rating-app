import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Store as StoreIcon, Search, X, AlertCircle } from 'lucide-react';
import StoreCard from '../../components/StoreCard';

const API_URL = 'http://localhost:5000/api';

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  averageRating: number;
}

const StoreSchema = Yup.object().shape({
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
  ownerId: Yup.number()
    .required('Owner is required')
});

const ManageStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [storeOwners, setStoreOwners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for development
  const sampleStores = [
    {
      id: 1,
      name: 'Tech Haven',
      email: 'contact@techhaven.com',
      address: '123 Main St, New York',
      averageRating: 4.7
    },
    {
      id: 2,
      name: 'Fashion Boutique',
      email: 'info@fashionboutique.com',
      address: '456 Oak Ave, Los Angeles',
      averageRating: 4.3
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
    }
  ];

  const sampleStoreOwners = [
    { id: 1, name: 'Robert Johnson' },
    { id: 2, name: 'Sarah Thompson' },
    { id: 3, name: 'David Chen' },
    { id: 4, name: 'Lisa Wong' }
  ];

  useEffect(() => {
    const fetchStoresAndOwners = async () => {
      try {
        // In a real app, uncomment this to fetch from API
        // const storesResponse = await axios.get(`${API_URL}/admin/stores`);
        // const ownersResponse = await axios.get(`${API_URL}/admin/users?role=store-owner`);
        // setStores(storesResponse.data);
        // setFilteredStores(storesResponse.data);
        // setStoreOwners(ownersResponse.data);
        
        // For development, use sample data
        setStores(sampleStores);
        setFilteredStores(sampleStores);
        setStoreOwners(sampleStoreOwners);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoresAndOwners();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = stores.filter(
        store =>
          store.name.toLowerCase().includes(term) ||
          store.address.toLowerCase().includes(term)
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  }, [searchTerm, stores]);

  const handleAddStore = async (values: any, { resetForm }: any) => {
    try {
      setError(null);
      
      // In a real app, uncomment this to call API
      // const response = await axios.post(`${API_URL}/admin/stores`, values);
      // const newStore = response.data;
      
      // For development, simulate adding a store
      const newStore = {
        id: stores.length + 1,
        name: values.name,
        email: values.email,
        address: values.address,
        averageRating: 0
      };
      
      setStores([newStore, ...stores]);
      resetForm();
      setIsAddingStore(false);
    } catch (error) {
      console.error('Error adding store:', error);
      setError('Failed to add store. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Manage Stores</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add new stores and view existing ones.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setIsAddingStore(!isAddingStore)}
            className="btn btn-primary"
          >
            {isAddingStore ? (
              <>
                <X className="h-5 w-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <StoreIcon className="h-5 w-5 mr-2" />
                Add Store
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Add Store Form */}
      {isAddingStore && (
        <div className="bg-white shadow-card rounded-lg p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Store</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              address: '',
              ownerId: ''
            }}
            validationSchema={StoreSchema}
            onSubmit={handleAddStore}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className={`input ${errors.name && touched.name ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="name" component="div" className="mt-1 text-sm text-error-600" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className={`input ${errors.email && touched.email ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-error-600" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Address
                    </label>
                    <Field
                      as="textarea"
                      id="address"
                      name="address"
                      rows={3}
                      className={`input ${errors.address && touched.address ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="address" component="div" className="mt-1 text-sm text-error-600" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
                      Store Owner
                    </label>
                    <Field
                      as="select"
                      id="ownerId"
                      name="ownerId"
                      className={`input ${errors.ownerId && touched.ownerId ? 'border-error-300 focus:ring-error-500' : ''}`}
                    >
                      <option value="">Select a store owner</option>
                      {storeOwners.map(owner => (
                        <option key={owner.id} value={owner.id}>
                          {owner.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="ownerId" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingStore(false)}
                    className="btn btn-outline mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Store'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Search */}
      <div className="bg-white shadow-card rounded-lg p-4 mb-8">
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
              showRating={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStores;