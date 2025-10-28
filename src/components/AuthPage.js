import React, { useState } from 'react';
import RoleSelection from './RoleSelection';
import ClientAuth from './ClientAuth';
import PsychologistAuth from './PsychologistAuth';

const AuthPage = ({ onLogin, onRegister }) => {
  const [currentStep, setCurrentStep] = useState('role-selection');
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCurrentStep('auth');
  };

  const handleBackToRoleSelection = () => {
    setCurrentStep('role-selection');
    setSelectedRole('');
  };

  const handleAuthSuccess = (userData) => {
    onRegister(userData);
  };

  const handleLoginSuccess = (userData) => {
    onLogin(userData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {currentStep === 'role-selection' && (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        )}
        
        {currentStep === 'auth' && selectedRole === 'client' && (
          <ClientAuth
            onBack={handleBackToRoleSelection}
            onLogin={handleLoginSuccess}
            onRegister={handleAuthSuccess}
          />
        )}
        
        {currentStep === 'auth' && selectedRole === 'psychologist' && (
          <PsychologistAuth
            onBack={handleBackToRoleSelection}
            onLogin={handleLoginSuccess}
            onRegister={handleAuthSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;