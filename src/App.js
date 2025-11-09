import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MainPage from './components/MainPage';
import ClientProfile from './components/ClientProfile';
import Header from './components/Header';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'login' || page === 'register') {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('main');
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('main');
  };

  // Рендерим соответствующую страницу в зависимости от авторизации
  if (isAuthenticated) {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigate={handleNavigation} />;
      case 'profile':
        return <ClientProfile onNavigate={handleNavigation} />;
      case 'chat':
        return (
          <div className="main-app">
            <Header onNavigate={handleNavigation} />
            <div className="main-content">
              <div className="hero-section">
                <h1>Чат с психологом</h1>
                <p>Функция чата будет доступна после подключения бэкенда</p>
                <button 
                  className="submit-btn"
                  onClick={() => handleNavigation('main')}
                  style={{marginTop: '20px'}}
                >
                  Вернуться на главную
                </button>
              </div>
            </div>
          </div>
        );
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