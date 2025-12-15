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
  const [userType, setUserType] = useState(null); // 'employee' or 'candidate'
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      // First try to check if user is a candidate
      const candidateRes = await axios.get(
        "http://localhost:3000/api/auth/candidate/isloggedin",
        { withCredentials: true }
      );

      if (candidateRes.data.isLoggedin) {
        setUser(candidateRes.data.user);
        setUserType('candidate');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      // If candidate check fails, try employee
      try {
        const employeeRes = await axios.get(
          "http://localhost:3000/api/auth/employee/isloggedin",
          { withCredentials: true }
        );

        if (employeeRes.data.isLoggedin) {
          setUser(employeeRes.data.user);
          setUserType('employee');
          setIsLoading(false);
          return;
        }
      } catch (employeeErr) {
        // Both checks failed - user is not logged in
        setUser(null);
        setUserType(null);
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
    window.dispatchEvent(new Event('authStateChanged'));
  };

  const logout = async () => {
    try {
      // Logout from appropriate endpoint based on user type
      const logoutUrl = userType === 'employee' 
        ? "http://localhost:3000/api/auth/employee/logout"
        : "http://localhost:3000/api/auth/candidate/logout";
      
      await axios.post(logoutUrl, {}, { withCredentials: true });
      
      setUser(null);
      setUserType(null);
      
      // Notify other components about logout
      window.dispatchEvent(new Event('authStateChanged'));
      
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
    isEmployee: userType === 'employee',
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