import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'employer' or 'candidate'
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialAuthCheck, setHasInitialAuthCheck] = useState(false);

  const checkAuthStatus = async (showLoading = false) => {
    // Only show loading spinner during initial auth check or when explicitly requested
    if (showLoading || !hasInitialAuthCheck) {
      setIsLoading(true);
    }
    
    // Get stored user type from localStorage
    const storedUserType = localStorage.getItem('userType');
    
    if (!storedUserType) {
      // No stored user type, user is not logged in
      setUser(null);
      setUserType(null);
      setIsLoading(false);
      setHasInitialAuthCheck(true);
      return;
    }

    try {
      // Make API call based on stored user type - SINGLE API CALL!
      const endpoint = storedUserType === 'employer' 
        ? "http://localhost:3000/api/auth/employer/isloggedin"
        : "http://localhost:3000/api/auth/candidate/isloggedin";

      const response = await axios.get(endpoint, { withCredentials: true });

      if (response.data.isLoggedin) {
        setUser(response.data.user);
        setUserType(storedUserType);
      } else {
        // Invalid session, clear stored data
        localStorage.removeItem('userType');
        setUser(null);
        setUserType(null);
      }
    } catch (err) {
      // Auth check failed, clear stored data
      localStorage.removeItem('userType');
      setUser(null);
      setUserType(null);
    }
    
    setIsLoading(false);
    setHasInitialAuthCheck(true);
  };

  useEffect(() => {
    // Only do initial auth check on app startup
    checkAuthStatus();
  }, []);

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
    // Don't trigger auth check on login, data is already fresh
  };

  const logout = async () => {
    try {
      // Logout from appropriate endpoint based on user type
      const logoutUrl = userType === 'employer' 
        ? "http://localhost:3000/api/auth/employer/logout"
        : "http://localhost:3000/api/auth/candidate/logout";
      
      await axios.post(logoutUrl, {}, { withCredentials: true });
      
      // Clear stored data
      localStorage.removeItem('userType');
      setUser(null);
      setUserType(null);
      
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      return false;
    }
  };

  const value = {
    user,
    userType,
    isLoading,
    isLoggedIn: !!user,
    isEmployer: userType === 'employer',
    isCandidate: userType === 'candidate',
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};