import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';
import Login from './auth/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FormBuilder from './features/form/FormBuilder';
import NotFound from './pages/NotFound';
import CreateForm from './pages/CreateForm';
import FormList from './pages/FormList';
import FormRendererWrapper from './features/form/FormRendererWrapper';

// ✅ Onboarding page import
import Onboarding from './pages/Onboarding'; // Make sure file exists

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}> {/* Layout wraps all protected pages */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Form Management Routes */}
            <Route path="forms">
              <Route index element={<FormList />} />
              <Route path="create" element={<FormBuilder />} />
              <Route path=":formId" element={<FormRendererWrapper />} />
            </Route>

            {/* Onboarding Route */}
            <Route path="onboarding" element={<Onboarding />} />

            {/* Other Protected Routes */}
            {/* <Route path="users" element={<Users />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Route>
        
        {/* Fallback Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
