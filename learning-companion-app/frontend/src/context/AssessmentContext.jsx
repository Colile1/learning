import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  const { user, login } = useContext(AuthContext);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    if (user) {
      setHasCompletedAssessment(user.hasCompletedAssessment || false);
    }
  }, [user]);

  const completeAssessment = async () => {
    try {
      const response = await api.post('/auth/complete-assessment');
      if (response.data.success) {
        setHasCompletedAssessment(true);
        // Update user in AuthContext
        const updatedUser = { ...user, hasCompletedAssessment: true };
        login(updatedUser, localStorage.getItem('token'));
      }
    } catch (error) {
      console.error('Error completing assessment:', error);
    }
  };

  return (
    <AssessmentContext.Provider value={{ hasCompletedAssessment, completeAssessment }}>
      {children}
    </AssessmentContext.Provider>
  );
};
