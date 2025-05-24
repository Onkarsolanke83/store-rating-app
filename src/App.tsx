import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const ManageStores = lazy(() => import('./pages/admin/ManageStores'));

// User pages
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const StoresList = lazy(() => import('./pages/user/StoresList'));
const UserProfile = lazy(() => import('./pages/user/UserProfile'));

// Store Owner pages
const StoreOwnerDashboard = lazy(() => import('./pages/storeOwner/StoreOwnerDashboard'));
const StoreProfile = lazy(() => import('./pages/storeOwner/StoreProfile'));

function App() {
  const { initialized, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Admin routes */}
          <Route 
            path="admin" 
            element={
              <RoleRoute requiredRole="admin">
                <Outlet />
              </RoleRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="stores" element={<ManageStores />} />
          </Route>

          {/* User routes */}
          <Route 
            path="user" 
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/user/dashboard" replace />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="stores" element={<StoresList />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Store owner routes */}
          <Route 
            path="store-owner" 
            element={
              <RoleRoute requiredRole="store-owner">
                <Outlet />
              </RoleRoute>
            }
          >
            <Route index element={<Navigate to="/store-owner/dashboard" replace />} />
            <Route path="dashboard" element={<StoreOwnerDashboard />} />
            <Route path="profile" element={<StoreProfile />} />
          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;