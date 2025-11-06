import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentContext } from '../context/AssessmentContext';

const LearningAssessmentPage = () => {
  const { completeAssessment } = useContext(AssessmentContext);
  const navigate = useNavigate();

  const handleComplete = () => {
    completeAssessment();
    navigate('/');
  };

  return (
    <div style={{
      height: '100vh',
      backgroundColor: 'green',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: 'white' }}>Learning Assessment</h1>
      <p style={{ color: 'white' }}>This is a placeholder for the learning assessment test.</p>
      <button onClick={handleComplete} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        Complete Assessment
      </button>
    </div>
  );
};

export default LearningAssessmentPage;
