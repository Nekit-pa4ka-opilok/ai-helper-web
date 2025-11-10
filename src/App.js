import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainPage from './components/MainPage';
import ClientProfile from './components/ClientProfile';
import PsychologistProfile from './components/PsychologistProfile';
import ChatPage from './components/ChatPage';
import PsychologistDetail from './components/PsychologistDetail';
import Header from './components/Header';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('client');
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const handleNavigation = (page, psychologistId = null) => {
    setCurrentPage(page);
    if (page === 'login' || page === 'register') {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    
    if (psychologistId) {
      setSelectedPsychologist(psychologistId);
    }
  };

  const handleLoginSuccess = (type = 'client') => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentPage('main');
  };

  const handleRegisterSuccess = (type = 'client') => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentPage('main');
  };

  if (isAuthenticated) {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigate={handleNavigation} />;
      case 'profile':
        return userType === 'psychologist' 
          ? <PsychologistProfile onNavigate={handleNavigation} /> 
          : <ClientProfile onNavigate={handleNavigation} />;
      case 'chat':
        return <ChatPage onNavigate={handleNavigation} userType={userType} />;
      case 'psychologist-detail':
        return <PsychologistDetail onNavigate={handleNavigation} psychologistId={selectedPsychologist} />;
      default:
        return <MainPage onNavigate={handleNavigation} />;
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Психологический Центр "Гармония"</h1>
          <p>Профессиональная психологическая помощь</p>
        </div>
        
        <div className="form-container">
          <div className="form-tabs">
            <button 
              className={`tab ${currentPage === 'login' ? 'active' : ''}`}
              onClick={() => setCurrentPage('login')}
            >
              Вход
            </button>
            <button 
              className={`tab ${currentPage === 'register' ? 'active' : ''}`}
              onClick={() => setCurrentPage('register')}
            >
              Регистрация
            </button>
          </div>
          
          {currentPage === 'login' ? (
            <LoginForm 
              onLoginSuccess={handleLoginSuccess}
              onNavigate={handleNavigation}
            />
          ) : (
            <RegisterForm 
              onRegisterSuccess={handleRegisterSuccess}
              onNavigate={handleNavigation}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;