import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainPage from './components/MainPage';
import ClientProfile from './components/ClientProfile';
import PsychologistProfile from './components/PsychologistProfile';
import ChatPage from './components/ChatPage';
import Header from './components/Header';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('client'); // 'client' или 'psychologist'

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'login' || page === 'register') {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
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

  // Рендерим соответствующую страницу в зависимости от авторизации и типа пользователя
  if (isAuthenticated) {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigate={handleNavigation} />;
      case 'profile':
        // Показываем профиль в зависимости от типа пользователя
        if (userType === 'psychologist') {
          return <PsychologistProfile onNavigate={handleNavigation} />;
        } else {
          return <ClientProfile onNavigate={handleNavigation} />;
        }
      case 'chat':
        return <ChatPage onNavigate={handleNavigation} userType={userType} />;
      default:
        return <MainPage onNavigate={handleNavigation} />;
    }
  }

  // Страницы авторизации
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