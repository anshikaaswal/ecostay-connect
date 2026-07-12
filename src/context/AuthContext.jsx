import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { loginUser as apiLoginUser, getMe } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          setToken(storedToken);
          const res = await getMe();
          // Ensure consistent user shape { id, name, email, role }
          setUser({
            id: res.data.data.id || res.data.data._id,
            name: res.data.data.name,
            email: res.data.data.email,
            role: res.data.data.role || 'user',
          });
        } catch (error) {
          // Token invalid or expired
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Login function (works for both normal and OAuth login)
  const login = useCallback(async (email, password) => {
    const res = await apiLoginUser({ email, password });
    const { token: jwtToken, user: userData } = res.data;
    
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user',
    });
    
    return res.data;
  }, []);

  // Shared auth handler for OAuth token
  const handleOAuthToken = useCallback((token, userData) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser({
      id: userData.id || userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user',
    });
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberedEmail');
    setToken(null);
    setUser(null);
  }, []);

  // Check if authenticated
  const isAuthenticated = !!token && !!user;

  // Determine user role
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        setUser,
        handleOAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;