import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserPlus, Search, X, Edit, Trash2, Filter, AlertCircle } from 'lucide-react';
import UserCard from '../../components/UserCard';

const API_URL = 'http://localhost:5000/api';

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  storeRating?: number;
}

const UserSchema = Yup.object().shape({
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
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password must include at least one uppercase letter and one special character'
    )
    .required('Password is required'),
  role: Yup.string()
    .oneOf(['user', 'store-owner', 'admin'], 'Invalid role')
    .required('Role is required')
});

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const navigate = useNavigate();

  // Sample data for development
  const sampleUsers = [
    {
      id: 1,
      name: 'Jane Cooper',
      email: 'jane@example.com',
      address: '123 Main St, New York',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      address: '456 Oak Ave, Los Angeles',
      role: 'store-owner',
      storeRating: 4.5
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      address: '789 Pine Rd, Chicago',
      role: 'user'
    },
    {
      id: 4,
      name: 'Michael Wilson',
      email: 'michael@example.com',
      address: '321 Elm St, Houston',
      role: 'user'
    },
    {
      id: 5,
      name: 'Sarah Thompson',
      email: 'sarah@example.com',
      address: '654 Maple Dr, Phoenix',
      role: 'store-owner',
      storeRating: 3.8
    },
    {
      id: 6,
      name: 'David Martinez',
      email: 'david@example.com',
      address: '987 Cedar Ln, Philadelphia',
      role: 'user'
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real app, uncomment this to fetch from API
        // const response = await axios.get(`${API_URL}/admin/users`);
        // setUsers(response.data);
        // setFilteredUsers(response.data);
        
        // For development, use sample data
        setUsers(sampleUsers);
        setFilteredUsers(sampleUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole, users]);

  const filterUsers = () => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.address.toLowerCase().includes(term)
      );
    }

    // Filter by role
    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
  };

  const handleAddUser = async (values: any, { resetForm }: any) => {
    try {
      setError(null);
      
      // In a real app, uncomment this to call API
      // const response = await axios.post(`${API_URL}/admin/users`, values);
      // const newUser = response.data;
      
      // For development, simulate adding a user
      const newUser = {
        id: users.length + 1,
        ...values
      };
      
      setUsers([newUser, ...users]);
      resetForm();
      setIsAddingUser(false);
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      // In a real app, uncomment this to call API
      // await axios.delete(`${API_URL}/admin/users/${userId}`);
      
      // For development, simulate deleting a user
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Manage Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit, or remove users from the platform.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setIsAddingUser(!isAddingUser)}
            className="btn btn-primary"
          >
            {isAddingUser ? (
              <>
                <X className="h-5 w-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Add User
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

      {/* Add User Form */}
      {isAddingUser && (
        <div className="bg-white shadow-card rounded-lg p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New User</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              address: '',
              password: '',
              role: 'user'
            }}
            validationSchema={UserSchema}
            onSubmit={handleAddUser}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
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
                      Email Address
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
                      Address
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

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className={`input ${errors.password && touched.password ? 'border-error-300 focus:ring-error-500' : ''}`}
                    />
                    <ErrorMessage name="password" component="div" className="mt-1 text-sm text-error-600" />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <Field
                      as="select"
                      id="role"
                      name="role"
                      className={`input ${errors.role && touched.role ? 'border-error-300 focus:ring-error-500' : ''}`}
                    >
                      <option value="user">Normal User</option>
                      <option value="store-owner">Store Owner</option>
                      <option value="admin">System Administrator</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="mt-1 text-sm text-error-600" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingUser(false)}
                    className="btn btn-outline mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? 'Adding...' : 'Add User'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

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
                placeholder="Search by name, email or address..."
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
                value={selectedRole || ''}
                onChange={(e) => setSelectedRole(e.target.value || null)}
                className="input pl-10"
              >
                <option value="">All Roles</option>
                <option value="admin">Administrators</option>
                <option value="store-owner">Store Owners</option>
                <option value="user">Normal Users</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      {isLoading ? (
        <div className="text-center py-10">
          <div className="spinner"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-10 bg-white shadow-card rounded-lg">
          <p className="text-gray-500">No users found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;